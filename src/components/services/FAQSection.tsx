"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span className="text-sm font-medium text-foreground pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
