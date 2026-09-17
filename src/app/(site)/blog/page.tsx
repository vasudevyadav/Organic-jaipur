import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { pageMetadata } from "@/lib/metadata";
import { categoryLabel } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = pageMetadata({
  title: "Blog: A2 Ghee, Mustard Oil & Honey Guides",
  description:
    "Organic Jaipur Store's guides on A2 ghee, bilona ghee process, kachi ghani mustard oil and raw honey purity — written from our own farm in Jaipur.",
  alternates: { canonical: "/blog" },
});

export default function BlogIndexPage() {
  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />

      <section className="hero-grain relative isolate min-h-[300px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[360px]">
        <img
          src="/images/generated/banner-shop-farm-v3.jpg"
          alt="Organic Jaipur Store products at a Rajasthan farm"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
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
            Honest, process-first guides from our own Jaipur farm — no invented lab claims, just how things are actually made.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-[#fffdf8] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
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
      </section>
    </main>
  );
}
