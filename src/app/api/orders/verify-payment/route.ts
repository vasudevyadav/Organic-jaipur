import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const { orderNumber, razorpayPaymentId, razorpaySignature } = body ?? {};
  if (![orderNumber, razorpayPaymentId, razorpaySignature].every((value) => typeof value === "string" && value.length > 0)) {
    return NextResponse.json({ error: "Invalid payment response." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { orderNumber } });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!order?.razorpayOrderId || !secret || order.paymentMethod !== "RAZORPAY") {
    return NextResponse.json({ error: "Payment order not found." }, { status: 404 });
  }
  if (order.status === "MANUAL_APPROVAL_REQUIRED" || order.status === "REJECTED" || order.status === "CANCELLED") {
    return NextResponse.json({ error: "This order is not eligible for automatic confirmation." }, { status: 409 });
  }

  const expected = createHmac("sha256", secret).update(`${order.razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(razorpaySignature, "utf8");
  const valid = expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!valid) {
    await prisma.order.update({ where: { id: order.id }, data: { paymentStatus: "FAILED" } });
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  await prisma.order.update({ where: { id: order.id }, data: { paymentStatus: "PAID", status: "CONFIRMED", razorpayPaymentId } });
  return NextResponse.json({ success: true, orderNumber });
}
