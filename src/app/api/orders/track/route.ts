import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackOrderSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = trackOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { orderNumber, customerPhone } = parsed.data;

  const order = await prisma.order.findFirst({
    where: { orderNumber, customerPhone },
    select: {
      orderNumber: true,
      status: true,
      subtotal: true,
      discount: true,
      shippingFee: true,
      total: true,
      couponCode: true,
      customerName: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      state: true,
      pincode: true,
      notes: true,
      createdAt: true,
      items: {
        select: {
          id: true,
          productName: true,
          unitPrice: true,
          unit: true,
          quantity: true,
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json(
      { error: "No order found for that order number and phone number. Please double-check and try again." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order });
}
