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
import { formatPrice, safeImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "A2 Ghee, Cold-Pressed Oil, Honey & Pickles | Organic Jaipur",
  },
  description:
    "Own-farm A2 ghee, cold-pressed oils, raw honey and Rajasthani pickles. Free delivery in Jaipur, Cash on Delivery, shipped across Rajasthan.",
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

export const revalidate = 300;

const SHOP_CATEGORIES: CategoryType[] = [
  "GHEE",
  "MUSTARD_OIL",
  "HONEY",
  "PICKLES",
];

const heroSlides: HeroSlide[] = [
  {
    image: "/images/generated/banner-ghee-farm-v3.jpg",
    alt: "Traditional wooden bilona used to make A2 Gir Cow Ghee in Jaipur",
    focal: "object-right sm:object-center",
    eyebrow: "A2 Gir Cow Bilona Ghee",
    title: (
      <>
        Ye Ghee Nahi,{" "}
        <em className="font-normal text-honey-400">Bharosa Hai.</em>
      </>
    ),
    copy: "Curd-churned in a wooden bilona and slow-cooked for a grainy texture and deep aroma. Choose 500 g, 1 kg or 2 kg.",
    primaryCta: { label: "Shop A2 Ghee", href: "/products?category=GHEE" },
    secondaryCta: { label: "See How It’s Made", href: "/farm-to-home" },
  },
  {
    image: "/images/generated/banner-mustard-ghani-v3.jpg",
    alt: "Traditional wooden ghani pressing mustard oil in Rajasthan",
    focal: "object-right sm:object-center",
    eyebrow: "Kachi Ghani Mustard Oil",
    title: (
      <>
        Rajasthan Ka Swaad,{" "}
        <em className="font-normal text-honey-400">Har Boond Mein.</em>
      </>
    ),
    copy: "Wood-pressed and unrefined. Choose sharp black mustard oil for bold cooking or milder yellow mustard oil for daily use.",
    primaryCta: {
      label: "Shop Cold-Pressed Oils",
      href: "/products?category=MUSTARD_OIL",
    },
    secondaryCta: {
      label: "See the Pressing Process",
      href: "/making-process/cold-pressed-oil",
    },
  },
  {
    image: "/images/generated/banner-honey-apiary-v3.jpg",
    alt: "Raw wild forest honey available for delivery in Jaipur",
    focal: "object-right sm:object-center",
    eyebrow: "Raw Wild Forest Honey",
    title: (
      <>
        Mithaas Wahi,{" "}
        <em className="font-normal text-honey-400">Jo Kudrat Ne Banayi.</em>
      </>
    ),
    copy: "Raw, unheated and lightly filtered, with no added sugar or syrup. Order a 500 g jar for breakfast, tea and everyday use.",
    primaryCta: { label: "Shop Raw Honey", href: "/products?category=HONEY" },
    secondaryCta: {
      label: "See the Honey Process",
      href: "/making-process/raw-honey",
    },
  },
  {
    image: "/images/generated/banner-pickle-courtyard-v3.jpg",
    alt: "Traditional Rajasthani green chilli pickle made in small batches",
    focal: "object-right sm:object-center",
    eyebrow: "Rajasthani Pickles and Chutneys",
    title: (
      <>
        Har Niwale Mein,{" "}
        <em className="font-normal text-honey-400">Ghar Ka Swaad.</em>
      </>
    ),
    copy: "Choose green chilli pickle or bold laal mirch-garlic chutney. Small-batch flavour that completes dal, paratha and everyday meals.",
    primaryCta: { label: "Shop Pickles", href: "/products?category=PICKLES" },
    secondaryCta: {
      label: "See How It’s Made",
      href: "/making-process/traditional-pickles",
    },
  },
];

