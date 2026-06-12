# ADR-008 — Search: Pagefind static index behind a ⌘K palette

**Status:** Accepted · 2026-06-11

## Context
The IA adds depth content (decision anchors, explorer states, series) that benefits from direct retrieval; the site is fully static with no server budget. Search must cost nothing when unused.

## Decision
Pagefind: post-build static index over rendered HTML, lazy-loaded (~10KB loader + on-demand index chunks) on first palette open. UI: custom `CommandPalette` (⌘K) with grouped results (Systems/Notes/Decisions via Pagefind filters from data attributes); SSR `/search?q=` fallback page (noindex).

## Alternatives
1. *FlexSearch/Fuse with a custom JSON index* — full control, but we own index generation, tokenization, and relevance forever; bundle grows with content.
2. *Algolia DocSearch* — external dependency, application process, overkill scale, third-party script against the perf doctrine.
3. *No search* — viable for 9 pages, not for a content graph with anchored decisions and series; also forfeits a quietly impressive UX touch.

## Tradeoffs
Pagefind's relevance tuning is limited (fine at this corpus size); WASM payload on low-end devices (mitigated: fully lazy; SSR fallback). Build pipeline gains a post-build step.

## Consequences
Server-rendered text equivalents (explorer) and decision blocks become indexable by construction — reinforcing the SSR-first rendering rule; search result analytics feed the five-questions framework.
