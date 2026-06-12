# ADR-010 — SEO & performance: two-track SEO; CI-enforced budgets as launch gates

**Status:** Accepted · 2026-06-11

## Context
Existing SEO is solid and recently tuned for name search. The lab adds technique-depth content (Track B opportunity) and a migration risk (blog→notes). Performance currently has correct instincts but no budgets, no CI, and one large liability (Three.js hero). The brand thesis ("production discipline") makes site quality a credibility input, not a nicety.

## Decision
(a) Two-track SEO: defend name search (Person/WebSite schema, /resume canonical credentials page) and win technique search (one query per note, series hubs with ItemList, indexable explorer pages via SSR text). (b) Performance budgets as hard CI gates: LCP ≤1.8s, INP ≤150ms, CLS ≤0.02, home JS ≤150KB gz, explorer chunk ≤35KB, Lighthouse perf ≥95/a11y=100 — enforced by Lighthouse CI + bundle diff on every PR. Field monitoring via Speed Insights; colophon publishes live scores.

## Alternatives
1. *SEO: chase high-volume keywords ("react developer portfolio")* — unwinnable SERPs, wrong audience; long-tail technique queries match P4→P1 funnel.
2. *Performance: optimize once at launch, no gates* — history of this codebase (decorative-dep accretion) shows regression is the default without gates.
3. *Defer both until after redesign* — bakes regressions in; budgets are cheapest to enforce from the first migration PR.

## Tradeoffs
CI gates add friction to every PR (intended friction); 301 migration carries short-term ranking turbulence (mitigated: link-check + sitemap diff, minimal current equity); publishing live scores creates public accountability (the point).

## Consequences
Budgets effectively force ADR-005's removals; any new dependency needs a bundle-cost justification; SEO measurement (Search Console) feeds the notes pipeline quarterly.
