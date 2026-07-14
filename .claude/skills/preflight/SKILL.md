---
name: preflight
description: Run this repo's full quality-gate suite in CI order (typecheck → lint → build/validate-content → check-links → Playwright e2e with CONTACT_FORM_DRY_RUN=1 → optional Lighthouse) and batch Engram proposals. Use before any commit, when asked "is this ready?", "run the checks", or at the end of any implementation task.
---

# preflight — the gate suite, in order, with no shortcuts

## Purpose

Every change in this repo exits through the same gates CI runs
(`.github/workflows/ci.yml`). Running them locally, in CI's order, with the
correct environment, is the difference between "done" and "probably done". The
July 2026 audit's core finding was "gates that don't gate" — this skill also
enforces that gates are never weakened to pass.

## Triggers

- End of any implementation task (code or content).
- Before `git commit` (always) and before proposing a push.
- User asks: "is this ready?", "run the gates/checks", "does it pass?".
- Invoked as the final step by `add-system`, `add-note`, and
  `speckit-implement` checkpoints.

## Inputs

- The working tree. Optionally a scope hint ("copy-only change") to justify
  skipping gates 5–6.

## Workflow

Run in order; stop at the first failure, fix at the cause, re-run from the
failed gate.

```bash
# 1. Typecheck
bun run tsc --noEmit
# 2. Lint (eslint 9 — pinned; includes jsx-a11y recommended)
bun run lint
# 3. Build — prebuild runs validate-content (schema + referential integrity);
#    postbuild regenerates the Pagefind index
bun run build
# 4. Internal links & anchors (requires the build from step 3)
bun run check-links
# 5. E2E smoke against a production server — the flag is MANDATORY locally:
#    .env.local holds a real Resend key and the contact e2e submits the form
CONTACT_FORM_DRY_RUN=1 bunx playwright test
# 6. Lighthouse budgets (perf ≥0.90, a11y ≥0.95, SEO ≥0.95 error; BP warn)
bunx lhci autorun
```

Gate applicability:

| Change type | Mandatory gates |
|---|---|
| Any code change | 1–5 (6 if routes/interaction/perf-relevant) |
| Content change (systems/notes/site) | 3–4 (5 if navigation/search surface changed) |
| Pure docs / comments | none (state that explicitly) |

Then:

7. **Read the validator warnings.** Missing-media warnings are expected
   (designed state); anything else in the warning list gets reported, not
   silenced.
8. **Engram boundary check.** For every area touched this task: does an entry
   need creating/editing? Draft proposals (`What / Where / Why / Not / Decided`)
   and present them for a one-word confirm. Never fabricate a `Why` — use
   `⚠️ CONFIRM` for reasons you don't actually have. Fix stale entries you
   passed through (mechanical fixes directly; missing-why → flag).
9. **Report.** A table of gate → pass/fail, the exact failing output for any
   failure, expected-warning count, and the Engram proposals.

## Decision tree

```
Gate fails
├─ Cause is my change → fix the change, re-run
├─ Cause is a schema/checker being "too strict" → the checker is right; fix content/code
│   (schema changes are a separate user-approved task — NEVER inline)
├─ Cause pre-exists my change → verify with git stash / clean checkout,
│   then report it separately; do not bundle unrelated fixes
└─ Tempted to add an exemption/skip → STOP. That is the audit failure class.
```

## Constraints

- Never `--no-verify`, never exemption lists, never demoting errors to warnings.
- Never promote media warnings to errors (forces asset fakery) and never create
  files to silence them.
- Steps 5–6 need a production build; `playwright.config.ts` manages the
  `next start` webServer itself.
- Lighthouse floors live in `lighthouserc.json`; the stricter handoff numbers
  (95/100/95/100, LCP ≤ 1.8s, home JS ≤ 150KB gz) are targets — report both when
  relevant.

## Failure handling

- Playwright timeout on webServer → a stale server may be running on :3000;
  check and stop it before re-running (config reuses existing servers locally).
- `check-links` "No HTML files found" → step 3 didn't run or failed; rebuild.
- Flaky e2e → re-run once; if it flakes again, treat as real and investigate —
  do not add retries to the config.

## Success criteria

- All applicable gates green with zero new warnings beyond the known
  missing-media set.
- Engram proposals delivered (or "none needed" stated).
- Report ends with an explicit ready/not-ready verdict.

## Integration

- Terminal step for `add-system` and `add-note`.
- Complements harness skills: `verify` (drive the actual flow) and
  `code-review` (defect hunt) — preflight replaces neither.
