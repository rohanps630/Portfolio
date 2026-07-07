# Tasks: Audit Remediation — Restore Core Feature Integrity

**Input**: Design documents from `specs/001-audit-remediation/` (spec.md, plan.md)
**Prerequisites**: none beyond repo toolchain (bun, xmllint)

**Organization**: Grouped by user story. `[P]` = parallelizable (different files). Audit finding IDs (P-xx) and spec FRs cited per task.

## Phase 1: Setup

- [x] T001 Add `playwright.config.ts` (webServer `bun run start`, baseURL, testDir ./tests) — FR-006/P-05
- [x] T002 [P] `package.json`: clean `public/pagefind` before pagefind in `postbuild` — FR-015/P-14

## Phase 2: User Story 1 — Search that actually navigates (P1)

- [x] T003 `src/components/ui/CommandPalette.tsx`: normalize pagefind URLs (`index.html`→`/`, strip `.html`) at result-load — FR-001/P-01
- [x] T004 same file: sequence tokens + try/finally around search; discard stale responses — FR-002/P-15
- [x] T005 same file: dialog semantics (`role`, `aria-modal`, label), focus trap, global Escape, focus restore, Caps-Lock-safe hotkey — FR-008/P-07, FR-026
- [x] T006 [P] `tests/smoke.spec.ts`: add search-click e2e (⌘K → query → click result → expect 200 content) — SC-001

## Phase 3: User Story 2 — Explorer safe to link and share (P1)

- [x] T007 [P] `src/content/notes/portfolio-engineering-lab.mdx`: `system=` → `slug=` — FR-003/P-02
- [x] T008 [P] `src/components/explorer/Explorer.tsx`: clamp `step` (NaN→0, bound to steps length via current flow); pass resolved `currentLayer.id` down — FR-004/P-03, FR-026
- [x] T009 [P] `src/components/explorer/DiagramSvg.tsx`: nodes focusable + Enter/Space activation + aria-labels — FR-010/P-09
- [x] T010 [P] `src/components/explorer/ExplorerCanvas.tsx`: drag-distance threshold before deselect; ctrl/cmd-gated wheel zoom — FR-024/P-25

## Phase 4: User Story 3 — Feed & metadata correctness (P2)

- [x] T011 [P] `src/app/feed.xml/route.ts`: XML-escape channel fields; guard `]]>` in CDATA — FR-005/P-04
- [x] T012 [P] `src/app/layout.tsx`: og-default.jpg → og-default.png — FR-012/P-11
- [x] T013 [P] `src/app/explorer/[slug]/page.tsx` + `src/app/notes/series/[series]/page.tsx`: pass `path` to createMetadata — FR-013/P-12
- [x] T014 [P] `src/app/notes/[slug]/page.tsx`: published-only `generateStaticParams`; draft-safe `generateMetadata` — FR-014/P-13
- [x] T015 [P] `src/lib/mdx.ts`: `published` default → false; drop dead `canonicalFrom` — FR-026

## Phase 5: User Story 4 — Contact form for everyone (P2)

- [x] T016 `src/types/contact.ts`: honeypot schema accepts strings (server decides) — FR-007/P-06
- [x] T017 `src/components/contact/ContactForm.tsx`: radio `name`; add Budget select; keep honeypot registered but non-blocking — FR-017/P-17, FR-007
- [x] T018 [P] `src/lib/email.ts`: prod missing key → throw (with CONTACT_FORM_DRY_RUN escape hatch for CI/e2e). Fallback recipient deliberately kept: delivering to the owner's default address beats dropping mail when CONTACT_EMAIL is unset — FR-011/P-10
- [x] T019 [P] `src/app/api/contact/route.ts`: 400 on malformed JSON; `Retry-After` on 429; bound rate-limit map — FR-016/P-16, FR-026
- [x] T020 [P] `src/components/contact/FormSuccess.tsx`: `role="status"` announcement — FR-026

## Phase 6: User Story 5 — Keyboard/SR parity (P2)

- [x] T021 `src/components/ui/Button.tsx`: `href` prop renders styled Link — FR-023/P-24
- [x] T022 Migrate 7 nested call sites (HeroSection, Navbar, MobileNav, FeaturedSystems, NotesPreview, CTASection, SystemRow) — FR-023
- [x] T023 [P] `src/components/layout/MobileNav.tsx`: trap includes toggle; close on pathname change — FR-022/P-23
- [x] T024 [P] `src/components/notes/NoteCategoryFilter.tsx`: aria-pressed buttons; fix doubled label — FR-026
- [x] T025 [P] `src/components/shared/AnimatedCounter.tsx`: hide rolling column from AT; drop manual reduced-motion branch — FR-025/FR-026
- [x] T026 [P] `src/components/animations/FadeIn.tsx` + `StaggerChildren.tsx`: remove manual reduced-motion branches (MotionConfig governs) — FR-025/P-26
- [x] T027 [P] `src/components/home/TechStackBar.tsx`: duplicate marquee aria-hidden — FR-026
- [x] T028 [P] `src/components/notes/TableOfContents.tsx`: update hash + move focus on click — FR-026
- [x] T029 [P] `src/components/layout/Navbar.tsx` + `src/components/ui/BackToTop.tsx`: initialize scroll state on mount — FR-026
- [x] T030 [P] `src/components/shared/SocialLinks.tsx`: no `_blank` on mailto — FR-026
- [x] T031 [P] `src/components/home/ValuePillars.tsx` + `src/components/notes/NoteContent.tsx`: internal links via next/link — FR-026

## Phase 7: User Story 6 — Gates that gate (P3) + content integrity

- [x] T032 `scripts/check-links.ts`: remove `/explorer/` exemption + stale whitelist entries — FR-009/P-08
- [x] T033 `src/lib/schemas/resume.ts`: match real data shape — FR-018/P-18
- [x] T034 `scripts/validate-content.ts`: enforce resumeSchema + systemSchema; validate decisionRefs + flow edgeIds; check screenshot/staticDiagram srcs (warn); fix unused var; fix "notes notes" log — FR-018/FR-019
- [x] T035 `src/content/architectures/ai-code-reviewer.ts`: correct 4 dangling decisionRefs — FR-019/P-20
- [x] T036 `src/components/about/Timeline.tsx` + `src/content/resume.ts`: single source of truth — FR-020/P-21
- [x] T037 [P] `src/app/notes/[slug]/page.tsx` (extractHeadings) + `src/components/notes/NoteContent.tsx` (flatten children): fence-aware TOC, markup-safe ids — FR-021/P-22
- [x] T038 [P] Cosmetics: series casing ("AI"), "Note —" title, `formatDate` UTC — FR-026
- [x] T039 [P] Delete dead code: `src/hooks/useScrollProgress.ts`, `Button.asChild`, `architectureRef`/`canonicalFrom` schema fields — FR-026

## Phase 8: Polish & acceptance

- [x] T040 Run gates: lint, tsc, build, check-links → all exit 0 — SC-004
- [x] T041 xmllint feed; grep built HTML (no explorer/undefined, no og-default.jpg); clean pagefind fragment check — SC-003/SC-006
- [x] T042 `bunx playwright test` against production build — SC-005
- [x] T043 Update README rate-limiting section if limiter behavior changed; note spec-kit artifacts

## Dependencies

- T001 before T042; T016 before T017; T021 before T022; T033 before T034; T036 depends on T033 (schema shape).
- Phase 8 last; all other phases independent of each other (different files) except shared files noted.
