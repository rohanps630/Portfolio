# Motion System Specification

**Doctrine:** motion exists to **explain** — direct attention, reveal structure, show causality. If removing an animation loses no information, remove the animation. This inverts the current site, whose motion inventory is largely decorative (audit §4).

Library: **Framer Motion 12 only** (existing rule, kept). Plus native CSS transitions for micro-states and SVG/SMIL-free, JS-driven flow animation in the Explorer.

---

## 1. Removals (decorative motion debt)

| Current | Action | Rationale |
|---|---|---|
| HeroScene (Three.js orb) | **Remove**, with its 3 deps (`three`, `@react-three/fiber`, `@react-three/drei`) | ~500KB JS for decoration on the highest-stakes page; replaced by static brand motif |
| Lenis smooth scroll | **Remove** (`lenis` dep) | Scroll hijack = INP tax + a11y problem; the premium references don't do it |
| CursorSpotlight | Remove | Pure decoration |
| MagneticButton | Remove | Decoration; harms target acquisition |
| TiltCard | Remove | Decoration |
| TextScramble | Remove | Decoration; harms readability of the most important line on the site |
| ParallaxWrapper | Remove | Decoration |

Keep: FadeIn, SlideUp, StaggerChildren, TextReveal (subject to §2 limits), ScrollProgress (it's informational), AnimatedCounter (only where the number is a real measured metric).

## 2. Global motion rules

- **Durations:** micro (hover/press) 120–150ms · standard (reveal, expand) 200–300ms · narrative (flow steps, page transitions) 400–600ms. Nothing exceeds 600ms.
- **Easing:** standard `cubic-bezier(0.2, 0, 0, 1)` (decelerate) for entrances; `ease-in-out` for steppers; springs only for the inspector panel slide (stiffness ~300, damping ~30).
- **Distance:** entrance translations ≤ 16px. No element flies across the screen.
- **One-shot:** scroll-reveal animations fire once (`viewport: { once: true }`), never re-trigger on scroll-up.
- **Reduced motion:** every animation checks `prefers-reduced-motion`; the reduced experience is opacity-only or none. Explorer flow-stepping falls back to discrete highlight states with no tweening. This is a CI-checked rule (axe + manual matrix).
- **Performance:** transform/opacity only; no layout-property animation; no animation on the critical path of LCP content (hero text renders instantly, no entrance animation on the identity line).

## 3. Page transitions

Minimal: 150ms fade-through on route change via the existing `template.tsx`, disabled under reduced motion. No shared-element transitions — they're maintenance-heavy and explain nothing here.

## 4. Scroll storytelling (case studies)

- Section reveals: single FadeIn (8px rise, 250ms) per section, staggered children ≤ 3 items, 40ms stagger.
- ToC rail: active-section indicator slides between items (informational — shows where you are).
- The **architecture section** is the one place scroll drives narrative: as the embedded explorer scrolls into view, the static diagram draws its edges once (SVG stroke-dashoffset, 600ms total, reduced-motion: instant). This is an "the system assembles" moment — earned, once per page.

## 5. Explorer motion (the flagship's grammar)

| Interaction | Motion | Purpose |
|---|---|---|
| Flow step advance | Edge segment highlights with a directional pulse traveling node→node (400ms); arriving node gets a 150ms emphasis ring; step caption crossfades | Shows *causality and direction* — the core explanatory job |
| Node select | Inspector panel slides in (spring); selected node ring + connected-edge emphasis; non-neighbors dim to 40% | Focus + relationship reveal |
| Layer tab switch (Context/Container/Flow) | 200ms crossfade between diagram states; shared nodes morph position (FM layout animation) | Continuity — shows the same system at different zoom levels |
| Pan/zoom | Direct manipulation, no inertia easing beyond native | Predictability |
| Hover (desktop) | 120ms border/label emphasis only | Affordance |

Budget: the explorer targets 60fps on a mid-tier laptop; all highlight states are CSS-class-driven; the traveling pulse is one animated SVG element, not per-edge timelines.

## 6. Hover & micro-interactions

Buttons/links/cards: 120–150ms color/border/elevation transitions (CSS, not FM). Cards may lift 2px max — no tilt, no magnetism, no glow. Expandable `DecisionRecord`: 250ms height auto-animation with chevron rotation; content fades in 100ms after expansion starts.

## 7. Loading states

- Static pages: none needed (SSG — content is the loading state).
- Explorer canvas: diagram-silhouette skeleton (gray nodes/edges in final positions), so load completes as a "color-in," not a pop-in.
- Search: 150ms-debounced results, skeleton rows beyond 200ms, never a spinner under 200ms.
- Images: existing pattern (`ImagePlaceholder`) with blur-up; dimension-reserved to prevent CLS.

## 8. Data visualization & counters

`AnimatedCounter` restricted to measured metrics in case-study outcome sections (800ms count-up, once, reduced-motion: static). Metric provenance tags do not animate. No chart library is introduced; if a case study needs a chart it ships as inline SVG with optional one-time draw-in.

## 9. Progressive disclosure

Decision records, Tier-2 architecture sections, archive rows: collapsed by default, animated expansion per §6, state reflected in URL hash where deep-linkable. Disclosure animation is the *only* place height animation is permitted.

## 10. Acceptance criteria

1. Zero animation on LCP-critical content; Lighthouse perf ≥ 95 maintained.
2. `prefers-reduced-motion` audit passes on every route (manual matrix + axe).
3. Removing `three`, `@react-three/fiber`, `@react-three/drei`, `lenis` cuts ≥ 400KB from the home-page JS budget (verify via bundle analysis).
4. Every remaining animation can be justified in one sentence naming the information it conveys; the justification list lives in this doc's appendix at implementation time.
