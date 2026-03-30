"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";
import { TechBadge } from "@/components/shared/TechBadge";

interface ProjectTechStackProps {
  techStack: string[];
  className?: string;
}

export function ProjectTechStack({
  techStack,
  className,
}: ProjectTechStackProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            Tech Stack
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl mb-8">
            Built With
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <TechBadge
                key={tech}
                name={tech}
                className="px-4 py-2 text-sm"
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
