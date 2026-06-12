# Accessibility (A11y) Manual Sweep Results

This matrix tracks the required manual pass for Phase 5 (P5-T3).

## The Matrix (Pages × Themes × Modifiers)

| Route / Component | Light Mode | Dark Mode | Keyboard Only | VoiceOver | Reduced Motion |
|-------------------|------------|-----------|---------------|-----------|----------------|
| `/` (Home)        | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/about`          | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/projects`       | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/projects/[slug]`| [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/notes`          | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/notes/[slug]`   | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/contact`        | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/colophon`       | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `/search`         | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |
| `CommandPalette`  | [ ]        | [ ]       | [ ]           | [ ]       | [ ]            |

## Criteria (from Strategy §4)

1. **Contrast:** Minimum 4.5:1 ratio (AA) everywhere.
2. **Focus:** Visible `:focus-visible` outline on all interactive elements. No trapped focus.
3. **Semantics:** Forms have valid `<label>`s; landmark tags (`<main>`, `<nav>`) are correct.
4. **Motion:** `prefers-reduced-motion` completely disables coordinate transforms and fades out parallax.
5. **Screen Reader:** ARIA labels on icon-only buttons (theme toggle, mobile menu).

## Findings & Fixes

*Record any issues found during the sweep here, and strike them through when fixed.*

- [ ] (Example) Mobile menu toggle missing `aria-expanded`.
- [ ] (Example) `RelatedSystem` card focus ring gets clipped by overflow.
