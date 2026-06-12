# SEO Strategy

Builds on a strong existing base (per-page `generateMetadata`, JSON-LD in `src/lib/seo.ts`, sitemap/robots, OG route, recent name-search hardening in commits `165bd67`/`a56b021`). Two-track strategy: **defend name search** (recruiters Googling "Rohan P Suresh") and **win technique search** (peers finding depth content).

---

## 1. Track A — Identity/name search (defend & enrich)

- Keep the WebSite/Person JSON-LD work; extend Person schema with `knowsAbout` (multi-agent systems, RAG, MCP, retrieval), `worksFor`, `sameAs` (GitHub/LinkedIn), and `hasOccupation`.
- `/resume` page: `Person` + structured experience markup; becomes the canonical "credentials" result under the homepage sitelink.
- Consistent NAP-style identity (name, title, location) across home/about/resume — the positioning title ("Full-Stack Product Engineer · Production AI Systems") used verbatim everywhere.
- OG images via `api/og` per page type (system, note, explorer) using the brand motif — improves CTR from shares, which feeds Track B.

## 2. Track B — Technique/topic search (new growth surface)

Target intent: long-tail engineering queries the Notes already speak to — "hybrid retrieval BM25 vector RRF", "hand written agent loop tool use", "MCP tool orchestration architecture", "LLM eval golden dataset PRs", "prompt injection defense agents".

- **Notes are the ranking unit.** Each Tier-1-related note targets one technique query; title/H1/slug aligned; `Article` + `TechArticle` JSON-LD with `about` entities.
- **Series get hub pages** (`/notes/series/[series]`) with `ItemList` schema — "Building the AI Code Reviewer" becomes a crawlable curriculum.
- **Explorer pages are indexable** because the SSR SVG + text equivalent put real content in HTML (tech-arch rule 4). `/explorer/[slug]` gets `TechArticle` schema and descriptive meta ("Interactive architecture of …").
- Internal linking graph (IA §3) is the ranking engine: system ↔ notes ↔ explorer ↔ decisions, all crawlable anchors.

## 3. Migration protection (blog → notes, content restructure)

- 301 map (`/blog/*→/notes/*`, `/work→/projects`) in `next.config.ts`; zero-404 verified by a CI link-check during migration phase.
- Sitemap regenerated atomically; old URLs dropped from sitemap immediately, redirects kept ≥ 1 year.
- Canonicals self-referential everywhere; `canonicalFrom` frontmatter supports any future cross-posting (dev.to etc.) pointing home.

## 4. Technical hygiene (gate checklist)

Unique title/description per route (≤ 60/≤ 155 chars) · one `h1` per page · descriptive alt text (lint-enforced) · breadcrumb `BreadcrumbList` schema on detail pages · `robots` correct for `/search` (noindex, follow) · RSS feed for notes (add — currently missing) · 404s return 404 status · CWV budgets (perf doc) double as ranking hygiene.

## 5. Measurement

Search Console (already implied by name-search work): track name-query CTR, technique-query impressions per note, explorer page indexation. Quarterly: review which technique notes earn impressions and write the next series accordingly (content strategy feedback loop).
