# Design System Specification

**Quality bar:** Stripe / Linear / Vercel / Anthropic docs-grade restraint. **Strategy:** evolve the existing Tailwind 4 `@theme` token system in `src/app/globals.css` — it is sound — and extend it with the engineering-display primitives the lab needs. No ground-up rebuild.

---

## 1. Design principles

1. **Evidence over ornament.** Every visual element either communicates information or carries the brand; nothing exists to impress. (Kills: cursor spotlight, tilt cards, magnetic buttons — see Motion System.)
2. **Diagram-native.** The system treats architecture diagrams, flows, metrics, and code as first-class content types with dedicated primitives — not images dropped into prose.
3. **Calm surface, dense signal.** Generous whitespace and a quiet palette so that the dense technical content carries the energy. Information density increases with depth: Home is airy; the Explorer inspector is compact.
4. **Honest states.** Status badges, provenance labels (measured/target), and phase indicators are systemized, not ad hoc — honesty is a design token.
5. **Ages well.** No glassmorphism, no gradient meshes, no neon glows, no 3D. The references that still look good after five years (Stripe docs, Linear changelog) are typography + spacing + one accent.

## 2. Typography

Keep the self-hosted pair (variable fonts already in `public/fonts/`):
- **Satoshi** — headings, nav, data labels. Weights used: 500, 700 (900 reserved for hero only).
- **General Sans** — body, UI copy. Weights: 400, 500.
- **Mono** — upgrade from system stack to a self-hosted **JetBrains Mono** (or Commit Mono): code, metrics, node labels, status badges, flow-step numbers. The mono voice is the "lab instrument" voice and becomes a brand element.

Type scale (Tailwind tokens; 1.25 ratio, fluid via clamp at the top end):

| Token | Size | Use |
|---|---|---|
| `display` | clamp(2.5rem, 5vw, 4rem)/1.05, Satoshi 700 | Hero identity line only |
| `h1` | 2.25rem/1.15, Satoshi 700 | Page titles |
| `h2` | 1.5rem/1.25, Satoshi 700 | Section titles |
| `h3` | 1.25rem/1.3, Satoshi 500 | Card titles, subsections |
| `body` | 1rem/1.65, General Sans 400 | Prose (case studies/notes use 1.0625rem) |
| `small` | 0.875rem/1.5 | Meta, captions |
| `mono-label` | 0.8125rem/1.4, Mono 500, tracking +0.02em | Badges, chips, node labels, metrics units |

Prose measure: 68ch max. Headings: tight tracking (−0.01em) on Satoshi ≥ h2.

## 3. Color system

Keep the semantic-variable architecture and dark-default. Two changes:

1. **Accent evolution:** migrate the indigo (#6366f1 — the template-era default) toward a more ownable **electric cyan-teal** family while keeping indigo as a secondary tone for visited/secondary states. All accent usage goes through tokens, so this is a token-value change, not a refactor. Final hue decision is a brand call at implementation; tokens below assume it.
2. **Extend tokens for lab semantics:**

```
--color-accent            primary action / active node
--color-accent-hover
--color-accent-muted      selection washes, active-flow edge glow
--color-status-production #22c55e family   "Production" badges
--color-status-building   #f59e0b family   "Building · Phase n"
--color-status-archive    muted gray        archive tier
--color-flow              accent            active data-flow path
--color-node-bg / -border node fills (per theme)
--color-code-bg           code & inspector panels (slightly offset from card)
--color-provenance-measured / -target   metric provenance tags
```

Contrast: every text/background pair ≥ 4.5:1 (AA), mono-labels ≥ 3:1 at their weight/size or bumped. Both themes maintained; dark remains default. Light theme must be genuinely first-class (recruiters read in daylight).

## 4. Spacing & layout

- Base unit 4px; section rhythm standardized to the existing `py-20 md:py-28` (token: `section-y`).
- Container: keep `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` via `SectionContainer` (Tailwind 4 `container` class remains banned per CLAUDE.md).
- Prose container: `max-w-3xl`; case-study layout: prose column + `xl:` ToC rail (existing blog pattern).
- Grid: 12-col mental model; cards on 3-up (lg) / 2-up (sm) / 1-up; Tier-1 system rows full-width.
- Radii: `8px` (controls), `12px` (cards), `16px` (panels/canvas). One shadow scale, 3 steps, low-alpha; borders preferred over shadows in dark theme.

## 5. Component philosophy & inventory

**Philosophy:** small composable primitives in `ui/`, domain compositions per feature dir; server components by default, `"use client"` only at interaction leaves (current codebase already follows this — preserve it).

**Keep as-is:** Button, Card, Badge, Input/Select/Textarea, ThemeToggle, Breadcrumbs, SectionHeading, TableOfContents, ScrollProgress, BackToTop, Logo.
**Retire:** MagneticButton, TiltCard, CursorSpotlight, TextScramble, HeroScene (Three.js), ParallaxWrapper (Motion System rationale).
**New primitives (the lab kit):**

| Component | Purpose |
|---|---|
| `StatusBadge` | production / building·phase-n / archive, tokenized colors |
| `MetricFact` | value + label + provenance tag (measured/target/scope) |
| `EvidenceLink` | typed external proof link (repo, live, doc) with icon |
| `DecisionRecord` | expandable decision block: decision/alternatives/why/cost; anchor-addressable |
| `SystemCard` / `SystemRow` | Tier-1/2 work surfaces with explorer affordance |
| `DiagramThumb` | static SVG render of an ArchitectureModel |
| `ExplorerCanvas`, `NodeInspector`, `FlowStepper` | Explorer kit (spec doc) |
| `SeriesNav` | prev/next + progress within a notes series |
| `RelatedSystem` / `RelatedNotes` | cross-link cards (IA §3) |
| `CommandPalette` | ⌘K search |
| `InquiryTypeTabs` | contact persona switch |

## 6. Accessibility standards (summary — full doc: `05-accessibility-strategy.md`)

WCAG 2.2 AA is a hard gate: visible focus everywhere (already styled), full keyboard paths including Explorer, `prefers-reduced-motion` honored by every animation (existing pattern extended), semantic landmarks, diagram text alternatives.

## 7. Brand motif

The brand mark is a **node-and-edge motif** — an abstracted system diagram — used as: hero background (static, CSS/SVG, subtle), section dividers, OG-image background, favicon evolution of the existing Logo. This replaces the 3D orb as the visual identity and makes the brand literally *be* the product (architecture made visible). One motif, used consistently; never animated decoratively.

## 8. Responsive behavior

Breakpoints: Tailwind defaults. Rules: touch targets ≥ 44px; no hover-only affordances; Explorer degrades per UX spec §4; tables collapse to definition lists < md; sticky elements (ToC, resume actions) become inline/bottom-bar on mobile. Test matrix: 360px, 768px, 1280px, 1920px.
