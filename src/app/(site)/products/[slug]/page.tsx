import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice, whatsappOrderLink } from "@/lib/utils";
import {
  categoryLabel,
  STOREFRONT_CATEGORY_VALUES,
  TRUST_BADGES,
  FAQS_BY_CATEGORY,
  SITE_URL,
} from "@/lib/constants";
import FaqAccordion from "@/components/FaqAccordion";
import { ICONS } from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import ProductReviews from "@/components/ProductReviews";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import WishlistButton from "@/components/WishlistButton";
import ProductQualityTabs from "@/components/ProductQualityTabs";
import ProductJsonLd from "@/components/ProductJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Product Not Found" };

  const category = categoryLabel(product.category);
  const title = `${product.name} | Buy Online in Jaipur`;
  const description = `${product.description} Grown and made on our own farm in Jaipur, Rajasthan — order ${product.name} online with doorstep delivery in Jaipur and courier shipping across Rajasthan.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    keywords: [
      product.name,
      `${product.name} Jaipur`,
      `${product.name} Rajasthan`,
      `buy ${category.toLowerCase()} online Jaipur`,
      `organic ${category.toLowerCase()} Rajasthan`,
    ],
    openGraph: {
      type: "website",
      url: `${SITE_URL}/products/${product.slug}`,
      title,
      description,
      images: [{ url: product.imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (
    !product ||
    !STOREFRONT_CATEGORY_VALUES.includes(
      product.category as (typeof STOREFRONT_CATEGORY_VALUES)[number],
    )
  ) {
    notFound();
  }

  const [relatedProducts, reviewStats] = await Promise.all([
    prisma.product.findMany({
      where: { category: product.category, NOT: { id: product.id } },
      take: 3,
    }),
    prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: true,
    }),
  ]);

  const averageRating = reviewStats._avg.rating ?? 0;
  const reviewCount = reviewStats._count;
  const hasDiscount = Boolean(
    product.originalPrice && product.originalPrice > product.price,
  );
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <main className="overflow-x-clip bg-[#fbf8ef] pb-28 sm:pb-0">
      <ProductJsonLd
        product={product}
        averageRating={averageRating}
        reviewCount={reviewCount}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/products" },
          { name: categoryLabel(product.category), href: `/products?category=${product.category}` },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />
      <div className="border-b border-forest-900/8 bg-white/60">
        <nav className="mx-auto max-w-7xl px-5 py-3 text-xs font-semibold text-forest-900/45 sm:px-8">
          <Link href="/products" className="hover:text-forest-900">
            Shop
          </Link>{" "}
          <span className="mx-2 text-forest-900/20">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-forest-900"
          >
            {categoryLabel(product.category)}
          </Link>
          <span className="mx-2 text-forest-900/20">/</span>
          <span className="text-forest-900/70">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch lg:gap-10">
          <AnimatedSection className="h-full">
            <div className="relative h-full min-h-[560px] overflow-hidden rounded-[2rem] border border-forest-900/8 bg-[#eee8d8] shadow-[0_18px_50px_rgba(15,40,28,.12)] lg:min-h-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 1023px) 92vw, 44vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-forest-900/45 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {product.featured && (
                  <span className="flex w-fit items-center gap-1 rounded-full bg-honey-400 px-3 py-1 text-xs font-bold text-forest-900 shadow-sm">
                    ★ Bestseller
                  </span>
                )}
                {hasDiscount && (
                  <span className="w-fit rounded-full bg-terracotta-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {discount}% off
                  </span>
                )}
              </div>
              <WishlistButton
                productId={product.id}
                className="absolute right-5 top-5"
              />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-honey-400">
                  Organic Jaipur promise
                </p>
                <p className="mt-1 font-display text-xl">
                  Traditionally made. Honestly sourced.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.1}
            className="flex h-full flex-col rounded-[2rem] border border-forest-900/8 bg-white p-6 shadow-[0_18px_50px_rgba(15,40,28,.08)] sm:p-8 lg:p-9"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-brand-800">
                {categoryLabel(product.category)}
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-brand-700">
                <i className="h-2 w-2 rounded-full bg-brand-500" />{" "}
                {product.inStock
                  ? "Fresh batch available"
                  : "Currently unavailable"}
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl leading-[.98] tracking-[-.035em] text-forest-900 sm:text-5xl lg:text-[2.5rem]">
              {product.name}
            </h1>
            <p className="mt-3 text-sm font-semibold text-forest-700">
              Net quantity · {product.unit}
            </p>

            {reviewCount > 0 && (
              <div className="mt-2 flex w-fit items-center gap-2 rounded-full bg-[#fff8e8] px-3 py-2 text-xs font-bold text-forest-900/60">
                <span className="tracking-wider text-honey-500">
                  {"★".repeat(Math.round(averageRating))}
                </span>
                <span>
                  {averageRating.toFixed(1)} ({reviewCount} review
                  {reviewCount === 1 ? "" : "s"})
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-forest-900/8 py-5">
              <span className="font-display text-4xl font-bold text-forest-900">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-forest-900/35 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
              {hasDiscount && (
                <span className="rounded-full bg-terracotta-500 px-3 py-1.5 text-xs font-bold text-white">
                  Save {discount}%
                </span>
              )}
              <p className="w-full text-[10px] font-semibold text-forest-900/40">
                Inclusive of all taxes
              </p>
            </div>

            <p className="mt-5 text-[15px] leading-7 text-forest-900/65">
              {product.description}
            </p>

            <ProductPurchasePanel
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

            <div className="my-3 grid grid-cols-2 gap-3">
              <WishlistButton
                showLabel
                productId={product.id}
                className="w-full"
              />
              <a
                href={whatsappOrderLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full border border-[#25d366]/30 bg-[#effcf3] px-4 py-3 text-xs font-bold text-[#157c3b] transition hover:bg-[#25d366] hover:text-white"
              >
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-forest-900/10 pt-5">
              {TRUST_BADGES.map((badge) => {
                const Icon = ICONS[badge.icon];
                return (
                  <span
                    key={badge.title}
                    className="flex flex-col items-center gap-1.5 rounded-xl bg-[#faf7ee] px-2 py-3 text-center text-[10px] font-bold text-forest-900/60"
                  >
                    <Icon className="h-5 w-5 text-honey-500" />
                    {badge.title}
                  </span>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {(product.ingredients || product.benefits || product.storageInfo) && (
          <section className="mt-8 grid overflow-hidden rounded-[1.75rem] border border-forest-900/8 bg-white shadow-sm md:grid-cols-3">
            {product.ingredients && (
              <div className="p-6 md:border-r md:border-forest-900/8">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500">
                  Ingredients
                </p>
                <p className="mt-3 text-sm leading-6 text-forest-900/60">
                  {product.ingredients}
                </p>
              </div>
            )}
            {product.benefits && (
              <div className="p-6 md:border-r md:border-forest-900/8">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500">
                  Benefits
                </p>
                <p className="mt-3 text-sm leading-6 text-forest-900/60">
                  {product.benefits}
                </p>
              </div>
            )}
            {product.storageInfo && (
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-terracotta-500">
                  Storage
                </p>
                <p className="mt-3 text-sm leading-6 text-forest-900/60">
                  {product.storageInfo}
                </p>
              </div>
            )}
          </section>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ProductQualityTabs
          productName={product.name}
          category={product.category}
          imageUrl={product.imageUrl}
        />
      </div>

      {FAQS_BY_CATEGORY[product.category] && (
        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
            Common questions
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
            {categoryLabel(product.category)} from Jaipur, answered.
          </h2>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={FAQS_BY_CATEGORY[product.category]} />
          </div>
          <FaqJsonLd items={FAQS_BY_CATEGORY[product.category]} />
        </section>
      )}

      <section className="bg-[#fbf7ea] px-5 py-6 sm:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
            Customer feedback
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
            Ratings &amp; Reviews
          </h2>
          <div className="mt-8">
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-14">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
            Explore more
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
            You might also like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
