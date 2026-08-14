"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type HeroSlide = {
  image: string;
  alt: string;
  focal?: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    setActive(index);
  }

  const slide = slides[active];

  return (
    <section className="hero-grain relative overflow-hidden bg-[#172117] sm:min-h-[620px] lg:min-h-[680px]">
      <div key={active} className={`absolute inset-x-0 top-0 h-[330px] sm:inset-0 sm:h-auto ${active === 0 ? "" : "animate-[hero-reveal_700ms_ease-out]"}`}>
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={active === 0}
            quality={65}
            sizes="100vw"
            className={`object-cover ${slide.focal ?? "object-center"}`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-forest-900/25 to-transparent sm:bg-[linear-gradient(90deg,rgba(8,29,20,.92)_0%,rgba(8,29,20,.68)_42%,rgba(8,29,20,.15)_78%)]" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(0deg,rgba(8,29,20,.82)_0%,transparent_42%)] sm:block" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-6 pb-10 pt-[366px] text-cream sm:min-h-[620px] sm:px-8 sm:pb-32 sm:pt-16 lg:min-h-[680px] lg:pb-36">
          <div key={active} className={`max-w-2xl ${active === 0 ? "" : "animate-[hero-copy-reveal_450ms_ease-out]"}`}>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-bold tracking-[.28em] text-honey-400 uppercase sm:mb-6 sm:text-xs">
              <span className="h-px w-10 bg-honey-400" /> {slide.eyebrow}
            </p>
            <h1 className="font-display text-[2.65rem] leading-[.94] tracking-[-.04em] text-balance sm:text-6xl lg:text-[5.25rem]">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-cream/72 sm:mt-6 sm:text-lg sm:leading-7">{slide.copy}</p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link
                href={slide.primaryCta.href}
                className="rounded-full bg-honey-400 px-7 py-3.5 text-sm font-bold text-forest-900 shadow-[0_12px_35px_rgba(240,184,77,.2)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {slide.primaryCta.label} →
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="rounded-full border border-white/35 bg-white/8 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white hover:text-forest-900"
              >
                {slide.secondaryCta.label}
              </Link>
            </div>
          </div>
      </div>

      <div className="relative z-10 border-t border-white/15 bg-forest-900/80 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-forest-900/50 sm:backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/15 px-4 sm:px-8">
          {[
            ["01", "Choose Your Pack", "500 g to Family Sizes"],
            ["02", "Pay on Delivery", "Cash on Delivery Available"],
            ["03", "Free Jaipur Delivery", "Rajasthan Courier Shipping"],
          ].map(([number, title, copy]) => (
            <div key={number} className="flex items-start justify-center gap-3 px-2 py-4 text-center sm:justify-start sm:px-6 sm:py-5 sm:text-left">
              <span className="hidden font-display text-sm text-honey-400 sm:block">{number}</span>
              <div>
                <p className="text-[11px] font-bold text-white sm:text-sm">{title}</p>
                <p className="mt-1 hidden text-xs text-white/75 sm:block">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-5 top-5 z-20 flex items-center justify-center gap-2.5 sm:right-8 sm:top-8">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-honey-400" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo((active - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo((active + 1) % slides.length)}
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </section>
  );
}
