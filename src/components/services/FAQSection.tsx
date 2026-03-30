"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is your typical response time?",
    answer:
      "I respond to all inquiries within 24 hours. For ongoing projects, I maintain regular communication through daily or weekly check-ins depending on the project phase and your preference.",
  },
  {
    question: "Do you work with clients in different time zones?",
    answer:
      "Absolutely. I've worked with clients across the US, Europe, and Middle East. I adapt my schedule to ensure overlap hours for real-time collaboration while maintaining async communication for everything else.",
  },
  {
    question: "What if my project scope changes mid-development?",
    answer:
      "Scope changes are a natural part of development. I use agile practices so we can adapt as your product evolves. I'll communicate any impact on timeline or budget upfront so there are no surprises.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes, all my service packages include post-launch support. The duration varies by plan — from 30 days for MVP development to 90 days for full product builds, with ongoing support available as a separate engagement.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "My core stack includes React, React Native, Next.js, Node.js, NestJS, Python, and Django. For databases I work with MongoDB and PostgreSQL, and I have extensive experience with Docker, AWS, and CI/CD pipelines.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "I believe in transparent, regular communication. Depending on your preference, we can use Slack, Discord, email, or scheduled video calls. You'll always have visibility into progress through shared project boards and regular updates.",
  },
];

export function FAQSection() {
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
