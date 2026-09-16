"use client";

import { useId } from "react";
import { FAQS_HOME } from "@/lib/constants";

type Faq = { question: string; answer: string };
type Props = { items?: readonly Faq[] };

export default function FaqAccordion({ items = FAQS_HOME }: Props) {
  const groupName = useId();

  return (
    <div className="space-y-3.5">
      {items.map((faq, i) => (
        <details
          key={faq.question}
          name={groupName}
          open={i === 0}
          className="group overflow-hidden rounded-xl border border-forest-900/10 bg-white transition-colors duration-300 hover:border-forest-900/20 open:border-honey-400 open:bg-[#fff8e8]"
        >
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-5 px-6 py-2.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest-900 sm:px-8 [&::-webkit-details-marker]:hidden">
            <span className="text-base font-semibold leading-6 text-forest-900/80 group-open:text-forest-900">
              {faq.question}
            </span>
            <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center text-forest-900/40 transition-transform duration-300 group-open:rotate-45 group-open:text-terracotta-500">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="px-6 pb-5 text-base leading-7 text-forest-900/70 sm:px-8 lg:text-[15px]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
