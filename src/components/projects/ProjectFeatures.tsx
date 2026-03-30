"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";
import type { ProjectFeature } from "@/types/project";

interface ProjectFeaturesProps {
  features: ProjectFeature[];
  className?: string;
}

export function ProjectFeatures({
  features,
  className,
}: ProjectFeaturesProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            Key Features
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl mb-10">
            What Makes It Work
          </h2>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItemVariants}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/30"
            >
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
