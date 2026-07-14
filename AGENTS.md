# AGENTS.md — Operating Manual for the Portfolio ("The Lab")

This is the single source of truth for how an AI agent works in this repository.
`CLAUDE.md` points here; do not duplicate content between them. This manual was
regenerated 2026-07-08 from a full repo audit of the `v2` branch. If anything
here contradicts the code, **the code wins — then fix this file.**

---

## 0. How to use this manual

**Read order for any task:**

1. This file — top to bottom once; afterwards, at minimum §3 (rules) and §7 (escalation).
2. [`.engram/INDEX.md`](.engram/INDEX.md) — check for an entry covering every area you are about to touch (§3.2 tells you how).
3. For feature-level work: [`IMPLEMENTATION_HANDOFF.md`](IMPLEMENTATION_HANDOFF.md) — the frozen blueprint's entry point, with its own precedence order.
4. Only then open the code.

**Precedence when sources conflict (highest wins):**

1. The user's explicit instruction in this session
2. The actual code and its passing gates (reality)
3. `.engram/INDEX.md` (recorded intent; if reality contradicts it, the entry is stale — fix or flag it, per §3.2)
4. This manual
5. `IMPLEMENTATION_HANDOFF.md` → Review Panel Verdict → Implementation Unblock → ACR audit docs → ADRs → specs (the handoff §0 order)
6. General best practices

A real example of why rule 2 outranks rule 5: the blueprint kill list cut
`AnimatedCounter` and deferred search; both shipped anyway (search in Phase 4,
commit `3752fbd`). Deleting shipped UI to "enforce" a doc is a violation —
surface the conflict instead (§7).

---

## 1. What this project is

Personal portfolio of **Rohan P. Suresh**, rebuilt (v2, "the Engineering Lab") as an
interactive engineering showcase. Positioning: *"Full-stack engineer who ships
production AI systems."* Audience: recruiters and freelance clients.

The differentiator is a **trust architecture** — the site's entire pitch is
*evidence over claims*:

- Every metric renders a **provenance label**: `measured` · `target` · `scope-fact`.
- Every decision record carries a **mandatory `cost`** (what the choice gave up).
- Employer work is described at **pattern level only** — the public resume is the
  disclosure ceiling.
- The flagship AI Code Reviewer case study may claim **nothing** that isn't backed
  by the audited evidence docs in `docs/projects/`.

**The site itself is exhibit zero.** Its CI gates, a11y, performance budgets, and
content validation are part of the demonstration. One fabricated number, fake
screenshot, or silenced gate poisons the whole thesis. This is why the honesty
rules in §3.1 outrank every stylistic rule in this file.

**Permanent non-goals** (from the frozen blueprint, `IMPLEMENTATION_HANDOFF.md` §5):
no CMS, no database, no auth (content-as-code is part of the demonstration); no
fabricated evidence of any kind; no decorative motion; no graph-layout library
for the explorer; no new strategy documents; never more employer detail than the
public resume.

---

## 2. System map

### 2.1 Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19 | fully static (SSG) except two API routes |
| Language | TypeScript 6, strict | path alias `@/*` → `src/*` |
| Styling | Tailwind CSS 4 | CSS-first `@theme` tokens in `src/app/globals.css`; `@tailwindcss/typography` |
| Animation | Framer Motion 12 **only** | Three.js/Lenis stack was deleted in Phase 1 — never reintroduce |
| Content | Local TS modules + MDX | validated by Zod 4 schemas at build time |
| MDX | next-mdx-remote/rsc + gray-matter + rehype-pretty-code/shiki | |
| Search | Pagefind (postbuild static index) | `public/pagefind/` is **generated and gitignored** — never edit or commit it |
| Forms | react-hook-form + Zod | contact only |
| Email | Resend | no persistence; dev/e2e fall back to console |
| Analytics | @vercel/analytics via `src/lib/analytics.ts` wrapper | dev = console.log |
| Fonts | Satoshi (headings), General Sans (body) | self-hosted `public/fonts/`, preloaded in layout |
| Icons | lucide-react v1.7 | brand icons removed upstream → GitHub/LinkedIn are inline SVGs in `SocialLinks.tsx` |
| Package manager | Bun (CI pins 1.3.3) | `bun install --frozen-lockfile` in CI |
| Tests | Playwright smoke suite (`tests/smoke.spec.ts`) + Lighthouse CI | run against a **production build** |
| Deploy | Vercel | `main` is the PR target; active work on `v2` |

### 2.2 Routes

