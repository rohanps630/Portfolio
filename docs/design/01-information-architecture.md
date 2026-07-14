# Information Architecture

**Principle:** evolve, don't churn. Existing routes keep their URLs (SEO continuity from the recent name-ranking work); new surfaces are added around them. Labels change; paths mostly don't.

---

## 1. Sitemap

```
/                       Home — "The Lab" landing
/work                   Systems index (alias → /projects via redirect; see §4)
/projects               Systems index (canonical URL, label rebranded "Work")
/projects/[slug]        Case Study v2 (engineering framework)
/projects/[slug]#explorer   Architecture Explorer embedded section (deep-linkable)
/explorer/[slug]        Full-screen Architecture Explorer (standalone, shareable)
/notes                  Engineering Notes index (NEW canonical; /blog 301 → /notes)
/notes/[slug]           Note detail (MDX)
/notes/series/[series]  Series index (e.g., "Building the AI Code Reviewer")
/about                  About — narrative, timeline, skills, leadership evidence
/resume                 Structured resume page + PDF download (NEW)
/contact                Contact — persona-aware (hiring vs project inquiry)
/search                 Search results fallback page (primary UX is ⌘K overlay)
/colophon               How this site is built (the recursion page; optional, Phase 5)
```

Removed/retired: none. `pageSections` visibility config and empty `testimonials/faqs/processSteps` are deleted from the schema (audit M7).

### Blog → Notes URL decision
The blog is young and its equity is minimal; `/notes` matches the lab identity and is worth one-time 301s now rather than living with `/blog` forever. All 12 existing posts 301 from `/blog/[slug]` → `/notes/[slug]`. Sitemap, RSS, and internal links updated atomically. (ADR-002.)

## 2. Navigation

**Primary nav (desktop, in order):** Work · Explorer · Notes · About · Resume — plus persistent `⌘K` search affordance and a visually distinct **Contact** button.
- "Resume" earns a top-level slot because P2 is a primary persona (J2 must be 1 click).
- "Explorer" in the nav routes to the flagship system's explorer (`/explorer/ai-code-reviewer`) — the differentiator deserves a front door.
- Mobile: same five items in sheet nav; search icon in header; Contact pinned at sheet bottom.

**Footer:** secondary paths (Colophon, RSS, GitHub, LinkedIn, email), mini-sitemap, "built with" line linking to Colophon.

## 3. Content relationships (the graph)

The IA's differentiating feature is **typed cross-linking** between the three content kinds:

```
System (project) 1 ──── 1 ArchitectureModel (explorer data)
System 1 ──── n DecisionRecord (embedded in case study, addressable by anchor)
System 1 ──── n Note (frontmatter: relatedProject)
Note n ──── n Note (series ordering via frontmatter: series, seriesOrder)
ArchitectureModel.node n ──── n DecisionRecord (node inspector links "why")
```

Rendering rules: every case study lists its related notes ("Field notes from this build"); every note shows a "System under discussion" card; every explorer node inspector links the decision records that justify it. No orphan content: CI fails if a published note references a missing project slug (content validation, audit M7).

## 4. Route & redirect rules

| Rule | Implementation |
|---|---|
| `/blog/:slug` → `/notes/:slug` | `next.config.ts` permanent redirects |
| `/blog` → `/notes` | permanent redirect |
| `/work` → `/projects` | permanent redirect (vanity alias used in copy) |
| `/projects?category=…` | retained; new facet values (see §5) |
| `/explorer/:slug` | only generated for systems with an `ArchitectureModel`; others 404 |

## 5. Taxonomy

Replace form-factor categories with **two orthogonal facets** on systems:

- `domain`: `ai-systems` · `platforms` · `products` (what kind of engineering story)
- `context`: `production` · `independent` · `client` (provenance/credibility class)

Tier model for presentation (drives ordering everywhere):
- **Tier 1 — Flagship systems** (full case study + explorer): AI Code Reviewer, Multi-Agent Customer Operations Platform, Telecom POS.
- **Tier 2 — Production work** (full case study, no explorer): Dental HMS, AI Automation Hub, Roofing CRM.
- **Tier 3 — Archive** (compact card, no dedicated page or a slim one): Learning Portal, Transit Claims, Accessible Chat. Keeps history without diluting (audit §8).

Notes keep the existing category set (`ai, architecture, react, mobile, devops, career, accessibility`) plus `series` frontmatter.

## 6. User flows (per persona)

**J1 hiring manager:** `/` → Systems section (3 flagship cards with "Explore architecture" affordance) → `/projects/ai-code-reviewer` → in-page explorer → node inspector → decision record → `/notes/[related]` → `/contact`. Escape hatches at every depth back to the Systems index. Breadcrumbs on all detail pages (component exists: `Breadcrumbs.tsx`).

**J2 recruiter:** `/` → nav "Resume" → `/resume` (structured sections mirror PDF; sticky "Download PDF" + "Contact" actions) → done. `/resume` also linked from hero secondary CTA.

**J3 client:** `/` → "Work" → facet `context=client` → Tier-2 case study (business framing first, architecture collapsed) → `/contact?type=project` (pre-selected inquiry type).

**J4 peer:** external → `/notes/[slug]` → series nav (prev/next) → "System under discussion" → `/explorer/[slug]` → GitHub.

**Search flow:** ⌘K anywhere → typeahead across systems/notes/decision records → direct deep links (including explorer node anchors). Fallback `/search?q=` page for no-JS and link sharing.

## 7. Page-level hierarchy summary

| Page | Primary job | Primary CTA | Secondary CTA |
|---|---|---|---|
| Home | Route 4 personas in one screen; state thesis | Explore flagship system | View resume |
| Work index | Prove breadth with credibility tiers | Open Tier-1 case study | Filter facets |
| Case study | Demonstrate judgment | Open explorer / next decision | Related notes |
| Explorer | Demonstrate architecture thinking interactively | Step through a flow | Open case study / GitHub |
| Notes | Demonstrate depth & communication | Read next in series | Related system |
| About | Humanize + leadership evidence | Resume | Contact |
| Resume | Recruiter conversion | Download PDF | Contact |
| Contact | Convert with low friction | Submit (typed inquiry) | Email/WhatsApp/LinkedIn direct |
