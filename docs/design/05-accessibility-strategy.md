# Accessibility Strategy

**Standard:** WCAG 2.2 AA as a hard launch gate, with AAA adopted where cheap (focus appearance, target size). Accessibility is a positioning asset here: the portfolio includes an accessible-chat project and an accessibility blog post — the site itself must not contradict them.

---

## 1. Baseline (already present — preserve)

`:focus-visible` styling, `prefers-reduced-motion` handling, semantic font scaling, honeypot (not CAPTCHA) spam defense, dark/light themes. These survive all redesign work; regressions are CI failures.

## 2. Standards by surface

### Global
- Landmark structure on every page: `header / nav / main / footer`, one `h1` per page, heading levels never skip.
- Keyboard: every interactive element reachable and operable; visible focus ≥ 2px outline with 3:1 contrast against adjacent colors; logical tab order; skip-to-content link (add — currently missing).
- Color: 4.5:1 text, 3:1 UI components and state indicators; **status and provenance badges never rely on color alone** (always icon or text label — "Production", "Target").
- Touch targets ≥ 44×44px (WCAG 2.2 §2.5.8 exceeds AA — adopt anyway).
- Both themes pass contrast audits independently.

### Architecture Explorer (the hard case — specified, not hoped-for)
- **Full keyboard model:** Tab into canvas → arrow keys traverse nodes (spatial or graph-order), Enter opens inspector, Esc closes, `[`/`]` step flows, `+`/`-` zoom. Documented in an in-canvas "keyboard help" popover (`?`).
- **Screen reader model:** the canvas is `role="application"` with an off-screen **structured text equivalent**: an ordered list per layer ("System contains: Agent Core, connected to Retrieval Pipeline via 'context request'…") and per flow ("Step 3 of 7: the reranker scores candidates…"). The text equivalent is *generated from the same ArchitectureModel data*, so it can never drift from the diagram. This doubles as the no-JS fallback.
- Inspector panel: `aria-expanded`/focus-managed; flow stepper announces step changes via `aria-live="polite"`.
- All explorer state changes (select, step) update the URL — making states bookmarkable is also an AT affordance.

### Motion
- Every animation gated on `prefers-reduced-motion` (Motion System §2). Reduced experience = opacity-only or static. Flow stepping degrades to discrete state changes.
- No autoplaying movement longer than 5s anywhere (nothing loops at all).

### Forms (contact)
- Labels always visible (no placeholder-as-label), inline errors associated via `aria-describedby`, error summary focus-moved on failed submit, success state announced. Inquiry-type tabs are a radio group, not tabs, semantically.

### Content
- MDX images require alt text (lint rule); code blocks get accessible names; tables have headers; case-study metric provenance is text, not tooltip-only.
- Diagrams outside the explorer (static SVGs) carry `<title>/<desc>` and a prose summary nearby.

## 3. Tooling & enforcement

| Layer | Tool | Gate |
|---|---|---|
| Static | `eslint-plugin-jsx-a11y` (extend existing ESLint) | CI fail |
| Automated runtime | axe-core via Playwright across the route matrix (incl. explorer states, both themes) | CI fail |
| Manual | Keyboard-only pass + VoiceOver (macOS) pass per release phase; documented checklist in `/docs/design/checklists/` (created at implementation) | Phase DoD |
| Regression | Lighthouse a11y ≥ 100 budget in CI | CI fail |

## 4. Acceptance criteria

1. axe: zero serious/critical violations on all routes, both themes.
2. Every J1–J4 journey (IA §6) completable keyboard-only, screen-reader-narratable.
3. Explorer text-equivalent renders meaningfully with JS disabled.
4. Reduced-motion matrix passes on every route.
5. The colophon page documents the a11y approach (the recursion principle — the site demonstrates the claim).
