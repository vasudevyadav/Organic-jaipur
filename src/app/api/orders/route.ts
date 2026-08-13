import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validation";
import { generateOrderNumber } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD, ONLINE_PAYMENT_DISCOUNT_PERCENT, SHIPPING_FEE } from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth-customer";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  const productIds = data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map((p) => [p.id, p]));

  const missing = productIds.filter((id) => !productMap.has(id));
  if (missing.length > 0) {
    return NextResponse.json({ error: "Some items in your cart are no longer available." }, { status: 400 });
  }

  const outOfStock = data.items.filter((i) => !productMap.get(i.productId)!.inStock);
  if (outOfStock.length > 0) {
    return NextResponse.json(
      { error: `Out of stock: ${outOfStock.map((i) => productMap.get(i.productId)!.name).join(", ")}` },
      { status: 400 }
    );
  }

  const orderItemsData = data.items.map((i) => {
    const product = productMap.get(i.productId)!;
    return {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      unit: product.unit,
      quantity: i.quantity,
    };
  });

  const subtotal = orderItemsData.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  let couponDiscount = 0;
  let couponCode: string | null = null;
  if (data.couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: data.couponCode.toUpperCase() } });
    if (
      coupon &&
      coupon.active &&
      (!coupon.expiresAt || coupon.expiresAt > new Date()) &&
      (!coupon.minOrderValue || subtotal >= coupon.minOrderValue)
    ) {
      couponDiscount = coupon.type === "PERCENT" ? (subtotal * coupon.value) / 100 : coupon.value;
      couponDiscount = Math.min(couponDiscount, subtotal);
      couponCode = coupon.code;
    }
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const onlinePaymentDiscount =
    data.paymentMethod === "RAZORPAY"
      ? ((subtotal - couponDiscount) * ONLINE_PAYMENT_DISCOUNT_PERCENT) / 100
      : 0;
  const discount = Math.min(couponDiscount + onlinePaymentDiscount, subtotal);
  const total = Math.max(subtotal - discount + shippingFee, 0);

  const user = await getCurrentUser();

  let order = null;
  for (let attempt = 0; attempt < 5 && !order; attempt++) {
    try {
      order = await prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: user?.id ?? null,
          paymentMethod: data.paymentMethod,
          subtotal,
          discount,
          shippingFee,
          total,
          couponCode,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail || null,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2 || null,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          notes: data.notes || null,
          items: { create: orderItemsData },
        },
        include: { items: true },
      });
    } catch (err: unknown) {
      const isUniqueViolation =
        typeof err === "object" && err !== null && "code" in err && err.code === "P2002";
      if (!isUniqueViolation) throw err;
    }
  }

  if (!order) {
    return NextResponse.json({ error: "Could not create order. Please try again." }, { status: 500 });
  }

  if (data.paymentMethod === "RAZORPAY") {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      await prisma.order.delete({ where: { id: order.id } });
      return NextResponse.json({ error: "Online payments are temporarily unavailable." }, { status: 503 });
    }

    try {
      const authorization = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: { Authorization: `Basic ${authorization}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "INR",
          receipt: order.orderNumber,
          notes: { local_order_id: order.id },
        }),
        cache: "no-store",
      });
      const razorpayOrder = await razorpayResponse.json().catch(() => null);

      if (!razorpayResponse.ok || !razorpayOrder?.id || typeof razorpayOrder.amount !== "number") {
        await prisma.order.delete({ where: { id: order.id } });
        return NextResponse.json({ error: "Could not start the secure payment. Please try again." }, { status: 502 });
      }

      order = await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
        include: { items: true },
      });
      return NextResponse.json({
        order,
        payment: { keyId, razorpayOrderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: "INR" },
      }, { status: 201 });
    } catch {
      await prisma.order.delete({ where: { id: order.id } });
      return NextResponse.json({ error: "Could not start the secure payment. Please try again." }, { status: 502 });
    }
  }

  return NextResponse.json({ order }, { status: 201 });
}
