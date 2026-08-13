import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Category as CategoryType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import TrustTicker from "@/components/TrustTicker";
import HeroCarousel, { type HeroSlide } from "@/components/home/HeroCarousel";
import ScrollCarousel from "@/components/home/ScrollCarousel";
import CategoryShowcase, {
  type ShowcaseTab,
} from "@/components/home/CategoryShowcase";
import BestSellerCarousel from "@/components/home/BestSellerCarousel";
import JourneyScrollLine from "@/components/home/JourneyScrollLine";
import QuickAddButton from "@/components/QuickAddButton";
import {
  FlaskIcon,
  HandshakeIcon,
  LeafIcon,
  TruckIcon,
} from "@/components/icons";
import { STATS, FAQS_HOME } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A2 Ghee, Cold-Pressed Oil, Honey & Pickles from Our Own Jaipur Farm",
  description:
    "Organic Jaipur grows and makes A2 Bilona ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles on our own farm in Jaipur, Rajasthan — 100% organic, chemical-free and delivered fresh to your door.",
  alternates: { canonical: "/" },
  keywords: [
    "organic Jaipur",
    "organic Rajasthan",
    "A2 ghee Jaipur",
    "bilona ghee Jaipur",
    "cold-pressed mustard oil Jaipur",
    "kachi ghani mustard oil Rajasthan",
    "raw honey Jaipur",
    "Rajasthani pickles online",
    "organic farm Jaipur Rajasthan",
    "buy A2 ghee online Jaipur",
  ],
};

const SHOP_CATEGORIES: CategoryType[] = [
  "GHEE",
  "MUSTARD_OIL",
  "HONEY",
  "PICKLES",
];

const heroSlides: HeroSlide[] = [
  {
    image: "/images/generated/hero-farm-gir-cow.webp",
    alt: "Gir cow and Rajasthani farmer in an organic mustard field near Jaipur",
    focal: "object-center",
    eyebrow: "Shuddhata, rooted in Rajasthan",
    title: (
      <>
        Tradition you can <em className="font-normal text-honey-400">taste.</em>
      </>
    ),
    copy: "Pure ghee, traditionally pressed oils and wild honey — from trusted sources to your family's table.",
    primaryCta: { label: "Shop products", href: "/products" },
    secondaryCta: { label: "Our story", href: "/about" },
  },
  {
    image: "/images/generated/hero-bilona.webp",
    alt: "Rajasthani artisan hand-churning curd with a traditional wooden bilona",
    focal: "object-center",
    eyebrow: "Hand-churned, small batch",
    title: (
      <>
        Ye ghee nahi,{" "}
        <em className="font-normal text-honey-400">virasat hai.</em>
      </>
    ),
    copy: "Our A2 Gir Cow Ghee is made the bilona way — curd, churned by hand, then slow-cooked to gold.",
    primaryCta: { label: "Shop ghee", href: "/products?category=GHEE" },
    secondaryCta: { label: "See the process", href: "/farm-to-home" },
  },
  {
    image: "/images/generated/hero-kachi-ghani.webp",
    alt: "Traditional wooden ghani pressing mustard oil on a Rajasthan farm",
    focal: "object-center",
    eyebrow: "Nothing refined, nothing hidden",
    title: <>Stone-pressed oils. Wild-harvested honey.</>,
    copy: "Cold-pressed on traditional wooden ghanis and never over-processed — real pantry staples, made the way Rajasthan always has.",
    primaryCta: {
      label: "Shop oils & honey",
      href: "/products?category=MUSTARD_OIL",
    },
    secondaryCta: { label: "Our quality promise", href: "/quality-promise" },
  },
];

