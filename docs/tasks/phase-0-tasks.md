# Phase 0 Tasks — Foundation & Hygiene

Task ID format `P0-Tn`. Priorities: P0 (blocker) / P1 (phase-required) / P2 (nice-in-phase). ✍️ = needs human content input or review. Specs referenced by shorthand: TA = architecture/01, CS = content/01, etc.

---

### P0-T1 · Remove committed source documents — **P0**
Remove `RoHaN-Resume-Final_RAW.docx` and `Portfolio-Case-Study.docx` from the repo; add `*.docx`, `data/`, `*.tsbuildinfo` to `.gitignore`; delete `data/portfolio.db*` from disk.
**Deps:** none. **AC:** `git ls-files` shows no docx/db; build unaffected.

### P0-T2 · Zod schema package — **P0**
Create `src/lib/schemas/{site,note,resume}.ts` (System/architecture schemas come in P1/P3) matching current content shapes; re-export inferred types from `src/types/`.
**Deps:** none. **AC:** `z.infer` types compile; existing components typecheck against them unchanged.

### P0-T3 · `scripts/validate-content.ts` — **P0**
Build-gating script: parse all MDX frontmatter and `content.json`/`site.ts` against schemas; verify project slugs unique; verify blog `coverImage`/project `coverImage` files exist in `public/`. Wire as `prebuild` + CI step.
**Deps:** P0-T2. **AC:** intentionally broken frontmatter fails `bun run build` with a path-specific error.

### P0-T4 · CI pipeline — **P0**
GitHub Actions workflow: install (bun), typecheck (`tsc --noEmit`), `next lint` with `eslint-plugin-jsx-a11y` added, validate-content, `next build`, Playwright smoke (home/projects/one detail/blog/one post/contact × dark/light) with axe assertions, Lighthouse CI (3-run median) recording **current** scores as baseline budgets.
**Deps:** P0-T3. **AC:** workflow green on main; budget JSON committed; a PR that violates a budget fails.

### P0-T5 · Factual consistency hotfixes ✍️ — **P1**
Per CS §7: stats "4.75"→remove decimal usage ("5 years" if retained anywhere); delete `LangChain`, `ChatGPT` from `techStack` in `content.json`; reconcile AI Code Reviewer $0.20/$0.50 framing to the single target framing; verify resume PDF link text says "5 years" consistently.
**Deps:** none. **AC:** site-wide grep finds no "4.75", "LangChain", "ChatGPT"; reviewer (human) signs off the ledger.

### P0-T6 · Skip-to-content link + landmark audit — **P1**
Add skip link in `PublicShell`; verify `header/nav/main/footer` landmarks and single-`h1` rule on all routes.
**Deps:** none. **AC:** axe landmark checks pass; Tab-first reveals skip link.

### P0-T7 · Decompose `content.json` → `content/site.ts` — **P2**
Typed site config module; delete dead fields (`testimonials`, `faqs`, `processSteps`, `pageSections`); update `lib/data.ts` accessors (signatures unchanged).
**Deps:** P0-T2. **AC:** no `content.json` imports remain; dead fields gone; all pages render identically.
