"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import { useWishlist } from "@/lib/wishlist";
import { useHydrated } from "@/lib/useHydrated";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

export default function WishlistPage() {
  const { productIds } = useWishlist();
  const hydrated = useHydrated();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/products?ids=${productIds.join(",")}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []));
  }, [productIds]);

  if (!hydrated) return null;

  return (
    <main className="overflow-hidden">
      <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
            <span className="h-px w-8 bg-honey-400" /> Saved for Later
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            Pasand Aapki, <em className="font-normal text-honey-400">Sambhaal Hamari.</em>
          </h1>
        </AnimatedSection>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        {productIds.length === 0 && (
          <div className="rounded-[1.4rem] border border-forest-900/10 bg-white p-10 text-center shadow-sm">
            <p className="text-4xl">💚</p>
            <p className="mt-3 font-display text-xl font-semibold text-forest-900">Your wishlist is empty</p>
            <p className="mt-2 text-sm text-forest-900/60">
              Tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-honey-400 px-6 py-3 text-sm font-bold text-forest-900 shadow-md hover:bg-honey-500"
            >
              Browse Products
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <AnimatedSection key={product.id} delay={(i % 6) * 0.06}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
