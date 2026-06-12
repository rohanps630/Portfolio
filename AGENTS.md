# Portfolio — Rohan P. Suresh

## Project Overview

Personal portfolio for a full-stack & AI integration engineer. Built to serve both recruiters (full-time roles) and freelance clients. All content is local — no database — so the site is fully self-contained and trivially deployable.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4 (CSS-first `@theme` config in globals.css)
- **3D Hero:** Three.js + @react-three/fiber + @react-three/drei
- **Animations:** Framer Motion 12 + Lenis (smooth scroll)
- **Content:** Local JSON (`src/content/content.json`) + TS project files + MDX blog posts
- **Blog:** MDX files compiled with next-mdx-remote/rsc
- **Forms:** react-hook-form + Zod 4 validation
- **Email:** Resend (contact form delivery — no DB persistence)
- **Fonts:** Satoshi (headings) + General Sans (body), self-hosted in public/fonts/
- **Package Manager:** Bun
- **Deployment Target:** Vercel

## Architecture

### Pages (public only)
- `src/app/page.tsx` — Home (hero, featured projects, tech stack, blog preview, CTA)
- `src/app/about/` — About page
- `src/app/projects/` — Listing + `[slug]` case study detail
- `src/app/blog/` — Listing + `[slug]` post detail
- `src/app/contact/` — Contact form

### Content Sources (all local files)
- `src/content/content.json` — site config, nav, stats, tech stack, testimonials, FAQs, process steps, page visibility
- `src/content/projects/*.ts` — one file per project, exported as `Project` typed objects
- `src/content/blog/*.mdx` — MDX posts with frontmatter (title, excerpt, date, category, tags, coverImage, published)

### Data Flow
1. Server components call async helpers from `src/lib/data.ts`, `src/lib/projects.ts`, `src/lib/mdx.ts`
2. Those helpers read directly from `content.json`, project TS modules, or MDX files on disk
3. Client components receive data as props — they never fetch directly

### Components
- `src/components/layout/` — Navbar, Footer, MobileNav, SmoothScroll, PublicShell, SectionContainer
- `src/components/ui/` — Button, Card, Input, Select, Badge, ThemeToggle, MagneticButton, TiltCard, CursorSpotlight, ScrollProgress, BackToTop
- `src/components/home/` — HeroSection, HeroScene (Three.js 3D), FeaturedProjects, TechStackBar, BlogPreview, CTASection
- `src/components/animations/` — FadeIn, SlideUp, StaggerChildren, TextScramble, ParallaxWrapper

## Key Patterns

