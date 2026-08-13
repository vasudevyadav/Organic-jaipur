import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { couponSchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = couponSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.coupon.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }

  const data = parsed.data;

  if (data.code) {
    const code = data.code.toUpperCase();
    if (code !== existing.code) {
      const conflict = await prisma.coupon.findUnique({ where: { code } });
      if (conflict) {
        return NextResponse.json(
          { error: "A coupon with this code already exists" },
          { status: 409 }
        );
      }
    }
  }

  const coupon = await prisma.coupon.update({
    where: { id },
    data: {
      ...(data.code !== undefined ? { code: data.code.toUpperCase() } : {}),
      ...(data.type !== undefined ? { type: data.type } : {}),
      ...(data.value !== undefined ? { value: data.value } : {}),
      ...(data.minOrderValue !== undefined ? { minOrderValue: data.minOrderValue } : {}),
      ...(data.expiresAt !== undefined
        ? { expiresAt: data.expiresAt ? new Date(data.expiresAt) : null }
        : {}),
      ...(data.active !== undefined ? { active: data.active } : {}),
    },
  });

  return NextResponse.json({ coupon });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  const existing = await prisma.coupon.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }

  await prisma.coupon.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
