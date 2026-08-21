import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CATEGORIES, FAQS_JAIPUR, SITE_URL } from "@/lib/constants";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-localities";

const TITLE = "Organic Products in Jaipur | A2 Ghee, Oil, Honey & Pickles";
const DESCRIPTION =
  "A2 ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles, grown and made on our own farm, delivered fresh across Jaipur.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/organic-products-jaipur" },
  keywords: [
    "organic products Jaipur",
    "A2 ghee Jaipur",
    "bilona ghee Jaipur",
    "cold-pressed mustard oil Jaipur",
    "raw honey Jaipur",
    "Rajasthani pickles Jaipur",
    "organic farm Jaipur delivery",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/organic-products-jaipur`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/generated/banner-shop-farm-v3.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function OrganicProductsJaipurPage() {
  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Organic Products in Jaipur", href: "/organic-products-jaipur" },
        ]}
      />

      <section className="hero-grain relative isolate min-h-[380px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[440px]">
        <Image
          src="/images/generated/banner-shop-farm-v3.jpg"
          alt="Organic Jaipur traditional pantry products"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.94)_0%,rgba(8,29,20,.78)_42%,rgba(8,29,20,.18)_82%)]" />
        <AnimatedSection className="mx-auto flex min-h-[380px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[440px] sm:px-8">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.28em] text-honey-400 uppercase sm:text-xs">
            <span className="h-px w-8 bg-honey-400" /> Jaipur delivery
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl lg:text-7xl">
            Jaipur Ki Mitti, <em className="font-normal text-honey-400">Aapki Rasoi Ka Bharosa.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
            A2 Bilona ghee, cold-pressed mustard oil, raw honey and traditional Rajasthani pickles,
            grown and made on our own farm, delivered fresh to homes across Jaipur.
          </p>
        </AnimatedSection>
      </section>

      <section className="border-b border-forest-900/10 bg-white px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
            Quick answer
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl leading-tight text-forest-900 sm:text-4xl">
                Where can you order farm-made organic food products in Jaipur?
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-forest-900/75">
                <strong className="text-forest-900">Organic Jaipur</strong> delivers A2 Bilona
                ghee, wooden-ghani cold-pressed oils, raw honey and Rajasthani lal mirch chutney
                across Jaipur. The core range is sourced or prepared through our Jaipur farm team,
                with ingredients, pack sizes, prices and preparation details available before you
                order. Jaipur delivery is free and payment is Cash on Delivery.
              </p>
              <p className="mt-4 text-sm leading-6 text-forest-900/60">
                Answer reviewed by the Organic Jaipur farm and fulfilment team. Last reviewed:{" "}
                <time dateTime="2026-08-21">21 August 2026</time>.
              </p>
            </div>
            <aside className="rounded-[1.5rem] bg-[#eef2e6] p-6" aria-label="Organic Jaipur at a glance">
              <h3 className="font-display text-xl text-forest-900">At a glance</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div><dt className="font-bold text-forest-900">Based in</dt><dd className="mt-1 text-forest-900/65">Mahapura Road, Jaipur, Rajasthan</dd></div>
                <div><dt className="font-bold text-forest-900">Jaipur delivery</dt><dd className="mt-1 text-forest-900/65">Free within the current service area</dd></div>
                <div><dt className="font-bold text-forest-900">Payment</dt><dd className="mt-1 text-forest-900/65">Cash on Delivery</dd></div>
                <div><dt className="font-bold text-forest-900">Ordering</dt><dd className="mt-1 text-forest-900/65">Website checkout or direct WhatsApp confirmation</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Compare before ordering
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Which Organic Jaipur product fits your kitchen?
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-forest-900/10 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-forest-900 text-white">
              <tr><th className="p-4">Product</th><th className="p-4">How it is prepared</th><th className="p-4">Useful for</th><th className="p-4">Check before buying</th></tr>
            </thead>
            <tbody className="divide-y divide-forest-900/10 text-forest-900/70">
              <tr><th className="p-4 font-bold text-forest-900">Bilona ghee</th><td className="p-4">Curd churned to butter, then slow-cooked</td><td className="p-4">Daily meals, tadka and sweets</td><td className="p-4">Cow type, pack size and aroma preference</td></tr>
              <tr><th className="p-4 font-bold text-forest-900">Cold-pressed oil</th><td className="p-4">Pressed at low temperature without refining</td><td className="p-4">Everyday cooking and tadka</td><td className="p-4">Seed type and preferred pungency</td></tr>
              <tr><th className="p-4 font-bold text-forest-900">Raw honey</th><td className="p-4">Lightly filtered without heating</td><td className="p-4">Direct use, drinks and breakfast</td><td className="p-4">Natural crystallisation and storage</td></tr>
              <tr><th className="p-4 font-bold text-forest-900">Lal mirch chutney</th><td className="p-4">Prepared in small batches with spices</td><td className="p-4">Rajasthani meals and snacks</td><td className="p-4">Heat level, ingredients and storage</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Shop by category
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Har Zaroorat Ka Swaad, <em className="font-normal text-brand-700">Seedha Aapke Ghar.</em>
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
          Areas we deliver to
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Jaipur Ke Har Kone Mein, <em className="font-normal text-brand-700">Wahi Shuddhta.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-forest-900/60">
          We deliver across Jaipur, including these localities. Message us on WhatsApp with your
          address if you&apos;re not sure whether we cover your area.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {JAIPUR_LOCALITIES.map((locality) => (
            <Link
              key={locality.slug}
              href={`/organic-products-jaipur/${locality.slug}`}
              className="rounded-full border border-forest-900/10 bg-white px-5 py-3 text-center text-sm font-semibold text-forest-900 transition hover:border-brand-300 hover:bg-[#faf7ee]"
            >
              {locality.name}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-forest-900/60">
          Live elsewhere in Rajasthan?{" "}
          <Link
            href="/organic-products-rajasthan"
            className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            See cities we ship to across Rajasthan →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-14">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Common questions
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Sawaal Jaipur Ke, <em className="font-normal text-brand-700">Jawaab Hamare.</em>
        </h2>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion items={FAQS_JAIPUR} />
        </div>
      </section>

      <FaqJsonLd items={FAQS_JAIPUR} />
    </main>
  );
}
