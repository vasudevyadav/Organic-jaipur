import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { pageMetadata } from "@/lib/metadata";
import { categoryLabel } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = pageMetadata({
  title: "Organic Food Blog India | A2 Ghee, Oil & Honey Guides",
  description:
    "Organic Jaipur Store guides from our Jaipur farm on A2 ghee, bilona ghee, kachi ghani mustard oil and raw honey for readers in Rajasthan and across India.",
  alternates: { canonical: "/blog" },
  keywords: [
    "Organic Jaipur blog",
    "organic food blog India",
    "A2 ghee guide India",
    "bilona ghee Jaipur",
    "kachi ghani mustard oil Rajasthan",
    "raw honey guide India",
  ],
});

export default function BlogIndexPage() {
  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />

      <section className="hero-grain relative isolate min-h-[300px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[360px]">
        <Image
          src="/images/generated/banner-shop-farm-v3.jpg"
          alt="Organic Jaipur Store products at a Rajasthan farm"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.93)_0%,rgba(8,29,20,.72)_46%,rgba(8,29,20,.2)_82%)]" />
        <AnimatedSection className="relative mx-auto flex min-h-[300px] max-w-5xl flex-col justify-center px-5 py-14 sm:min-h-[360px] sm:px-8 sm:py-16">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] text-honey-400 uppercase">
            <span className="h-px w-8 bg-honey-400" /> Organic Jaipur Store Guides
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            A2 Ghee, Kachi Ghani Oil{" "}
            <em className="font-normal text-honey-400">&amp; Raw Honey, Explained.</em>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Process-first guides from our Jaipur farm for families across Rajasthan and India —
            clear sourcing, honest comparisons and no invented lab claims.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-[#fffdf8] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta-600">
              Product and process guides
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
              Learn Before You Choose
            </h2>
            <p className="mt-3 leading-7 text-forest-900/70">
              Every article uses an image from the matching product or farm process, so you can
              connect the guide with how Organic Jaipur actually makes it.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
          {BLOG_POSTS.map((post, index) => (
            <AnimatedSection key={post.slug} delay={index * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-forest-900/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#f1ecdd]">
                    <Image
                      src={post.heroImage}
                      alt={post.heroAlt}
                      fill
                      sizes="(max-width: 639px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-wide text-terracotta-600">
                      {post.publishDate} · {categoryLabel(post.category)}
                    </p>
                    <h2 className="mt-2 font-display text-2xl leading-tight text-forest-900">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-forest-900/70">{post.intro}</p>
                    <span className="mt-4 text-sm font-bold text-brand-700">Read the guide →</span>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
          </div>

          <AnimatedSection className="mt-14 rounded-[1.75rem] border border-forest-900/10 bg-[#f7f2e4] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta-600">
              Explore Organic Jaipur
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-900">
              Jaipur Se Rajasthan, Indian Rasoi Tak
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-forest-900/70">
              Read the guides, compare the products and see where our farm-made pantry range is
              available. These pages connect the advice above with the relevant products, process
              details and delivery areas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/organic-products-jaipur" className="rounded-full border border-brand-600/25 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:bg-brand-50 hover:text-brand-800">
                Organic products in Jaipur
              </Link>
              <Link href="/organic-products-rajasthan" className="rounded-full border border-brand-600/25 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:bg-brand-50 hover:text-brand-800">
                Rajasthan delivery areas
              </Link>
              <Link href="/products" className="rounded-full border border-brand-600/25 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:bg-brand-50 hover:text-brand-800">
                Shop the Indian pantry range
              </Link>
              <Link href="/farm-to-home" className="rounded-full border border-brand-600/25 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:bg-brand-50 hover:text-brand-800">
                See our farm-to-home process
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
