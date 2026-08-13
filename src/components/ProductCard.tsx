import Link from "next/link";
import type { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { categoryLabel } from "@/lib/constants";
import WishlistButton from "@/components/WishlistButton";
import QuickAddButton from "@/components/QuickAddButton";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = Boolean(
    product.originalPrice && product.originalPrice > product.price,
  );
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.1rem] border border-[#d8d1bc] bg-[#fffdf7] shadow-[0_10px_35px_rgba(15,40,28,.08)] transition-all duration-500 before:absolute before:inset-x-8 before:top-0 before:z-20 before:h-[3px] before:origin-left before:scale-x-0 before:rounded-full before:bg-honey-400 before:transition-transform before:duration-500 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-[0_26px_60px_rgba(15,40,28,.16)] hover:before:scale-x-100">
      <div className="relative overflow-hidden bg-[#eee9db]">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-forest-900/35 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-70" />

            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {!product.inStock ? (
                <span className="rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-cream">
                  Out of Stock
                </span>
              ) : product.featured ? (
                <span className="flex items-center gap-1 rounded-full bg-honey-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-forest-900 shadow-sm">
                  ★ Best seller
                </span>
              ) : null}
              {hasDiscount && (
                <span className="rounded-full bg-terracotta-500 px-3 py-1 text-xs font-semibold text-cream shadow-sm">
                  {discountPercent}% Off
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between rounded-full border border-white/60 bg-white/92 px-4 py-3 text-xs font-bold text-forest-900 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Click image to explore <span>↗</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500">
            {categoryLabel(product.category)}
          </p>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-700">
            Purity checked
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="mt-2 font-display text-[1.5rem] leading-[1.12] text-forest-900 transition-colors group-hover:text-terracotta-500">
            {product.name}
          </h3>
          <p className="mt-2 text-xs font-semibold text-foreground/40">
            {product.unit}
          </p>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <span className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-forest-900">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-foreground/40 line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </span>
        </div>
        <p className="mt-2 text-xs font-semibold text-forest-700">
          Inclusive of all taxes
        </p>
        <div className="mt-5 space-y-2.5 border-t border-forest-900/10 pt-5">
          <QuickAddButton
            fullWidth
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              unit: product.unit,
              imageUrl: product.imageUrl,
              inStock: product.inStock,
            }}
          />
        </div>
      </div>
    </article>
  );
}
