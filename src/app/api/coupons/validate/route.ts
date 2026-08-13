import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1),
  subtotal: z.coerce.number().nonnegative(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { code, subtotal } = parsed.data;
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });

  if (!coupon || !coupon.active) {
    return NextResponse.json({ error: "This coupon code is not valid." }, { status: 404 });
  }
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return NextResponse.json({ error: "This coupon has expired." }, { status: 400 });
  }
  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return NextResponse.json(
      { error: `This coupon requires a minimum order of ₹${coupon.minOrderValue}.` },
      { status: 400 }
    );
  }

  const discount =
    coupon.type === "PERCENT" ? Math.min((subtotal * coupon.value) / 100, subtotal) : Math.min(coupon.value, subtotal);

  return NextResponse.json({
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
    discount,
  });
}
