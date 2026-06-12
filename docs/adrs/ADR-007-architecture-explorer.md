# ADR-007 — Architecture Explorer: custom SVG renderer, hand-authored layout, no graph library

**Status:** Accepted · 2026-06-11

## Context
The explorer is the flagship differentiator. Options range from embedding diagram images, through libraries (React Flow ~50KB+, mermaid, excalidraw embeds), to a bespoke renderer. Requirements: SSR-able for SEO/a11y/no-JS, steppable flows, node inspection, deep links, ≤35KB interactive budget, 2 layers, 1–4 flows, hand-curated content.

## Decision
Custom SVG renderer over the typed `ArchitectureModel`: a pure server-rendered `DiagramSvg` (also used for thumbnails/OG), a lazy client `ExplorerCanvas` adding pan/zoom/selection/flow-pulse, plus `NodeInspector`, `FlowStepper`, and a generated text equivalent. **Node positions are hand-authored in the model** — no auto-layout engine.

## Alternatives
1. *React Flow* — fast start, but client-only rendering (SEO/a11y cost), bundle weight, edit-oriented features we must disable, and a "built with a library" look for the centerpiece meant to demonstrate craft.
2. *Mermaid/static images* — no inspection or flows; fails the product vision.
3. *Auto-layout (dagre/ELK)* — solves a problem we don't have (dozens of dynamic graphs) at high complexity; hand layout is itself communicative.

## Tradeoffs
Bespoke renderer = bespoke bugs and maintenance (mitigated: tiny surface — ~3 components over a frozen schema, v1 feature fence in architecture/03 §7). Adding a 4th system later means hand-placing ~15 nodes (~an hour — acceptable).

## Consequences
Explorer spec (architecture/03) is the contract; schema validation gates builds; analytics events decide v2 features; the SSR-SVG path doubles as the static-diagram solution for Tier-2 systems.
