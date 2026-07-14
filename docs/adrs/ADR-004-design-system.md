# ADR-004 — Design system: evolve existing tokens; add lab-kit primitives

**Status:** Accepted · 2026-06-11

## Context
`globals.css` already implements a clean Tailwind 4 `@theme` semantic-token system with dark/light themes and self-hosted variable fonts. The lab vision needs engineering-display primitives (status, provenance, diagrams, decisions) and a more ownable brand than default indigo.

## Decision
Evolve, don't rebuild: keep token architecture, typography pair (Satoshi/General Sans), and base components; add lab-semantic tokens (status, flow, node, provenance), upgrade mono to a self-hosted brand mono, shift accent hue at token level, and build the lab-kit component set (StatusBadge, MetricFact, DecisionRecord, Explorer kit, etc.). Brand motif = node-and-edge mark replacing the 3D orb.

## Alternatives
1. *Ground-up redesign / adopt a UI kit (shadcn etc.)* — months of churn, discards working accessible components, and a kit-look undermines the bespoke-lab impression.
2. *Keep visuals exactly as-is* — retains the template-era indigo + decorative identity that contradicts the new doctrine.

## Tradeoffs
Evolution risks visual inconsistency during transition (mitigated: token-level changes propagate globally; component retirements are atomic per phase). Accent change touches OG images and favicon.

## Consequences
Design System spec (design/03) is binding; retired components (MagneticButton, TiltCard, CursorSpotlight, TextScramble, ParallaxWrapper, HeroScene) are deleted, not deprecated; new primitives get a11y acceptance criteria at birth.
