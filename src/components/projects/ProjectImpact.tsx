"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";
import type { ProjectImpact as ProjectImpactType } from "@/types/project";

interface ProjectImpactProps {
  impact: ProjectImpactType[];
  className?: string;
}

export function ProjectImpact({ impact, className }: ProjectImpactProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            The Impact
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl mb-10">
            Results That Matter
          </h2>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((metric) => (
            <motion.div
              key={metric.label}
              variants={staggerItemVariants}
              className="rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-accent/30"
            >
              <p className="font-heading text-3xl font-bold text-accent md:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {metric.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
