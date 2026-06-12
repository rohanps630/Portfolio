# Technical Architecture (target state)

**Stance:** the current architecture (Next.js 16 App Router, content-as-code, server components → typed props, no DB) is correct for this product and is **retained**. This document specifies the extensions for the lab vision and the rules an implementation agent must follow. Architecture only — no implementation.

---

## 1. Stack decisions (deltas only)

| Area | Decision | Delta from today |
|---|---|---|
| Framework | Next.js 16 App Router, SSG-first (`generateStaticParams` everywhere; only `/api/contact` and `/api/og` dynamic) | none |
| Styling | Tailwind 4 `@theme` tokens | extend tokens (Design System §3) |
| Animation | Framer Motion 12 only | remove `lenis`, `three`, `@react-three/fiber`, `@react-three/drei` |
| Diagrams | **Custom SVG renderer over a typed `ArchitectureModel`** (no React Flow / mermaid at runtime) | new — rationale in ADR-007 |
| Search | **Pagefind** (build-time static index, lazy-loaded WASM/JS, zero server) | new — ADR-008 |
| Content validation | **Zod schemas for all content** (projects, systems, notes frontmatter, resume, site config) executed in a build-time `validate-content` script | new |
| Analytics | Vercel Analytics + Speed Insights, custom events via a thin wrapper | new — ADR-009 |
| Testing/CI | GitHub Actions: typecheck, lint, content-validate, Playwright+axe smoke, Lighthouse CI budgets | new |
| Email/forms | Resend + honeypot (unchanged) | none |

## 2. Folder structure (target)

```
src/
  app/
    (site)/                     # route group: shared PublicShell layout
      page.tsx                  # Home
      projects/{page.tsx,[slug]/page.tsx}
      explorer/[slug]/page.tsx  # full-screen explorer
      notes/{page.tsx,[slug]/page.tsx,series/[series]/page.tsx}
      about/  resume/  contact/  search/  colophon/
    api/{contact,og}/
    sitemap.ts robots.ts manifest.ts icon.tsx apple-icon.tsx
  components/
    ui/            # primitives incl. new lab kit (StatusBadge, MetricFact, …)
    layout/        # Navbar, Footer, SectionContainer, CommandPalette
    explorer/      # ExplorerCanvas, NodeInspector, FlowStepper, DiagramThumb,
                   # ExplorerTextEquivalent (a11y), layout engine helpers
    showcase/      # CaseStudy section components (renamed from projects/)
    notes/         # renamed from blog/
    home/ about/ contact/ shared/ animations/
  content/
    site.ts                      # typed site config (replaces content.json — ADR-003)
    resume.ts                    # single-source structured resume
    systems/                     # renamed from projects/; one file per system
      ai-code-reviewer/{index.ts,architecture.ts,decisions.ts}
      multi-agent-ops/…  telecom-pos/…   # Tier 1 get architecture.ts
      dental-clinic-hms.ts …             # Tier 2/3 single-file
    notes/*.mdx                  # renamed from blog/
  lib/
    content/{systems.ts,notes.ts,resume.ts,site.ts}   # typed accessors
    schemas/      # Zod: system.ts, architecture.ts, note.ts, resume.ts, site.ts
    seo.ts email.ts utils.ts search.ts analytics.ts
  types/          # inferred from Zod schemas (z.infer) — single source of truth
scripts/
  validate-content.ts   # build gate: schema + referential integrity (slug links)
  build-search-index.ts # pagefind post-build hook
docs/             # this blueprint
```

Migration note: renames (`projects→systems` content dir, `blog→notes`) are internal; URL strategy per IA doc §4. `content.json` is decomposed into `site.ts` (typed, no dead fields) — `data/portfolio.db*` and committed `.docx` files removed from the repo (audit M7; docx leave git history via the normal commit, no history rewrite required unless desired).

## 3. Data model

All types derive from Zod schemas (`z.infer`) so validation and typing cannot drift.