| Route | Source | Kind |
|---|---|---|
| `/` | `src/app/page.tsx` | SSG |
| `/about` | `src/app/about/page.tsx` | SSG |
| `/projects`, `/projects/[slug]` | `src/app/projects/` | SSG — **renders Systems** (see naming note) |
| `/notes`, `/notes/[slug]`, `/notes/series/[series]` | `src/app/notes/` | SSG, MDX |
| `/explorer/[slug]` | `src/app/explorer/[slug]/page.tsx` | SSG — Architecture Explorer |
| `/resume`, `/contact`, `/colophon`, `/search` | `src/app/…` | SSG |
| `/api/contact` | `route.ts` | POST; rate-limited, honeypot |
| `/api/og` | `route.tsx` | OG image generation |
| `/feed.xml`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `icon.tsx`, `apple-icon.tsx` | metadata routes | generated |

301 redirects live in `next.config.ts`: `/blog → /notes`, `/blog/:slug → /notes/:slug`,
`/work → /projects`. Never break a previously published URL — add a redirect.

**Naming note:** the URL segment and page components say "projects"; the data
model, content directory, and lib say **System** (`src/content/systems/`,
`src/lib/systems.ts`, `systemSchema`). This split is deliberate (public-facing
word vs. internal case-study model). Don't "unify" it in either direction.

### 2.3 Content & data flow

```
src/content/site.ts          siteConfig (as const): identity, nav, stats, techStack
src/content/systems/*.ts     9 System case studies (typed by systemSchema)
src/content/architectures/   Explorer models (architectureModelSchema) + index.ts
src/content/notes/*.mdx      Notes with frontmatter (noteSchema)
src/content/resume.ts        resumeData (resumeSchema) — single source for /resume & Timeline
        │
src/lib/schemas/{site,system,architecture,note,resume}.ts   Zod 4; types are z.infer — never hand-written duplicates
        │
src/lib/{systems,mdx,data}.ts   async accessor functions (getX) — the ONLY read path
        │
Server components (pages) — fetch via accessors, Promise.all for independent reads
        │
Client components — receive data as props; never read content or fetch themselves
```

Rules baked into this flow:

- **Accessors are `async` but read synchronously.** Kept async so call sites
  never change if the storage does. Don't "simplify" them to sync.
- **New system files must be imported and registered in `src/lib/systems.ts`** —
  there is no dynamic discovery for TS content (MDX notes *are* discovered from
  the filesystem).
- **Notes fail closed:** a note without `published: true` never renders, feeds,
  or gets indexed.
- Slugs from URLs are validated (`/^[a-zA-Z0-9-]+$/` in `mdx.ts`) before touching
  the filesystem — preserve this in any new file-reading accessor.

### 2.4 Build, CI, deploy

```
bun run dev            # Turbopack dev server
bun run build          # prebuild → validate-content (BLOCKS on schema/ref errors)
                       # postbuild → pagefind index into public/pagefind/
bun run start          # production server (required by e2e, lhci, check-links)
bun run lint           # eslint . (v9 — pinned; see §3.8)
bun run tsc --noEmit   # typecheck (CI step; not a package script)
bun run validate-content
bun run check-links    # scans .next output; requires a build first
bun run generate-covers # re-render the system cover art (deterministic; Playwright → webp)
bunx playwright test   # requires build + running against prod; CONTACT_FORM_DRY_RUN=1
bunx lhci autorun      # Lighthouse gates (lighthouserc.json)
```

CI (`.github/workflows/ci.yml`) runs, in order: typecheck → lint → build
(= content validation) → check-links → Playwright (with `CONTACT_FORM_DRY_RUN=1`)
→ Lighthouse. **Local `.env.local` contains a real Resend key — never run the
Playwright suite without `CONTACT_FORM_DRY_RUN=1` or the contact e2e sends real
email.**

Environment variables (`.env.example`): `RESEND_API_KEY` (optional in dev, must
fail loudly if absent in prod — already implemented in `src/lib/email.ts`),
`CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL`, and `CONTACT_FORM_DRY_RUN` (e2e/CI only,
never on a real deployment).

### 2.5 Components

```
src/components/
  layout/      Navbar, Footer, MobileNav, PublicShell, SectionContainer
  ui/          lab-kit primitives: Button/ButtonLink, Card, Badge, StatusBadge,
               SystemCard, SystemRow, MetricFact, DecisionRecord, EvidenceLink,
               Input, Select, Textarea, ThemeToggle, CommandPalette, Logo,
               ScrollProgress, BackToTop, OpenSearchButton, PrintButton
  home/        HeroSection, FeaturedSystems, NotesPreview, ValuePillars,
               TechStackBar, CTASection
  about/       AboutHero, Timeline (renders from resumeData), SkillsGrid, Certifications
  notes/       NoteCard, NoteGrid, NoteHeader, NoteContent, TableOfContents,
               SeriesNav, RelatedNotes, NoteCategoryFilter
  explorer/    Explorer, ExplorerCanvas, DiagramSvg, NodeInspector, FlowStepper,
               ExplorerTextEquivalent (same data source as the SVG — a11y requirement)
  systems/     SystemFilter, RelatedSystem
  contact/     ContactForm, ContactInfo, FormSuccess
  mdx/         DecisionLink, ExplorerLink (cross-linking inside notes)
  shared/      SectionHeading, Breadcrumbs, SocialLinks, TechBadge,
               ImagePlaceholder, AnimatedCounter
  animations/  FadeIn, StaggerChildren (the only animation wrappers — all others were deleted)
```

