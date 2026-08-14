"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import {
  FAQS_ABOUT,
  FAQS_CONTACT,
  FAQS_FARM_TO_HOME,
  FAQS_GHEE,
  FAQS_HONEY,
  FAQS_OILS,
  FAQS_PICKLES,
  FAQS_QUALITY,
  FAQS_TRACK_ORDER,
} from "@/lib/constants";

type Faq = { question: string; answer: string };

type Props = {
  items?: readonly Faq[];
  heading?: string;
  eyebrow?: string;
};

export default function SubpageFaqSection({
  items,
  heading = "Sawaal Aapke, Jawaab Hamare.",
  eyebrow = "Har baat, seedhe aur saaf tareeke se",
}: Props) {
  const pathname = usePathname();

  const routeFaqs: Record<string, readonly Faq[]> = {
    "/about": FAQS_ABOUT,
    "/contact": FAQS_CONTACT,
    "/farm-to-home": FAQS_FARM_TO_HOME,
    "/quality-promise": FAQS_QUALITY,
    "/track-order": FAQS_TRACK_ORDER,
    "/making-process/bilona-ghee": FAQS_GHEE,
    "/making-process/cold-pressed-oil": FAQS_OILS,
    "/making-process/raw-honey": FAQS_HONEY,
    "/making-process/traditional-pickles": FAQS_PICKLES,
  };
  const resolvedItems = items ?? routeFaqs[pathname];

  if (pathname === "/" || pathname === "/faq") return null;
  if (pathname === "/products" || pathname?.startsWith("/products/")) return null;
  if (pathname === "/organic-products-jaipur" || pathname?.startsWith("/organic-products-jaipur/")) {
    return null;
  }
  if (pathname === "/organic-products-rajasthan" || pathname?.startsWith("/organic-products-rajasthan/")) {
    return null;
  }
  if (
    pathname === "/search" ||
    pathname === "/wishlist" ||
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname?.startsWith("/account") ||
    pathname?.startsWith("/order-confirmation")
  ) {
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
            <FaqAccordion items={resolvedItems} />
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
