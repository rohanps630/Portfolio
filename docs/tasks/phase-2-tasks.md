# Phase 2 Tasks — Flagship Content & Showcase Framework

---

### P2-T1 · Case Study v2 template — **P0**
Component tree per UX §3 / Showcase §2: Header (status, confidentiality note slot), TL;DR `MetricFact` strip, Context/Problem, Constraints, Architecture slot (static-diagram variant now; explorer embed lands P3), `DecisionRecord` expandable blocks with anchors, Outcomes & evidence, Lessons, footer nav. Tier-conditional density (1/2/3) in one tree.
**Deps:** P1-T1/T6. **AC:** renders all three tiers from fixtures; decision anchors deep-link; ToC rail tracks sections; axe-clean.

### P2-T2 · `DecisionRecord` component — **P0**
Expandable block (Motion §6/§9): title, decision, alternatives (option + whyNot), rationale, **cost** (visually distinct), nodeRef chips (inert until P3). URL-hash open state.
**Deps:** P1-T6. **AC:** `#decision-id` opens + scrolls + focuses; keyboard operable; reduced-motion = instant expand.

### P2-T3 ✍️ · AI Code Reviewer — full System authoring — **P0**
Restructure existing rich copy into the schema: 4–6 decisions (agent loop vs framework, hybrid retrieval composition, eval-gating, cost routing, injection defense) each with alternatives + cost; provenance-correct metrics; evidence links (repo); lessons incl. a real cost.
**Deps:** P2-T1/T2; draft by agent, facts verified by human. **AC:** Showcase §5 DoD; the case study reads per CS §3 spine.

### P2-T4 ✍️ · Multi-Agent Customer Ops Platform — new System — **P0**
Author from resume evidence under the confidentiality protocol (CS §3): abstracted architecture description, scope-fact metrics only, visible confidentiality note, role-scoped contribution ("led frontend re-architecture", "observability/security baseline").
**Deps:** P2-T1/T2; human confidentiality review **mandatory**. **AC:** Showcase §5 DoD; nothing exceeds the resume's public phrasing; employer not named beyond resume usage.

### P2-T5 ✍️ · Telecom POS Platform — new System — **P0**
Same protocol: RN Web single-codebase decision, Redux Toolkit transactional-flow design, BFF + tenant-aware pipelines; scope-facts ("hundreds of terminals").
**Deps:** P2-T1/T2; human review. **AC:** Showcase §5 DoD.

### P2-T6 ✍️ · Tier-2 rewrites + Tier-3 archive — **P1**
HMS, AI Automation Hub (verify claims ✍️ — demote to Tier 3 if evidence thin), Roofing CRM in Tier-2 shape (business outcomes first); Learning Portal, Transit Claims, Accessible Chat as archive rows (promote Accessible Chat if a11y evidence is real ✍️).
**Deps:** P2-T1. **AC:** every published metric provenance-labeled; archive rows render on Work index.

### P2-T7 · New Home page — **P0**
S1–S5 per UX §1 with CS §2 copy: hero (from P1-T5, copy final), flagship `SystemCard`s with dual actions, How-I-Work pillars with evidence links, series-aware notes preview, split contact band. Stats trio removed.
**Deps:** P2-T3/T4/T5 (cards need real theses). **AC:** all four persona routes reachable from screens 1–2; copy matches CS §2 verbatim or human-approved variant.

### P2-T8 ✍️ · About page reframing — **P1**
Timeline scope lines, pillar-grouped SkillsGrid, "How I lead" block, narrative arc copy.
**Deps:** none. **AC:** CS §5 points covered; no consistency-ledger violations.

### P2-T9 · Sitewide copy & metadata sweep — **P1**
Titles/descriptions per route with positioning title; OG descriptions; footer; 404 copy; `siteConfig` tagline replaced.
**Deps:** P2-T7. **AC:** metadata unique per route within length limits; grep finds no legacy tagline.