---

## 3. Operating rules

### 3.1 Content honesty — the load-bearing rules

These are enforced editorially and by schema; violating them is the one class of
error this project cannot absorb. Canonical text:
`docs/architecture/02-project-showcase-framework.md` §3 and
`docs/content/01-content-strategy.md` §7–8.

1. **Provenance is rendered.** Every metric is a `MetricFact` with
   `provenance: "measured" | "target" | "scope-fact"`. Never present a target as
   an achievement — the original "<$0.20/review" line was exactly this failure
   and had to be publicly retracted.
2. **AI Code Reviewer claim ceiling.** Every public ACR statement must be
   traceable to `docs/projects/ai-code-reviewer-*.md`. New facts enter via those
   audit docs first, then the site copy. Five specific false claims were removed
   in 2026-06 (50+ OSS PRs · Modal indexer · <$0.20/review · `get_pr_discussion`
   tool · injection-attempt logging) — **never reintroduce them.**
3. **Employer disclosure ceiling.** Employer-owned systems (`context` other than
   `independent`) are described at pattern level; the public resume is the
   maximum specificity. Never redraw real topology with renamed nodes (banned
   diagram class C3). Employer content never publishes without human sign-off —
   draft it, then stop and hand off.
4. **Evidence rule.** Tier 1/2 systems need ≥ 1 `EvidenceLink` or screenshot
   (validator warns today; the requirement stands).