const journeySteps = [
  {
    title: "Raised on our own farm",
    copy: "Milk comes from our own indigenous Gir cows, cared for on the Organic Jaipur farm.",
    image: "/images/generated/founder-gir-cow-care.webp",
    alt: "Organic Jaipur founder caring for an indigenous Gir cow",
  },
  {
    title: "Set into curd, the slow way",
    copy: "Fresh A2 milk is heated and set into curd overnight in earthen pots, exactly as it always has been.",
    image: "/images/generated/journey-curd.webp",
    alt: "Fresh A2 milk set into curd overnight in earthen pots",
  },
  {
    title: "Hand-churned in wooden bilona",
    copy: "The curd is churned by hand in a wooden bilona to slowly draw out the butter — no shortcuts, no machines.",
    image: "/images/generated/founder-wife-bilona.webp",
    alt: "Organic Jaipur co-founder hand-churning curd in a wooden bilona",
  },
  {
    title: "Slow-cooked to golden ghee",
    copy: "That butter is simmered gently until it turns into rich, aromatic ghee, then cooled and jarred.",
    image: "/images/generated/journey-slow-ghee.webp",
    alt: "Butter slowly simmering into golden ghee in a brass kadai",
  },
  {
    title: "Farm-grown. Carefully handled.",
    copy: "Mustard from our fields is wooden-ghani pressed, while honey comes from beehives managed on our own farm.",
    image: "/images/generated/journey-mustard-apiary.webp",
    alt: "Rajasthan farmers harvesting mustard beside managed beehives",
  },
];

const experienceReasons = [
  {
    title: "Our Farm to Table",
    copy: "Our own cows, crops and managed beehives mean no anonymous ingredient supply chain in between.",
    icon: HandshakeIcon,
  },
  {
    title: "Time-Honoured Techniques",
    copy: "Bilona churning, wooden ghani pressing and raw honey harvesting — the same methods for generations.",
    icon: LeafIcon,
  },
  {
    title: "Unwavering Purity",
    copy: "No refined oils, no additives, no shortcuts — every batch is checked before it reaches you.",
    icon: FlaskIcon,
  },
  {
    title: "Doorstep Trust",
    copy: "Carefully packed and delivered straight to your family, with real support on WhatsApp.",
    icon: TruckIcon,
  },
];

const testimonials = [
  {
    quote:
      "It tastes like the ghee our family used to make at home — rich, aromatic and honest.",
    name: "Verified Organic Jaipur family",
    location: "Jaipur",
    product: "A2 Gir Cow Ghee",
    rating: 5,
    featured: true,
  },
  {
    quote: "The purity is visible in every spoon of this ghee.",
    name: "Priya S.",
    location: "Jaipur",
    product: "A2 Gir Cow Ghee",
    rating: 5,
  },
  {
    quote:
      "Finally an oil that smells and tastes the way kachi ghani mustard oil should.",
    name: "Rakesh M.",
    location: "Udaipur",
    product: "Black Mustard Oil",
    rating: 5,
  },
  {
    quote: "Raw, thick and clearly unheated — this is the real thing.",
    name: "Anjali T.",
    location: "Jodhpur",
    product: "Raw Farm Honey",
    rating: 4,
  },
  {
    quote:
      "Such a strong, authentic mustard punch — exactly like my grandmother's kitchen.",
    name: "Meena K.",
    location: "Kota",
    product: "Kachi Ghani Mustard Oil",
    rating: 5,
  },
];

