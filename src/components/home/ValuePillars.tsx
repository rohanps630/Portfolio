"use client";

import Link from "next/link";
import { Search, GitMerge, Layers } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionContainer } from "@/components/layout/SectionContainer";

const pillars = [
  {
    title: "Retrieval-First AI",
    description:
      "LLM quality is bounded by retrieval quality. The AI Code Reviewer uses AST-aware chunking, hybrid BM25 + vector search, and cross-encoder reranking — not prompt stuffing. An eval harness with a committed baseline measures whether each architecture change actually improves review quality.",
    proof: "AI Code Reviewer",
    proofSlug: "/projects/ai-code-reviewer",
    icon: Search,
  },
  {
    title: "State Machines for Non-Determinism",
    description:
      "LLM agent outputs are non-deterministic. Standard state management produces brittle race conditions. The Multi-Agent Ops platform models agent states explicitly with XState — handling tool failures, human interrupts, and unexpected LLM events without a catch-all error boundary.",
    proof: "Multi-Agent Customer Ops",
    proofSlug: "/projects/multi-agent-ops",
    icon: GitMerge,
  },
  {
    title: "Single Codebase, Production Scale",
    description:
      "The Telecom POS powers hundreds of retail terminals across North America — iPad and desktop — from one React Native Web codebase with 95% code sharing. A Node.js BFF translates 15+ legacy SOAP APIs into a clean GraphQL surface without a costly backend rewrite.",
    proof: "Telecom POS Platform",
    proofSlug: "/projects/telecom-pos",
    icon: Layers,
  },
];

export function ValuePillars() {
  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="Engineering Principles"
          title="Claims Backed by Systems"
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
              <p className="text-muted-foreground leading-relaxed grow">
                {pillar.description}
              </p>
              <Link
                href={pillar.proofSlug}
                className="mt-6 text-xs mono-label text-accent hover:text-accent-hover transition-colors"
              >
                Proven in: {pillar.proof} →
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionContainer>
  );
}