5. **Costs are mandatory.** `decisionRecordSchema.cost` is required by schema;
   "Lessons" must include a real cost or mistake ("I learned the value of
   teamwork" is a rejection).
6. **No fake assets, ever.** Missing images are a *designed state*: the validator
   WARNS, the UI renders fallbacks. A Phase-0 agent once created 19 zero-byte
   placeholder files to silence warnings; they were deleted and the incident is
   recorded in Engram. Do not create placeholder files, fake screenshots,
   invented testimonials, or lorem ipsum.
7. **Consistency ledger.** Experience is "5 years" everywhere. LangChain and
   ChatGPT never appear as skills/stack items (the flagship's pitch is "no
   LangChain glue"); LangChain may appear only inside rejected-alternatives
   prose. Job titles appear verbatim; positioning titles are self-description
   only. Ledger: `docs/content/01-content-strategy.md` §7.
8. **Editorial definition of done** (any published copy): voice rules pass ·
   ledger-clean against the resume · provenance labels on all metrics ·
   confidentiality protocol applied · (notes) one technique query served ·
   read-aloud test.

### 3.2 Engram — project index of intent (`.engram/INDEX.md`)

⛔ **READ FIRST.** The compiler / LSP / grep own **structure** (what calls what).
Engram owns **intent** — the non-derivable *why* and *why-not* that no tool can
recover from the code.

- **Before editing ANY file, read `.engram/INDEX.md`** and check whether that
  area has an entry — **especially for `src/content/systems/*` (claim ceilings),
  `src/content/site.ts` (identity ledger), `scripts/validate-content.ts`,
  `eslint.config.mjs`/`package.json` (eslint pin), and the contact form
  (honeypot + Suspense).** If an entry exists, **state what you found before you
  edit**, and respect its `Why` / `Not`. The `Not:` field records changes already
  considered and **rejected** — if your edit matches a `Not:`, **STOP and confirm
  with the user; do not "fix" it.** A request that sounds like an obvious cleanup
  is *exactly* when to check first.
- **After a real decision**, propose a new or edited entry
  (`What / Where / Why / Not / Decided`) — batched at the task boundary, written
  on a one-word confirm. New concept → new entry; changed decision → **edit** the
  entry and move the old call into `Not:`.
- **NEVER fabricate a `Why` or `Not`.** Write only the reason the user actually
  gave you or that the code plainly shows. If you don't have the real reason,
  write `⚠️ CONFIRM` — do not invent a plausible-sounding history. A casual
  remark like "this looks wrong, fix it" is a question, not a confirmed decision.
  When a request contradicts an existing entry, **stop and ask**.
- An entry earns its place only if it is non-derivable, load-bearing, and durable
  (the Three-Gate test). Coverage is a non-goal. Fix or delete any stale entry
  you pass through — mechanical fixes (moved paths, shipped features) directly;
  anything requiring a *why* you don't have gets `⚠️ CONFIRM`.

### 3.3 Engineering discipline (adapted from Cortex `universal/engineering-guidelines`)

- **Think before coding:** state assumptions; if multiple interpretations exist,
  present them; push back when a simpler approach exists.
- **Simplicity first:** minimum code that solves the problem; no speculative
  abstractions or configurability. Test: "would a senior call this
  overcomplicated?"
- **Surgical changes:** touch only what the task requires; match existing style;
  clean up only orphans *your* change created. Do not mass-migrate legacy
  patterns (§9) opportunistically.
- **Goal-driven:** turn tasks into verifiable criteria (the gate suite, §4.1;
  for bugs, reproduce first) and loop until verified.

### 3.4 React 19 / Next.js App Router (adapted from Cortex `web/react-best-practices`, `web/composition-patterns`)

- **Server components by default;** `"use client"` only at interaction leaves.
  Minimize props serialized across the boundary.
- **Parallelize independent awaits** — `Promise.all`, house pattern in
  `src/app/page.tsx:20`. Never sequential-await independent content reads.
- **Heavy/optional client code loads via `next/dynamic`** — the CommandPalette is
  the canonical case (zero search JS before first open; Pagefind lazy-loads on
  palette open). No barrel-file imports for icon/util libs
  (`optimizePackageImports` covers lucide-react and framer-motion).
- **`useSearchParams` requires a `<Suspense>` boundary** at the importing page
  (`src/app/contact/page.tsx` — Engram entry). Otherwise the whole route bails
  out of static generation.
- **React 19 idioms in new code:** ref as prop (no `forwardRef`), `use()` over
  `useContext()`; never define components inside components; derive state during
  render, not in effects (the next-themes mounted gate is the one documented
  exception). Existing `forwardRef` in `Button/Input/Select/Textarea` is legacy —
  leave it; don't copy it into new components.
- **Composition over configuration:** no boolean-prop proliferation — explicit
  variant components and `children` instead of `renderX`/mode props. The
  tier-conditional case-study template and lab-kit primitives follow this.
- **Every page exports metadata** via `createMetadata()` from `src/lib/seo.ts`
  with an explicit `path` (omitting it silently canonicalizes to the homepage —
  a real shipped bug, see `src/app/explorer/[slug]/page.tsx`). JSON-LD via the
  `build*JsonLd` helpers. Dynamic routes implement `generateStaticParams`.
- **URL as state** for filters/explorer (`?flow=&step=&layer=`, search params on
  listings) — shareable, SEO-friendly. All params from URLs are untrusted:
  clamp/validate before use (audit finding: a malformed `step` crashed the
  route).

### 3.5 Design tokens, UI & accessibility

- **All color/spacing/type goes through the semantic tokens** in
  `src/app/globals.css` `@theme` (plus the `[data-theme="light"]` overrides). Raw
  hex or arbitrary values in components are a review rejection. New semantic need
  → new token (both themes!), not an inline value. Lab-kit tokens exist for
  status, provenance, and explorer nodes — use them.
- **Dark is default**; next-themes with `attribute="data-theme"`,
  `storageKey="portfolio-theme"`. Every visual change must be checked in both
  themes (the smoke suite renders both).
- **Container pattern:** `SectionContainer` or
  `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Tailwind 4's `container` class has no
  max-width — do not use it.
- **A11y floor on every component at birth** (WCAG 2.2 AA is a launch gate):
  4.5:1 contrast, visible focus (`focus-visible` ring pattern as in `Button`),
  44px touch targets, no hover-only affordances, labels never placeholder-only,
  SVG icons (no emoji), reserve space for async content (CLS ≤ 0.02 budget),
  dialogs get real dialog semantics + focus trap + Escape + focus restore
  (CommandPalette is the reference), interactive SVG nodes are focusable and
  keyboard-operable, and the Explorer keeps a **generated text equivalent from
  the same data source as the SVG**.
- **One interactive element per control:** a button inside an anchor is invalid
  HTML and a double tab stop — use `ButtonLink` for navigating CTAs.
- **Motion:** Framer Motion only; 150–300ms standard (≤600ms max);
  transform/opacity only; animate once (`whileInView` + `once`); motion must
  convey meaning — decorative motion is banned. Every animation gates on
  `prefers-reduced-motion` (`FadeIn`/`StaggerChildren` already do; new animations
  must). `docs/design/04-motion-system.md` is binding.

### 3.6 Security

- **Honeypot** (`website` field): hidden in UI, `optional()` in schema, and the
  API **silently succeeds** on non-empty values. All three parts are deliberate —
  rejecting in the schema would dead-end real users whose browsers autofill it,
  and revealing detection helps bots. Never "fix" any part of this.
- **Escape user input** before interpolating into HTML email (`esc()` in
  `src/lib/email.ts`); collapse newlines in header values (subject injection).
- **Validate everything at the boundary:** request bodies via
  `contactFormSchema.safeParse`; URL slugs via the slug regex; search params
  clamped. Zod, not hand-rolled checks.
- **Fail loudly on data loss:** missing `RESEND_API_KEY` in production throws
  rather than pretending success. Apply the same principle to any new
  side-effecting path.
- **Rate limiting** on `/api/contact` is best-effort in-memory (documented
  limitation; durable limiting via Upstash/KV is deliberately deferred). Don't
  present it as a guarantee; don't silently remove the cap logic.
- Security headers live in `next.config.ts`; a full CSP is **deliberately
  deferred** (needs nonce setup) — adding a naive CSP will break Next's inline
  runtime.
- **Never commit secrets.** `.env.local` exists locally and is gitignored;
  `data/` and `*.docx` are gitignored for the same reason (history scrub still
  pending — §9).

### 3.7 Errors, logging, comments, style

- Route-level `error.tsx` / `global-error.tsx` / `not-found.tsx` exist; content
  accessors throw on invalid input and callers catch → `notFound()`. 404s must
  not leak draft content into metadata.
- No logging framework: `console.error` at API/scripts boundaries only;
  analytics events only through `trackEvent()` (dev = console). Event names are
  historically inconsistent — **kept deliberately** to avoid breaking dashboards;
  match the existing name when touching an event, don't rename.
- Validator semantics: **schema/referential violations = error (build fails);
  missing media = warning (fallback renders).** This asymmetry is the anti-fakery
  design — never promote media warnings to errors, never demote schema errors to
  warnings, never add exemption lists to gates.
- **Comment style:** comments state a constraint the code can't show — why, not
  what (see `mdx.ts`, `email.ts`, `check-links.ts` for the house voice). No
  changelog comments, no restating the next line.
- Formatting: double quotes, 2-space indent, named exports (components), typed
  props interfaces, `cn()` from `src/lib/utils.ts` for conditional classes.
  File naming: components `PascalCase.tsx`, lib/scripts `kebab-or-camel.ts`,
  content files `kebab-case` matching their slug.

### 3.8 Git, dependencies, docs

- **Conventional commits** with scope, matching history:
  `feat(phase4): …`, `fix(audit): …`, `docs(engram): …`, `chore: …`.
- Active branch is `v2`; `main` is the PR/deploy target. Commit or push **only
  when asked**; several local commits are intentionally unpushed (§9).
- **ESLint is pinned to v9** and the script is `eslint .` (`next lint` was
  removed in Next 16; ESLint 10 crashes eslint-plugin-react). jsx-a11y's
  recommended rules are enabled in `eslint.config.mjs` **without re-registering
  the plugin** (core-web-vitals already registers it; re-adding throws "Cannot
  redefine plugin"). **Do not accept a dependabot major bump of eslint without
  re-testing the whole chain.**
- **New dependencies need a bundle-cost note** in the PR/commit body (handoff
  §7.3). Prefer zero-dep solutions; this site's perf budget is part of its
  content.
- **No new strategy/architecture docs** — the blueprint is frozen. Structural
  deviations require amending the relevant ADR first, not silent divergence.
  Recording *implementation* decisions goes to Engram, not new docs.
- Generated artifacts are never edited or committed: `.next/`, `public/pagefind/`,
  `data/`, `tsconfig.tsbuildinfo`, `test-results/`.

---

## 4. Quality bar — objective acceptance criteria

### 4.1 The gate suite (exit criteria for every change)

Run in this order; a change is done when every applicable gate passes:

| # | Gate | Command | Catches |
|---|---|---|---|
| 1 | Typecheck | `bun run tsc --noEmit` | type drift |
| 2 | Lint | `bun run lint` | style + jsx-a11y violations |
| 3 | Content + build | `bun run build` | schema violations, dangling refs, missing media (warn), build breaks |
| 4 | Links | `bun run check-links` | broken internal links/anchors (needs step 3 first) |
| 5 | E2E smoke | `CONTACT_FORM_DRY_RUN=1 bunx playwright test` | route rendering both themes, search navigation, contact flow (needs `bun run start`able build) |
| 6 | Lighthouse | `bunx lhci autorun` | perf ≥ 0.90, a11y ≥ 0.95, SEO ≥ 0.95 (errors); best-practices ≥ 0.90 (warn) |

Steps 1–4 are mandatory for any code or content change. Steps 5–6 are mandatory
before commit for changes touching routes, interaction, or performance-relevant
code; skip them (and say so) only for pure copy/doc edits.

Target budgets beyond the CI floor (handoff §7.3, aspirational but tracked):
LCP ≤ 1.8s · INP ≤ 150ms · CLS ≤ 0.02 · home JS ≤ 150KB gz · explorer chunk
≤ 35KB lazy · Lighthouse ≥ 95/100/95/100.

**Never weaken a gate to pass it.** No exemption lists, no skipped schemas, no
`--no-verify`. The July 2026 adversarial audit's core theme was "gates that
don't gate" — every exemption sat exactly where a live bug was.

### 4.2 Per-work-type checklists (pass/fail)

**New/changed component**
- [ ] Server component unless it demonstrably needs interaction; `"use client"` at the leaf only
- [ ] All colors/spacing via tokens; verified in dark **and** light theme
- [ ] Keyboard path works; focus visible; correct roles/labels; 44px targets
- [ ] Animations: transform/opacity, ≤600ms, reduced-motion gated, meaning-bearing
- [ ] No new dependency, or bundle-cost note written
- [ ] Gates 1–5 pass

**Content change (system / note / site copy)**
- [ ] §3.1 honesty rules applied (provenance, ceilings, ledger)
- [ ] ACR facts traced to `docs/projects/*`; employer content stops at draft pending sign-off
- [ ] Schema-valid (`bun run validate-content`); refs (`relatedSystem`, `decisionRefs`, `noteRefs`) resolve
- [ ] New system registered in `src/lib/systems.ts`; new note has `published` set deliberately
- [ ] No placeholder/fake assets created; missing media left as warnings
- [ ] Gates 3–4 pass (5 if navigation/search surface changed)

**Bug fix**
- [ ] Reproduced first (test, script, or documented manual repro)
- [ ] Fix at the cause, not the symptom; no gate weakened to make it pass
- [ ] Regression guard added where the smoke suite reaches (see the search-URL test in `tests/smoke.spec.ts` as the model)
- [ ] Engram checked before, entry proposed after if a real decision was made

**Refactor**
- [ ] Zero behavior change (gates 1–5 identical before/after)
- [ ] Motivated by the current task, not opportunism; scope surgical
- [ ] No `Not:` entry in Engram rejects this exact change

**New route**
- [ ] `createMetadata({ path })` with explicit path; JSON-LD if applicable
- [ ] In sitemap; in `check-links` reach (prerendered or manifest-listed)
- [ ] `generateStaticParams` for dynamic segments; params validated/clamped
- [ ] Old URLs that move get 301s in `next.config.ts`
- [ ] Added to the smoke-route list and lighthouserc URL list when user-facing

**API change**
- [ ] Zod validation at the boundary; correct status codes; no info leaks in errors
- [ ] Failure = loud (no silent data loss); side effects have a dev/e2e-safe path

**Docs**
- [ ] No new strategy docs; ADR amended if a binding decision changed
- [ ] AGENTS.md updated if commands, structure, or rules changed
- [ ] Engram proposals batched at task boundary

---

## 5. Common AI failure modes in this repo

Each entry: why it happens → how to recognize it → the rule that prevents it.

1. **Trusting a stale description of the repo.** The blueprint froze in June;
   the code moved on (search shipped despite the kill list; ADR-008's file still
   says "Accepted" while the handoff says "Deferred"). *Recognize:* a doc tells
   you something exists/doesn't and you haven't verified. *Rule:* precedence
   order §0 — reality outranks docs; `ls`/grep before you claim.
2. **Reintroducing killed features.** Three.js hero, Lenis smooth scroll,
   TiltCard/TextScramble/CursorSpotlight/ParallaxWrapper, `/work` alias, POS
   explorer, layer-morph animation — all deliberately deleted or cut.
   *Recognize:* "the portfolio would look nicer with a 3D/parallax/…"
   *Rule:* handoff §4 kill list + Engram; deletions here are decisions, not gaps.
3. **Fabricating or inflating claims.** LLMs pattern-match portfolio copy toward
   marketing superlatives. *Recognize:* writing any number, capability, or
   client outcome you didn't read in a source doc. *Rule:* §3.1(1–2) — provenance
   or it doesn't ship; ACR facts only from `docs/projects/*`.
4. **Creating placeholder assets to silence warnings.** Happened once (19
   zero-byte images), got audited out. *Recognize:* the urge to make
   `validate-content` output "clean". *Rule:* §3.1(6) — media warnings are a
   designed state.
5. **"Fixing" deliberate oddities.** The honeypot's silent success, the
   `async`-but-sync accessors, hidden-but-accepted `budget` field, inconsistent
   analytics event names, warn-not-fail media checks, the forwardRef legacy in
   form primitives. *Recognize:* "this looks wrong/redundant, quick cleanup…"
   *Rule:* §3.2 — check Engram + this manual first; if it matches a `Not:`, stop.
6. **Weakening gates instead of fixing causes.** Adding a link-checker
   exemption, loosening a schema, skipping a failing e2e. *Rule:* §4.1 — the
   audit's entire finding class; never add exemptions.
7. **Client-component creep.** Marking a page `"use client"` to use a hook,
   or `useSearchParams` without Suspense (breaks static generation of the whole
   route). *Rule:* §3.4; wrap at the leaf, Suspense at the import site.
8. **Token/theme violations.** Raw hex, Tailwind arbitrary values, or the v4
   `container` class; styling only checked in dark mode. *Rule:* §3.5.
9. **Breaking published URLs.** Renaming a slug or route without a 301 +
   sitemap + link-check pass. *Rule:* §2.2.
10. **ESLint/dependency drift.** Accepting a major bump (especially eslint 10)
    because dependabot suggested it. *Rule:* §3.8; re-test the chain or decline.
11. **Editing generated output.** "Fixing" search by editing `public/pagefind/`,
    or committing `.next`/`data/`. *Rule:* §3.7 — regenerate, never hand-edit.
12. **Running e2e without the dry-run flag** and sending real email through the
    live Resend key. *Rule:* §2.4.
13. **Employer-content leakage.** Adding detail (service names, real topology,
    exact numbers) beyond the resume to make an employer case study "richer".
    *Rule:* §3.1(3) — pattern level only; sign-off before publish.
14. **Over-engineering.** New abstractions, config systems, CMS-shaped helpers,
    "future-proof" generics for a 9-system portfolio. *Rule:* §3.3 simplicity
    test; §6 abstraction rules.

---

## 6. Decision framework

**When rules conflict**, apply §0 precedence. Within a level: honesty/a11y/security
rules beat performance rules beat stylistic rules.

**Reuse vs. new code:** search `src/components/ui` and `shared/` first; extend an
existing primitive by adding a variant *only if* the variants stay enumerable
(no boolean explosion). New abstraction requires **three concrete call sites
today** — not anticipated ones. Duplication is acceptable when two usages will
evolve independently (e.g., per-page section layouts) or the shared version
would need mode flags.

**Refactoring is justified only when** (a) the task requires touching that code
anyway and the refactor removes real friction, or (b) the user asked. It is not
justified by pattern preference (forwardRef migration, sync-ifying accessors) or
by "while I'm here".

**Trade-off tie-breakers**, in order: does it keep every claim honest? · does it
keep gates strict? · does it keep the bundle/perf budget? · is it the simplest
thing that works? · does it match an existing house pattern? If still torn after
one timeboxed comparison, pick the option that changes fewer files and note the
alternative in the commit body.

**Consistency with architecture:** content flows only content → schema → lib
accessor → server component → client leaf props. Any change that adds a second
read path (fetching in a client component, importing content files directly in
components) is architectural drift — reject it even if it's fewer lines.

---

## 7. Uncertainty & escalation

**Proceed without asking** when the task is reversible, inside one rule set, and
verifiable by gates: implementing a specced task, fixing a reproduced bug,
copy edits within the ledger, refactors the user requested, adding tests,
updating this manual for verified facts.

**Assume-and-document** when a detail is ambiguous but any reasonable choice is
cheap to change: pick the option consistent with an existing pattern, state the
assumption in your response and the commit body. The handoff's open-decisions
table (§9) models this: every open call ships with a pre-agreed default.

**Gather evidence before asking**, in this order: 1) this manual, 2) Engram,
3) the code + gates, 4) `IMPLEMENTATION_HANDOFF.md` and the doc it delegates to,
5) git log/blame. Ask only with the evidence summarized and a recommended
default.

**Stop and ask — always — when:**
- Your change matches a `Not:` in Engram, contradicts an Engram entry, or an
  entry's `Why` is missing and you'd need to invent it.
- Publishing anything employer-related, or any new ACR claim not already in the
  audit docs.
- Deleting user content, rewriting git history, pushing, force operations, or
  anything touching `.env*`.
- A gate can only pass by being weakened.
- The fix requires amending a binding doc (ADR/verdict) — propose the amendment,
  don't silently diverge.
- Reality contradicts a binding doc (like the AnimatedCounter/search cases) and
  the resolution isn't already recorded.

---

## 8. Skills

### 8.1 Automatic selection

Do not wait for explicit `/skill` invocation. Infer from intent, current task,
and repo state; prefer a matching specialized skill over generic reasoning; fall
back gracefully (follow this manual) when none fits. When several apply, chain
them in the order listed below. Priority on conflict: repo-local skills
(`.claude/skills/`) > harness built-ins (verify, code-review, simplify) > none.

### 8.2 Registered skills (repo-local, `.claude/skills/`)

**Spec Kit workflow** — for any feature-sized change (multi-file, user-visible,
or gate-affecting). Chain, in order; artifacts land in `specs/<NNN-slug>/`:

| Skill | Purpose | Auto-trigger examples |
|---|---|---|
| `speckit-constitution` | Create/update project constitution | "set project principles" — **note: `.specify/memory/constitution.md` is still an unfilled template; run this before relying on any constitution gate** |
| `speckit-specify` | Natural-language description → `spec.md` | "add a testimonials section", "build feature X" |
| `speckit-clarify` | ≤5 targeted questions to de-risk a spec | spec has vague scope; run before plan when requirements came in one sentence |
| `speckit-plan` | Spec → design artifacts / `plan.md` | after spec approval |
| `speckit-tasks` | Plan → dependency-ordered `tasks.md` | after plan |
| `speckit-analyze` | Cross-artifact consistency check | after tasks, before implement |
| `speckit-checklist` | Custom quality checklist for the feature | user asks "what should we verify" |
| `speckit-implement` | Execute tasks.md | "build it" after artifacts exist |
| `speckit-converge` | Diff codebase vs spec; append unbuilt work to tasks.md | resuming a half-done feature |
| `speckit-taskstoissues` | tasks.md → GitHub issues | "file these as issues" |

Precedent: the July 2026 audit remediation ran exactly this chain
(`specs/001-audit-remediation/`). Small fixes (single-file, copy, config) do
**not** need Spec Kit — use judgment; a one-line fix with a spec is
over-engineering.

**Authoring & verification** (specs below in `.claude/skills/<name>/SKILL.md`):

| Skill | Purpose | Auto-trigger examples |
|---|---|---|
| `add-system` | Add/update a System case study with honesty rails | "add a project", "update the ACR case study", "change a metric" |
| `add-note` | Author/edit an MDX note through schema + editorial DoD | "write a note about X", "publish the draft", "add to the series" |
| `preflight` | Run the full gate suite in CI order + Engram batch | before any commit; "is this ready?", "run the checks" |

Chaining: `add-system`/`add-note` end by invoking `preflight`. `speckit-implement`
should run `preflight` at each checkpoint. Harness `verify`/`code-review` skills
complement `preflight` (behavioral verification vs. gate verification) — use both
for feature-sized work.

### 8.3 Harness built-ins worth invoking here

- `verify` — after nontrivial changes, drive the affected flow against
  `bun run dev` (or a prod build for search/e2e-adjacent work).
- `code-review` — before handing off multi-file changes.
- `simplify` — after feature work lands green, scoped to the diff only.

---

## 9. Current-state ledger (verified 2026-07-08)

**Existing deviations — do not copy, do not mass-fix:**
- `forwardRef` in `Button/Input/Select/Textarea` (pre-React-19 pattern; §3.4).
- `AnimatedCounter` exists and is used in `HeroSection` despite the blueprint
  kill list — a reality-vs-doc conflict; leave it unless the owner rules.
- Analytics event names are inconsistent — kept deliberately (dashboards).
- `check-links.ts` resolves relative hrefs naively (documented "basic
  resolution") — fine at current corpus; don't build a resolver unasked.
- Lighthouse CI enforces 0.90/0.95/—/0.95 while the handoff targets 95/100/95/100
  — the CI numbers are the *enforced floor*, the handoff numbers the *target*.

**Deliberately deferred (don't "helpfully" implement):** full CSP header (needs
nonce setup) · durable rate limiting (Upstash/KV) · search-query PII scrubbing
in analytics · RSS enhancements beyond the shipped feed.

**Owner-pending (agent cannot complete; remind, don't attempt):**
- ~40 missing image assets (system covers/screenshots, note covers) — validator
  warns on each. `System.screenshots` data is rendered by **no component** —
  render or drop is an open owner decision.
- `.docx` files removed from HEAD but present in git history → needs
  `git filter-repo` before the repo goes public.
- `.env.local` contains stale `ADMIN_PASSWORD_HASH`/`ADMIN_SECRET`/`DATABASE_URL`
  no code reads — delete/rotate.
- Education entries TODO in `src/content/resume.ts`.
- Local commits on `v2` are unpushed; CI's Playwright/Lighthouse steps have never
  run on GitHub.

---

## Going deeper (on demand, not preloaded)

The coding rules in §3.3–3.5 are distilled summaries. When a task warrants the
full rule sets, read them from the Cortex library at `~/Work/Cognition/cortex/skills/`:
`web/react-best-practices/rules/*.md` (70 per-rule files: waterfalls, bundle,
RSC, re-renders), `web/composition-patterns/rules/*.md`,
`ui/ui-ux-guidelines/references/` (priority checklists, style catalog),
`ui/design-system/references/` (token architecture). Adapt to this stack when
applying — never paste verbatim; the blueprint docs win on conflict.
Regenerate the summaries via `CORTEX_PROMPT` Mode A (last run 2026-06).
