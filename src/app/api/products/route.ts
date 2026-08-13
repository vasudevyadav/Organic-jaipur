import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema, CATEGORY_VALUES } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { STOREFRONT_CATEGORY_VALUES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const category = params.get("category");

  if (params.has("ids")) {
    const ids = (params.get("ids") ?? "").split(",").filter(Boolean);
    const products = ids.length > 0
      ? await prisma.product.findMany({ where: { id: { in: ids } } })
      : [];
    return NextResponse.json({ products });
  }

  const where: Record<string, unknown> = { category: { in: STOREFRONT_CATEGORY_VALUES } };
  if (category && CATEGORY_VALUES.includes(category as (typeof CATEGORY_VALUES)[number])) {
    where.category = category;
  }
  if (params.get("inStock") === "true") {
    where.inStock = true;
  }
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {}),
    };
  }

  const sort = params.get("sort");
  const orderBy =
    sort === "price_asc"
      ? { price: "asc" as const }
      : sort === "price_desc"
        ? { price: "desc" as const }
        : sort === "name_asc"
          ? { name: "asc" as const }
          : { createdAt: "desc" as const };

  const products = await prisma.product.findMany({ where, orderBy });

  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const baseSlug = slugify(data.name);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const product = await prisma.product.create({
    data: { ...data, slug },
  });

  return NextResponse.json({ product }, { status: 201 });
}
