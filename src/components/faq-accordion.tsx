"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              open
                ? "border-brand-200 bg-brand-50/50 dark:border-brand-500/30 dark:bg-brand-500/5"
                : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
                {item.question}
              </span>
              <ChevronDown
                className={`size-5 shrink-0 text-brand-500 transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base dark:text-slate-400">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
