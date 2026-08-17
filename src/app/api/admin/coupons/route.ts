import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { couponSchema } from "@/lib/validation";

export async function GET() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ coupons });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = couponSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const code = data.code.toUpperCase();

  const existing = await prisma.coupon.findUnique({ where: { code } });
  if (existing) {
    return NextResponse.json({ error: "A coupon with this code already exists" }, { status: 409 });
  }

  const coupon = await prisma.coupon.create({
    data: {
      code,
      type: data.type,
      value: data.value,
      minOrderValue: data.minOrderValue ?? null,
      maximumDiscount: data.maximumDiscount ?? 200,
      canStack: data.canStack,
      usageLimit: data.usageLimit ?? null,
      firstOrderOnly: data.firstOrderOnly,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      active: data.active,
    },
  });

  return NextResponse.json({ coupon }, { status: 201 });
}
