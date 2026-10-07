import { createHmac, timingSafeEqual } from "node:crypto";
import { after, NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAdminOfOrder } from "@/lib/admin-email";
import { sendOrderConfirmationEmail } from "@/lib/customer-email";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { orderNumber, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body ?? {};
  if (![orderNumber, razorpayPaymentId, razorpayOrderId, razorpaySignature].every((value) => typeof value === "string" && value.length > 0)) {
    return NextResponse.json({ error: "Invalid payment response." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { orderNumber } });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!order?.razorpayOrderId || !secret || order.paymentMethod !== "RAZORPAY") {
    return NextResponse.json({ error: "Payment order not found." }, { status: 404 });
  }
  if (razorpayOrderId !== order.razorpayOrderId) {
    return NextResponse.json({ error: "Payment order mismatch." }, { status: 400 });
  }
  if (order.status === "MANUAL_APPROVAL_REQUIRED" || order.status === "REJECTED" || order.status === "CANCELLED") {
    return NextResponse.json({ error: "This order is not eligible for automatic confirmation." }, { status: 409 });
  }
  if (order.paymentStatus === "PAID") {
    if (order.razorpayPaymentId === razorpayPaymentId) {
      return NextResponse.json({ success: true, orderNumber });
    }
    return NextResponse.json({ error: "This order already has a verified payment." }, { status: 409 });
  }

  const expected = createHmac("sha256", secret).update(`${order.razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(razorpaySignature, "utf8");
  const valid = expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!valid) {
    await prisma.order.update({ where: { id: order.id }, data: { paymentStatus: "FAILED" } });
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    return NextResponse.json({ error: "Payment verification is temporarily unavailable." }, { status: 503 });
  }
  const paymentResponse = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpayPaymentId)}`,
    {
      headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}` },
      cache: "no-store",
    },
  );
  const payment = await paymentResponse.json().catch(() => null);
  const expectedAmount = Math.round(order.total * 100);
  if (!paymentResponse.ok) {
    return NextResponse.json({ error: "Could not confirm the payment status. Please contact support." }, { status: 502 });
  }
  if (
    payment?.order_id !== order.razorpayOrderId ||
    payment?.amount !== expectedAmount ||
    payment?.currency !== "INR"
  ) {
    return NextResponse.json({ error: "Payment details do not match this order." }, { status: 409 });
  }
  if (payment?.status !== "captured" || payment?.captured !== true) {
    return NextResponse.json({ error: "Payment has not been captured yet. Please do not retry; contact support." }, { status: 409 });
  }

  const confirmedOrder = await prisma.$transaction(async (tx) => {
    const updated = await tx.order.update({
      where: { id: order.id },
      data: { paymentStatus: "PAID", status: "CONFIRMED", razorpayPaymentId },
      include: { items: true },
    });

    if (updated.couponCode) {
      const coupon = await tx.coupon.findUnique({ where: { code: updated.couponCode } });
      if (coupon) {
        const customerId = updated.userId ?? updated.customerEmail?.trim().toLowerCase() ?? updated.customerPhone.replace(/\D/g, "");
        await tx.couponUsage.upsert({
          where: { orderId: updated.id },
          update: {},
          create: { couponId: coupon.id, orderId: updated.id, customerId },
        });
      }
    }

    return updated;
  });

  after(async () => {
    await Promise.allSettled([
      notifyAdminOfOrder(confirmedOrder).catch((error) => console.error("Paid order notification failed", error)),
      sendOrderConfirmationEmail(confirmedOrder).catch((error) => console.error("Paid order confirmation email failed", error)),
    ]);
  });
  return NextResponse.json({ success: true, orderNumber });
}