const blogs = [
  {
    date: "August 5, 2026",
    title: "What makes Bilona ghee different?",
    copy: "A simple guide to curd churning, slow cooking and the flavour it creates.",
    image: "/images/generated/founder-wife-bilona.webp",
    href: "/farm-to-home",
  },
  {
    date: "August 2, 2026",
    title: "Why owning the source matters",
    copy: "How our own cows, crops and beehives create a more accountable pantry journey.",
    image: "/images/generated/journey-mustard-apiary.webp",
    href: "/about",
  },
  {
    date: "July 28, 2026",
    title: "A closer look at indigenous Gir cows",
    copy: "Care, nourishment and patience — the beginning of traditionally made ghee.",
    image: "/images/generated/hero-farm-gir-cow.webp",
    href: "/quality-promise",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="text-sm text-honey-500" aria-hidden>
      {"★".repeat(rating)}
      <span className="text-current opacity-25">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-800">
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default async function HomePage() {
  const bestSellers = await prisma.product.findMany({
    where: { featured: true, category: { in: SHOP_CATEGORIES } },
    orderBy: { createdAt: "asc" },
    take: 5,
  });
  const bestSellerIds = new Set(bestSellers.map((p) => p.id));

  const [
    gheeProducts,
    oilProducts,
    honeyProducts,
    pickleProducts,
    shelfExtras,
  ] = await Promise.all([
    prisma.product.findMany({
      where: { category: "GHEE" },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
      take: 4,
    }),
    prisma.product.findMany({
      where: { category: "MUSTARD_OIL" },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
      take: 4,
    }),
    prisma.product.findMany({ where: { category: "HONEY" }, take: 4 }),
    prisma.product.findMany({ where: { category: "PICKLES" }, take: 4 }),
    prisma.product.findMany({
      where: {
        category: { in: SHOP_CATEGORIES },
        id: { notIn: [...bestSellerIds] },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const categoryTabs: ShowcaseTab[] = [
    {
      key: "bestseller",
      label: "Bestseller",
      icon: "⭐",
      items: bestSellers.slice(0, 4),
    },
    { key: "ghee", label: "Ghee", icon: "🧈", items: gheeProducts },
    { key: "oils", label: "Cold-Pressed Oils", icon: "🫒", items: oilProducts },
    {
      key: "more",
      label: "Pickles & More",
      icon: "🌶️",
      items: [...pickleProducts, ...honeyProducts].slice(0, 4),
    },
  ];

  return (
    <main className="overflow-hidden">
      <HeroCarousel slides={heroSlides} />

      <TrustTicker />

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <AnimatedSection className="text-center">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
            Shop by category
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-forest-900 sm:text-5xl">
            The favourites families{" "}
            <em className="font-normal">come back for.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-forest-900/55">
            Pick a category and add it straight to your cart — no need to leave
            this page. Every jar is grown and made on our own farm in Jaipur,
            Rajasthan, so you always know exactly where it came from.
          </p>
          <Link
            href="/organic-products-jaipur"
            className="mt-3 inline-flex text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            See all Jaipur areas we deliver to →
          </Link>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="mt-12">
          <CategoryShowcase tabs={categoryTabs} />
        </AnimatedSection>
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex rounded-full border border-forest-900/15 px-7 py-3 text-sm font-bold text-forest-900 transition hover:border-forest-900 hover:bg-forest-900 hover:text-white"
          >
            Shop all products →
          </Link>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-[#173f30] px-5 py-10 text-cream sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-honey-400 uppercase">
                Most loved
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
                Our Best Sellers
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-white/60">
                Loved by thousands of families across Rajasthan and beyond.
              </p>
            </div>
            <Link
              href="/products"
              className="w-fit border-b border-honey-400 pb-1 text-sm font-bold text-honey-400"
            >
              View all →
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-12">
            <BestSellerCarousel items={bestSellers} />
          </AnimatedSection>
        </div>
      </section>

      {/* Farm to jar — zigzag journey */}
      <section className="bg-[#fbf7ea] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
              Farm to jar
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              The traditional journey of our ghee &amp; oils
            </h2>
          </AnimatedSection>

          <div className="relative mt-16">
            <JourneyScrollLine />
            <div className="space-y-14 md:space-y-20">
              {journeySteps.map((step, index) => {
                const reversed = index % 2 === 1;
                return (
                  <AnimatedSection
                    key={step.title}
                    delay={index * 0.06}
                    className={`relative flex flex-col items-center gap-6 md:flex-row md:gap-14 ${reversed ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="relative w-full md:w-1/2">
                      <div className="relative aspect-[5/3.4] w-full overflow-hidden rounded-[1.75rem] shadow-lg shadow-forest-900/10">
                        <Image
                          src={step.image}
                          alt={step.alt}
                          fill
                          sizes="(max-width: 767px) 92vw, 46vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-forest-900/35 via-transparent to-transparent" />
                      </div>
                    </div>

                    <span className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#fbf7ea] bg-forest-900 font-display text-lg text-honey-400 shadow-md md:flex">
                      {index + 1}
                    </span>

                    <div className="w-full text-center md:w-1/2 md:text-left">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 font-display text-sm text-honey-400 md:hidden">
                        {index + 1}
                      </span>
                      <h3 className="mt-3 font-display text-2xl text-forest-900 sm:text-3xl md:mt-0">
                        {step.title}
                      </h3>
                      <p className="mx-auto mt-3 max-w-sm leading-6 text-forest-900/60 md:mx-0">
                        {step.copy}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Shelf favourites */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:pb-16">
        <AnimatedSection className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
              Loved across generations
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              More from our shelf
            </h2>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.08} className="mt-10">
          <ScrollCarousel itemClassName="w-[68vw] sm:w-[280px]">
            {shelfExtras.map((item) => (
              <div key={item.id} className="group block">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative block aspect-square overflow-hidden rounded-[1.3rem] bg-[#f1ecdd]"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 639px) 68vw, 280px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="mt-4 font-display text-lg text-forest-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-forest-900/50">
                    {item.unit} · {formatPrice(item.price)}
                  </p>
                </Link>
                <div className="mt-3">
                  <QuickAddButton
                    fullWidth
                    product={{
                      id: item.id,
                      slug: item.slug,
                      name: item.name,
                      price: item.price,
                      unit: item.unit,
                      imageUrl: item.imageUrl,
                      inStock: item.inStock,
                    }}
                  />
                </div>
              </div>
            ))}
          </ScrollCarousel>
        </AnimatedSection>
      </section>

      {/* The Organic Jaipur Experience */}
      <section className="bg-[#0f281c] py-10 text-cream sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AnimatedSection className="relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="/images/generated/founders-farm-story.webp"
                alt="Organic Jaipur founders inspecting mustard crops with their farm team"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-forest-900/90 via-forest-900/25 to-forest-900/10" />
            </div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-4 px-6 pb-6 sm:px-10 sm:pb-8 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-2xl font-bold text-honey-400 sm:text-4xl">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/70 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.06}
            className="mx-auto mt-16 max-w-2xl text-center"
          >
            <p className="text-xs font-bold tracking-[.2em] text-honey-400 uppercase">
              Why Organic Jaipur?
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl">
              The Organic Jaipur Experience
            </h2>
            <p className="mt-2 font-display text-lg italic text-white/50">
              शुद्धता की एक सच्ची यात्रा
            </p>
            <p className="mt-5 leading-7 text-white/60">
              Because what goes in your kitchen should never be a compromise —
              every jar is a promise of purity, made the way it always has been.
            </p>
          </AnimatedSection>

          <AnimatedSection
            delay={0.1}
            className="mx-auto mt-10 max-w-7xl overflow-hidden rounded-[1.75rem] bg-black/20 shadow-2xl shadow-black/30"
          >
            <video
              className="aspect-video h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/images/generated/hero-bilona.webp"
            >
              <source src="/videos/organic-jaipur-story.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </AnimatedSection>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {experienceReasons.map(({ title, copy, icon: Icon }, index) => (
              <AnimatedSection
                key={title}
                delay={index * 0.06}
                className="flex h-full flex-col bg-[#1b4937] p-8"
              >
                <Icon className="h-10 w-10 shrink-0 text-honey-400" />
                <h3 className="mt-8 flex min-h-[3.75rem] items-start font-display text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.1} className="mt-12 text-center">
            <Link
              href="/farm-to-home"
              className="inline-flex rounded-full bg-honey-400 px-8 py-3.5 text-sm font-bold text-forest-900 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Explore our heritage →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#fbf7e9] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
                Trusted across Rajasthan
              </p>
              <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
                What our customers say
              </h2>
            </div>
            <div className="flex items-center gap-4 rounded-[1.4rem] border border-forest-900/8 bg-white px-6 py-4 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-honey-400 font-display text-lg font-bold text-forest-900">
                4.9
              </div>
              <div className="text-left">
                <StarRow rating={5} />
                <p className="mt-1 text-xs font-semibold text-forest-900/50">
                  1,000+ verified reviews
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            {testimonials
              .filter((t) => t.featured)
              .map((t) => (
                <AnimatedSection
                  key={t.name}
                  className="flex h-full flex-col justify-center rounded-[1.75rem] bg-forest-900 p-9 text-cream"
                >
                  <span className="font-display text-5xl leading-none text-honey-400">
                    &ldquo;
                  </span>
                  <StarRow rating={t.rating} />
                  <blockquote className="mt-4 font-display text-2xl leading-snug">
                    {t.quote}
                  </blockquote>
                  <p className="mt-6 text-xs font-bold tracking-[.15em] text-honey-400 uppercase">
                    {t.name} · {t.location}
                  </p>
                </AnimatedSection>
              ))}

            <div className="grid gap-6 sm:grid-cols-2">
              {testimonials
                .filter((t) => !t.featured)
                .map((t, index) => (
                  <AnimatedSection
                    key={t.name}
                    delay={index * 0.06}
                    className="flex h-full flex-col rounded-[1.5rem] border border-forest-900/8 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={t.name} />
                      <div>
                        <p className="text-sm font-bold text-forest-900">
                          {t.name}
                        </p>
                        <p className="text-xs text-forest-900/45">
                          {t.location} · Verified Buyer
                        </p>
                      </div>
                    </div>
                    <StarRow rating={t.rating} />
                    <blockquote className="mt-3 flex-1 text-sm leading-6 text-forest-900/75">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <span className="mt-4 w-fit rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold text-brand-700">
                      {t.product}
                    </span>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* From the journal */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-16">
        <AnimatedSection className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
              From the journal
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              Stories worth sharing
            </h2>
          </div>
          <Link
            href="/about"
            className="hidden border-b border-forest-900 pb-1 text-sm font-bold sm:block"
          >
            Read more →
          </Link>
        </AnimatedSection>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {blogs.map((blog, index) => (
            <AnimatedSection key={blog.title} delay={index * 0.06}>
              <article className="group">
                <Link
                  href={blog.href}
                  className="relative block aspect-[4/3] overflow-hidden rounded-[1.4rem]"
                >
                  <Image
                    src={blog.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 92vw, 32vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>
                <p className="mt-5 text-xs font-semibold text-forest-900/40">
                  {blog.date}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-forest-900">
                  <Link href={blog.href}>{blog.title}</Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-forest-900/55">
                  {blog.copy}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fbf7e9] px-5 py-8 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
              Everything you need to know
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#425c22] sm:text-6xl">
              FAQ&apos;s
            </h2>
            <div className="mt-9">
              <FaqAccordion />
            </div>
            <FaqJsonLd items={FAQS_HOME} />
          </AnimatedSection>
          <AnimatedSection
            delay={0.1}
            className="relative mx-auto min-h-[500px] w-full max-w-[560px]"
          >
            <Image
              src="/images/founder-with-a2-ghee-v1.png"
              alt="Organic Jaipur founder holding A2 Gir Cow Ghee"
              fill
              sizes="(max-width: 1023px) 90vw, 40vw"
              className="relative object-contain object-bottom"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Also available on */}
      <section className="bg-[#fffdf8] px-5 py-8 sm:px-8 sm:py-16">
        <AnimatedSection className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
            Shop wherever you prefer
          </p>
          <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">
            Also available on
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[#2874f0]/15 bg-white px-8 py-7 shadow-sm">
              <p className="text-3xl font-black tracking-tight text-[#2874f0]">
                Flipkart
              </p>
              <p className="mt-2 text-sm text-forest-900/50">
                Find selected Organic Jaipur products
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-[#f5cb18]/30 bg-[#fffce7] px-8 py-7 shadow-sm">
              <p className="text-3xl font-black tracking-tight text-[#1f4d2d]">
                blink<span className="text-[#f5b900]">it</span>
              </p>
              <p className="mt-2 text-sm text-forest-900/50">
                Quick delivery on selected essentials
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