- **All content is local.** No database. Edit `content.json` or the project/blog files directly.
- **Async data helpers:** All `getX()` functions in `lib/` are async (kept that way so call sites don't change), but read synchronously from files.
- **SEO:** Every page exports `generateMetadata()`. JSON-LD schemas via `src/lib/seo.ts`. Sitemap/robots auto-generated.
- **Animations:** FadeIn, StaggerChildren, TextScramble wrappers. All respect `prefers-reduced-motion`. Lenis for smooth scroll. Three.js for 3D hero (desktop only, CSS orb fallback on mobile).
- **Dark/light mode:** Default dark. Controlled via next-themes with `data-theme` attribute. CSS variables in globals.css.
- **Container:** Use `SectionContainer` or `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Do NOT use Tailwind's `container` class (no max-width in v4).

## Commands

```bash
bun run dev      # Start dev server (Turbopack)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint
```

## Environment Variables

```
RESEND_API_KEY       # Resend API key (optional in dev — falls back to console.log)
CONTACT_EMAIL        # Email address that contact form submissions are delivered to
NEXT_PUBLIC_SITE_URL # Public site URL (overrides default in content.json)
```

## Adding Content

- **Edit site config / nav / stats / testimonials / FAQs / process steps:** edit `src/content/content.json`
- **New project:** create a TS file in `src/content/projects/`, then import it in `src/lib/projects.ts`
- **New blog post:** create a `.mdx` file in `src/content/blog/` with frontmatter
- **Blog categories:** architecture, react, mobile, ai, devops, career, accessibility

## Important Notes

- Brand icons (GitHub, LinkedIn) are inline SVGs in `SocialLinks.tsx` — lucide-react v1.7 removed brand icons
- Contact form honeypot field ("website") must remain hidden — it's spam prevention
- Project/blog filtering uses URL search params for SEO-friendly shareable URLs
- All animations use Framer Motion only — no mixing animation libraries
- 3D hero uses dynamic import with `ssr: false` — hidden on mobile for performance
- The contact form schema still accepts `budget` and `timeline` for back-compat, but the budget field is hidden from the UI
- Resume PDF lives at `public/resume/rohan-suresh-resume.pdf` and opens in a new tab as a preview

## Engram — project index of intent (.engram/INDEX.md)

⛔ **READ FIRST.** The compiler / LSP / grep own **structure** (what calls what). Engram owns **intent** — the
non-derivable *why* and *why-not* that no tool can recover from the code.

- **Before editing ANY file, you MUST first read `.engram/INDEX.md`** and check whether that area
  has an entry — **especially for `src/content/projects/*` (claim ceilings), `src/content/site.ts`,
  `scripts/validate-content.ts`, `eslint.config.mjs`/`package.json` (eslint pin), and the doomed
  decorative components (`HeroScene`, `TextScramble`, `CursorSpotlight`).** If an entry exists,
  **state what you found before you edit**, and respect its `Why` / `Not`. The `Not:` field records
  changes already considered and **rejected** — if your edit matches a `Not:`, **STOP and confirm
  with the user; do not "fix" it.** A request that sounds like an obvious cleanup is *exactly* when
  to check first.
- **After a real decision**, propose a new or edited entry (`What / Where / Why / Not / Decided`)
  — batched at the task boundary, written on a one-word confirm. New concept → new entry; changed
  decision → **edit** the entry and move the old call into `Not:`.
- **NEVER fabricate a `Why` or `Not`.** Write only the reason the user actually gave you or that
  the code plainly shows. If you don't have the real reason, write `⚠️ CONFIRM` — do not invent
  a plausible-sounding history. A casual remark like "this looks wrong, fix it" is a question,
  not a confirmed decision. When a request contradicts an existing entry, **stop and ask**.
- An entry earns its place only if it is non-derivable, load-bearing, and durable (the Three-Gate
  test). Coverage is a non-goal. Fix or delete any stale entry you pass through.

## Coding rules (adapted from Cortex skills, 2026-06 — regenerate via CORTEX_PROMPT Mode A)

**Engineering discipline** (universal/engineering-guidelines):
- Think before coding: state assumptions; if multiple interpretations exist, present them; push back when a simpler approach exists.
- Simplicity first: minimum code that solves the problem; no speculative abstractions or configurability; "would a senior call this overcomplicated?"
- Surgical changes: touch only what the task requires; match existing style; clean up only orphans *your* change created.
- Goal-driven: turn tasks into verifiable criteria (build/lint/validate-content green; for bugs, reproduce first) and loop until verified.

**React 19 / Next.js App Router** (web/react-best-practices, web/composition-patterns — adapted for this SSG site):
- Server components by default; `"use client"` only at interaction leaves. Minimize props serialized to client components.
- Parallelize independent awaits (`Promise.all` — see `src/app/page.tsx` for the house pattern); never sequential-await independent content reads.
- Heavy/optional client code loads via `next/dynamic` (the future Explorer canvas chunk is the canonical case); no barrel-file imports for icon/util libs.
- React 19 idioms: no `forwardRef` (ref as prop), `use()` over `useContext()`; never define components inside components; derive state during render, not in effects (the next-themes mounted gate is the one documented exception).
- Composition over configuration: no boolean-prop proliferation — explicit variant components and `children` instead of `renderX`/mode props (the tier-conditional case-study template and lab-kit primitives must follow this).

**Tokens & UI** (ui/design-system, ui/ui-ux-guidelines — adapted; the blueprint's design docs win on conflict):
- All color/spacing/type goes through the semantic tokens in `globals.css` `@theme`; raw hex/arbitrary values in components are a review rejection. New semantics = new token, not an inline value.
- A11y floor on every component at birth: 4.5:1 contrast, visible focus, 44px touch targets, no hover-only affordances, labels never placeholder-only, SVG icons (no emoji), reserve space for async content (CLS), every animation gated on `prefers-reduced-motion`.
- Animation: 150–300ms standard, transform/opacity only, motion must convey meaning (docs/design/04-motion-system.md is binding).
