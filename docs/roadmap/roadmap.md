# Implementation Roadmap

> **⚠️ Amended 2026-06-12 — read with two binding addenda:** (1) the [Review Panel Verdict](../review/01-review-panel-verdict.md) (launch scope = its Must-Have list; kill-list cuts apply); (2) the [Implementation Unblock](02-implementation-unblock.md) (parallel-track ordering; ACR work converges at the launch gate, not at development gates; implementation is cleared to start immediately).

**Operating principle:** every phase ends with a complete, deployable, *better* site. No phase leaves a half-built surface in production. Phases are sequenced by dependency and by credibility-per-effort. Task-level breakdowns: `/docs/tasks/phase-N-tasks.md`.

An implementation AI agent executes phases in order; within a phase, tasks list their own dependencies. Content-authoring tasks (marked ✍️ in task files) need the human's input/review — they are the schedule risk, so each phase front-loads them.

---

## Phase 0 — Foundation & Hygiene

**Goal:** make the repo worthy of the thesis before anything visible changes.
**Deliverables:** docx files removed from git + .gitignore hardened; `data/portfolio.db*` deleted; Zod content schemas + `scripts/validate-content.ts` wired into build; CI pipeline (typecheck, lint+jsx-a11y, validate-content, build, Playwright+axe smoke, Lighthouse CI with *current-state* baseline budgets); factual-consistency fixes that need no redesign (years, tech-bar cleanup, cost-figure framing).
**Dependencies:** none. **Risks:** CI flakiness on Lighthouse (mitigate: 3-run median).
**Acceptance:** CI green on main; budgets recorded; consistency ledger items C1–C4 (content strategy §7) resolved on the live site.
**DoD:** deployed; site visually unchanged except corrected copy.

## Phase 1 — Data Model & Performance Reset

**Goal:** swap the skeleton: System schema, motion removals, new perf budgets.
**Deliverables:** `System`/`DecisionRecord`/`MetricFact` schemas + migration of all 7 existing projects (mechanical restructure; copy polish comes in Phase 2); tier model rendering on Work index; removal of Three.js stack, Lenis, six decorative components; static hero with brand motif v1; target budgets (perf doc §1) activated in CI; `/resume` page from `resume.ts` ✍️; mono font added.
**Dependencies:** Phase 0 (schemas, CI). **Risks:** hero redesign is the most subjective task — timebox it; motif can iterate.
**Acceptance:** home JS ≤150KB gz; all routes render from new schema; `/resume` live with print stylesheet; Lighthouse ≥95/100/95/100.
**DoD:** deployed; no decorative-motion components in bundle; old `Project` type deleted.

## Phase 2 — Flagship Content & Showcase Framework

**Goal:** the site finally shows the strongest evidence.
**Deliverables:** Case Study v2 template (all 9 sections, tier-conditional); ✍️ AI Code Reviewer restructured into full System (decisions with costs, provenance-labeled metrics); ✍️ **two new flagship case studies** (Multi-Agent Ops — confidentiality-protocol applied; Telecom POS); ✍️ Tier-2 rewrites (HMS, Automation Hub, Roofing CRM) + Tier-3 archive rows; new Home (S1–S5 per UX spec); positioning copy sitewide; About reframing ✍️.
**Dependencies:** Phase 1 (schema, template primitives). **Risks:** content authoring volume — the human bottleneck; mitigation: agent drafts from resume + repo evidence, human verifies facts/confidentiality.
**Acceptance:** 3 Tier-1 case studies live with decision records; zero provenance-unlabeled metrics; homepage states the thesis per content strategy §2; Showcase DoD met per system.
**DoD:** deployed; this phase alone is a transformed portfolio even if nothing later ships.

## Phase 3 — Architecture Explorer

**Goal:** ship the differentiator.
**Deliverables:** ArchitectureModel schema + validation; `DiagramSvg` (SSR) + text equivalent + `DiagramThumb`; `ExplorerCanvas`/`NodeInspector`/`FlowStepper` with full keyboard + URL state; embedded mode in case studies + `/explorer/[slug]`; ✍️ AI Code Reviewer model (≥12 nodes, 2 layers, 2 flows); analytics events live (requires the small analytics setup from Phase 4 pulled forward — see task file).
**Dependencies:** Phase 2 (case-study template hosts the embed; decision anchors exist).
**Risks:** scope creep (fence: explorer spec §7); a11y complexity (text equivalent is generated, mitigating drift).
**Acceptance:** explorer spec §8 criteria 1–4 in full; explorer chunk ≤35KB; axe-clean.
**DoD:** deployed with one flagship model; ✍️ the two abstracted enterprise models follow as content tasks (3b) without code changes.

## Phase 4 — Notes, Search & Connective Tissue

**Goal:** turn pages into a graph.
**Deliverables:** `/blog→/notes` migration with 301s + RSS; series infrastructure + "Building the AI Code Reviewer" hub; cross-link components (RelatedSystem, RelatedNotes, decision/explorer inline cards in MDX); Pagefind + CommandPalette + `/search`; ✍️ notes triage (unpublish commodity posts) + 2 new technique notes from the pipeline; full analytics event schema + monthly review doc.
**Dependencies:** Phases 2–3 (link targets must exist). **Risks:** redirect mistakes (CI link-check gate).
**Acceptance:** zero 404s from old URLs; search returns grouped results incl. decision anchors; every Tier-1 system shows related notes and vice versa.
**DoD:** deployed; IA §3 "no orphan content" rule enforced in CI.

## Phase 5 — Polish, Recursion & Launch

**Goal:** the details that make it feel inevitable.
**Deliverables:** colophon (stack, budgets, a11y, analytics disclosure, live scores) ✍️; OG images per content type from brand motif; full a11y manual matrix (keyboard + VoiceOver per route) executed and fixed; final motion pass with per-animation justification appendix; contact inquiry-type flow; 404-with-search; field CWV verification (2 weeks); launch announcement note ✍️.
**Dependencies:** everything. **Risks:** none structural; this phase is cuttable-to-fit except the a11y matrix (gate).
**Acceptance:** Product Vision G4/G5 gates green; accessibility strategy §4 criteria 1–5 pass; analytics answering Q1–Q3 with real data.
**DoD:** launched; postmortem note comparing outcomes to this roadmap.

---

## Sequencing rationale & cut lines

- Phases 0–2 deliver ~70% of the positioning value (right evidence, right copy, fast site) — if energy stalls, stopping after Phase 2 still leaves a coherent, superior portfolio.
- The explorer (3) lands only after the case studies exist because it links *into* decisions; building it first would create the orphaned gimmick this blueprint exists to avoid.
- Search/graph (4) before polish (5): connective tissue compounds the value of everything already shipped; polish doesn't.
