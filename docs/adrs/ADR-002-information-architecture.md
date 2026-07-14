# ADR-002 — IA: evolve routes; /blog→/notes migration; add /resume and /explorer

**Status:** Accepted · 2026-06-11

## Context
Existing routes have early SEO equity from recent name-search work. The lab vision needs new surfaces (explorer, resume, search) and a depth-linking content graph. Blog equity is minimal (12 posts, young site).

## Decision
Keep `/projects` and detail slugs as canonical (label rebranded "Work"); 301 `/blog/*` → `/notes/*` now, while cheap; add `/resume`, `/explorer/[slug]`, `/notes/series/[series]`, `/search`, optional `/colophon`. Typed cross-linking (system ↔ notes ↔ explorer ↔ decision anchors) with build-time referential integrity.

## Alternatives
1. *Full URL redesign (`/systems`, `/lab`)* — cleaner naming, but burns redirects and SEO momentum for cosmetics.
2. *Keep `/blog` label* — zero migration cost, but "Blog" contradicts the lab identity permanently; cost only grows.
3. *Subdomain lab (lab.rohan…)* — splits authority and analytics for no benefit.

## Tradeoffs
One-time redirect risk (mitigated: CI link-check, sitemap diff); "Explorer" nav slot is unproven (instrumented via `nav_explorer_click`, revisit after data).

## Consequences
`next.config.ts` redirect map; sitemap/RSS updates; all internal links updated atomically in the migration phase; orphan-content CI rule becomes possible and mandatory.
