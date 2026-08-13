import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { STOREFRONT_CATEGORY_VALUES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const products = await prisma.product.findMany({
    where: {
      category: { in: STOREFRONT_CATEGORY_VALUES },
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return NextResponse.json({ products });
}
