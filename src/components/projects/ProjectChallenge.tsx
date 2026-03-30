"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";

interface ProjectChallengeProps {
  challenge: string;
  className?: string;
}

export function ProjectChallenge({
  challenge,
  className,
}: ProjectChallengeProps) {
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            The Challenge
          </p>
          <div className="border-l-4 border-accent pl-6 md:pl-8">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
              {challenge}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
