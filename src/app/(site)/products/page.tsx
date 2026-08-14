import { Suspense } from "react";
import Link from "next/link";
import type { Category, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import ProductFilters from "@/components/ProductFilters";
import {
  CATEGORIES,
  STOREFRONT_CATEGORY_VALUES,
  FAQS_BY_CATEGORY,
  FAQS_PRODUCTS_ALL,
} from "@/lib/constants";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

type Props = {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    inStock?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export const metadata = {
  title: "Shop A2 Ghee, Oils, Honey & Pickles Online",
  description:
    "Order A2 Gir cow ghee, kachi ghani mustard oil, raw honey and Rajasthani pickles online. Own farm, lab-tested, free Jaipur delivery.",
};

const CATEGORY_INTROS: Record<string, { title: string; copy: string }> = {
  GHEE: {
    title: "Choose Bilona Ghee by Milk Type and Pack Size",
    copy: "Pick Gir cow ghee for a distinctive aroma, desi cow ghee for daily use or richer buffalo ghee for frying and sweets. Available from 500 g to 2 kg.",
  },
  MUSTARD_OIL: {
    title: "Choose Cold-Pressed Oil by Flavour and Use",
    copy: "Black mustard oil is sharp and pungent; yellow mustard oil is milder. Groundnut, sunflower and coconut oils suit different everyday cooking needs.",
  },
  HONEY: {
    title: "Raw Wild Forest Honey, 500 g",
    copy: "Lightly filtered and unheated, with no added sugar or syrup. Natural crystallisation can occur and does not affect quality.",
  },
  PICKLES: {
    title: "Rajasthani Pickles and Chutneys, 500 g",
    copy: "Choose green chilli pickle or bold laal mirch-garlic chutney. Refrigerate after opening and always use a dry spoon.",
  },
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category, sort, inStock, minPrice, maxPrice } = await searchParams;
  const activeCategory = CATEGORIES.some((c) => c.value === category)
    ? (category as Category)
    : undefined;

  const where: Prisma.ProductWhereInput = {
    category: { in: STOREFRONT_CATEGORY_VALUES },
  };
  if (activeCategory) where.category = activeCategory;
  if (inStock === "true") where.inStock = true;
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {}),
    };
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
        ? { price: "desc" }
        : sort === "name_asc"
          ? { name: "asc" }
          : { createdAt: "desc" };

  const products = await prisma.product.findMany({ where, orderBy });
  const activeLabel = CATEGORIES.find((c) => c.value === activeCategory)?.label;
  const faqItems = activeCategory
    ? (FAQS_BY_CATEGORY[activeCategory] ?? FAQS_PRODUCTS_ALL)
    : FAQS_PRODUCTS_ALL;

  return (
    <main className="overflow-x-clip">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/products" },
          ...(activeCategory
            ? [
                {
                  name: activeLabel!,
                  href: `/products?category=${activeCategory}`,
                },
              ]
            : []),
        ]}
      />
      <section className="hero-grain relative isolate min-h-[420px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[480px]">
        <img
          src="/images/generated/banner-shop-farm-v3.jpg"
          alt="Organic Jaipur ghee, oil, honey and pickle at a Rajasthan farm"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.72)_0%,rgba(8,29,20,.3)_48%,rgba(8,29,20,.04)_82%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,29,20,.72)_0%,transparent_55%)]" />
        <AnimatedSection className="mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[480px] sm:px-8">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.28em] text-honey-400 uppercase sm:text-xs">
            <span className="h-px w-8 bg-honey-400" /> Shop
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl lg:text-7xl">
            {activeLabel ? (
              <>
                {activeLabel} Sirf Product Nahi,{" "}
                <em className="font-normal text-honey-400">
                  Parampara Ka Swaad Hai.
                </em>
              </>
            ) : (
              <>
                Har Jar Mein Shuddhta,{" "}
                <em className="font-normal text-honey-400">
                  Har Niwale Mein Bharosa.
                </em>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
            Compare pack size, flavour, ingredients and use. Prices include all
            taxes. Get free delivery in Jaipur, Cash on Delivery and courier
            shipping across Rajasthan.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-[.12em] text-white/70 sm:text-xs">
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-honey-400" /> Prices
              Include Tax
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-honey-400" /> Cash on
              Delivery
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-honey-400" /> Free
              Jaipur Delivery
            </span>
          </div>
          <Link
            href="/organic-products-jaipur"
            className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-bold text-honey-400 underline underline-offset-4 hover:text-honey-300"
          >
            Delivering across Jaipur: see all areas we cover →
          </Link>
        </AnimatedSection>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <Suspense fallback={null}>
            <ProductFilters />
          </Suspense>

          <div className="min-w-0 flex-1">
            {activeCategory && CATEGORY_INTROS[activeCategory] && (
              <div className="mb-6 rounded-2xl border border-forest-900/8 bg-[#faf7ee] p-5 sm:p-6">
                <h2 className="font-display text-xl text-forest-900 sm:text-2xl">
                  {CATEGORY_INTROS[activeCategory].title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-forest-900/60">
                  {CATEGORY_INTROS[activeCategory].copy}
                </p>
              </div>
            )}
            <div className="flex items-end justify-between border-b border-forest-900/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-terracotta-500">
                  Available to Order
                </p>
                <h2 className="mt-1 font-display text-2xl text-forest-900">
                  {activeLabel ?? "All Products"}
                </h2>
              </div>
              <p className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800">
                {products.length} item{products.length === 1 ? "" : "s"}
              </p>
            </div>

            {products.length === 0 ? (
              <p className="mt-16 text-center text-forest-900/60">
                No products match these filters. Try adjusting your search.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 2xl:grid-cols-3">
                {products.map((product, i) => (
                  <AnimatedSection key={product.id} delay={(i % 6) * 0.06}>
                    <ProductCard product={product} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Common Questions
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          {activeLabel
            ? `${activeLabel} Ke Sawaal, Hamare Jawaab`
            : "Sawaal Aapke, Jawaab Hamare"}
        </h2>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <FaqJsonLd items={faqItems} />
    </main>
  );
}
