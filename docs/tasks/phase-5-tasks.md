# Phase 5 Tasks — Polish, Recursion & Launch

---

### P5-T1 ✍️ · Colophon page — **P1**
`/colophon` per CS §5: stack, live performance scores (Speed Insights figures), a11y approach, analytics disclosure (full event list), CI workflow link, brand-motif explanation.
**Deps:** field data from P3/P4 deploys. **AC:** every claim on the page is externally verifiable (links/screenshots); linked from footer.

### P5-T2 · OG image system — **P1**
`api/og` variants per content type (system: thesis + DiagramThumb motif; note: title + series; explorer: diagram silhouette) using brand tokens.
**Deps:** P3-T2 (thumb renderer). **AC:** unique OG per route type; renders <1s at edge; validated in social debuggers.

### P5-T3 · Accessibility manual matrix — **P0** (launch gate)
Execute the documented checklist: keyboard-only + VoiceOver pass on every route × both themes × reduced-motion; fix all findings; record results in `docs/design/checklists/`.
**Deps:** all surfaces final. **AC:** a11y strategy §4 criteria 1–5 pass; zero open serious findings.

### P5-T4 · Motion justification audit — **P1**
Inventory every remaining animation; write the one-line information-justification appendix into design/04; remove any that fail.
**Deps:** all surfaces final. **AC:** appendix complete; no unjustified animation in the codebase.

### P5-T5 · Contact flow finalization — **P1**
Inquiry-type selector (radio-group semantics) with `?type=` prefill; expectation copy (IST/24h/remote); direct channels parity; `contact_submit {type}` event verified.
**Deps:** P4-T7. **AC:** UX §8 spec met; form a11y rules (a11y strategy §2) pass.

### P5-T6 · 404-with-search + link-check sweep — **P2**
Search-powered 404 suggestions; full-site crawl for dead links/anchors.
**Deps:** P4-T4. **AC:** crawl returns zero broken internal links/anchors.

### P5-T7 · Field verification window — **P0** (launch gate)
Two weeks of Speed Insights p75 within Perf §1 budgets; fix regressions.
**Deps:** all deploys. **AC:** budgets green in field data; colophon scores updated.

### P5-T8 ✍️ · Launch note + roadmap postmortem — **P2**
Announcement note ("Rebuilding my portfolio as an engineering lab" — itself a technique post linking the colophon and explorer); short postmortem vs this roadmap appended to `docs/roadmap/roadmap.md`.
**Deps:** everything. **AC:** published; postmortem honest about cuts/misses (the brand, again).