const journeySteps = [
  {
    title: "Apni Gaushala Se Shuruaat",
    copy: "A2 milk hamari apni Gir cows se aata hai, jinhe Organic Jaipur farm par dekhbhaal ke saath paala jaata hai.",
    image: "/images/generated/founder-gir-cow-care.webp",
    alt: "Organic Jaipur founder caring for an indigenous Gir cow",
  },
  {
    title: "Mitti Ke Bartan Mein Jama Dahi",
    copy: "Taaza A2 milk ko raat bhar mitti ke bartanon mein dahi banne diya jaata hai—bilkul purane gharon ki tarah.",
    image: "/images/generated/journey-curd.webp",
    alt: "Fresh A2 milk set into curd overnight in earthen pots",
  },
  {
    title: "Lakdi Ke Bilona Se Manthan",
    copy: "Dahi ko lakdi ke bilona se mathkar makkhan nikala jaata hai. Na machine ki jaldi, na process mein shortcut.",
    image: "/images/bilona-story-v2.png",
    alt: "Traditional wooden bilona hand-churning curd in an earthen pot",
  },
  {
    title: "Dheemi Aanch Par Sunehra Ghee",
    copy: "Makkhan ko dheemi aanch par pakaya jaata hai, jab tak woh daanedaar, khushbudaar ghee na ban jaaye.",
    image: "/images/generated/journey-slow-ghee.webp",
    alt: "Butter slowly simmering into golden ghee in a brass kadai",
  },
  {
    title: "Khet Se, Sambhaal Ke",
    copy: "Sarson hamare kheton se lakdi ki ghani tak jaati hai, aur raw honey apne farm par sambhale gaye beehives se aata hai.",
    image: "/images/generated/journey-mustard-apiary.webp",
    alt: "Rajasthan farmers harvesting mustard beside managed beehives",
  },
];

const experienceReasons = [
  {
    title: "Jiska Source Aap Pooch Sakein",
    copy: "Gir cows, sarson ke khet aur managed beehives—sab hamari Jaipur farm team sambhalti hai.",
    icon: HandshakeIcon,
  },
  {
    title: "Har Cheez Ka Sahi Tareeka",
    copy: "Bilona-churned ghee, wooden-ghani oils aur sirf lightly filtered raw honey.",
    icon: LeafIcon,
  },
  {
    title: "Har Batch Ka Seedha Jawaab",
    copy: "Order se pehle latest available batch details ya report ke baare mein WhatsApp par pooch sakte hain.",
    icon: FlaskIcon,
  },
  {
    title: "Jaipur Mein Aasaan Delivery",
    copy: "Free local delivery, Cash on Delivery aur order ke liye seedha WhatsApp support.",
    icon: TruckIcon,
  },
];

const testimonials = [
  {
    quote:
      "It tastes like the ghee our family used to make at home, rich, aromatic and honest.",
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
    quote: "Raw, thick and clearly unheated. This is the real thing.",
    name: "Anjali T.",
    location: "Jodhpur",
    product: "Raw Farm Honey",
    rating: 4,
  },
  {
    quote:
      "Such a strong, authentic mustard punch, exactly like my grandmother's kitchen.",
    name: "Meena K.",
    location: "Kota",
    product: "Kachi Ghani Mustard Oil",
    rating: 5,
  },
];

