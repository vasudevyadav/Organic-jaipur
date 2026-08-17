import { after, NextRequest, NextResponse } from "next/server";
import type { Order, OrderItem } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validation";
import { generateOrderNumber } from "@/lib/utils";
import { calculateShipping } from "@/lib/shipping";
import { getCurrentUser } from "@/lib/auth-customer";
import { calculateOrderDiscount, money } from "@/lib/discounts";
import { MANUAL_APPROVAL_CUSTOMER_MESSAGE, MAX_ORDER_DISCOUNT } from "@/lib/constants";
import { notifyAdminOfOrder } from "@/lib/admin-email";

class CheckoutError extends Error {}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const data = parsed.data;
  const user = await getCurrentUser();
  const customerId = user?.id ?? data.customerEmail?.trim().toLowerCase() ?? data.customerPhone.replace(/\D/g, "");
  let order: Order & { items: OrderItem[] };

  try {
    order = await prisma.$transaction(async (tx) => {
      const productIds = [...new Set(data.items.map((item) => item.productId))];
      const products = await tx.product.findMany({ where: { id: { in: productIds } } });
      const productMap = new Map(products.map((product) => [product.id, product]));
      if (products.length !== productIds.length) throw new CheckoutError("Some items in your cart are no longer available.");

      const orderItems = data.items.map((item) => {
        const product = productMap.get(item.productId)!;
        if (!product.inStock) throw new CheckoutError(`Out of stock: ${product.name}`);
        if (!Number.isFinite(product.price) || product.price <= 0) throw new CheckoutError("A product has an invalid price.");
        return { productId: product.id, productName: product.name, unitPrice: money(product.price), unit: product.unit, weight: product.weight, quantity: item.quantity };
      });
      const subtotal = money(orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0));
      const totalWeight = orderItems.reduce((sum, item) => sum + Math.max(0, item.weight) * item.quantity, 0);

      let coupon = null;
      if (data.couponCode) {
        coupon = await tx.coupon.findUnique({ where: { code: data.couponCode.trim().toUpperCase() } });
        if (!coupon || !coupon.active) throw new CheckoutError("This coupon code is not valid.");
        if (coupon.expiresAt && coupon.expiresAt <= new Date()) throw new CheckoutError("This coupon has expired.");
        if (coupon.minOrderValue != null && subtotal < coupon.minOrderValue) throw new CheckoutError(`This coupon requires a minimum order of ₹${coupon.minOrderValue}.`);
        if (!Number.isFinite(coupon.value) || coupon.value < 0 || (coupon.type === "PERCENT" && coupon.value > 100)) throw new CheckoutError("This coupon has an invalid discount.");
        const [totalUses, priorOrders] = await Promise.all([
          tx.couponUsage.count({ where: { couponId: coupon.id } }),
          coupon.firstOrderOnly ? tx.order.count({ where: user ? { userId: user.id } : data.customerEmail ? { customerEmail: data.customerEmail } : { customerPhone: data.customerPhone } }) : Promise.resolve(0),
        ]);
        if (coupon.usageLimit != null && totalUses >= coupon.usageLimit) throw new CheckoutError("This coupon has reached its usage limit.");
        if (coupon.firstOrderOnly && priorOrders > 0) throw new CheckoutError("This coupon is only available on a first order.");
      }

      const pricing = calculateOrderDiscount({ subtotal, coupon, paymentMethod: data.paymentMethod });
      const shippingFee = money(calculateShipping({ city: data.city, state: data.state, orderValue: subtotal, totalWeight }).shippingCharge);
      if (!Number.isFinite(shippingFee) || shippingFee < 0) throw new CheckoutError("Shipping could not be calculated.");
      const total = money(subtotal - pricing.finalDiscount + shippingFee);
      if (total < 0) throw new CheckoutError("The order total is invalid.");
      const approvalReason = pricing.requiresManualApproval
        ? `Calculated discount ₹${pricing.finalDiscount.toFixed(2)} exceeds the maximum allowed discount of ₹${MAX_ORDER_DISCOUNT.toFixed(2)}.` : null;

      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(), userId: user?.id ?? null,
          status: pricing.requiresManualApproval ? "MANUAL_APPROVAL_REQUIRED" : data.paymentMethod === "RAZORPAY" ? "PAYMENT_PENDING" : "PENDING",
          paymentMethod: data.paymentMethod, subtotal, discount: pricing.finalDiscount, shippingFee, total,
          couponCode: coupon?.code ?? null, approvalReason, customerName: data.customerName,
          customerPhone: data.customerPhone, customerEmail: data.customerEmail || null,
          addressLine1: data.addressLine1, addressLine2: data.addressLine2 || null, city: data.city,
          state: data.state, pincode: data.pincode, notes: data.notes || null, items: { create: orderItems },
        }, include: { items: true },
      });
      if (coupon) await tx.couponUsage.create({ data: { couponId: coupon.id, orderId: created.id, customerId } });
      return created;
    }, { isolationLevel: "Serializable" });
  } catch (error) {
    if (error instanceof CheckoutError) return NextResponse.json({ error: error.message }, { status: 400 });
    console.error("Order creation failed", error);
    return NextResponse.json({ error: "Could not create order. Please try again." }, { status: 500 });
  }

  after(async () => {
    await notifyAdminOfOrder(order).catch((error) => console.error("Order notification failed", error));
  });

  if (order.status === "MANUAL_APPROVAL_REQUIRED") {
    return NextResponse.json({ order, requiresManualApproval: true, message: MANUAL_APPROVAL_CUSTOMER_MESSAGE }, { status: 201 });
  }

  if (data.paymentMethod === "RAZORPAY") {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ order, error: "Online payments are temporarily unavailable." }, { status: 503 });
    try {
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(order.total * 100), currency: "INR", receipt: order.orderNumber, notes: { local_order_id: order.id } }), cache: "no-store",
      });
      const paymentOrder = await response.json().catch(() => null);
      if (!response.ok || !paymentOrder?.id || typeof paymentOrder.amount !== "number") throw new Error("Razorpay order failed");
      order = await prisma.order.update({ where: { id: order.id }, data: { razorpayOrderId: paymentOrder.id }, include: { items: true } });
      return NextResponse.json({ order, payment: { keyId, razorpayOrderId: paymentOrder.id, amount: paymentOrder.amount, currency: "INR" } }, { status: 201 });
    } catch (error) {
      console.error("Payment initialization failed", error);
      return NextResponse.json({ order, error: "Could not start the secure payment. Please try again." }, { status: 502 });
    }
  }
  return NextResponse.json({ order }, { status: 201 });
}
