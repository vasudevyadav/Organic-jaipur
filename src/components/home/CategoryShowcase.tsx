"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@prisma/client";
import { formatPrice, safeImageUrl } from "@/lib/utils";
import QuickAddButton from "@/components/QuickAddButton";

export type ShowcaseTab = {
  key: string;
  label: string;
  icon: string;
  items: Product[];
};

export default function CategoryShowcase({ tabs }: { tabs: ShowcaseTab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  if (!activeTab) return null;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "border-forest-900 bg-forest-900 text-cream shadow-sm"
                  : "border-forest-900/15 bg-white text-forest-900/70 hover:border-forest-900/30 hover:text-forest-900"
              }`}
            >
              <span aria-hidden>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {activeTab.items.length === 0 && (
          <p className="col-span-full text-center text-sm text-forest-900/70">More products coming soon in this category.</p>
        )}
        {activeTab.items.map((item) => {
          const hasDiscount = Boolean(item.originalPrice && item.originalPrice > item.price);
          const discount = hasDiscount ? Math.round((1 - item.price / item.originalPrice!) * 100) : 0;
          return (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[1.4rem] border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/products/${item.slug}`} className="relative block aspect-square overflow-hidden bg-[#f1ecdd]">
                {hasDiscount && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-terracotta-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    Sale
                  </span>
                )}
                {!item.inStock && (
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-forest-900/80 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    Out of stock
                  </span>
                )}
                <Image
                  src={safeImageUrl(item.imageUrl)}
                  alt={item.name}
                  unoptimized
                  fill
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 24vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.06]"
                />
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-display text-base leading-tight text-forest-900">{item.name}</h3>
                  <p className="mt-1 text-xs text-forest-900/70">{item.unit}</p>
                </Link>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-base font-bold text-forest-900">{formatPrice(item.price)}</span>
                  {hasDiscount && <span className="text-xs text-forest-900/65 line-through">{formatPrice(item.originalPrice!)}</span>}
                  {hasDiscount && <span className="text-xs font-bold text-terracotta-600">{discount}% off</span>}
                </div>
                <div className="mt-3">
                  <QuickAddButton fullWidth product={{ id: item.id, slug: item.slug, name: item.name, price: item.price, unit: item.unit, weight: item.weight, imageUrl: item.imageUrl, inStock: item.inStock }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
