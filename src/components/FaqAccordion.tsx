"use client";

import { useState } from "react";
import { FAQS_HOME } from "@/lib/constants";

type Faq = { question: string; answer: string };

type Props = { items?: readonly Faq[] };

export default function FaqAccordion({ items = FAQS_HOME }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3.5">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
              isOpen
                ? "border-honey-400 bg-[#fff8e8]"
                : "border-forest-900/10 bg-white hover:border-forest-900/20 hover:bg-[#faf7ee]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 px-6 py-2.5 text-left sm:px-8"
            >
              <span className={`text-base font-semibold leading-6 lg:text-base ${isOpen ? "text-forest-900" : "text-forest-900/80"}`}>
                {faq.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center text-2xl transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-terracotta-500" : "text-forest-900/40"
                }`}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-base leading-7 text-forest-900/70 sm:px-8 lg:text-[15px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
