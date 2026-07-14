# UX Specification (wireframe-level)

Structure only — no visual mockups. Section order is normative; an implementation agent should treat each block list as the component sequence for that route. Shared chrome (Navbar, Footer, ⌘K search, ScrollProgress on long-form pages, BackToTop) applies everywhere unless noted.

---

## 1. Home `/`

**Purpose:** state the thesis in 5 seconds; route all four personas without scrolling past screen 2.

```
┌──────────────────────────────────────────────────────┐
│ S1 HERO (≤ 90vh, no 3D scene)                        │
│  - Identity line: "I build AI systems that survive   │
│    production."                                      │
│  - Support line (stack + specialization)             │
│  - "Now" ticker: current role + current build with   │
│    live phase status (from content, not hardcoded)   │
│  - CTAs: [Explore the AI Code Reviewer] [Resume]     │
│  - Background: static/CSS system-diagram motif that  │
│    is the brand mark (see Design System §7)          │
├──────────────────────────────────────────────────────┤
│ S2 FLAGSHIP SYSTEMS (3 Tier-1 cards)                 │
│  Each card: name · one-line thesis · 3 hard-skill    │
│  chips · status badge (Production / Building·Phase n)│
│  · two actions: [Case study] [Architecture →]        │
├──────────────────────────────────────────────────────┤
│ S3 HOW I WORK (replaces TechStackBar-as-logo-wall)   │
│  3 columns mapping to proof pillars: Agentic systems │
│  / Retrieval & evals / Product platforms — each with │
│  one sentence + one evidence link                    │
├──────────────────────────────────────────────────────┤
│ S4 LATEST NOTES (3 cards, series-aware: "Part 2 of   │
│  Building the AI Code Reviewer")                     │
├──────────────────────────────────────────────────────┤
│ S5 CONTACT BAND — split CTA: "Hiring?" → /resume +   │
│  /contact?type=role · "Building something?" →        │
│  /contact?type=project                               │
└──────────────────────────────────────────────────────┘
```

Interactions: card hover reveals the explorer affordance; "Now" ticker is static text (no marquee). Stats trio ("4.75 years") is removed — scope evidence lives in cards, not vanity counters.

## 2. Work index `/projects`

**Purpose:** breadth with a credibility hierarchy; never a flat grid of equals.

- S1 Header: title "Work", one-line framing, facet filters (`domain`, `context`) as toggle chips bound to URL params (existing pattern retained).
- S2 **Tier 1 — Systems**: full-width rows (not cards): name, thesis, architecture micro-diagram thumbnail (static SVG render of the model), status, stack chips, [Case study] [Explorer].
- S3 **Tier 2 — Production work**: 3-up cards, business outcome first.
- S4 **Tier 3 — Archive**: compact list rows (year · name · one-liner · stack); expandable inline or slim detail pages.
- Empty-filter state: friendly reset, never zero-content screen.

## 3. Case Study `/projects/[slug]` (template for Showcase Framework)

**Purpose:** demonstrate judgment. Long-form, single column, ToC rail on xl+ (reuse blog `TableOfContents`).

Sequence (sections map 1:1 to the framework in `docs/architecture/02-project-showcase-framework.md`):
1. **Header** — title, thesis, role, timeline, status badge, stack chips, links (GitHub/live). Confidentiality note if employer work.
2. **TL;DR strip** — 3–4 outcome/scope facts in a metric row (each with evidence type tag: measured / target / scope-fact).
3. **Context & problem** — business situation, why it was hard.
4. **Constraints** — explicit list (budget, latency, compliance, team).
5. **Architecture** — embedded **Explorer** (interactive on xl, static SVG + "Open full explorer" below xl). Anchor `#explorer`.
6. **Decisions** — 3–6 decision records, each an expandable block: *Decision / Alternatives considered / Why / What it cost us*. Deep-linkable anchors.
7. **Outcomes & evidence** — metrics with provenance labels; screenshots/diagrams gallery where they exist; honest "what's not done."
8. **Lessons** — 2–4 first-person paragraphs.
9. **Footer nav** — related notes, prev/next system, contact band.

