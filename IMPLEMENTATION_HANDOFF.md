# IMPLEMENTATION HANDOFF — Engineering Lab ("The Lab")

**Date:** 2026-06-12 · **From:** Principal Engineering review (blueprint authors) · **To:** implementation engineer/agent
**Status: 🟢 CLEARED TO BUILD TODAY.** This is the single entry document. It consolidates; it does not redesign. Where it summarizes, the linked source document is canonical.

---

## 0. Document precedence (conflict resolution order)

1. [Review Panel Verdict](docs/review/01-review-panel-verdict.md) — **[BINDING]** cuts/amendments override everything below
2. [Implementation Unblock](docs/roadmap/02-implementation-unblock.md) — **[BINDING]** ordering, assumption model, content contracts
3. The ten [ACR audit docs](docs/projects/) — canonical for every AI Code Reviewer fact; no site claim may exceed them
4. ADRs ([docs/adrs/](docs/adrs/README.md)) — binding decisions; ADR-008 (search) is **Deferred**
5. Specs (design/, architecture/, content/) — implementation detail
6. Full index: [docs/README.md](docs/README.md)

Standing rule: deviations require amending the relevant ADR/doc first, not silent divergence.

## 1. Executive summary

Transform the existing portfolio (Next.js 16 / React 19 / Tailwind 4 / Bun, fully static, content-as-code) into an **interactive engineering showcase** positioned as: *"Full-stack engineer who ships production AI systems — I build AI systems that survive production."* The differentiator is a **trust architecture**: provenance-labeled metrics, decision records with mandatory costs, visible confidentiality handling, evidence-strength ordering (verifiable AI Code Reviewer first, abstracted employer systems after), and an **Architecture Explorer** (custom SSR-SVG, two disclosure modes). The site itself is exhibit zero: perf/a11y budgets are CI-enforced launch gates.

## 2. Current state

- **Live site:** conventional 5-page portfolio, good hygiene, **currently publishing five false ACR claims** (50+ OSS PRs, Modal, <$0.20/review, `get_pr_discussion`, injection logging) — hotfix is part of day-1 work (P0-T5 extended).
- **Blueprint:** complete and frozen — product/design/architecture/content strategies, 10 ADRs, roadmap, task files, confidentiality protocol, adversarial review, ACR evidence audit.
- **ACR repo** (`~/Work/Personal/ai-code-reviewer`): far stronger than the live copy implies — agent runtime, hybrid retrieval, eval harness **with committed below-bar baseline**, caching, injection defense, 426 tests. GitHub delivery on unmerged branch. Launch-grade replacement copy already exists: [portfolio-content](docs/projects/ai-code-reviewer-portfolio-content.md).
- **Parallel (non-blocking) human work:** PAT rotation ⚠️ (security, do first), frontier eval run, screenshots/video, branch merge decision, employer sign-offs, LinkedIn recommendations.
- **Cognition ecosystem:** no Engram entry exists for this project yet (worth adopting after Phase 0 to record these decisions — `engram/ENGRAM_PROMPT.md`). Relevant Cortex skills to install-and-adapt before writing code (Mode A, `cortex/CORTEX_PROMPT.md`): `web/react-best-practices`, `web/composition-patterns`, `ui/design-system`, `ui/ui-styling`, `ui/ui-ux-guidelines`, `universal/engineering-guidelines`. Adapt to this stack; never paste verbatim.

## 3. Scope boundaries (launch = Must-Have list, review verdict Task 4)

**IN (launch):** Phase 0 hygiene + CI gates · System schema + provenance + migration of 7 projects · motion removals + perf reset · new Home · `/resume` · 3 flagship case studies (ACR phase-honest + 2 employer-profile) · tiered Work index · ACR explorer **full mode** (code-linked nodes) + Multi-Agent **conceptual mode** model · minimal analytics (pageviews, `explorer_open`, `decision_expand`) · a11y AA.
**FAST-FOLLOW (post-launch):** notes triage + series banner, cross-link components, contact inquiry typing, single OG template, About reframe, conceptual-model publication if sign-off lags, technique notes, colophon.
**OUT until demand-proven:** search stack, POS explorer, series hub routes, RSS, 404-search.

## 4. Kill list (already cut — do not build)

