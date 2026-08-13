"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";

type Faq = { question: string; answer: string };

type Props = {
  items?: readonly Faq[];
  heading?: string;
  eyebrow?: string;
};

export default function SubpageFaqSection({
  items,
  heading = "FAQ's",
  eyebrow = "Everything you need to know",
}: Props) {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/faq") return null;
  if (pathname === "/products" || pathname?.startsWith("/products/")) return null;
  if (pathname === "/organic-products-jaipur" || pathname?.startsWith("/organic-products-jaipur/")) {
    return null;
  }
  if (
    pathname === "/shipping-policy" ||
    pathname === "/return-refund-policy" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms-and-conditions"
  ) {
    return null;
  }

  return (
    <section className="bg-[#fbf7e9] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <AnimatedSection>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta-500">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-5xl text-[#425c22] sm:text-6xl">
            {heading}
          </h2>
          <div className="mt-9">
            <FaqAccordion items={items} />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="relative mx-auto min-h-[500px] w-full max-w-[560px]">
          <Image
            src="/images/founder-with-a2-ghee-v1.png"
            alt="Organic Jaipur founder holding A2 Gir Cow Ghee"
            fill
            sizes="(max-width: 1023px) 90vw, 40vw"
            className="object-contain object-bottom"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
