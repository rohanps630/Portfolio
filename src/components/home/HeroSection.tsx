"use client";

import Link from "next/link";
import { Box, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface HeroSectionProps {
  stats: { label: string; value: string }[];
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <SectionContainer className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-20">
      {/* Background motif */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        {/* Subtle accent glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left column */}
        <FadeIn direction="up" delay={0} className="lg:col-span-7">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                <span className="font-bold text-foreground">Now:</span> Building
                the AI Code Reviewer · Production
              </span>
            </div>

            <h1 className="text-display mb-6">
              I build AI systems that survive production.
            </h1>

            <FadeIn direction="up" delay={0.15}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Senior Full-Stack Engineer specializing in AI integration, robust
                platforms, and deterministic outputs from stochastic models. Stack:
                React, Next.js, Node, Go, Python.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects/ai-code-reviewer">
                  <Button variant="primary" size="lg">
                    <Code2 className="mr-2 w-4 h-4" />
                    Explore the AI Code Reviewer
                  </Button>
                </Link>
                <a
                  href="/resume/rohan-suresh-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    View Resume
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Right column - static brand motif */}
        <FadeIn direction="up" delay={0.3} className="lg:col-span-5">
          <div className="hidden lg:flex items-center justify-center relative w-full h-full">
            <div className="w-full max-w-md aspect-square border border-border bg-card/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(var(--color-accent)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
              <Box className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <span className="mono-label text-muted-foreground">
                System Motif v1
              </span>

              {/* Abstract lines representing connections */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute top-1/4 -left-4 w-12 h-[1px] bg-accent/50" />
              <div className="absolute bottom-1/4 -right-4 w-12 h-[1px] bg-accent/50" />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Stats bar */}
      <FadeIn direction="up" delay={0.5}>
        <div className="mt-20 lg:mt-32 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-8 sm:gap-16 pt-8 border-t border-border/50">
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
