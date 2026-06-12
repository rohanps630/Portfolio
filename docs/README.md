# Portfolio Flagship Blueprint — Documentation Index

> **Implementers start at [`/IMPLEMENTATION_HANDOFF.md`](../IMPLEMENTATION_HANDOFF.md)** (repo root) — the consolidated entry point with document precedence, scope, kill list, phase order, and launch gates.

Complete architecture and planning blueprint for transforming the portfolio into an interactive engineering showcase ("The Lab"). Produced 2026-06-11 from a full repository + resume audit. **No implementation has been done** — these documents are the contract for the implementing agent.

## Reading order

**Start here (the why):**
1. [Portfolio Audit Report](product/01-portfolio-audit-report.md) — evidence base; 8 mandates (M1–M8)
2. [Positioning Strategy](product/02-positioning-strategy.md) — "production AI systems, full-stack discipline"
3. [Product Vision](product/03-product-vision.md) — mission, personas, journeys, goals G1–G5

**The what (design):**
4. [Information Architecture](design/01-information-architecture.md) — sitemap, nav, content graph, flows
5. [UX Specification](design/02-ux-specification.md) — wireframe-level page specs
6. [Design System](design/03-design-system.md) — tokens, type, color, lab-kit components
7. [Motion System](design/04-motion-system.md) — explanatory-motion doctrine, removals
8. [Accessibility Strategy](design/05-accessibility-strategy.md) — WCAG 2.2 AA gates incl. explorer model

**The how (architecture):**
9. [Technical Architecture](architecture/01-technical-architecture.md) — stack deltas, folders, data model, CI
10. [Project Showcase Framework](architecture/02-project-showcase-framework.md) — System schema + honesty rules
11. [Architecture Explorer Spec](architecture/03-architecture-explorer-spec.md) — the flagship feature
12. [Performance Strategy](architecture/04-performance-strategy.md) — budgets as launch gates
13. [SEO Strategy](architecture/05-seo-strategy.md) — name-search defense + technique-search growth
14. [Analytics Strategy](architecture/06-analytics-strategy.md) — five questions, event schema

**The words:**
15. [Content Strategy](content/01-content-strategy.md) — voice, narratives, notes pipeline, consistency ledger
15a. [Confidentiality Audit](content/02-confidentiality-audit.md) — employer systems: safe / risky / never
15b. [Employer Case-Study Format](content/03-employer-case-study-format.md) — format + reconstructed-diagram methodology
15c. [Explorer & Depth Strategy](content/04-explorer-and-depth-strategy.md) — dual-mode explorer, depth ladder, prioritization
15d. [Final Showcase Strategy](content/05-showcase-strategy-final.md) — synthesis + blueprint amendment log

**The decisions:**
16. [ADR Collection](adrs/README.md) — ADR-001 … ADR-010

**The evidence base (ACR repo audit — source of truth for all AI Code Reviewer claims):**
15e. [ACR Repository Audit](projects/ai-code-reviewer-audit.md) · [Capability Matrix](projects/ai-code-reviewer-capability-matrix.md) · [Extracted Architecture](projects/ai-code-reviewer-architecture.md) · [Claim Audit](projects/ai-code-reviewer-claim-audit.md) · [Proof Inventory](projects/ai-code-reviewer-proof-inventory.md) · [Demo Plan](projects/ai-code-reviewer-demo-plan.md) · [HM Review](projects/ai-code-reviewer-hiring-manager-review.md) · [Public Disclosure](projects/ai-code-reviewer-public-disclosure.md) · [Portfolio Content](projects/ai-code-reviewer-portfolio-content.md) · [Final Verdict](projects/ai-code-reviewer-final-verdict.md)

**The verdict (read before implementing):**
16a. [Review Panel Verdict](review/01-review-panel-verdict.md) — adversarial review; **[BINDING] cuts and amendments** that supersede the docs below where conflicting; kill list + launch scope

**The plan:**
17. [Roadmap](roadmap/roadmap.md) — Phases 0–5, each independently shippable
17a. [Implementation Unblock](roadmap/02-implementation-unblock.md) — **start here to begin building**: blocker analysis, ACR assumption model, content contracts, parallel tracks, green-light verdict
18. Task breakdowns: [Phase 0](tasks/phase-0-tasks.md) · [Phase 1](tasks/phase-1-tasks.md) · [Phase 2](tasks/phase-2-tasks.md) · [Phase 3](tasks/phase-3-tasks.md) · [Phase 4](tasks/phase-4-tasks.md) · [Phase 5](tasks/phase-5-tasks.md)

## Ground rules for the implementing agent

- ADRs are binding; deviations require amending the ADR first.
- Tasks marked ✍️ require human content input or factual/confidentiality review — never publish employer-related content without sign-off.
- Every phase must end deployed and complete (roadmap operating principle).
- The honesty rules (Showcase Framework §3) and consistency ledger (Content Strategy §7) override any copy instruction that conflicts with them.
