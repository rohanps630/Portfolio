"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeIn } from "@/components/animations/FadeIn";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { siteConfig } from "@/content/site";
import { SectionContainer } from "@/components/layout/SectionContainer";

const codeDecorations = [
  { text: "</>", className: "top-4 left-4 animate-float-slow" },
  { text: "{ }", className: "top-12 right-8 animate-float-slower" },
  { text: "//", className: "bottom-16 left-12 animate-float-slower" },
  { text: "=>", className: "bottom-8 right-4 animate-float-slow" },
];

export function HeroSection() {
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
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <TextReveal text={siteConfig.tagline} />
            </h1>

            <FadeIn direction="up" delay={0.15}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Full-stack developer specializing in React, React Native, Node.js
                &amp; AI integration. I help startups and businesses turn ideas
                into reliable, scalable software.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/projects">
                  <Button variant="primary" size="lg">
                    View My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Let&apos;s Talk
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Right column - animated orb */}
        <FadeIn direction="up" delay={0.3}>
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="hero-orb relative h-[420px] w-[420px]">
              {/* Primary orb layer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 via-purple-500/30 to-blue-500/20 blur-3xl animate-pulse" />
              {/* Secondary orb layer */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-blue-600/30 via-accent/20 to-violet-500/30 blur-2xl animate-pulse [animation-delay:1s]" />
              {/* Inner glow */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-b from-purple-500/25 to-accent/15 blur-xl animate-pulse [animation-delay:2s]" />
              {/* Core highlight */}
              <div className="absolute inset-24 rounded-full bg-accent/10 blur-lg" />

              {/* Floating code decorations */}
              {codeDecorations.map((dec) => (
                <span
                  key={dec.text}
                  className={`absolute text-accent/10 text-sm font-mono select-none pointer-events-none ${dec.className}`}
                >
                  {dec.text}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
      </div>

      {/* Stats bar */}
      <FadeIn direction="up" delay={0.5}>
        <div className="mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:divide-x sm:divide-border">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="sm:px-12 first:sm:pl-0 last:sm:pr-0">
              <AnimatedCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
