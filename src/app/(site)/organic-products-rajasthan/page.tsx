import Link from "next/link";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CATEGORIES, FAQS_PRODUCTS_ALL, SITE_URL } from "@/lib/constants";
import { RAJASTHAN_CITIES } from "@/lib/rajasthan-cities";

const TITLE = "Organic Products in Rajasthan | Ghee, Oil, Honey & Pickles";
const DESCRIPTION =
  "A2 ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles — grown and made on our own farm in Jaipur, shipped across Rajasthan including Jodhpur, Udaipur, Kota and Ajmer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/organic-products-rajasthan" },
  keywords: [
    "organic products Rajasthan",
    "A2 ghee Rajasthan",
    "cold-pressed mustard oil Rajasthan",
    "raw honey Rajasthan",
    "Rajasthani pickles online",
    "organic farm Jaipur Rajasthan delivery",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/organic-products-rajasthan`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/organic-jaipur-hero-v2.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function OrganicProductsRajasthanPage() {
  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Organic Products in Rajasthan", href: "/organic-products-rajasthan" },
        ]}
      />

      <section className="hero-grain relative isolate min-h-[380px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[440px]">
        <img
          src="/images/organic-jaipur-hero-v2.png"
          alt="Organic Jaipur products shipped across Rajasthan"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.94)_0%,rgba(8,29,20,.78)_42%,rgba(8,29,20,.18)_82%)]" />
        <AnimatedSection className="mx-auto flex min-h-[380px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[440px] sm:px-8">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.28em] text-honey-400 uppercase sm:text-xs">
            <span className="h-px w-8 bg-honey-400" /> Rajasthan-wide shipping
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl lg:text-7xl">
            Organic products <em className="font-normal text-honey-400">across Rajasthan.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
            A2 Bilona ghee, cold-pressed mustard oil, raw honey and traditional Rajasthani pickles —
            grown and made on our own farm in Jaipur, and shipped via courier to homes across
            Rajasthan.
          </p>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Shop by category
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Shipped fresh, anywhere in Rajasthan.
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
          Cities we ship to
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Rajasthan cities we serve.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-forest-900/60">
          Beyond free doorstep delivery in Jaipur, we ship across Rajasthan via courier, including
          these cities. Message us on WhatsApp with your address if you&apos;re not sure whether we
          cover your city.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {RAJASTHAN_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/organic-products-rajasthan/${city.slug}`}
              className="rounded-full border border-forest-900/10 bg-white px-5 py-3 text-center text-sm font-semibold text-forest-900 transition hover:border-brand-300 hover:bg-[#faf7ee]"
            >
              {city.name}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-forest-900/60">
          Live in Jaipur?{" "}
          <Link
            href="/organic-products-jaipur"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            See all Jaipur areas we deliver to →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-14">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Common questions
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Buying organic in Rajasthan, answered.
        </h2>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion items={FAQS_PRODUCTS_ALL} />
        </div>
      </section>

      <FaqJsonLd items={FAQS_PRODUCTS_ALL} />
    </main>
  );
}
