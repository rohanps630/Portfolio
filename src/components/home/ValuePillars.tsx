"use client";

import { Cpu, ShieldCheck, Zap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionContainer } from "@/components/layout/SectionContainer";

const pillars = [
  {
    title: "Resilient Architecture",
    description:
      "Systems designed to survive network partitions, handle heavy concurrent loads, and gracefully recover from failure states without losing data.",
    icon: ShieldCheck,
  },
  {
    title: "Deterministic AI",
    description:
      "Bridging the gap between stochastic LLMs and production constraints with explicit agent loops, strict schema validation, and guardrails.",
    icon: Cpu,
  },
  {
    title: "High-Velocity Execution",
    description:
      "Bias for action. Shipping complete verticals from database schema to responsive frontend without coordination overhead.",
    icon: Zap,
  },
];

export function ValuePillars() {
  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="Core Philosophy"
          title="Engineering Principles"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {pillars.map((pillar, index) => (
          <FadeIn key={pillar.title} delay={index * 0.15}>
            <div className="h-full rounded-2xl border border-border/50 bg-card p-8 hover:bg-muted/20 transition-colors flex flex-col items-start text-left">
              <div className="mb-6 rounded-lg bg-accent/10 p-3 text-accent w-fit">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionContainer>
  );
}
