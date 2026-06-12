# Analytics Strategy

**Purpose:** answer five product questions, not collect data. Privacy-first (no cookies-consent banner needed), zero performance cost beyond budget, vendor-swappable behind `lib/analytics.ts`.

---

## 1. The five questions

| Q | Question | Instrument |
|---|---|---|
| Q1 | Do visitors reach depth? (Product Vision G2: ≥30% of case-study visitors open explorer or a decision) | events: `explorer_open`, `decision_expand` ÷ case-study pageviews |
| Q2 | Does the explorer hold attention? | `flow_step`, `node_inspect` counts per `explorer_open`; standalone dwell |
| Q3 | Which journey converts? | `contact_submit {type}`, `resume_download`, with `referrer-path` props |
| Q4 | Which notes earn external traffic? | pageview referrers (vendor default) + Search Console (SEO doc) |
| Q5 | Is the site staying fast in the field? | Speed Insights CWV p75 (perf doc) |

If a proposed event doesn't serve Q1–Q5, it isn't added. Review the question list quarterly.

## 2. Stack

- **Vercel Analytics** (pageviews, referrers, no cookies) + **Vercel Speed Insights** — both already platform-native, ~1KB each, deferred.
- **Custom events** via `track()` from `@vercel/analytics` wrapped in `lib/analytics.ts: trackEvent(name, props)`. Wrapper rules: no-ops in dev; strips anything resembling PII; respects `navigator.doNotTrack`; vendor import isolated to this one file.

## 3. Event schema (complete v1 list)

```
explorer_open      { system, mode: embedded|standalone }
flow_step          { system, flow, step }        // sampled: first + every 3rd
node_inspect       { system, node }
decision_expand    { system, decision }
resume_download    { from: nav|hero|resume-page }
contact_submit     { type: role|project|other }   // no form contents, ever
search_open        {}
search_result_click{ targetType: system|note|decision }
nav_explorer_click {}                              // does the nav front-door earn its slot?
```

No user IDs, no session stitching, no form-content capture, no scroll-depth spam.

## 4. Reporting cadence

Monthly 15-minute review against Q1–Q3 targets, noted in a short `docs/notes/analytics-log.md` entry (private repo file). Decisions that this data is allowed to drive: explorer v2 features (explorer spec §7), notes topics (SEO §5), CTA copy. Decisions it may not drive: honesty rules, accessibility, performance budgets.

## 5. Colophon disclosure

The colophon states what is collected and why ("no cookies, no fingerprinting, events listed here") — privacy posture as another recursion of the engineering-discipline brand.
