# Phase 3 Tasks — Architecture Explorer

---

### P3-T1 · ArchitectureModel schema + validation — **P0**
`lib/schemas/architecture.ts` per Explorer spec §2 with all referential checks (edge endpoints, step refs, decisionRefs into the owning System, position bounds, rationale/tradeoff requirements).
**Deps:** P1-T1. **AC:** fixture model validates; each rule has a failing-fixture test in validate-content.

### P3-T2 · `DiagramSvg` server renderer — **P0**
Pure model→SVG: kind-styled nodes, curved labeled edges with arrowheads, dashed groups, theme via CSS variables, layer parameter. Plus `DiagramThumb` (scaled, label-reduced) and OG-image usage hook.
**Deps:** P3-T1. **AC:** snapshot tests per fixture/layer/theme; renders with JS disabled; no client deps.

### P3-T3 · `ExplorerTextEquivalent` — **P0**
Generated structured prose/lists (per layer, per flow, per node incl. rationale/tradeoffs) from the same model; rendered server-side beneath/behind the canvas per a11y strategy.
**Deps:** P3-T1. **AC:** content parity checklist vs model fields; visible no-JS; indexed by Pagefind in P4.

### P3-T4 · `ExplorerCanvas` interactions — **P0**
Hydrates over SSR SVG: pan/zoom (bounded, transform-only), node selection + neighbor emphasis + 40% dim, layer crossfade with shared-node morph, single-pulse flow highlight. URL params as state source (`layer/flow/step/node`).
**Deps:** P3-T2. **AC:** Explorer spec §4 table fully implemented for mouse + touch; 60fps pan on mid-tier hardware; chunk ≤35KB gz lazy.

### P3-T5 · `NodeInspector` + `FlowStepper` — **P0**
Panel/sheet per UX §4 with decision/note links; stepper with aria-live captions, keyboard `[`/`]`, final-step "Why this design →" pointer.
**Deps:** P3-T4, P2-T2 (anchors). **AC:** inspector links land on opened decision records; mobile sheet usable; axe-clean.

### P3-T6 · Keyboard model + help — **P1**
Full traversal per a11y strategy (arrows/Enter/Esc/±/?), `role="application"` containment, focus management.
**Deps:** P3-T4/T5. **AC:** J1 journey completable keyboard-only through the explorer; `?` popover documents bindings.

### P3-T7 · Routes & embedding — **P0**
`/explorer/[slug]` (toolbar, full viewport, share link, only for systems with models) + embedded mode in Case Study architecture section (intersection-lazy, "Open full explorer"); below-lg degradation per UX §4.
**Deps:** P3-T2..T5. **AC:** deep links restore exact state; 404 for model-less slugs; embed doesn't affect case-study LCP.

### P3-T8 ✍️ · AI Code Reviewer model authoring — **P0**
≥12 nodes, context+container layers, flows "PR review end-to-end" + "Index & eval pipeline", full rationale/tradeoffs/decisionRefs.
**Deps:** P3-T1, P2-T3. **AC:** Explorer spec §8 criterion 1; human fact review.

### P3-T9 · Analytics bootstrap (pulled forward) — **P1**
`lib/analytics.ts` wrapper + Vercel Analytics/Speed Insights + explorer events (`explorer_open`, `flow_step` sampled, `node_inspect`) and `decision_expand`.
**Deps:** P3-T4/T5, P2-T2. **AC:** events visible in dashboard from production; wrapper no-ops in dev; no PII props possible by type.

### P3-T10 ✍️ · Multi-Agent Ops conceptual model (3b — post-deploy content) — **P1**
*(Amended 2026-06-12 per `content/05-showcase-strategy-final.md` §4.)* Author the Multi-Agent Ops model in **conceptual mode** per `content/03` §2.2 and `content/04` Part 1: single C1 pattern layer, 1–2 pattern flows, illustrative-tagged labels, no metrics/repo links. **Telecom POS explorer model is out of scope for v1** — it ships static C1/C2 diagrams in its case study; revisit only if `explorer_open` analytics justify it.
**Deps:** P3-T8 shipped (format validated), P3-T11. **AC:** human confidentiality sign-off (three-question test per `content/02` §1); validation green; thumbnail appears on Work index.

### P3-T11 · `disclosure` mode support — **P1**
Add `disclosure: "full" | "conceptual"` to ArchitectureModel; conceptual-mode affordances: persistent "Conceptual reconstruction" toolbar banner, single-layer rendering (no layer tabs), `illustrative` label tag, inspector without metrics/repo links; full-mode affordance: per-node `repoPath` evidence links to GitHub source.
**Deps:** P3-T1..T5. **AC:** both modes render from fixtures; conceptual fixtures with a container layer or repoPath fail validation.
