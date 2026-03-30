"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";

interface ProjectApproachProps {
  approach: string;
  className?: string;
}

export function ProjectApproach({
  approach,
  className,
}: ProjectApproachProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            The Approach
          </p>
          <div className="border-l-4 border-border pl-6 md:pl-8">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {approach}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