Tier-2 variant: same template, sections 5–6 collapsed by default, business outcomes promoted above architecture. Tier-3: no dedicated page or header+TLDR+lessons only.

## 4. Architecture Explorer `/explorer/[slug]`

Full spec in `docs/architecture/03-architecture-explorer-spec.md`. UX summary:

```
┌────────────────────────────────────────────── ────────┐
│ Toolbar: system name · layer tabs (Context/Container/ │
│ Flow) · flow selector · [Reset] [Share link] [Case    │
│ study ↗]                                              │
├───────────────────────────────┬───────────────────────┤
│ CANVAS (pan/zoom diagram)     │ INSPECTOR PANEL       │
│  nodes, groups, edges;        │  selected node: what  │
│  active flow highlights path  │  it is · tech · why   │
│  with numbered steps          │  it exists · tradeoffs│
│                               │  · linked decisions & │
│                               │  notes                │
├───────────────────────────────┴───────────────────────┤
│ FLOW STEPPER: ◀ step 3/7 ▶  caption for current step  │
└────────────────────────────────────────────────────────┘
```

- Mobile/tablet: canvas becomes vertically scrollable static diagram; inspector becomes bottom sheet; stepper persists. Interactivity degrades, content never does.
- Keyboard: full traversal (arrows between nodes, Enter to inspect, [/] to step flows). Every state URL-addressable (`?node=`, `?flow=&step=`).

## 5. Notes `/notes`, `/notes/[slug]`

- Index: featured series banner ("Building the AI Code Reviewer — parts 1–n in order") above the chronological grid; category filter chips (existing pattern); reading time shown.
- Detail (existing blog detail evolves): add series prev/next rail, "System under discussion" card after intro, decision-record and explorer deep links rendered as rich inline cards (MDX components). Code blocks already Shiki-highlighted — keep.

## 6. About `/about`

Existing structure (AboutHero, Timeline, SkillsGrid, Certifications) retained with content reframing: timeline entries get "scope" lines (team size, terminal counts); SkillsGrid grouped by the three pillars instead of alphabet soup; add a short "How I lead" block (Elsys evidence). Photo stays.

## 7. Resume `/resume` (new)

- S1: name/title header + two sticky actions: [Download PDF] [Contact].
- S2: structured sections mirroring the PDF exactly (summary, skills, experience, key projects, languages) rendered from a typed `resume.ts` content module — single source shared with the PDF to prevent drift (content task).
- S3: "Want the full story?" links to the three flagship case studies.
- Print stylesheet: page prints cleanly as a one-page resume.

## 8. Contact `/contact`

Existing form retained (react-hook-form + Zod + honeypot + Resend) with: inquiry type selector (`role` / `project` / `other`) prefillable via query param; timezone + response-time expectation line ("IST, replies within 24h"); direct channels (email, WhatsApp, LinkedIn) given equal visual rank to the form. Budget field stays hidden (back-compat note in CLAUDE.md respected).

## 9. Search (⌘K overlay + `/search`)

- Overlay: input → grouped results (Systems / Notes / Decisions) with type icons, keyboard navigable, recent-queries-free (no storage).
- Result targets include deep anchors (decision records, explorer nodes).
- `/search?q=` server-rendered fallback listing the same results.

## 10. Global UX rules

- Every page reachable in ≤ 2 clicks from Home; Home reachable in 1 from everywhere (logo).
- No interaction may trap scroll or hijack expected gestures (Lenis removed — Motion System §5).
- All interactive affordances visible without hover on touch devices.
- Loading: static-first pages render instantly; explorer canvas lazy-loads below the fold with a meaningful skeleton (diagram silhouette, not spinner).
- 404 page suggests nearest content (search-powered).
