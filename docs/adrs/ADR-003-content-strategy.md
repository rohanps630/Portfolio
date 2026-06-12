# ADR-003 — Content architecture: typed content-as-code, Zod-validated; decompose content.json

**Status:** Accepted · 2026-06-11

## Context
Content is already local (TS modules, MDX, one JSON blob). `content.json` carries dead dashboard-era fields (empty testimonials/faqs/processSteps, pageSections) and is unvalidated; MDX frontmatter is unvalidated; the new model adds cross-references that can dangle silently.

## Decision
All content lives in typed TS modules + MDX. Zod schemas in `lib/schemas/` are the single source of types (`z.infer`). A build-gating `scripts/validate-content.ts` checks schema validity and referential integrity (slugs, decision ids, flow refs). `content.json` is decomposed into `content/site.ts`; dead fields deleted. Structured resume lives in `content/resume.ts`, single-sourced with the PDF.

## Alternatives
1. *CMS (Sanity/Contentful)* — overhead, runtime deps, and it weakens the "content-as-code is the demo" recursion.
2. *Contentlayer/Velite* — attractive, but adds a framework dependency for what ~150 lines of Zod + a script achieve; Contentlayer's maintenance history is a risk.
3. *Keep JSON + no validation* — status quo; fails the discipline thesis and the cross-reference model.

## Tradeoffs
Editing requires code literacy (acceptable: single technical author); validation script is bespoke maintenance (small, fenced scope).

## Consequences
Types in `src/types/` become inferred re-exports; CI gains a content gate; content errors become build failures instead of silent UI gaps.