const blogs = [
  {
    date: "August 5, 2026",
    title: "What Makes Bilona Ghee Different?",
    copy: "A simple guide to curd churning, slow cooking and the flavour it creates.",
    image: "/images/bilona-story-v2.png",
    href: "/farm-to-home",
  },
  {
    date: "August 2, 2026",
    title: "Why Owning the Source Matters",
    copy: "How our own cows, crops and beehives create a more accountable pantry journey.",
    image: "/images/generated/journey-mustard-apiary.webp",
    href: "/about",
  },
  {
    date: "July 28, 2026",
    title: "A Closer Look at Indigenous Gir Cows",
    copy: "Care, nourishment and patience: the beginning of traditionally made ghee.",
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

function pickByVariety<T extends { name: string }>(
  items: T[],
  take: number,
): T[] {
  const seenBaseNames = new Set<string>();
  const picked: T[] = [];
  const leftovers: T[] = [];
  for (const item of items) {
    const baseName = item.name.split(",")[0].trim();
    if (seenBaseNames.has(baseName)) {
      leftovers.push(item);
    } else {
      seenBaseNames.add(baseName);
      picked.push(item);
    }
  }
  return [...picked, ...leftovers].slice(0, take);
}

function pickDiverseByCategory<T extends { category: string }>(
  items: T[],
  take: number,
): T[] {
  const seenCategories = new Set<string>();
  const picked: T[] = [];
  const leftovers: T[] = [];
  for (const item of items) {
    if (seenCategories.has(item.category)) {
      leftovers.push(item);
    } else {
      seenCategories.add(item.category);
      picked.push(item);
    }
  }
  return [...picked, ...leftovers].slice(0, take);
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-800">
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default async function HomePage() {
  const allProducts = await prisma.product.findMany({
    where: { category: { in: SHOP_CATEGORIES } },
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
  });
  const bestSellerCandidates = allProducts;
  const bestSellers = pickDiverseByCategory(bestSellerCandidates, 5);
  const bestSellerIds = new Set(bestSellers.map((p) => p.id));
  const gheeCandidates = allProducts.filter((p) => p.category === "GHEE");
  const oilCandidates = allProducts.filter((p) => p.category === "MUSTARD_OIL");
  const honeyCandidates = allProducts.filter((p) => p.category === "HONEY");
  const pickleCandidates = allProducts.filter((p) => p.category === "PICKLES");
  const shelfExtras = allProducts
    .filter((p) => !bestSellerIds.has(p.id))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  const gheeProducts = pickByVariety(gheeCandidates, 4);
  const oilProducts = pickByVariety(oilCandidates, 4);
  const moreProducts = pickByVariety(
    [...pickleCandidates, ...honeyCandidates],
    4,
  );

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
      items: moreProducts,
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
            Apni Rasoi Ke Liye
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-forest-900 sm:text-5xl">
            Sirf Samaan Nahi,{" "}
            <em className="font-normal text-brand-700">
              Rasoi Ki Parampara Hai.
            </em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-forest-900/55">
            Ghee, kachi ghani oil, raw honey aur ghar-jaisa Rajasthani achar—
            swaad, pack size aur istemaal ke hisaab se apna product chuniye.
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
            Shop All Products →
          </Link>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-[#173f30] px-5 py-10 text-cream sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-honey-400 uppercase">
                Sabse Zyada Pasand
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
                Sabki Pasand,{" "}
                <em className="font-normal text-honey-400">Ghar Ka Swaad.</em>
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-white/60">
                Roz ke tadke, garam parathe, subah ki mithaas aur ghar ke khaane
                ke liye customers ke sabse zyada chune gaye products.
              </p>
            </div>
            <Link
              href="/products"
              className="w-fit border-b border-honey-400 pb-1 text-sm font-bold text-honey-400"
            >
              View All →
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-12">
            <BestSellerCarousel items={bestSellers} />
          </AnimatedSection>
        </div>
      </section>

      {/* Farm to jar: zigzag journey */}
      <section className="bg-[#fbf7ea] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
              Khet Se Rasoi Tak
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              Khet Se Shuruaat,{" "}
              <em className="font-normal text-brand-700">Rasoi Tak Bharosa.</em>
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
              Rasoi Ka Bhandaar
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              Har Jar Mein,{" "}
              <em className="font-normal text-brand-700">Ghar Ka Swaad.</em>
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
                    src={safeImageUrl(item.imageUrl)}
                    alt={item.name}
                    unoptimized
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
            <div className="relative aspect-[16/5] w-full">
              <Image
                src="/images/gir-cow-story-v2.png"
                alt="Gir cows at the Organic Jaipur farm in Rajasthan"
                fill
                sizes="100vw"
                className="object-cover object-bottom"
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
              Kyun Organic Jaipur?
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl">
              Apni Mitti,{" "}
              <em className="font-normal text-honey-400">Apni Zimmedari.</em>
            </h2>
            <p className="mt-2 font-display text-lg italic text-white/50">
              शुद्धता की एक सच्ची यात्रा
            </p>
            <p className="mt-5 leading-7 text-white/60">
              Product, batch ya delivery time jaan-na ho? Order se pehle hamari
              Jaipur team se WhatsApp par seedhi baat kijiye.
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
              See Our Farm →
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
                Rajasthan Bhar Ka Bharosa
              </p>
              <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
                Unke Shabd,{" "}
                <em className="font-normal text-brand-700">Hamara Bharosa.</em>
              </h2>
            </div>
            <div className="flex items-center gap-4 rounded-[1.4rem] border border-forest-900/8 bg-white px-6 py-4 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-honey-400 font-display text-lg font-bold text-forest-900">
                4.9
              </div>
              <div className="text-left">
                <StarRow rating={5} />
                <p className="mt-1 text-xs font-semibold text-forest-900/50">
                  Customer Feedback
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
                          {t.location} · {t.product}
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

      {/* Product guides */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-16">
        <AnimatedSection className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">
              Samajhkar Chuniye
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              Sahi Jaankari,{" "}
              <em className="font-normal text-brand-700">Sahi Chunav.</em>
            </h2>
          </div>
          <Link
            href="/about"
            className="hidden border-b border-forest-900 pb-1 text-sm font-bold sm:block"
          >
            View Our Farm →
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
              Aapke Sawaal
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#425c22] sm:text-6xl">
              Sawaal Aapke,{" "}
              <em className="font-normal text-brand-700">Jawaab Hamare.</em>
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
            Jahan Se Chahein, Wahan Se Kharidein
          </p>
          <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">
            Jahan Se Kharidein,{" "}
            <em className="font-normal text-brand-700">Shuddhta Wahi.</em>
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
