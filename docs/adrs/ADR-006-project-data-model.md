# ADR-006 — Project data model: replace `Project` with `System` (decisions, provenance, tiers)

**Status:** Accepted · 2026-06-11

## Context
`src/types/project.ts` models marketing narratives (challenge/approach/features/impact). It cannot express constraints, decisions, tradeoffs, evidence provenance, confidentiality, or credibility tiers — the exact substance senior evaluators look for, and the substrate the explorer and honesty rules need.

## Decision
Adopt the `System` schema (architecture/02): identity + tier/domain/context facets, status with phase, constraints, embedded `DecisionRecord[]` (with mandatory `cost` field), `MetricFact[]` with provenance (`measured|target|scope-fact`), `EvidenceLink[]`, lessons, optional `architectureRef`. Tier model (1 flagship / 2 production / 3 archive) drives presentation everywhere.

## Alternatives
1. *Extend `Project` additively* — leaves marketing fields as the spine; template stays outcome-shaped; honesty rules unenforceable.
2. *Freeform MDX case studies* — maximum flexibility, but kills structured rendering (cards, thumbnails, explorer links, provenance badges) and validation.

## Tradeoffs
All 7 existing project files require rewriting (significant content labor — the real cost of this ADR); schema rigidity may pinch unusual future projects (escape hatch: optional fields, Tier-3 minimal shape).

## Consequences
Two new flagship systems (multi-agent ops, telecom POS) must be authored; migration order defined in architecture/02 §4; `provenance` rendering resolves the audit's target-vs-achieved ambiguity by construction.
