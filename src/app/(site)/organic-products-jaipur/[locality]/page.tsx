import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CATEGORIES, FAQS_PRODUCTS_ALL, SITE_URL } from "@/lib/constants";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-localities";

type Props = { params: Promise<{ locality: string }> };

export function generateStaticParams() {
  return JAIPUR_LOCALITIES.map((locality) => ({ locality: locality.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locality: slug } = await params;
  const locality = JAIPUR_LOCALITIES.find((item) => item.slug === slug);
  if (!locality) return { title: "Organic Products in Jaipur" };

  const title = `Organic Products in ${locality.name}, Jaipur`;
  const description = `A2 ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles delivered to ${locality.name}, Jaipur — grown and made on our own farm.`;

  return {
    title,
    description,
    alternates: { canonical: `/organic-products-jaipur/${locality.slug}` },
    keywords: [
      `organic products ${locality.name}`,
      `A2 ghee ${locality.name} Jaipur`,
      `cold-pressed mustard oil ${locality.name}`,
      `raw honey ${locality.name} Jaipur`,
      `Rajasthani pickles ${locality.name}`,
    ],
    openGraph: {
      type: "website",
      url: `${SITE_URL}/organic-products-jaipur/${locality.slug}`,
      title,
      description,
      images: [{ url: "/images/organic-jaipur-hero-v2.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function JaipurLocalityPage({ params }: Props) {
  const { locality: slug } = await params;
  const locality = JAIPUR_LOCALITIES.find((item) => item.slug === slug);
  if (!locality) notFound();

  const otherLocalities = JAIPUR_LOCALITIES.filter((item) => item.slug !== locality.slug);

  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Organic Products in Jaipur", href: "/organic-products-jaipur" },
          { name: locality.name, href: `/organic-products-jaipur/${locality.slug}` },
        ]}
      />

      <section className="relative min-h-[380px] overflow-hidden bg-forest-900 text-white sm:min-h-[420px]">
        <div className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full border border-white/5" />
        <AnimatedSection className="relative mx-auto flex min-h-[380px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[420px] sm:px-8">
          <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400">
            <span className="h-px w-10 bg-honey-400" /> Jaipur delivery
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[.98] tracking-[-.03em] sm:text-6xl">
            Organic products in{" "}
            <em className="font-normal text-honey-400">{locality.name}.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
            {locality.name} is {locality.blurb} We deliver A2 Bilona ghee, cold-pressed mustard
            oil, raw honey and traditional Rajasthani pickles to homes in {locality.name} — grown
            and made on our own farm in Jaipur, Rajasthan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-honey-400 px-7 py-3.5 text-sm font-bold text-forest-900"
            >
              Shop all products →
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white"
            >
              Ask about delivery
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Shop by category
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Delivered fresh to {locality.name}.
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/products?category=${category.value}`}
              className="rounded-2xl border border-forest-900/10 bg-white px-5 py-6 text-center font-display text-lg text-forest-900 transition hover:border-brand-300 hover:shadow-md"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Also serving nearby
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/organic-products-jaipur"
            className="rounded-full bg-forest-900 px-5 py-2.5 text-xs font-bold text-white"
          >
            All Jaipur areas
          </Link>
          {otherLocalities.map((item) => (
            <Link
              key={item.slug}
              href={`/organic-products-jaipur/${item.slug}`}
              className="rounded-full border border-forest-900/12 px-5 py-2.5 text-xs font-bold text-forest-900 transition hover:bg-[#faf7ee]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-14">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Common questions
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Ordering in {locality.name}, answered.
        </h2>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion items={FAQS_PRODUCTS_ALL} />
        </div>
      </section>

      <FaqJsonLd items={FAQS_PRODUCTS_ALL} />
    </main>
  );
}
