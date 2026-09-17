import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import FaqJsonLd from "@/components/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import BlogPostingJsonLd from "@/components/BlogPostingJsonLd";
import { pageMetadata } from "@/lib/metadata";
import { categoryLabel } from "@/lib/constants";
import { BLOG_POSTS, type BlogSection } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

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
    keywords: [post.targetKeyword],
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
      return <p>{section.text}</p>;
    case "list":
      return (
        <ul className="ml-5 list-disc space-y-2">
          {section.items.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="rounded-2xl border-l-4 border-honey-400 bg-[#fff8e8] px-5 py-4 text-forest-900/80">
          {section.text}
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
                        {cell}
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
        <AnimatedSection className="relative mx-auto flex min-h-[360px] max-w-4xl flex-col justify-center px-5 py-14 sm:min-h-[420px] sm:px-8 sm:py-16">
          <p className="flex items-center gap-3 text-[10px] font-bold tracking-[.24em] text-honey-400 uppercase">
            <span className="h-px w-8 bg-honey-400" /> {post.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-[1.1] sm:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            {post.intro}
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/45">
            {post.publishDate} · {categoryLabel(post.category)}
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-[#fffdf8] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="space-y-5 text-base leading-7 text-forest-900/75">
            {post.sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}
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

          <AnimatedSection delay={0.1} className="mt-16 rounded-[1.75rem] bg-forest-900 px-8 py-10 text-center text-cream">
            <p className="font-display text-2xl sm:text-3xl">
              Shop {categoryLabel(post.category)} from Organic Jaipur Store
            </p>
            <Link
              href={`/products?category=${post.category}`}
              className="mt-6 inline-flex rounded-full bg-honey-400 px-8 py-3.5 text-sm font-bold text-forest-900 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Shop {categoryLabel(post.category)} →
            </Link>
          </AnimatedSection>

          <div className="mt-10 text-center">
            <Link href="/blog" className="text-sm font-bold text-forest-900 underline underline-offset-4">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
