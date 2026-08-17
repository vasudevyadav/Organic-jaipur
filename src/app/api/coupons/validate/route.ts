import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutItemSchema } from "@/lib/validation";
import { calculateOrderDiscount, money } from "@/lib/discounts";
import { getCurrentUser } from "@/lib/auth-customer";
import { z } from "zod";

const schema = z.object({ code: z.string().min(1).max(40), items: z.array(checkoutItemSchema).min(1) });

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { code, items } = parsed.data;
  const [coupon, products, user] = await Promise.all([
    prisma.coupon.findUnique({ where: { code: code.trim().toUpperCase() } }),
    prisma.product.findMany({ where: { id: { in: [...new Set(items.map((item) => item.productId))] } } }),
    getCurrentUser(),
  ]);
  if (!coupon || !coupon.active) return NextResponse.json({ error: "This coupon code is not valid." }, { status: 404 });
  if (coupon.expiresAt && coupon.expiresAt <= new Date()) return NextResponse.json({ error: "This coupon has expired." }, { status: 400 });
  if (products.length !== new Set(items.map((item) => item.productId)).size) return NextResponse.json({ error: "Some cart items are unavailable." }, { status: 400 });

  const productMap = new Map(products.map((product) => [product.id, product]));
  const subtotal = money(items.reduce((sum, item) => sum + productMap.get(item.productId)!.price * item.quantity, 0));
  if (coupon.minOrderValue != null && subtotal < coupon.minOrderValue) return NextResponse.json({ error: `This coupon requires a minimum order of ₹${coupon.minOrderValue}.` }, { status: 400 });
  if (!Number.isFinite(coupon.value) || coupon.value < 0 || (coupon.type === "PERCENT" && coupon.value > 100)) return NextResponse.json({ error: "This coupon has an invalid discount." }, { status: 400 });

  const totalUses = await prisma.couponUsage.count({ where: { couponId: coupon.id } });
  if (coupon.usageLimit != null && totalUses >= coupon.usageLimit) return NextResponse.json({ error: "This coupon has reached its usage limit." }, { status: 400 });
  if (coupon.firstOrderOnly && user && await prisma.order.count({ where: { userId: user.id } })) return NextResponse.json({ error: "This coupon is only available on a first order." }, { status: 400 });

  const discount = calculateOrderDiscount({ subtotal, coupon, paymentMethod: "COD" }).couponDiscount;
  return NextResponse.json({ code: coupon.code, type: coupon.type, value: coupon.value, discount, maximumDiscount: coupon.maximumDiscount, canStack: coupon.canStack });
}
