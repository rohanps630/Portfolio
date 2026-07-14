# Phase 4 Tasks — Notes, Search & Connective Tissue

---

### P4-T1 · `/blog` → `/notes` migration — **P0**
Rename content dir + components (`blog/`→`notes/`); routes `/notes`, `/notes/[slug]`; permanent redirects (`/blog`, `/blog/:slug`, `/work`) in `next.config.ts`; sitemap regenerated; internal links updated.
**Deps:** none within phase. **AC:** CI link-check: zero 404s for all previously-published URLs; redirects return 301.

### P4-T2 · Note schema extensions + series infra — **P0**
Frontmatter `series/seriesOrder/relatedSystem/canonicalFrom` (validated); `SeriesNav` prev/next; `/notes/series/[series]` hub with ItemList JSON-LD; featured-series banner on notes index.
**Deps:** P4-T1, P0-T3. **AC:** AI Code Reviewer posts render as an ordered series with hub; dangling `relatedSystem` fails build.

### P4-T3 · Cross-link components — **P0**
`RelatedSystem` card (notes → system), `RelatedNotes` (case study footer, derived from frontmatter), MDX inline components `DecisionLink`, `ExplorerLink` rendering rich cards.
**Deps:** P4-T2, P2/P3 anchors. **AC:** IA §3 graph fully navigable both directions; orphan rule (published note → existing system) CI-enforced.

### P4-T4 · Pagefind + CommandPalette + `/search` — **P0**
Post-build indexing (`scripts/build-search-index.ts` hook); content-type filters via data attributes (system/note/decision); ⌘K palette (lazy-loads Pagefind on open, grouped results, keyboard nav); SSR `/search?q=` fallback (noindex).
**Deps:** P4-T1 (final URLs). **AC:** searching "RRF" surfaces the retrieval note, the AI Code Reviewer system, and the relevant decision anchor; zero search JS loaded before first invocation.

### P4-T5 ✍️ · Notes triage — **P1**
Unpublish (or schedule rewrites of) commodity posts per CS §4; keep + add `relatedSystem` to the AI/architecture posts.
**Deps:** P4-T2. **AC:** notes index contains no post that fails the "would a P1 respect this?" review ✍️; unpublished slugs still 301/410 correctly.

### P4-T6 ✍️ · Two new technique notes — **P1**
From CS §4 pipeline (suggest #1 hybrid retrieval + #4 agent economics — both anchored to shipped Phase-2/3 content); full SEO treatment (one query each, TechArticle schema).
**Deps:** P4-T2/T3. **AC:** CS §8 editorial DoD; cross-linked to system + explorer nodes.

### P4-T7 · RSS + remaining analytics events — **P2**
Notes RSS feed; `search_open/search_result_click/resume_download/contact_submit/nav_explorer_click` events; `docs/notes/analytics-log.md` template.
**Deps:** P4-T4, P3-T9. **AC:** feed validates; ADR-009 v1 schema fully live.