Search stack v1 (Pagefind/⌘K/`/search`; ADR-008 Deferred, trigger: ≥30 notes) · POS conceptual explorer · explorer layer-morph animation (plain 200ms crossfade instead) · series hub routes · colophon v1 page (3 footer sentences suffice) · OG image variants (one template) · `/work` alias · AnimatedCounter · word-budget validation tooling · live-score colophon automation · RSS/404-search at launch · Three.js stack, Lenis, MagneticButton, TiltCard, CursorSpotlight, TextScramble, ParallaxWrapper (delete, don't deprecate).

## 5. Non-goals (permanent, from vision/specs)

No CMS, database, or auth — content-as-code is part of the demonstration. No fabricated evidence of any kind (metrics, testimonials, logos, screenshots, lorem ipsum). No decorative motion. No auto-layout/graph-library for the explorer; no user-editable diagrams; max 2 layers; no minimap. No C3 diagrams (real topology redrawn/renamed) for employer systems — pattern-level only, container layer omitted. No new strategy documents. Site never reveals more about employer systems than the public resume does.

## 6. Phase order (parallel tracks, per Implementation Unblock)

```
DAY 1 (all parallel):
  P0: repo hygiene (docx/db out of git), Zod schemas, validate-content,
      CI (typecheck/lint+jsx-a11y/content/build/Playwright+axe/Lighthouse baseline)
  HOTFIX: five false ACR claims on the LIVE site (P0-T5 extended)
  HUMAN: rotate ACR repo PAT (before any publicity)

TRACK A — Platform (Phase 1): System schema · migrate 7 projects (tiers per
  Showcase §4) · remove decorative-motion stack (−400KB+) · static hero
  (motif or approved typographic fallback) · lab-kit primitives batch 1 ·
  /resume · target perf budgets activated

TRACK B — Showcase (Phase 2): Case Study v2 template + DecisionRecord on
  FIXTURES → drop in ACR record (text exists today, media slots empty,
  provenance tags per content contract) → new Home → employer studies
  (draft now; publish after sign-off)

TRACK C — Explorer (Phase 3): schema+validation → DiagramSvg + text
  equivalent (fixture model) → canvas/inspector/stepper + keyboard →
  routes + embed → disclosure modes (P3-T11). ACR model authoring runs in
  parallel as content (transcribe ai-code-reviewer-architecture.md;
  node status from capability matrix; repoPath links)

LATE (content drops, non-blocking): screenshots S1–S3 · provenance flips
  (post frontier run) · GitHub-claim unqualification (post merge) ·
  conceptual model publication (post sign-off) · demo video embed

LAUNCH GATE (checklist, not a phase): see §10
```

## 7. Critical constraints (violations = review rejections)

1. **Honesty by construction:** every metric carries `measured | target | scope-fact` provenance, rendered; every ACR capability statement matches the [capability matrix](docs/projects/ai-code-reviewer-capability-matrix.md) (built vs planned, incl. explorer `Node.status`); every decision record has a non-optional `cost`; invented labels tagged `illustrative`.
2. **Confidentiality protocol** ([content/02](docs/content/02-confidentiality-audit.md)): resume = disclosure ceiling; pattern not instantiation; three-question test; visible framing notes; employer content never publishes without human sign-off.
3. **Performance budgets (CI-fail):** LCP ≤1.8s, INP ≤150ms, CLS ≤0.02, home JS ≤150KB gz, explorer chunk ≤35KB lazy, Lighthouse ≥95/100/95/100. New deps need a bundle-cost note.
4. **A11y:** WCAG 2.2 AA; axe zero serious/critical on all routes × both themes; explorer fully keyboard-operable with a generated text equivalent (same data source as the SVG); every animation honors `prefers-reduced-motion`.
5. **Stack rules:** Framer Motion only (≤600ms, transform/opacity, once-only); Tailwind 4 tokens in `@theme` (no `container` class); server components default, `"use client"` at leaves; content via `lib/content/*` accessors only; URL as state for explorer/filters; SSG everywhere except `/api/contact` + `/api/og`.
6. **Content placeholders:** none for text (real audited copy exists); media absence = collapsed slot; no fake imagery ever.

## 8. Known risks

| Risk | Mitigation (pre-agreed) |
|---|---|
| Brand motif design quality (biggest creative unknown) | Timebox one evening; **typographic fallback is pre-approved** — plain beats amateur-clever |
| Employer sign-off refused/slow | Publication decouples from authoring; fallback = pattern-only notes + richer About timeline; launch does not slip |
| Content authoring volume (human bottleneck) | Agent drafts from audit/resume; human verifies facts; ✍️ tasks front-loaded per phase |
| Blog→notes migration breaking URLs | 301 map + CI link-check + sitemap diff (and notes work is fast-follow, not launch) |
| ACR staff-level critiques (synthetic dataset, judge self-grading, 67% FP) | Not site blockers — framed honestly in copy; they're interview material by design |
| Solo capacity / blueprint volume | Phases independently shippable; stopping after Track B still ships a transformed site |

## 9. Open decisions (all PR-sized; none block start)

| # | Decision | Default if torn |
|---|---|---|
| D1 | Accent hue (keep indigo vs cyan-teal shift) | Keep indigo; decide in the tokens PR, 1-hour timebox |
| D2 | Brand motif execution | Typographic fallback |
| D3 | Mono font | JetBrains Mono, subset |
| D4 | Resume single-sourcing | Page mirrors hand-made PDF; consistency by review (no PDF generation) |
| D5 | ACR GitHub branch merge | Owner decision; until merged, copy keeps the "merging" qualifier |
| D6 | Launch with empty media slots vs wait for S1–S3 | Launch-gate call; empty slots are honest and acceptable |

## 10. Acceptance criteria (launch gate)

**Hard gates (no fallback):** PAT rotated (A6) · five false claims corrected everywhere (A2) · a11y manual matrix passed (keyboard + VoiceOver, all routes × themes × reduced-motion) · CI fully green against target budgets · zero factual inconsistencies vs resume (consistency ledger, [content/01 §7](docs/content/01-content-strategy.md)).
**Soft gates (ship with documented fallback):** frontier eval run (else `[in progress]` tags stay) · S1–S3 screenshots (else empty slots) · branch merge (else qualifier) · employer sign-off (else fallback content).
**Definition of success (qualitative):** a skeptical staff engineer can probe any ACR claim to source code and find it true; a recruiter reaches the resume in one click; nothing on the site asks to be taken on faith except what is explicitly labeled as such.
**Per-task ACs:** [docs/tasks/phase-N-tasks.md](docs/tasks/) (with review-verdict Part D amendments applied).

— End of handoff. First commits: P0-T1, P0-T5-extended, P0-T2/T3. Build.
