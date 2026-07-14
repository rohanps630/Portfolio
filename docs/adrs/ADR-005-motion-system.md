# ADR-005 — Motion: explanatory-only doctrine; remove Three.js and Lenis

**Status:** Accepted · 2026-06-11

## Context
Current motion inventory is decorative (3D orb hero, magnetic buttons, tilt, cursor spotlight, text scramble, smooth-scroll hijack). Three.js stack costs ~500KB on the homepage; Lenis taxes INP and accessibility. The reference tier (Stripe/Linear/Vercel) uses restrained, informational motion.

## Decision
Motion must explain (attention, structure, causality) or it is removed. Framer Motion remains the sole animation library. Remove `three`, `@react-three/fiber`, `@react-three/drei`, `lenis` and the six decorative components. Explorer flow animation becomes the site's signature motion. Global rules: ≤600ms, transform/opacity only, once-only reveals, full reduced-motion degradation, zero animation on LCP content.

## Alternatives
1. *Keep the 3D hero (it's distinctive)* — distinctive but off-thesis: it demonstrates spectacle, not judgment, and costs the largest performance budget line on the most important page.
2. *Replace Three.js with a lighter WebGL/canvas effect* — still decoration; still a maintenance surface.
3. *No motion at all* — forfeits the explorer's explanatory power (flow causality genuinely benefits from motion).

## Tradeoffs
The site loses immediate "wow" for casual visitors; we bet that P1/P2 personas reward speed and clarity over spectacle. Some Framer Motion experience showcase value is lost (acceptable: the explorer demonstrates harder interaction work).

## Consequences
~400–500KB JS reduction unlocks the perf budgets (ADR-010); hero redesign required (static brand motif); animations doc (design/04) is binding and each surviving animation needs a one-line justification.
