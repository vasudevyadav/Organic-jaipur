import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import BlogPostingJsonLd from "@/components/BlogPostingJsonLd";
import { pageMetadata } from "@/lib/metadata";
import { categoryLabel, type CategoryValue } from "@/lib/constants";
import { BLOG_POSTS, type BlogSection } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_RESOURCES: Record<
  CategoryValue,
  { productLabel: string; processLabel: string; processHref: string; productImage: string }
> = {
  GHEE: {
    productLabel: "Shop A2 and Bilona Ghee",
    processLabel: "See the Bilona Ghee Process",
    processHref: "/making-process/bilona-ghee",
    productImage: "/product/a2-ghee-1kg.png",
  },
  MUSTARD_OIL: {
    productLabel: "Shop Cold-Pressed Oils",
    processLabel: "See the Cold-Pressed Oil Process",
    processHref: "/making-process/cold-pressed-oil",
    productImage: "/product/ChatGPT Image Aug 7, 2026, 11_27_16 AM (6).png",
  },
  HONEY: {
    productLabel: "Shop Raw Honey",
    processLabel: "See the Raw Honey Process",
    processHref: "/making-process/raw-honey",
    productImage: "/product/ChatGPT Image Aug 7, 2026, 11_27_20 AM (8).png",
  },
  PICKLES: {
    productLabel: "Shop Pickles and Chutneys",
    processLabel: "See the Traditional Pickle Process",
    processHref: "/making-process/traditional-pickles",
    productImage: "/product/ChatGPT Image Aug 7, 2026, 11_27_20 AM (9).png",
  },
};

const INLINE_INTERNAL_LINKS = [
  { keyword: "Organic Jaipur Store", href: "/about" },
  { keyword: "our own farm in Jaipur", href: "/farm-to-home" },
  { keyword: "A2 Gir Cow Ghee", href: "/products?category=GHEE" },
  { keyword: "A2 ghee", href: "/products?category=GHEE" },
  { keyword: "Bilona ghee", href: "/making-process/bilona-ghee" },
  { keyword: "bilona method", href: "/making-process/bilona-ghee" },
  { keyword: "kachi ghani mustard oil", href: "/products?category=MUSTARD_OIL" },
  { keyword: "wooden ghani", href: "/making-process/cold-pressed-oil" },
  { keyword: "raw honey", href: "/products?category=HONEY" },
  { keyword: "managed beehives", href: "/making-process/raw-honey" },
  { keyword: "Jaipur", href: "/organic-products-jaipur" },
  { keyword: "Rajasthan", href: "/organic-products-rajasthan" },
] as const;

