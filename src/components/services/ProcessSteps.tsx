"use client";

import { motion } from "framer-motion";
import {
  StaggerChildren,
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery",
    description: "Understanding your vision and requirements",
  },
  {
    number: 2,
    title: "Architecture",
    description: "Designing the technical foundation",
  },
  {
    number: 3,
    title: "Development",
    description: "Building with clean, tested code",
  },
  {
    number: 4,
    title: "Testing",
    description: "Ensuring quality across all scenarios",
  },
  {
    number: 5,
    title: "Launch",
    description: "Deploying to production with confidence",
  },
  {
    number: 6,
    title: "Support",
    description: "Ongoing maintenance and optimization",
  },
];

export function ProcessSteps() {
  return (
    <StaggerChildren className="relative">
      {/* Desktop: horizontal layout */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-[8%] right-[8%] h-px bg-border z-0" />

        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={staggerItemVariants}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-background text-accent font-bold text-sm mb-3">
              {step.number}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {step.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical layout */}
      <div className="md:hidden relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={staggerItemVariants}
              className="relative flex items-start gap-4 pl-2"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-accent font-bold text-xs z-10">
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StaggerChildren>
  );
}
