"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { TextScramble } from "@/components/animations/TextScramble";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { SectionContainer } from "@/components/layout/SectionContainer";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

interface HeroSectionProps {
  tagline: string;
  stats: { label: string; value: string }[];
}

export function HeroSection({ tagline, stats }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <SectionContainer className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Subtle mouse-following glow — desktop only */}
        <div
          className="pointer-events-none absolute hidden lg:block"
          style={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.07,
            filter: "blur(400px)",
          }}
        />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <FadeIn direction="up" delay={0}>
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to senior roles &amp; client work
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-lg md:text-xl font-medium text-accent mb-3 tracking-normal">
                Hi, I&apos;m Rohan P. Suresh
              </span>
              <TextScramble text={tagline} />
            </h1>

            <FadeIn direction="up" delay={0.15}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Full-stack engineer working across web, mobile, and AI-integrated
                systems. React, React Native, Node.js, Go, Python, and modern LLM
                tooling — shipped to production.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton>
                  <Link href="/projects">
                    <Button variant="primary" size="lg">
                      View My Work
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      Get in Touch
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Right column - animated orb */}
        <FadeIn direction="up" delay={0.3}>
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative h-[420px] w-[420px]">
              <HeroScene />
            </div>
          </div>
        </FadeIn>
      </div>
      </div>

      {/* Stats bar */}
      <FadeIn direction="up" delay={0.5}>
        <div className="mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:divide-x sm:divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="sm:px-12 first:sm:pl-0 last:sm:pr-0">
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
