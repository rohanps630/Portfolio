"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface TechStackBarProps {
  techs: string[];
}

export function TechStackBar({ techs }: TechStackBarProps) {
  return (
    <SectionContainer>
      <FadeIn>
        <div className="text-center mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            Tech Stack
          </p>
          <p className="text-muted-foreground">
            Technologies I work with daily
          </p>
        </div>
      </FadeIn>

      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-scroll-left flex gap-8 py-4 whitespace-nowrap">
          {/* First copy */}
          {techs.map((tech) => (
            <span
              key={`a-${tech}`}
              className="inline-flex items-center text-lg font-medium text-muted-foreground/60 hover:text-foreground transition-colors select-none"
            >
              {tech}
            </span>
          ))}
          {/* Second copy for seamless loop — visual only, hidden from AT so
              the list isn't announced twice */}
          <span aria-hidden="true" className="contents">
            {techs.map((tech) => (
              <span
                key={`b-${tech}`}
                className="inline-flex items-center text-lg font-medium text-muted-foreground/60 hover:text-foreground transition-colors select-none"
              >
                {tech}
              </span>
            ))}
          </span>
        </div>
      </div>
    </SectionContainer>
  );
}
