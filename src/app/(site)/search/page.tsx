import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import { CATEGORIES, STOREFRONT_CATEGORY_VALUES } from "@/lib/constants";

export const metadata = {
  title: "Search",
  description: "Search Organic Jaipur's A2 ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles — all grown and made on our own farm in Jaipur.",
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const products = query
    ? await prisma.product.findMany({
        where: {
          category: { in: STOREFRONT_CATEGORY_VALUES },
          OR: [{ name: { contains: query } }, { description: { contains: query } }],
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <main className="overflow-hidden">
      <section className="bg-[#0f281c] px-5 py-14 text-cream sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] uppercase">
            <span className="h-px w-8 bg-honey-400" /> Search
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            {query ? (
              <>
                Results for <em className="font-normal text-honey-400">&quot;{query}&quot;</em>
              </>
            ) : (
              <>
                Search <em className="font-normal text-honey-400">our products.</em>
              </>
            )}
          </h1>
          {query && (
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
              {products.length} product{products.length === 1 ? "" : "s"} found
            </p>
          )}
        </AnimatedSection>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        {!query && (
          <div>
            <p className="text-sm font-semibold text-forest-900/50">Popular categories</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.value}
                  href={`/products?category=${c.value}`}
                  className="rounded-full border border-forest-900/15 px-5 py-2 text-sm font-semibold text-forest-900/70 hover:border-forest-900/30"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && products.length === 0 && (
          <div className="rounded-[1.4rem] border border-forest-900/10 bg-white p-10 text-center shadow-sm">
            <p className="font-display text-xl font-semibold text-forest-900">
              No products found for &quot;{query}&quot;
            </p>
            <p className="mt-2 text-sm text-forest-900/60">
              Try a different keyword, or browse our full range below.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-honey-400 px-6 py-3 text-sm font-bold text-forest-900 shadow-md hover:bg-honey-500"
            >
              View All Products
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
