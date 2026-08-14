import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { CATEGORIES, SITE_URL, faqsForRajasthanCity } from "@/lib/constants";
import { RAJASTHAN_CITIES } from "@/lib/rajasthan-cities";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return RAJASTHAN_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = RAJASTHAN_CITIES.find((item) => item.slug === slug);
  if (!city) return { title: "Organic Products in Rajasthan" };

  const title = `Organic Products in ${city.name}, Rajasthan`;
  const description = `A2 ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles shipped to ${city.name}, Rajasthan, grown and made on our own farm in Jaipur.`;

  return {
    title,
    description,
    alternates: { canonical: `/organic-products-rajasthan/${city.slug}` },
    keywords: [
      `organic products ${city.name}`,
      `A2 ghee ${city.name}`,
      `cold-pressed mustard oil ${city.name}`,
      `raw honey ${city.name}`,
      `Rajasthani pickles ${city.name}`,
      "organic Jaipur Rajasthan delivery",
    ],
    openGraph: {
      type: "website",
      url: `${SITE_URL}/organic-products-rajasthan/${city.slug}`,
      title,
      description,
      images: [{ url: "/images/generated/banner-shop-farm-v3.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RajasthanCityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = RAJASTHAN_CITIES.find((item) => item.slug === slug);
  if (!city) notFound();

  const otherCities = RAJASTHAN_CITIES.filter((item) => item.slug !== city.slug);
  const faqs = faqsForRajasthanCity(city.name);

  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Organic Products in Rajasthan", href: "/organic-products-rajasthan" },
          { name: city.name, href: `/organic-products-rajasthan/${city.slug}` },
        ]}
      />

      <section className="relative min-h-[380px] overflow-hidden bg-forest-900 text-white sm:min-h-[420px]">
        <img src="/images/generated/banner-shop-farm-v3.jpg" alt="Organic Jaipur products shipped across Rajasthan" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,29,20,.9)_0%,rgba(8,29,20,.58)_48%,rgba(8,29,20,.06)_82%)]" />
        <AnimatedSection className="relative mx-auto flex min-h-[380px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[420px] sm:px-8">
          <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400">
            <span className="h-px w-10 bg-honey-400" /> Rajasthan-wide shipping
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[.98] tracking-[-.03em] sm:text-6xl">
            Jaipur Ki Parampara,{" "}
            <em className="font-normal text-honey-400">Ab {city.name} Ke Naam.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-base">
            {city.name} is {city.blurb} We ship A2 Bilona ghee, cold-pressed mustard oil, raw honey
            and traditional Rajasthani pickles to {city.name} via courier, grown and made on our
            own farm in Jaipur, Rajasthan.
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
              Ask about shipping
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
          Shop by category
        </p>
        <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
          Farm Se Taiyaar, <em className="font-normal text-brand-700">{city.name} Tak Pyaar.</em>
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
          Also shipping to
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/organic-products-rajasthan"
            className="rounded-full bg-forest-900 px-5 py-2.5 text-xs font-bold text-white"
          >
            All Rajasthan cities
          </Link>
          {otherCities.map((item) => (
            <Link
              key={item.slug}
              href={`/organic-products-rajasthan/${item.slug}`}
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
          Sawaal {city.name} Ke, <em className="font-normal text-brand-700">Jawaab Hamare.</em>
        </h2>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <FaqJsonLd items={faqs} />
    </main>
  );
}
