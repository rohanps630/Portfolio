# Performance Strategy

**Thesis recursion:** the site claims cost/performance discipline; the site must therefore be measurably fast, and publish it (colophon + Speed Insights). Performance is a launch gate, not a tuning phase.

---

## 1. Budgets (CI-enforced via Lighthouse CI + bundle analysis)

| Metric | Budget | Notes |
|---|---|---|
| LCP | ≤ 1.8s (p75 mobile) | Hero is text + static SVG motif — no excuse |
| INP | ≤ 150ms | Lenis removal is the big win |
| CLS | ≤ 0.02 | Dimension-reserved media; no layout-anim |
| Home first-load JS | ≤ 150KB gzipped | Down from ~600KB+ (Three.js stack removed) |
| Case study JS | ≤ 180KB incl. lazy explorer chunk deferred | Explorer ≤ 35KB on demand |
| Notes/resume JS | ≤ 110KB | Essentially shell-only |
| Lighthouse | Perf ≥ 95, A11y = 100, BP ≥ 95, SEO = 100 | Every route in matrix |

## 2. The big levers (ordered by impact)

1. **Remove `three` + `@react-three/fiber` + `@react-three/drei` + `lenis`** (Motion System §1). Single largest improvement available; hero becomes static brand SVG.
2. **SSG everything.** All routes `generateStaticParams`/static; only `/api/contact` + `/api/og` dynamic. Already mostly true — make it a verified invariant (build output check in CI).
3. **Explorer as progressive enhancement.** SSR SVG + text equivalent in HTML; interactive chunk lazy-loads on viewport intersection (embedded) or immediately (standalone route). No diagram library.
4. **Font discipline.** Keep self-hosted variable WOFF2 + `font-display: swap`; preload the two critical fonts on first paint routes; add `size-adjust` fallback metrics to eliminate CLS from swap. Mono font subset to Latin.
5. **Image pipeline.** `next/image` with AVIF/WebP, explicit dimensions, lazy below fold, priority only on case-study hero screenshots. OG images via existing `api/og` route (edge).
6. **Search lazy.** Pagefind loader fetched on first palette open; zero cost for non-searchers.

## 3. Rendering strategy

Static-first, streaming irrelevant (no dynamic data). `template.tsx` fade kept under 150ms so it never masks real latency. Third-party scripts: **none** except Vercel Analytics/Speed Insights (both lightweight, deferred). Hard rule: no tag managers, no chat widgets, no external embeds on core routes.

## 4. Asset strategy

- SVG diagrams inline (compressible, themeable, no requests).
- Screenshots: WebP, max 1600w source, `sizes` attributes correct.
- Resume PDF: keep ≤ 200KB, linked not embedded.
- Cache: immutable hashed assets (Next default), HTML revalidated on deploy.

## 5. Monitoring & regression defense

- **CI:** Lighthouse CI on PR (home, one case study, explorer, one note, resume) with budget assertions; `next build` bundle-size diff comment.
- **Field:** Vercel Speed Insights (CWV p75 by route); monthly review note in repo.
- **Process:** any dependency addition requires a bundle-cost note in the PR description (rule recorded in CONTRIBUTING at implementation).

## 6. Acceptance criteria

All §1 budgets green in CI and field p75 within budget for 2 consecutive weeks post-launch; colophon publishes the live scores (recursion proof).