### 3.1 System (case study) — full schema in Showcase Framework doc
Key fields: `slug, title, thesis, tier (1|2|3), domain, context, status {kind: production|building|archived, phase?, phaseTotal?}, confidentiality?, role, timeline, constraints[], decisions: DecisionRecord[], outcomes: MetricFact[] (each with provenance: measured|target|scope), evidence: EvidenceLink[], lessons[], techStack[], relatedNotes? (derived), architectureRef?`.

### 3.2 ArchitectureModel — full schema in Explorer spec
`system slug, layers[{id: context|container|flow-view, nodes[], groups[], edges[]}], flows[{id, title, steps[{edgeRef|nodeRef, caption}]}], node: {id, label, kind, tech[], summary, rationale, tradeoffs[], decisionRefs[], noteRefs[], position {x,y} per layer}`.

### 3.3 Note (MDX frontmatter)
Existing fields + `series?, seriesOrder?, relatedSystem? (slug), canonicalFrom?`. Validated by schema; `published: false` excluded from builds/sitemap (existing behavior kept).

### 3.4 Referential integrity (build-gated)
`decisionRefs → decisions[].id`, `relatedSystem → systems slug`, `flow steps → edges/nodes`, `architectureRef → architecture file exists`. `validate-content.ts` fails the build on any dangling ref. This is the "no orphan content" rule from IA §3 made executable.

## 4. Rendering & data flow (rules)

1. Server components read content via `lib/content/*` accessors only (never import content files directly in components).
2. Accessors stay async-signatured (existing convention preserved for call-site stability).
3. Client components receive serializable props; the ArchitectureModel is serialized to the ExplorerCanvas as plain JSON.
4. Explorer: server renders the **static SVG + text equivalent** (SEO + no-JS + LCP); the interactive canvas hydrates over it as progressive enhancement, lazy-imported.
5. MDX: `next-mdx-remote/rsc` retained; custom MDX components registered for `RelatedSystem`, `DecisionLink`, `ExplorerLink`, callouts.

## 5. State management

No global state library. State inventory: theme (next-themes), explorer state (URL search params as source of truth + local component state for transient pan/zoom), command palette (local + context), form state (react-hook-form). URL-as-state is a deliberate principle: every meaningful view is shareable and crawlable.

## 6. Search architecture

Pagefind indexes the built HTML post-build: zero runtime infra, ~10KB lazy loader, scales past this site's needs. Decision records and explorer text-equivalents are indexable because they render server-side (rule 4). `CommandPalette` queries the Pagefind API client-side; `/search` page uses the same index. Custom result grouping by content type via Pagefind filters (data attributes on page roots).

## 7. Analytics architecture

See `06-analytics-strategy.md`. Thin `lib/analytics.ts` wrapper exposing `trackEvent(name, props)` so the vendor is swappable; events fire from interaction leaves only; no PII, no cookies beyond vendor defaults; respects DNT.

## 8. Performance architecture

See `04-performance-strategy.md`. Structural rules: route-level code splitting (default), explorer lazy-loaded below fold, zero client JS on `/resume` and notes pages beyond the shell, image pipeline via `next/image` with AVIF/WebP, JS budget enforced in CI (home ≤ 150KB gzipped first load after Three.js removal).

## 9. Build & CI pipeline

```
PR → typecheck → eslint (+jsx-a11y) → validate-content → next build
   → playwright smoke (key routes × themes × reduced-motion) + axe
   → lighthouse-ci budgets (perf ≥95, a11y = 100, CLS ≤ 0.02, JS budget)
main → Vercel production deploy
```

CI is itself a positioning artifact (colophon links to the workflow file).

## 10. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Custom SVG explorer scope-creep | Layout is **hand-authored coordinates in the model** (no auto-layout engine, ADR-007); v1 feature-fenced to the spec |
| Content migration breaks SEO | Redirect map + sitemap diff check in CI during the migration phase |
| Single maintainer bus-factor on bespoke explorer | Renderer is ~3 components over a documented schema; the schema doc is the contract |
| Pagefind WASM weight on low-end mobile | Lazy-load on first ⌘K/tap; `/search` SSR fallback |
