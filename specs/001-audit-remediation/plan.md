# Implementation Plan: Audit Remediation — Restore Core Feature Integrity

**Branch**: `001-audit-remediation` (executed on `v2`) | **Date**: 2026-07-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-audit-remediation/spec.md`

## Summary

Repair the confirmed defects from the adversarial audit in five waves ordered by user impact: (1) production-breaking navigation/crash bugs, (2) contact-form correctness, (3) accessibility parity in interactive components, (4) metadata/SEO drift, (5) quality-gate integrity (CI e2e config, link checker exemptions, content validation). Every wave ends with the same acceptance evidence the audit used: lint, typecheck, full build, link check, xmllint on the feed, and greps over the built artifacts.

## Technical Context

**Language/Version**: TypeScript 6 (strict), React 19, Next.js 16 App Router
**Primary Dependencies**: next-mdx-remote/rsc, pagefind 1.5, framer-motion 12, react-hook-form + zod 4, Resend, Playwright 1.60, Bun 1.3.3
**Storage**: N/A — file-based content (TS modules + MDX)
**Testing**: Playwright smoke suite (currently unrunnable — no config; this plan adds one), script gates (validate-content, check-links)
**Target Platform**: Vercel (serverless + edge OG route)
**Project Type**: Next.js web app, single project
**Performance Goals**: No regressions; LHCI budget perf ≥ 0.9, a11y ≥ 0.95 already asserted in CI
**Constraints**: Do not commit; owner reviews the working tree. Do not fabricate missing image assets. Keep public API of `/api/contact` backward compatible (bots and the form both POST the same shape).
**Scale/Scope**: ~30 findings across ~35 files; no data migrations

## Constitution Check

`.specify/memory/constitution.md` is the unmodified template (no project constitution ratified) — no gates to enforce beyond the spec's own success criteria. Noted for the owner: ratifying a constitution would let future specs inherit the "gates must gate" principle this remediation establishes.

## Project Structure (files touched)

```
playwright.config.ts                     # NEW — FR-006
package.json                             # postbuild cleanup — FR-015
scripts/
├── validate-content.ts                  # FR-018, FR-019
└── check-links.ts                       # FR-009
src/
├── app/
│   ├── api/contact/route.ts             # FR-011 (loud failure), FR-016, FR-026 (400 on bad JSON)
│   ├── feed.xml/route.ts                # FR-005
│   ├── layout.tsx                       # FR-012
│   ├── explorer/[slug]/page.tsx         # FR-013
│   ├── notes/series/[series]/page.tsx   # FR-013, FR-026 (series casing)
│   ├── notes/[slug]/page.tsx            # FR-014, FR-021 (fence-aware TOC)
│   └── notes/page.tsx                   # FR-026 ("Note —" title)
├── lib/
│   ├── email.ts                         # FR-011
│   ├── mdx.ts                           # FR-026 (published default false; drop canonicalFrom)
│   ├── utils.ts                         # FR-026 (formatDate UTC)
│   └── schemas/resume.ts                # FR-018
├── types/contact.ts                     # FR-007
├── content/
│   ├── notes/portfolio-engineering-lab.mdx  # FR-003
│   ├── architectures/ai-code-reviewer.ts    # FR-019 (decisionRefs)
│   └── resume.ts                        # FR-020 (single source for timeline)
└── components/
    ├── ui/CommandPalette.tsx            # FR-001, FR-002, FR-008, FR-026 (caps lock)
    ├── ui/Button.tsx                    # FR-023 (href rendering)
    ├── ui/BackToTop.tsx                 # FR-026 (init state)
    ├── contact/ContactForm.tsx          # FR-007, FR-017
    ├── contact/FormSuccess.tsx          # FR-026 (role=status)
    ├── explorer/Explorer.tsx            # FR-004, FR-026 (resolved layer id)
    ├── explorer/ExplorerCanvas.tsx      # FR-024
    ├── explorer/DiagramSvg.tsx          # FR-010
    ├── layout/MobileNav.tsx             # FR-022
    ├── layout/Navbar.tsx                # FR-023 (call site), FR-026 (init state)
    ├── notes/TableOfContents.tsx        # FR-026 (hash/focus)
    ├── notes/NoteCategoryFilter.tsx     # FR-026 (aria-pressed)
    ├── notes/NoteContent.tsx            # FR-021 (flatten heading text), FR-026 (internal links via router)
    ├── notes/SeriesNav.tsx              # FR-026 (series casing)
    ├── shared/AnimatedCounter.tsx       # FR-025, FR-026 (aria-hidden column)
    ├── shared/SocialLinks.tsx           # FR-026 (mailto _blank)
    ├── animations/FadeIn.tsx            # FR-025
    ├── animations/StaggerChildren.tsx   # FR-025
    ├── home/{HeroSection,FeaturedSystems,NotesPreview,CTASection,TechStackBar,ValuePillars}.tsx  # FR-023, FR-026
    └── ui/SystemRow.tsx                 # FR-023
src/hooks/useScrollProgress.ts           # DELETE (dead) — FR-026
```

## Key Decisions

1. **Search URL normalization at result-load time** (not click time): normalize `res.url` when fragments are fetched so both display and navigation use clean URLs; handles `index.html` → `/` and `<page>.html` → `/<page>`.
2. **Honeypot**: schema accepts any string ≤200 (server decides); the form registers the field but the resolver no longer fails it — the server's silent-success branch becomes the single point of bot handling. Previously autofill victims got a silently dead submit button; now they get the documented honeypot trade-off (silent success) and empty-honeypot submissions are unaffected.
3. **Button-as-link**: add an optional `href` prop to `Button` that renders a styled `next/link` anchor instead of a nested button; migrate the 7 nested call sites. No new dependency (no Radix Slot).
4. **Timeline single-source**: `resumeData.experience` becomes canonical; `Timeline.tsx` maps from it. Presentation-only fields the timeline needs move into resume entries as optional metadata — validated by the corrected `resumeSchema`.
5. **decisionRefs correction**: map by decision title/meaning to the real `decision-N` ids in `src/content/systems/ai-code-reviewer.ts`; validator then enforces the invariant forever.
6. **Rate limiter**: keep in-memory design (documented), add hard map cap with eviction and `Retry-After: 60` on 429. Durable limiting remains a documented deployment concern (out of scope per spec).
7. **Draft exclusion**: `generateStaticParams` builds from published notes only; `generateMetadata` returns a generic "Note Not Found" for unpublished/missing slugs. `dynamicParams` stays default (unknown slugs 404 at request time as today).
8. **Playwright**: config with `webServer: bun run start` (assumes prior build — matches CI order), `reuseExistingServer: !CI`, `baseURL: http://localhost:3000`, `testDir: ./tests`.

## Verification plan (maps to SC-001…SC-006)

1. `bun run lint && bun run tsc --noEmit` → exit 0.
2. `bun run build` → exit 0 (validate-content now stricter — must still pass after content fixes).
3. `bun run check-links` (exemptions removed) → exit 0.
4. `curl /feed.xml | xmllint --noout` → exit 0.
5. Grep built artifacts: no `explorer/undefined`, no `og-default.jpg`; clean pagefind fragments contain no draft URLs.
6. `bunx playwright test` against production server → green (includes new search-click test).

## Complexity Tracking

No constitution violations to justify. One scope judgment: `screenshots` remains unrendered (rendering it is a design feature, not a defect fix); the validator now warns on its phantom files so the evidence rule can't be satisfied invisibly.
