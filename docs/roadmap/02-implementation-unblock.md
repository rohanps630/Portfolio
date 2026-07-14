# Implementation Unblock — Decoupling the Lab from ACR Refinement

**Date:** 2026-06-12 · **Status:** BINDING addendum to `roadmap.md` (blueprint otherwise frozen). Purpose: development begins immediately; ACR polish (frontier evals, demo assets, README, branch merge) proceeds in parallel and converges only at the **launch gate**, never at a development gate.

---

## Task 1 — Blocker analysis

### Hard blockers (block dev today): **none.**
The five open decisions from the review panel (accent hue, brand motif, mono font, resume sourcing, employer approval) are all PR-sized or have planned fallbacks. The motif is the only one touching early work (P1-T5) and its fallback (typographic hero) is pre-approved.

### Soft blockers (block one task/section, not the phase)
| Item | What it blocks | Resolution |
|---|---|---|
| Screenshots S1–S8 not captured | Case-study gallery, explorer inspector evidence | Gallery renders conditionally on empty `screenshots` — a state the design **already requires** for employer systems. Zero placeholder needed |
| Frontier-model eval run absent | One outcomes line ("measured cost/score") | Ship with `[target]`/`[in progress]` provenance tags; flip to `[measured]` when the run lands. The provenance system was built for exactly this |
| GitHub branch unmerged | One qualifier sentence + screenshot S4 | Copy ships with the "merging" qualifier from the disclosure guide; drop it post-merge |
| Demo video absent | Homepage/case-study media slot | Optional field; slot renders nothing until populated |
| Employer sign-off pending | Publishing P2-T4/T5 content (not authoring, not templates) | Templates are fixture-driven; drafting can proceed; publication waits; fallback already planned (review §Task 6 readiness) |

### Assumed blockers that are false
1. *"ACR case-study copy can't be written until ACR work finishes."* **False** — `docs/projects/ai-code-reviewer-portfolio-content.md` is complete, evidence-backed, drop-in copy as of today. Only two ⚠️ inline items wait on the author.
2. *"The explorer needs final ACR assets."* **False** — the renderer is pure schema→SVG built against fixtures (P3 plan already says so), and the real model's content source is `ai-code-reviewer-architecture.md`, which **exists**. Nothing about the explorer waits.
3. *"Case-study template needs real systems to be built."* **False** — fixtures drive P2-T1/T2; the no-screenshot, no-measured-metric states are first-class designs, not degraded ones.
4. *"Metrics need production data."* **False** — most ACR metrics are already measured facts (426 tests, $0.50 cap, baseline eval scores); only the frontier-cost figure is future.

### One urgent non-blocker (flagged, not gating the Lab)
The **live production site currently publishes the five false claims** (50+ OSS PRs, Modal, $0.20, get_pr_discussion, injection logging). This is independent of the redesign: hotfix the live `ai-code-reviewer.ts` copy now (extends P0-T5). Also: **PAT rotation** is a do-today security action, zero coupling to development.

## Task 2 — ACR assumption model (formal)

Development designs against this future state; every assumption has a violation fallback so launch cannot slip on ACR work.

| # | Assumption | Consumed by | If violated at launch |
|---|---|---|---|
| A1 | The ten `docs/projects/ai-code-reviewer-*` docs are **canonical**; no site claim may exceed them. New ACR facts enter the site only via an update to those docs first | All ACR content | n/a — standing rule, not falsifiable |
| A2 | The five claim corrections are applied before launch (and to the live site now) | Claim audit §Required actions | Hard gate — no fallback; this one *is* allowed to block launch |
| A3 | ≥1 frontier-model eval run committed before launch | One outcomes line; demo narrative arc | Line ships as `[in progress]`; the below-bar baseline alone still carries the eval story |
| A4 | Demo assets (S1–S3 minimum, 2-min video) exist before launch | Case-study gallery, home media slot | Slots render empty; launch proceeds; assets fast-follow |
| A5 | Branch-merge decision made before launch | GitHub-delivery copy qualifier | Qualifier stays; claim remains 🟡-class per disclosure guide |
| A6 | PAT rotated before any publicity | Everything | Hard gate — security, no fallback |
| A7 | Portfolio ACR content is generated from `ai-code-reviewer-portfolio-content.md`, not rewritten from memory | P2 content tasks | n/a — standing rule |

## Task 3 — Decoupling map (dependency → contract)

| Former dependency | Replacement | Where defined |
|---|---|---|
| Final ACR copy | **Available now** (A7 source doc); two ⚠️ author confirmations deferred via `[in progress]` tags | portfolio-content doc |
| Screenshots | `screenshots: Screenshot[]` (existing, optional) + conditional gallery; **no fake/placeholder images ever** — empty means absent | System schema |
| Demo video | `media?: { kind: "video"; src: string; poster?: string }` — optional field added to the System content contract (contract addition, not a feature) | Task 4 contract |
| Measured cost/eval metrics | `MetricFact.provenance` flip rule: authored as `target`/`in progress` today, flipped to `measured` + value when A3 lands. Flip = content commit, no code change | Showcase Framework |
| Explorer node evidence (trace screenshots, repoPath) | `repoPath` per node available now (repo is public, paths stable); trace screenshot = optional inspector evidence link, omitted until captured | Explorer spec + Task 5 |
| Built-vs-planned truth | `Node.status: "built" \| "planned"` populated **today** from the capability matrix; branch-only components = `built` + inspector note "on feature branch, merging" | Capability matrix |
| ACR README polish | No site dependency — site links to repo root + stable file paths only | — |
| Fixtures | `/dev/kit` fixtures page (already planned, P1-T6) + one fixture System + one fixture ArchitectureModel exercising every schema state incl. empty-media and planned-node states | P1/P3 tasks |

