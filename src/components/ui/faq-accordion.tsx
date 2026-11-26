"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
  className?: string;
}

/**
 * Accessible FAQ accordion where every answer stays permanently mounted in the
 * initial server-rendered HTML DOM for AEO/SEO crawlers, animating height/opacity cleanly.
 */
export function FAQAccordion({
  items,
  defaultOpenIndex = 0,
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <MotionProvider>
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemId = `faq-item-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "rounded-xl border transition-colors duration-150 overflow-hidden",
              isOpen
                ? "border-cyan-400/35 bg-[#0d1421]/95 shadow-xs"
                : "border-white/10 bg-[#070a11]/75 hover:border-white/25 hover:bg-[#0d1421]/80"
            )}
          >
            <button
              id={itemId}
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground pr-4">
                {item.question}
              </h3>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#0d1421] text-slate-300 transition-transform duration-200",
                  isOpen && "rotate-180 text-cyan-300 border-cyan-400/30 bg-cyan-500/10"
                )}
                aria-hidden="true"
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>

            <m.div
              id={contentId}
              role="region"
              aria-labelledby={itemId}
              aria-hidden={!isOpen}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-6 pt-1 sm:px-6 text-sm leading-relaxed text-slate-300 border-t border-white/10">
                {item.answer}
              </div>
            </m.div>
          </div>
        );
      })}
    </div>
    </MotionProvider>
  );
}
