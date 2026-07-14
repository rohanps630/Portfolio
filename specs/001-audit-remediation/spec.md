# Feature Specification: Audit Remediation — Restore Core Feature Integrity

**Feature Branch**: `001-audit-remediation` (work executed on `v2` per owner's current flow)
**Created**: 2026-07-07
**Status**: Draft
**Input**: User description: "Fix all confirmed findings from the adversarial codebase audit: broken search navigation, explorer crashes and dead links, invalid RSS feed, dead honeypot, CI e2e misconfiguration, accessibility gaps in interactive components, metadata/SEO drift, and validation-gate blind spots."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Search that actually navigates (Priority: P1)

A visitor presses ⌘K (or uses /search), types a query, and clicks a result. They land on the page they clicked — never a 404.

**Why this priority**: Search is a headline feature; today 100% of result clicks 404 in production (pagefind returns `.html`-suffixed URLs pushed raw into the router).

**Independent Test**: `bun run build`, start the server, search "architecture", click any result → HTTP 200 page renders.

**Acceptance Scenarios**:
1. **Given** a production build, **When** a user clicks any search result, **Then** the browser navigates to the clean route (no `.html`) and the page renders.
2. **Given** overlapping keystrokes, **When** an earlier search resolves after a later one, **Then** stale results never overwrite newer ones and the spinner always clears.

### User Story 2 - Explorer links and URLs are safe to share (Priority: P1)

A reader clicks the Explorer card inside a published note and lands on the working explorer. Any explorer URL — including hand-edited or truncated `?flow=`/`?step=`/`?layer=` params — renders without crashing.

**Why this priority**: A published note currently links to `/explorer/undefined`; a malformed `step` param crashes the whole route. These are the flagship interactive artifacts.

**Acceptance Scenarios**:
1. **Given** the published portfolio-engineering-lab note, **When** the reader clicks the Explorer card, **Then** they land on `/explorer/ai-code-reviewer`.
2. **Given** `?flow=<valid>&step=99` / `step=-1` / `step=abc` / `?layer=bogus`, **When** the page renders, **Then** it clamps to a valid state and never throws.

### User Story 3 - Subscribable feed, correct metadata (Priority: P2)

A feed reader subscribes to `/feed.xml` and parses it. Social shares and crawlers get correct canonical URLs and existing OG images; drafts never leak titles or content anywhere.

**Acceptance Scenarios**:
1. **Given** `/feed.xml`, **When** validated with a strict XML parser, **Then** it parses with zero errors.
2. **Given** explorer and series pages, **When** rendered, **Then** each declares its own canonical URL, not the homepage.
3. **Given** an unpublished note URL, **When** requested, **Then** the 404 carries no draft title/excerpt in its head; the search index never contains draft content (index directory cleaned every build).

### User Story 4 - Contact form works for everyone (Priority: P2)

Every legitimate visitor — including keyboard/screen-reader users and users with aggressive browser autofill — can complete and submit the contact form; bots are silently swallowed; a missing email credential in production fails loudly instead of faking success.

**Acceptance Scenarios**:
1. **Given** a browser that autofills the hidden honeypot, **When** the user submits, **Then** the request is accepted (silent success server-side) — the submit button never dead-ends silently.
2. **Given** keyboard navigation, **When** the user reaches "What's this about?", **Then** arrow keys move between radios (shared `name`).
3. **Given** the budget question, **When** the form renders, **Then** a budget control exists so inquiry emails stop reading "Not Specified" unconditionally.
4. **Given** production without `RESEND_API_KEY`, **When** a submission arrives, **Then** the API returns an error (no silent data loss).

### User Story 5 - Keyboard and screen-reader parity in interactive components (Priority: P2)

Command palette, mobile nav, explorer nodes, and CTAs are operable and correctly announced with keyboard/AT.

**Acceptance Scenarios**:
1. Palette: dialog semantics, focus trapped, Escape closes from anywhere, focus restored to trigger on close.
2. Explorer diagram nodes: focusable, Enter/Space opens the inspector.
3. Mobile nav: close button reachable in the Tab cycle; menu closes on route change.
4. CTAs render a single interactive element (no `<button>` inside `<a>`).

### User Story 6 - Gates that gate (Priority: P3)

CI's e2e step actually runs; the link checker has no exemption hiding broken links; content validation executes the schemas it claims to enforce and checks the references pages depend on.

**Acceptance Scenarios**:
1. `bunx playwright test` runs green locally against a production build via config-managed `webServer`.
2. `bun run check-links` re-run with exemptions removed reports zero broken links (after fixes land).
3. `validate-content` fails on: systemSchema violations, dangling `decisionRefs`, unparseable dates; resume data parses under a corrected, enforced `resumeSchema`.

### Edge Cases

- Search result for the site root (`index.html`) must map to `/`.
- Explorer `step` param: NaN, negative, ≥ length, non-integer.
- Feed content containing `&`, `<`, `]]>`.
- Honeypot filled by autofill vs. by bots — both must silently succeed.
- Radio group value from `?type=` query param must still apply.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001** (P-01): Search result URLs MUST be normalized (`/index.html`→`/`, strip trailing `.html`) before navigation.
- **FR-002** (P-15): Search MUST discard out-of-order responses and always clear the loading state (including on rejection).
- **FR-003** (P-02): The published note's Explorer card MUST link to a real explorer route (fix MDX prop).
- **FR-004** (P-03): Explorer MUST clamp `step` into `[0, steps.length-1]` and treat NaN as 0.
- **FR-005** (P-04): Feed channel fields MUST be XML-escaped; CDATA bodies MUST guard `]]>`.
- **FR-006** (P-05): A Playwright config MUST exist with `webServer` (production build) and `baseURL`.
- **FR-007** (P-06): The honeypot schema MUST accept non-empty values so the server's silent-success branch is reachable; the client MUST NOT block submission on honeypot content.
- **FR-008** (P-07): Command palette MUST have `role="dialog"`, `aria-modal`, a focus trap, global Escape while open, and focus restoration.
- **FR-009** (P-08): check-links MUST NOT exempt `/explorer/*` and MUST NOT whitelist routes that exist as HTML.
- **FR-010** (P-09): Explorer nodes MUST be keyboard-focusable and activatable (Enter/Space).
- **FR-011** (P-10): In production, missing `RESEND_API_KEY` MUST produce an error, not fake success.
- **FR-012** (P-11): Layout OG/Twitter fallbacks MUST reference the existing `og-default.png`.
- **FR-013** (P-12): Explorer and series pages MUST pass their own `path` to `createMetadata`.
- **FR-014** (P-13): Draft notes MUST be excluded from `generateStaticParams` and their metadata replaced by a generic not-found title.
- **FR-015** (P-14): The pagefind output directory MUST be removed before each index build.
- **FR-016** (P-16): The rate limiter MUST bound its map and set `Retry-After` on 429.
- **FR-017** (P-17): Radios MUST share `name`; a budget control MUST be rendered.
- **FR-018** (P-18): `resumeSchema` MUST match `resumeData` and be enforced by validate-content.
- **FR-019** (P-19/P-20): validate-content MUST check `screenshots[].src`/`staticDiagrams[].src` existence (warn), run `systemSchema` (error), and validate `decisionRefs`/flow `edgeId` (error); the four dangling `decisionRefs` MUST be corrected.
- **FR-020** (P-21): The About timeline MUST render from `resumeData.experience` (single source of truth).
- **FR-021** (P-22): TOC extraction MUST ignore fenced code blocks; heading ids MUST derive from flattened text content.
- **FR-022** (P-23): Mobile nav focus trap MUST include the toggle; menu MUST close on pathname change.
- **FR-023** (P-24): `Button` MUST support rendering as a link so CTAs are single interactive elements; the 7 nested call sites MUST be migrated.
- **FR-024** (P-25): Explorer canvas MUST use a drag threshold before deselecting and require ctrl/cmd for wheel zoom.
- **FR-025** (P-26): Manual reduced-motion branches MUST be removed where `MotionConfig reducedMotion="user"` already governs.
- **FR-026** (lows): 400 for malformed JSON; UTC-stable `formatDate`; TOC clicks update hash + move focus; navbar/back-to-top initialize scroll state; notes filter uses `aria-pressed` buttons (not fake tabs) with corrected label; counter/marquee duplicates `aria-hidden`; `FormSuccess` announced via `role="status"`; `?layer=` fallback passes the resolved layer id; internal links use the router; series display names capitalize known acronyms ("AI"); "Note —" and "notes notes" strings corrected; ⌘K works with Caps Lock; no `target="_blank"` on `mailto:`; `published` runtime default flipped to safe (`false`); dead exports removed (`useScrollProgress`, `canonicalFrom`/`architectureRef` fields, `getStats`).

### Out of Scope

- Creating the 40 missing image assets (owner action; validator will surface them).
- Rewriting git history for the tracked `.docx` files and rotating `.env.local` secrets (owner action — flagged in the audit).
- CSP header (documented as deferred in next.config.ts).
- SUSPICION-level items without repro (slug traversal hardening beyond current 404 behavior, Resend subject handling).

## Success Criteria *(mandatory)*

- **SC-001**: 100% of search-result clicks navigate to a 200 page on a production build.
- **SC-002**: Zero uncaught exceptions from any explorer URL permutation of `layer`/`flow`/`step`/`node`.
- **SC-003**: `xmllint --noout` on `/feed.xml` exits 0.
- **SC-004**: `bun run lint`, `bun run tsc --noEmit`, `bun run build` (incl. validate-content), and `bun run check-links` (exemptions removed) all exit 0.
- **SC-005**: Playwright smoke suite passes locally via the new config against `next start`.
- **SC-006**: Built HTML contains no `href="/explorer/undefined"`, no `og-default.jpg`; clean pagefind index contains no draft URLs.
