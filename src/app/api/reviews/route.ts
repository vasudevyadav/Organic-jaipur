import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validation";
import { getCurrentUser } from "@/lib/auth-customer";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
  });

  const count = reviews.length;
  const average = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return NextResponse.json({ reviews, average, count });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { productId, customerName, rating, comment, contact } = parsed.data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const user = await getCurrentUser();

  if (user) {
    const existing = await prisma.review.findFirst({ where: { productId, userId: user.id } });
    if (existing) {
      return NextResponse.json({ error: "You've already reviewed this product." }, { status: 409 });
    }
  }

  let verifiedPurchase = false;
  const identifier = contact || user?.email || user?.phone || "";
  if (identifier) {
    const matchingOrder = await prisma.order.findFirst({
      where: {
        OR: [{ customerEmail: identifier }, { customerPhone: identifier }],
        items: { some: { productId } },
      },
    });
    verifiedPurchase = Boolean(matchingOrder);
  }

  const review = await prisma.review.create({
    data: {
      productId,
      userId: user?.id ?? null,
      customerName,
      rating,
      comment,
      verifiedPurchase,
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}