const inlineLinkPattern = new RegExp(
  `(${INLINE_INTERNAL_LINKS.map(({ keyword }) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "gi",
);

function renderLinkedText(text: string): ReactNode {
  return text.split(inlineLinkPattern).map((part, index) => {
    const match = INLINE_INTERNAL_LINKS.find(
      ({ keyword }) => keyword.toLowerCase() === part.toLowerCase(),
    );

    if (!match) return part;

    return (
      <Link
        key={`${part}-${index}`}
        href={match.href}
        className="font-semibold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:text-brand-800 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {part}
      </Link>
    );
  });
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) return { title: "Blog" };

  return pageMetadata({
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: [
      post.targetKeyword,
      `Organic Jaipur ${categoryLabel(post.category)}`,
      `${categoryLabel(post.category)} Jaipur`,
      `${categoryLabel(post.category)} Rajasthan`,
      `${post.targetKeyword} India`,
      ...post.secondaryKeywords,
    ],
    openGraph: {
      type: "article",
      images: [{ url: post.heroImage }],
    },
  });
}

function Section({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="mt-10 font-display text-2xl leading-tight text-forest-900 sm:text-3xl">
          {section.text}
        </h2>
      );
    case "paragraph":
      return <p>{renderLinkedText(section.text)}</p>;
    case "list":
      return (
        <ul className="ml-5 list-disc space-y-2">
          {section.items.map((item) => (
            <li key={item.slice(0, 40)}>{renderLinkedText(item)}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="rounded-2xl border-l-4 border-honey-400 bg-[#fff8e8] px-5 py-4 text-forest-900/80">
          {renderLinkedText(section.text)}
        </div>
      );
    case "table":
      return (
        <div className="not-prose">
          <div className="overflow-x-auto rounded-xl border border-forest-900/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#faf7ee]">
                  {section.headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-forest-900/10 px-4 py-3 font-display text-sm font-semibold text-forest-900"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={row[0] ?? i} className="odd:bg-white even:bg-[#fffdf8]">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="border-b border-forest-900/8 px-4 py-3 align-top leading-6 text-forest-900/70"
                      >
                        {renderLinkedText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.caption ? (
            <p className="mt-2 text-xs italic text-forest-900/45">{section.caption}</p>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) notFound();

  const datePublished = new Date(post.publishDate).toISOString();
  const resources = CATEGORY_RESOURCES[post.category];
  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <BlogPostingJsonLd
        slug={post.slug}
        title={post.title}
        description={post.metaDescription}
        image={post.heroImage}
        datePublished={datePublished}
        section={categoryLabel(post.category)}
        keywords={[
          post.targetKeyword,
          ...post.secondaryKeywords,
          `Organic Jaipur ${categoryLabel(post.category)}`,
          `${categoryLabel(post.category)} Jaipur`,
          `${categoryLabel(post.category)} Rajasthan`,
        ]}
      />
      <FaqJsonLd items={post.faqs} />

      <section className="hero-grain relative isolate min-h-[360px] overflow-hidden bg-[#0f281c] text-cream sm:min-h-[420px]">
        <Image
          src={post.heroImage}
          alt={post.heroAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,29,20,.93)_0%,rgba(8,29,20,.72)_46%,rgba(8,29,20,.2)_82%)]" />
        <AnimatedSection className="relative mx-auto flex min-h-[360px] max-w-6xl flex-col justify-center px-5 py-14 sm:min-h-[420px] sm:px-8 sm:py-16">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] text-honey-400 uppercase">
            <span className="h-px w-8 bg-honey-400" /> {post.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-[1.1] sm:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            {post.intro}
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/60">
            By{" "}
            <Link href="/about" className="text-honey-400 underline underline-offset-4 hover:text-white">
              Organic Jaipur farm team
            </Link>{" "}
            · Reviewed {post.publishDate} · {categoryLabel(post.category)}
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-[#fffdf8] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="space-y-5 text-base leading-7 text-forest-900/75">
            {post.sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}
          </AnimatedSection>

          <AnimatedSection delay={0.04} className="mt-12 rounded-[1.5rem] border border-forest-900/10 bg-[#f7f2e4] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta-600">
              Continue exploring
            </p>
            <h2 className="mt-3 font-display text-2xl text-forest-900 sm:text-3xl">
              From This Guide to the Product and Farm
            </h2>
            <p className="mt-3 leading-7 text-forest-900/70">
              Connect this India-focused guide with Organic Jaipur&apos;s product range, the matching
              farm process, and local availability in Jaipur and across Rajasthan.
            </p>
            <nav aria-label="Related product, process and location pages" className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={`/products?category=${post.category}`} className="rounded-xl border border-brand-600/25 bg-white px-5 py-4 font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                {resources.productLabel} →
              </Link>
              <Link href={resources.processHref} className="rounded-xl border border-brand-600/25 bg-white px-5 py-4 font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                {resources.processLabel} →
              </Link>
              <Link href="/organic-products-jaipur" className="rounded-xl border border-brand-600/25 bg-white px-5 py-4 font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                Organic products in Jaipur →
              </Link>
              <Link href="/organic-products-rajasthan" className="rounded-xl border border-brand-600/25 bg-white px-5 py-4 font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                Organic products across Rajasthan →
              </Link>
              <Link href="/about" className="rounded-xl border border-brand-600/25 bg-white px-5 py-4 font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                About the Organic Jaipur brand →
              </Link>
              <Link href="/farm-to-home" className="rounded-xl border border-brand-600/25 bg-white px-5 py-4 font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                Follow the farm-to-home journey →
              </Link>
            </nav>
          </AnimatedSection>

          <AnimatedSection delay={0.06} className="mt-16">
            <p className="text-xs font-bold tracking-[.2em] text-terracotta-600 uppercase">
              Aapke Sawaal
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8">
              <FaqAccordion items={post.faqs} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="mt-16 overflow-hidden rounded-[1.75rem] bg-forest-900 text-cream">
            <div className="grid items-center sm:grid-cols-[220px_1fr]">
              <div className="relative aspect-square bg-[#f1ecdd] sm:aspect-auto sm:h-full sm:min-h-[260px]">
                <Image
                  src={resources.productImage}
                  alt={`${categoryLabel(post.category)} product from Organic Jaipur Store`}
                  fill
                  sizes="(max-width: 639px) 100vw, 220px"
                  className="object-cover"
                />
              </div>
              <div className="px-8 py-10 text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-[.2em] text-honey-400">
                  Featured product
                </p>
                <p className="mt-3 font-display text-2xl sm:text-3xl">
                  Shop {categoryLabel(post.category)} from Organic Jaipur Store
                </p>
                <Link
                  href={`/products?category=${post.category}`}
                  className="mt-6 inline-flex rounded-full bg-honey-400 px-8 py-3.5 text-sm font-bold text-forest-900 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Shop {categoryLabel(post.category)} →
                </Link>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta-600">
              Related Organic Jaipur guides
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-900">Read Next</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f1ecdd]">
                    <Image
                      src={related.heroImage}
                      alt={related.heroAlt}
                      fill
                      sizes="(max-width: 639px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-terracotta-600">
                      {categoryLabel(related.category)}
                    </p>
                    <h3 className="mt-2 font-display text-lg leading-tight text-brand-700 underline decoration-brand-400 underline-offset-4 transition group-hover:text-brand-800">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-10 text-center">
            <Link href="/blog" className="text-sm font-bold text-brand-700 underline decoration-brand-400 underline-offset-4 hover:text-brand-800">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
