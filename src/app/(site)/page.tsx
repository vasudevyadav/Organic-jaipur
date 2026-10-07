import { pageMetadata } from "@/lib/metadata";
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
import { BUSINESS, STATS, FAQS_HOME, SOCIAL_LINKS, categoryLabel } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { formatPrice, safeImageUrl, productDisplayName } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: {
    absolute: "Organic Jaipur Store: Best A2 Ghee & Cold-Pressed Oil",
  },
  description:
    "Organic Jaipur Store — own-farm A2 ghee, cold-pressed oils, raw honey & Rajasthani pickles. Free Jaipur delivery, Cash on Delivery.",
  alternates: { canonical: "/" },
  keywords: [
    "organic jaipur store",
    "organic jaipur",
    "organic products near me",
    "best a2 ghee",
    "a2 ghee near me",
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
});

export const revalidate = 300;

const SHOP_CATEGORIES: CategoryType[] = [
  "GHEE",
  "MUSTARD_OIL",
  "HONEY",
  "PICKLES",
];

const heroSlides: HeroSlide[] = [
  {
    image: "/images/generated/banner-ghee-farm-v4.png",
    alt: "Illustration of traditional wooden bilona ghee preparation in Jaipur",
    focal: "object-right sm:object-center",
    eyebrow: "Jaipur Aur Rajasthan Ki Rasoi Ke Liye",
    title: (
      <>
        <span className="sr-only">Organic Jaipur Store: </span>
        Ye Ghee Nahi,{" "}
        <em className="font-normal text-honey-400">Bharosa Hai.</em>
      </>
    ),
    copy: "Apni farm ki cows se shuru, dahi se bilona-churned aur dheemi aanch par taiyaar. Gir, Desi ya Buffalo Ghee—apni family ke swaad aur zaroorat ke hisaab se chuniye.",
    primaryCta: { label: "Ghee Chuniye", href: "/products?category=GHEE" },
    secondaryCta: { label: "Process Dekhiye", href: "/farm-to-home" },
  },
  {
    image: "/images/generated/banner-honey-apiary-v4.png",
    alt: "Illustration of raw honey and beekeeping in Jaipur",
    focal: "object-right sm:object-center",
    eyebrow: "Raw Wild Forest Honey",
    title: (
      <>
        <span className="sr-only">Organic Jaipur Store: </span>
        Mithaas Wahi,{" "}
        <em className="font-normal text-honey-400">Jo Kudrat Ne Banayi.</em>
      </>
    ),
    copy: "Raw, unheated and lightly filtered, with no added sugar or syrup. Order a 500 g jar for everyday use.",
    primaryCta: { label: "Shop Raw Honey", href: "/products?category=HONEY" },
    secondaryCta: {
      label: "See the Honey Process",
      href: "/making-process/raw-honey",
    },
  },
  {
    image: "/images/generated/banner-mustard-ghani-v4.png",
    alt: "Illustration of a traditional wooden ghani pressing mustard oil",
    focal: "object-right sm:object-center",
    eyebrow: "Kachi Ghani Mustard Oil",
    title: (
      <>
        <span className="sr-only">Organic Jaipur Store: </span>
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
    image: "/images/generated/banner-pickle-courtyard-v4.png",
    alt: "Illustration of traditional Rajasthani green chilli pickle preparation",
    focal: "object-right sm:object-center",
    eyebrow: "Rajasthani Pickles and Chutneys",
    title: (
      <>
        <span className="sr-only">Organic Jaipur Store: </span>
        Har Niwale Mein,{" "}
        <em className="font-normal text-honey-400">Ghar Ka Swaad.</em>
      </>
    ),
    copy: "Choose green chilli pickle or made-to-order laal mirch chutney with cumin, garlic, curd and a little ghee (contains milk). Small-batch flavour that completes dal, paratha and everyday meals.",
    primaryCta: { label: "Shop Pickles", href: "/products?category=PICKLES" },
    secondaryCta: {
      label: "See How It’s Made",
      href: "/making-process/laal-mirch-chutney",
    },
  },
];

const journeySteps = [
  {
    title: "Apne Farm Se Shuruwat",
    copy: "A2 milk hamari apni Gir cows se aata hai, jinhe Organic Jaipur farm par dekhbhaal ke saath paala jaata hai.",
    image: "/images/generated/journey-own-farm-v2.png",
    alt: "Illustration of a farmer caring for an indigenous Gir cow",
  },
  {
    title: "Mitti Ke Bartan Mein Jama Dahi",
    copy: "Taaza A2 milk ko raat bhar mitti ke bartanon mein dahi banne diya jaata hai—bilkul purane gharon ki tarah.",
    image: "/images/generated/journey-curd-v2.png",
    alt: "Illustration of milk being set into curd in earthen pots",
  },
  {
    title: "Lakdi Ke Bilona Se Manthan",
    copy: "Dahi ko lakdi ke bilona se mathkar makkhan nikala jaata hai. Na machine ki jaldi, na process mein shortcut.",
    image: "/images/founder/founder-bilona-churning.png",
    alt: "Organic Jaipur founder hand-churning curd with a traditional wooden bilona",
  },
  {
    title: "Dheemi Aanch Par Sunehra Ghee",
    copy: "Makkhan ko dheemi aanch par pakaya jaata hai, jab tak woh daanedaar, khushbudaar ghee na ban jaaye.",
    image: "/images/generated/journey-slow-ghee-v2.png",
    alt: "Illustration of butter slowly simmering into ghee in a brass kadai",
  },
  {
    title: "Khet Se, Sambhaal Ke",
    copy: "Sarson hamare kheton se lakdi ki ghani tak jaati hai, aur lal mirch chutney local farmers ki dhoop mein sukhai mirch ko order par jeera, lahsun, dahi aur halke ghee ke saath silbatte par peeskar banti hai. Phir pack karke aap tak pahunchate hain.",
    image: "/images/founder/founder-mustard-ghani-press.png",
    alt: "Organic Jaipur founder pressing mustard seeds in a traditional wooden ghani",
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
    copy: "Bilona-churned ghee, wooden-ghani mustard oil aur small-batch lal mirch chutney.",
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

const gheeDecisionChecks = [
  {
    number: "01",
    title: "Doodh Kahan Se Aata Hai?",
    copy: "Hamare ghee ki shuruwat apni Jaipur farm par paali gayi cows ke doodh se hoti hai.",
  },
  {
    number: "02",
    title: "Cream Se Ya Dahi Se?",
    copy: "Doodh ko dahi banakar lakdi ke bilona se matha jaata hai—cream-separator shortcut nahi.",
  },
  {
    number: "03",
    title: "Batch Ka Jawaab Milega?",
    copy: "Product aur pack size bhejkar WhatsApp par latest available batch details pooch sakte hain.",
  },
];

const blogs = BLOG_POSTS.slice(0, 3).map((post) => ({
  date: post.publishDate,
  title: post.title,
  copy: post.intro,
  image: post.heroImage,
  alt: post.heroAlt,
  category: categoryLabel(post.category),
  href: `/blog/${post.slug}`,
}));

const homeFaqs = FAQS_HOME.slice(0, 10);

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
  const mainProducts = [
    gheeCandidates.find((p) => p.name === "A2 Gir Cow Ghee"),
    gheeCandidates.find((p) => p.name === "Buffalo Bilona Ghee"),
    oilCandidates.find((p) => p.name === "Kachi Ghani Black Mustard Oil"),
    pickleCandidates.find((p) => p.name === "Rajasthani Laal Mirch Chutney"),
  ].filter((product): product is NonNullable<typeof product> => Boolean(product));
  const shelfExtras = allProducts
    .filter((p) => !bestSellerIds.has(p.id))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  const gheeProducts = pickByVariety(gheeCandidates, 4);
  const oilProducts = pickByVariety(oilCandidates, 6);
  const chutneyProducts = pickByVariety(pickleCandidates, 4);
  const honeyProducts = pickByVariety(honeyCandidates, 4);

  const categoryTabs: ShowcaseTab[] = [
    {
      key: "main-products",
      label: "Main Products",
      icon: "⭐",
      items: mainProducts,
    },
    { key: "ghee", label: "Ghee incl. Buffalo", icon: "🧈", items: gheeProducts },
    { key: "oils", label: "Cold-Pressed Oils", icon: "🫒", items: oilProducts },
    {
      key: "chutney",
      label: "Pickles & Chutneys",
      icon: "🌶️",
      items: chutneyProducts,
    },
    { key: "honey", label: "Raw Honey", icon: "🍯", items: honeyProducts },
  ];

  return (
    <main className="overflow-hidden">
      <HeroCarousel
        slides={[heroSlides[0], heroSlides[2], heroSlides[3], heroSlides[1]]}
      />

      <TrustTicker />

      {/* Research-led comparison hook */}
      <section className="border-b border-forest-900/10 bg-[#fffdf7] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
                Packet Nahi, Process Dekhiye
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] text-forest-900 sm:text-5xl">
                Phone Lene Se Pehle Compare Karte Hain.{" "}
                <em className="font-normal text-brand-700">Ghee Kyun Nahi?</em>
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-forest-900/70">
                Label par sirf “pure” likha hona kaafi nahi. Source, method aur batch ke baare mein teen seedhe sawaal poochiye.
              </p>
            </div>
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
              {gheeDecisionChecks.map((check) => (
                <article
                  key={check.number}
                  className="w-[82vw] shrink-0 snap-center rounded-[1.35rem] border border-forest-900/10 bg-white p-5 shadow-sm lg:w-auto"
                >
                  <span className="font-display text-sm font-bold text-terracotta-600">
                    {check.number}
                  </span>
                  <h3 className="mt-5 font-display text-xl leading-tight text-forest-900">
                    {check.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-forest-900/65">
                    {check.copy}
                  </p>
                </article>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08} className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/farm-to-home"
              className="rounded-full bg-forest-900 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-800"
            >
              Hamara Process Dekhiye →
            </Link>
            <Link
              href="/products?category=GHEE"
              className="rounded-full border border-forest-900/20 px-7 py-3.5 text-sm font-bold text-forest-900 transition hover:border-forest-900"
            >
              Ghee Shop Karein
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <AnimatedSection className="text-center">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
            Apni Rasoi Ke Liye
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] text-forest-900 sm:text-5xl">
            Sirf Samaan Nahi,{" "}
            <em className="font-normal text-brand-700">
              Rasoi Ki Parampara Hai.
            </em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-forest-900/75">
            Gir, Desi aur Buffalo ghee, kachi ghani oil, raw honey aur lal mirch chutney—
            swaad, pack size aur istemaal ke hisaab se apna product chuniye.
          </p>
          <Link
            href="/organic-products-jaipur"
            className="mt-3 inline-flex text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
          >
            See all Jaipur areas we deliver to →
          </Link>
        </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-8 sm:mt-12">
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
      <section className="bg-[#173f30] px-5 py-10 text-cream sm:px-8 sm:py-14">
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
              <p className="mt-4 max-w-lg leading-7 text-white/75">
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
      <section className="bg-[#fbf7ea] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
              Khet Se Rasoi Tak
            </p>
            <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-6xl">
              Khet Se Shuruwat,{" "}
              <em className="font-normal text-brand-700">Rasoi Tak Bharosa.</em>
            </h2>
          </AnimatedSection>

          <div className="relative mt-10 md:mt-16">
            <JourneyScrollLine />
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:block md:space-y-20 md:overflow-visible md:px-0">
              {journeySteps.map((step, index) => {
                const reversed = index % 2 === 1;
                return (
                  <AnimatedSection
                    key={step.title}
                    delay={index * 0.06}
                    className={`relative flex w-[86vw] shrink-0 snap-center flex-col items-center gap-5 rounded-[1.6rem] border border-forest-900/8 bg-white p-3 shadow-sm md:w-auto md:flex-row md:gap-14 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none ${reversed ? "md:flex-row-reverse" : ""}`}
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

                    <div className="w-full px-2 pb-3 text-center md:w-1/2 md:px-0 md:pb-0 md:text-left">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 font-display text-sm text-honey-400 md:hidden">
                        {index + 1}
                      </span>
                      <h3 className="mt-3 font-display text-2xl text-forest-900 sm:text-3xl md:mt-0">
                        {step.title}
                      </h3>
                      <p className="mx-auto mt-3 max-w-sm leading-6 text-forest-900/70 md:mx-0">
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
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <AnimatedSection className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
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
                    fill
                    sizes="(max-width: 639px) 68vw, 280px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="mt-4 font-display text-lg text-forest-900">
                    {productDisplayName(item.name, item.unit)}
                  </h3>
                  <p className="mt-1 text-sm text-forest-900/70">
                    Pack: {item.unit} · {formatPrice(item.price)}
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
                      weight: item.weight,
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
      <section className="bg-[#0f281c] py-10 text-cream sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AnimatedSection className="relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[4/3] w-full md:aspect-[16/5]">
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
            <p className="mt-2 font-display text-lg italic text-white/75">
              शुद्धता की एक सच्ची यात्रा
            </p>
            <p className="mt-5 leading-7 text-white/75">
              Product, batch ya delivery time jaan-na ho? Order se pehle hamari
              Jaipur team se WhatsApp par seedhi baat kijiye.
            </p>
          </AnimatedSection>

          <AnimatedSection
            delay={0.1}
            className="relative mx-auto mt-10 aspect-video max-w-7xl overflow-hidden rounded-[1.75rem] bg-black/20 shadow-2xl shadow-black/30"
          >
            <Image
              src="/images/generated/hero-bilona.webp"
              alt="Illustration of traditional bilona ghee preparation"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </AnimatedSection>

          <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-[1.75rem] md:bg-white/15 md:px-0 lg:grid-cols-4">
            {experienceReasons.map(({ title, copy, icon: Icon }, index) => (
              <AnimatedSection
                key={title}
                delay={index * 0.06}
                className="flex h-full w-[82vw] shrink-0 snap-center flex-col rounded-[1.5rem] bg-[#1b4937] p-7 md:w-auto md:rounded-none md:p-8"
              >
                <Icon className="h-10 w-10 shrink-0 text-honey-400" />
                <h3 className="mt-8 flex min-h-[3.75rem] items-start font-display text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{copy}</p>
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

      {/* Product guides */}
      <section className="bg-[linear-gradient(180deg,#fffdf8_0%,#f5f0e2_100%)] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
        <AnimatedSection className="flex items-end justify-between gap-8">
          <div>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
              Samajhkar Chuniye
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.02] text-forest-900 sm:text-6xl">
              Sahi Jaankari,{" "}
              <em className="font-normal text-brand-700">Sahi Chunav.</em>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-forest-900/65 sm:text-base">
              Product, process aur source ko samajhne ke liye seedhi, practical guides—hamari
              Jaipur farm team ke experience se.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 rounded-full border border-brand-700/20 bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-700 hover:shadow-md sm:inline-flex"
          >
            Read All Guides →
          </Link>
        </AnimatedSection>
        <div className="-mx-5 mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {blogs.map((blog, index) => (
            <AnimatedSection key={blog.title} delay={index * 0.06} className="w-[84vw] shrink-0 snap-center md:w-auto">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-forest-900/8 bg-white p-3 shadow-[0_12px_40px_rgba(15,40,28,.07)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-[0_22px_55px_rgba(15,40,28,.13)]">
                <Link
                  href={blog.href}
                  aria-label={`Read ${blog.title}`}
                  className="relative block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#e9e1cf]"
                >
                  <Image
                    src={blog.image}
                    alt={blog.alt}
                    fill
                    sizes="(max-width: 767px) 92vw, 32vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-forest-900/45 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-forest-900/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-honey-400 backdrop-blur">
                    {blog.category}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[.1em] text-terracotta-600">
                    {blog.date}
                  </p>
                  <h3 className="mt-2 font-display text-[1.45rem] leading-[1.18] text-forest-900">
                    <Link href={blog.href} className="transition group-hover:text-brand-700">{blog.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-forest-900/65">
                    {blog.copy}
                  </p>
                  <Link
                    href={blog.href}
                    className="mt-6 inline-flex items-center gap-2 border-t border-forest-900/8 pt-4 text-sm font-bold text-brand-700 transition group-hover:gap-3 group-hover:text-brand-800"
                  >
                    Read guide <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-5 text-center sm:hidden">
          <Link href="/blog" className="inline-flex rounded-full bg-forest-900 px-6 py-3 text-sm font-bold text-white">
            Read All Guides →
          </Link>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fbf7e9] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <AnimatedSection>
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
              Aapke Sawaal
            </p>
            <h2 className="mt-3 font-display text-5xl text-[#425c22] sm:text-6xl">
              Sawaal Aapke,{" "}
              <em className="font-normal text-brand-700">Jawaab Hamare.</em>
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-forest-900/70">
              Organic Jaipur Store par A2 ghee, kachi ghani mustard oil, raw
              honey aur Rajasthani pickles ke baare mein aapke sabse zyada
              poochhe jaane wale sawaal.
            </p>
            <div className="mt-9 lg:max-h-[620px] lg:overflow-y-auto lg:pr-3 lg:[scrollbar-color:#d9a63f_transparent] lg:[scrollbar-width:thin]">
              <FaqAccordion items={homeFaqs} />
            </div>
            <FaqJsonLd items={homeFaqs} />
          </AnimatedSection>
          <AnimatedSection
            delay={0.1}
            className="relative mx-auto min-h-[500px] w-full max-w-[560px] lg:self-center"
          >
            <Image
              src="/images/founder-with-a2-ghee-v1.png"
              alt="Organic Jaipur founder holding A2 Gir Cow Ghee"
              fill
              sizes="(max-width: 1023px) 90vw, 40vw"
              className="relative object-contain object-center"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Follow us on social media */}
      <section className="bg-[#fffdf8] px-5 py-10 sm:px-8 sm:py-14">
        <AnimatedSection className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
            Social Par Humse Judiye
          </p>
          <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">
            Farm Se Rasoi Tak,{" "}
            <em className="font-normal text-brand-700">Har Update Yahin.</em>
          </h2>
          <div className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 text-left [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-9 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
            <a
              href={SOCIAL_LINKS[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[78vw] shrink-0 snap-center rounded-[1.4rem] border border-[#e4405f]/15 bg-white px-7 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:w-auto md:px-8 md:py-7"
            >
              <p className="text-3xl font-black tracking-tight text-[#e4405f]">
                Instagram
              </p>
              <p className="mt-2 text-sm text-forest-900/70">
                Farm stories, products aur daily updates dekhiye
              </p>
            </a>
            <a
              href={SOCIAL_LINKS[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[78vw] shrink-0 snap-center rounded-[1.4rem] border border-[#1877f2]/15 bg-[#f5f9ff] px-7 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:w-auto md:px-8 md:py-7"
            >
              <p className="text-3xl font-black tracking-tight text-[#1877f2]">
                Facebook
              </p>
              <p className="mt-2 text-sm text-forest-900/70">
                Organic Jaipur ki news aur community updates paaiye
              </p>
            </a>
            <a
              href={SOCIAL_LINKS[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[78vw] shrink-0 snap-center rounded-[1.4rem] border border-[#ff0000]/15 bg-[#fff8f8] px-7 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:w-auto md:px-8 md:py-7"
            >
              <p className="text-3xl font-black tracking-tight text-[#ff0000]">
                YouTube
              </p>
              <p className="mt-2 text-sm text-forest-900/70">
                Farm, process aur product videos dekhiye
              </p>
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[78vw] shrink-0 snap-center rounded-[1.4rem] border border-[#25d366]/20 bg-[#f3fff7] px-7 py-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:w-auto md:px-8 md:py-7"
            >
              <p className="text-3xl font-black tracking-tight text-[#159447]">
                WhatsApp
              </p>
              <p className="mt-2 text-sm text-forest-900/70">
                {BUSINESS.phoneDisplay} par order ya sawaal bhejiye
              </p>
            </a>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
