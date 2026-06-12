# Project index — intent & why-not

> **This is an Engram index.** It records the **non-derivable why** of this codebase — why parts are
> the way they are, and what was rejected and why. It is **not** documentation and **not** a symbol
> index (the LSP/ctags/grep own structure). Keep it **curated, not complete**.
>
> **Agent:** read the relevant entry **before editing** an area; **after a real decision**, propose a
> new/edited entry (batched at the task boundary, written on confirm). An entry earns its place only if
> it is **non-derivable · load-bearing · durable** (the Three-Gate test). When a decision changes,
> *edit* the entry and move the old call into `Not:`. Fix or delete any stale entry you pass through.

---

## Content — AI Code Reviewer claims ceiling
_aka: ACR copy, project claims, false claims hotfix_

- What:  every public claim about the AI Code Reviewer must be backed by the audited evidence docs
- Where: src/content/projects/ai-code-reviewer.ts · canon: docs/projects/ai-code-reviewer-*.md
- Why:   the repo was audited file-by-file (2026-06-12); claims are provable or they're poison — a staff engineer can disprove a false specific in under a minute via the public repo
- Not:   rejected (and removed after they shipped once): "50+ OSS PRs" (dataset is 30 synthetic seeds), "indexer on Modal" (no Modal code), "<$0.20/review" (no cloud-cost measurement exists), "get_pr_discussion" tool (doesn't exist), "injection attempts logged" (no telemetry). Do NOT reintroduce; new facts enter via the audit docs first
- Decided: 2026-06-12

## Content — provenance discipline on metrics & capabilities
_aka: measured/target/scope-fact, honesty rules_

- What:  every metric and capability statement carries provenance: measured · target · scope-fact (and built vs planned for ACR capabilities)
- Where: project/system content files; schema lands with the System model (Phase 1); rules: docs/architecture/02-project-showcase-framework.md §3
- Why:   the site's whole positioning is "evidence over claims" — one unlabeled aspirational number poisons every labeled one
- Not:   rejected presenting targets as achievements (the original $0.20 line was exactly this failure)
- Decided: 2026-06-12

## Content — employer-system disclosure ceiling
_aka: confidentiality protocol, multi-agent platform, telecom POS_

- What:  employer-owned systems are described at pattern level only; the public resume is the maximum specificity allowed
- Where: future systems content; canon: docs/content/02-confidentiality-audit.md, 03-employer-case-study-format.md
- Why:   protects employer IP while keeping seniority signal; "draw the pattern you'd teach, never the system you shipped"
- Not:   rejected redrawing real topology with renamed nodes (banned as diagram class C3 — renaming doesn't de-proprietarize a topology); rejected publishing employer case studies without human sign-off
- Decided: 2026-06-12

## Media — no fake assets; validator warns on missing images
_aka: placeholder images, zero-byte files, cover images_

- What:  scripts/validate-content.ts WARNS (not fails) on missing/empty media; UI renders fallbacks
- Where: scripts/validate-content.ts · public/images/**
- Why:   media absence is a designed state until real screenshots land (Phase 2); fake/empty files would ship broken images and violate the no-fabricated-evidence rule
- Not:   rejected generating placeholder image files to silence validation (a Phase-0 agent created 19 zero-byte files; they were deleted 2026-06-12 — do not recreate); rejected making missing media a build error (would force exactly that fakery)
- Decided: 2026-06-12

## Tooling — ESLint pinned to v9, script is `eslint .`
_aka: lint, next lint, eslint 10_

- What:  package.json pins eslint ^9.x and `lint: eslint .`; jsx-a11y recommended rules enabled in eslint.config.mjs without re-registering the plugin
- Where: package.json · eslint.config.mjs
- Why:   Next 16 removed the `next lint` subcommand, and the Next plugin ecosystem (eslint-plugin-react, jsx-a11y, react-hooks) peer-caps at ESLint 9 — v10 crashes eslint-plugin-react outright
- Not:   rejected ESLint 10 (tried 2026-06-12: `getFilename is not a function`); rejected re-adding the jsx-a11y plugin in config (next/core-web-vitals already registers it → "Cannot redefine plugin"). Don't accept a dependabot major bump of eslint without re-testing the whole chain
- Decided: 2026-06-12

## Components — doomed decorative set carries lint suppressions
_aka: HeroScene, TextScramble, CursorSpotlight, MagneticButton, TiltCard, ParallaxWrapper_

- What:  these components have file-level eslint-disable comments instead of fixes
- Where: src/components/home/HeroScene.tsx, animations/TextScramble.tsx, ui/CursorSpotlight.tsx (+ siblings)
- Why:   all are scheduled for deletion in Phase 1 (ADR-005 motion removals, incl. dropping three/r3f/drei/lenis deps); refactoring code that's about to be deleted is waste
- Not:   rejected fixing their react-hooks violations properly — if you find yourself improving one of these files, delete it instead (check docs/tasks/phase-1-tasks.md P1-T4)
- Decided: 2026-06-12

## Governance — the blueprint is frozen; precedence order exists
_aka: docs/, ADRs, handoff, review verdict_

- What:  /docs is a complete frozen blueprint; IMPLEMENTATION_HANDOFF.md (repo root) is the entry point and defines which doc wins on conflict
- Where: IMPLEMENTATION_HANDOFF.md · docs/** (review verdict + implementation-unblock are BINDING over the rest)
- Why:   ~35 docs accumulated across strategy → review → unblock passes; later docs deliberately amend earlier ones (e.g. search was specced, then deferred) — reading one doc in isolation gives stale guidance
- Not:   rejected creating new strategy/architecture docs (explicit freeze); structural deviations require amending the relevant ADR first, not silent divergence
- Decided: 2026-06-12

## Features — search is deferred, not missing
_aka: Pagefind, command palette, ⌘K, /search_

- What:  no site search ships at launch; ADR-008 status is Deferred
- Why:   review panel kill-list: ⌘K over ~25 pages is cost without value; cross-links handle discovery at this corpus size; trigger to revisit is ≥30 published notes
- Not:   rejected Pagefind + CommandPalette + /search for v1 (fully specced, then cut — the spec in docs/architecture/01 §6 is future reference, not a to-do)
- Decided: 2026-06-12

## Copy — identity consistency ledger
_aka: years of experience, tech stack chips, LangChain_

- What:  experience is "5 years" everywhere; LangChain and ChatGPT must not appear as skills/stack items
- Where: src/content/site.ts (techStack) · all copy; ledger: docs/content/01-content-strategy.md §7
- Why:   resume says 5 (the 4.75 decimal read as insecurity); the flagship project's whole pitch is "no LangChain glue" — listing LangChain as a skill made the site argue against itself
- Not:   rejected 4.75 stat and LangChain/ChatGPT chips (removed 2026-06-12); LangChain may appear only inside rejected-alternatives prose in decision records
- Decided: 2026-06-12
