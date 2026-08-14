"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@prisma/client";
import ScrollCarousel from "@/components/home/ScrollCarousel";
import QuickAddButton from "@/components/QuickAddButton";
import WishlistButton from "@/components/WishlistButton";
import { formatPrice, safeImageUrl } from "@/lib/utils";

export default function BestSellerCarousel({ items }: { items: Product[] }) {
  return (
    <ScrollCarousel itemClassName="w-[76vw] sm:w-[300px]">
      {items.map((item, index) => {
        const hasDiscount = Boolean(item.originalPrice && item.originalPrice > item.price);
        const discount = hasDiscount ? Math.round((1 - item.price / item.originalPrice!) * 100) : 0;
        return (
          <article
            key={item.id}
            className="group h-full overflow-hidden rounded-[1.5rem] border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/products/${item.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[#f1ecdd]">
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-forest-900 px-3 py-1.5 text-[11px] font-bold text-honey-400 shadow-sm">
                <span className="text-honey-400">#{index + 1}</span> Organic Jaipur
              </span>
              <span className="absolute right-3 top-3 z-10">
                <WishlistButton productId={item.id} />
              </span>
              <Image
                src={safeImageUrl(item.imageUrl)}
                alt={item.name}
                unoptimized
                fill
                sizes="(max-width: 639px) 76vw, 300px"
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
              />
            </Link>
            <div className="p-5">
              <Link href={`/products/${item.slug}`}>
                <h3 className="font-display text-lg leading-tight text-forest-900">{item.name}</h3>
                <p className="mt-1 text-xs font-semibold text-forest-900/70">{item.unit}</p>
              </Link>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-forest-900">{formatPrice(item.price)}</span>
                  {hasDiscount && <span className="text-xs text-forest-900/65 line-through">{formatPrice(item.originalPrice!)}</span>}
                </div>
                {hasDiscount && <span className="rounded-full bg-honey-400/25 px-2.5 py-1 text-[11px] font-bold text-honey-600">{discount}% off</span>}
              </div>

              <div className="mt-4">
                <QuickAddButton fullWidth product={{ id: item.id, slug: item.slug, name: item.name, price: item.price, unit: item.unit, imageUrl: item.imageUrl, inStock: item.inStock }} />
              </div>
            </div>
          </article>
        );
      })}
    </ScrollCarousel>
  );
}
