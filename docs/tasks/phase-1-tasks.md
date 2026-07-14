# Phase 1 Tasks — Data Model & Performance Reset

---

### P1-T1 · System schema — **P0**
Implement `lib/schemas/system.ts` per Showcase Framework §1 (System, DecisionRecord, MetricFact, Constraint, EvidenceLink, TechEntry, Screenshot); extend validate-content with referential checks (decision ids unique, provenance enum, evidence-or-screenshot rule for tier ≤2 as warning until Phase 2).
**Deps:** P0-T2/T3. **AC:** schema unit-validated against a fixture; build gate active.

### P1-T2 · Migrate 7 project files to System shape — **P0**
Mechanical migration in `src/content/systems/` (rename dir from `projects/`): map challenge→problemStatement, approach→solutionOverview, features→(fold into solution/decisions placeholders), impact→outcomes with provenance (AI Code Reviewer metrics = `target`; others reviewed ✍️), assign tiers per Showcase §4. Old `Project` type deleted at the end.
**Deps:** P1-T1. **AC:** validate-content green; `src/types/project.ts` deleted; all routes render.

### P1-T3 · Tiered Work index — **P1**
`/projects` re-rendered per UX §2: Tier-1 `SystemRow`s, Tier-2 cards, Tier-3 archive list; facet filters (`domain`, `context`) on URL params replacing old categories (redirect old `?category=` values).
**Deps:** P1-T2, P1-T6 (StatusBadge). **AC:** tiers visually distinct; filters shareable; empty state per spec.

### P1-T4 · Remove decorative motion stack — **P0**
Delete HeroScene, MagneticButton, TiltCard, CursorSpotlight, TextScramble, ParallaxWrapper and usages; remove `three`, `@react-three/fiber`, `@react-three/drei`, `lenis` from package.json; remove SmoothScroll wiring (keep native scroll + CSS `scroll-behavior`).
**Deps:** P1-T5 ready for hero swap (can land same PR). **AC:** deps gone from lockfile; bundle diff shows ≥400KB reduction; no dead imports.

### P1-T5 · Static hero + brand motif v1 — **P1**
Hero per UX §1-S1: identity/support/now-ticker/CTAs; node-and-edge motif as static SVG background (server-rendered, themed via tokens, reduced-motion safe by being static). Now-ticker content from `site.ts`.
**Deps:** copy from CS §2 ✍️. **AC:** LCP element is the identity line; no JS required for full hero render.

### P1-T6 · Lab-kit primitives, batch 1 — **P1**
`StatusBadge`, `MetricFact` (with provenance tag rendering), `EvidenceLink`, `SystemCard`/`SystemRow` per Design System §5; new tokens (status/provenance/node/flow colors, mono-label type) added to `globals.css` `@theme`.
**Deps:** P1-T1. **AC:** Storybook-less acceptance: a fixtures page (`/dev/kit`, excluded from prod build) renders all states; axe-clean; both themes.

### P1-T7 · Mono font + type scale tokens — **P2**
Self-host JetBrains Mono (or chosen equivalent) subset; add `mono-label`/`display` scale tokens; apply to badges/metrics.
**Deps:** none. **AC:** font swap CLS = 0 (size-adjust fallback); WOFF2 ≤ 50KB subset.

### P1-T8 · `/resume` page ✍️ — **P1**
`content/resume.ts` mirroring the PDF exactly; route per UX §7 with sticky actions, print stylesheet, Person JSON-LD (extends `lib/seo.ts`); nav updated (Work · Explorer* · Notes* · About · Resume · Contact — Explorer/Notes links land in later phases behind their availability, nav supports phased items).
**Deps:** P0-T5 (consistency). **AC:** content matches PDF byte-for-meaning (human review ✍️); prints to one clean page; 1 click from Home.

### P1-T9 · Target performance budgets — **P0**
Replace Phase-0 baseline budgets with target budgets (Perf §1) in Lighthouse CI + add bundle-size diff reporting to PRs.
**Deps:** P1-T4 (otherwise unattainable). **AC:** CI green against targets on the phase's final PR.