## Task 4 — Content contract: AI Code Reviewer System record

**Required for development (all available today — sourced from the audit docs):**
`slug, title, thesis, tier: 1, domain: ai-systems, context: independent, status: {kind: building, phase-truth per audit}, role, timeline, executiveSummary, businessContext, problemStatement, constraints[≥3], solutionOverview, decisions[≥3 with costs] (5 drafted in portfolio-content doc), outcomes[≥3 provenance-tagged], evidence[≥1: GitHub repo], techStack, architectureRef`.

**Optional (slot renders conditionally; populate when captured):** `screenshots[]` (S1–S8), `media` (2-min video), lessons final author-voice pass, Langfuse trace evidence link.

**Future (post-A3/A5; flip-don't-rewrite):** frontier-eval `[measured]` outcome; cost-per-review `[measured]` outcome; unqualified GitHub-delivery claim + S4 screenshot.

**Placeholder strategy:** none for text (real audited content exists — lorem ipsum is banned); absence for media (slots collapse); provenance tags for not-yet-measured numbers. **Acceptance criteria:** validates against System schema; contains zero ❌-class claims from the claim audit; every metric tagged; every claim traceable to an audit doc; renders correctly with media empty.

## Task 5 — Explorer readiness: **YES**

The final architecture is preserved while building entirely without finished ACR assets:

1. **Build order (per existing P3 tasks, unchanged):** schema + validation → `DiagramSvg` + text equivalent against a **fixture model** → canvas/inspector/stepper → routes. The fixture model must include: both layers, 2 flows, a `planned` node, a node with empty optional evidence, a `conceptual`-disclosure variant (exercises P3-T11).
2. **Real ACR model authoring is NOT blocked** — it transcribes `ai-code-reviewer-architecture.md` §1–2 into the schema: nodes (web route, caches, runtime, providers, tools, retrieval stages, Postgres, indexer, Langfuse/Sentry), edges, the two specced flows ("review request end-to-end" = audit §2 data flow; "index & eval pipeline"), `status` from the capability matrix, `repoPath` per node, inspector rationale/tradeoffs condensed from the audit + portfolio-content decisions. This is a content task executable today, in parallel with renderer development.
3. **Placeholders that are acceptable:** fixture nodes during framework dev; omitted screenshots/traces in inspectors. **Not acceptable:** invented metrics in node text, mock Langfuse imagery, fake GitHub screenshots.
4. Guidance: keep the fixture model permanently (it's the renderer's regression test), and diff the real model against the capability matrix in review — any node the matrix calls PLANNED must carry `status: "planned"`.

## Task 6 — Phase reordering (within frozen scope)

Launch scope = review-panel Must-Have list, unchanged. Ordering updated so every ACR-finalization item sits at the **latest** position:

| Order | Work | ACR dependency |
|---|---|---|
| **Now (parallel, day 1)** | Phase 0 entire + live-site claim hotfix (P0-T5 extended with the five ❌ corrections) + PAT rotation (external) | none |
| **Track A — Platform** | Phase 1: schema, motion removals, perf reset, tokens/lab kit, hero (motif or fallback), `/resume`, tiered Work index | none |
| **Track B — Showcase framework** | P2-T1/T2 template + DecisionRecord on fixtures → then drop in ACR record (text available now) → Home (P2-T7) → About | text: none · media: deferred slots |
| **Track C — Explorer framework** | P3-T1→T7 + T11 on fixture model; **ACR model authoring runs parallel as content** (Task 5.2) | none |
| **Late (content drops, non-blocking)** | Employer case studies + conceptual model (post sign-off); screenshots S1–S3; provenance flips (post-A3); GitHub-claim unqualification (post-A5); demo video embed | by definition — these *are* the parallel ACR/human work |
| **Launch gate (checklist, not phase)** | A2 + A6 hard gates · a11y manual matrix · field perf window · A3/A4/A5 **or** their documented fallbacks | converges here |

Tracks A/B/C have no cross-dependencies until ACR-record drop-in (B) and model drop-in (C), both of which consume already-existing audit documents.

## Task 7 — Implementation green light

1. **Begin immediately:** everything in "Now" + all three tracks — i.e., 100% of Phase 0–1 and all framework work of Phases 2–3, plus ACR record + explorer model authoring from audit docs.
2. **Defer:** media capture, frontier-dependent copy flips, GitHub claim unqualification, employer-content publication, demo embedding. None of these has a code dependency.
3. **Required before launch:** PAT rotation (A6), five claim corrections (A2), employer sign-off or fallback, S1–S3 or empty-slot launch decision, a11y matrix, perf field window.
4. **NOT required before development:** any screenshot, any video, the frontier eval run, the branch merge, README polish, ACR deployment.
5. **Is the implementation agent (Antigravity) cleared to begin today? — YES.** No hard development blockers exist. First commits: P0-T1 (repo hygiene), P0-T5-extended (live-site claim hotfix), P0-T2/T3 (schemas + validation). The only same-day human actions requested: rotate the PAT and make the four PR-sized decisions when their PRs arrive (motif may use the approved fallback without waiting).

**Verdict: GREEN.** The decisive fact: the ACR audit didn't create a content dependency — it *discharged* one. Text content for the flagship exists today; everything still in flight is media or a provenance flip, and the schema was designed to ship honestly without both.
