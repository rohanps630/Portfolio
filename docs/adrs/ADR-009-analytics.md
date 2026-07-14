# ADR-009 — Analytics: Vercel Analytics + custom events behind a wrapper; five-questions rule

**Status:** Accepted · 2026-06-11

## Context
The site currently has zero measurement; the product vision sets engagement targets (G2: ≥30% depth engagement) that require instrumentation. Constraints: privacy-first (no consent banner), near-zero performance cost, single maintainer.

## Decision
Vercel Analytics (pageviews/referrers, cookieless) + Speed Insights (field CWV), with a fixed v1 custom-event schema (explorer_open, flow_step, node_inspect, decision_expand, resume_download, contact_submit, search events) fired through `lib/analytics.ts` — a wrapper enforcing no-PII, DNT respect, and vendor isolation. Events must serve one of five named product questions or they don't exist.

## Alternatives
1. *Plausible/Fathom* — excellent privacy stance but adds cost and an external script; Vercel-native wins on zero-integration and Speed Insights synergy.
2. *PostHog* — session replay/funnels are over-instrumentation for a portfolio and a privacy-optics liability.
3. *No analytics* — leaves G2/G3 unmeasurable and explorer v2 decisions to guesswork.

## Tradeoffs
Vendor lock at the data layer (mitigated by the wrapper — swap cost is one file); Vercel Analytics' free-tier retention limits long-horizon analysis (acceptable: monthly review cadence captures trends).

## Consequences
Event names become part of component contracts (fired at interaction leaves); colophon discloses the full event list; quarterly review may add/remove events only via the five-questions test.
