# Architecture Explorer — Full Specification

The flagship experience: interactive, inspectable system architecture. **Scope discipline is the spec's first feature** — v1 is a diagram with selectable nodes, layered views, steppable flows, and an inspector. It is not a graph engine, not auto-layout, not a simulation.

---

## 1. Concept & jobs

For a P1 evaluator the explorer answers, in order: *What are the parts? How does a request actually move? Why is each part there, and what did it cost?* Three jobs → three interaction primitives: **layers**, **flows**, **inspection**.

Launch systems (priority order):
1. **AI Code Reviewer** — fully public, richest detail; ships first and validates the format.
2. **Multi-Agent Customer Ops Platform** — abstracted (confidentiality rules, Showcase Framework §3.3).
3. **Telecom POS** — abstracted.

## 2. Information model (`lib/schemas/architecture.ts`)

```ts
ArchitectureModel = {
  system: string                      // System.slug (1:1)
  disclosure: "full" | "conceptual"   // AMENDED 2026-06-12: conceptual = single C1 pattern
                                      // layer, no metrics/repo links, "reconstruction" banner
                                      // (rules: content/04 Part 1; rationale: content/05 §3)
  layers: Layer[]                     // ordered; full: "context"+"container"; conceptual: one layer
  flows: Flow[]                       // 1–4 per system
}
Layer = {
  id: "context" | "container"
  title: string                       // "System context" / "Inside the agent service"
  nodes: Node[]; groups: Group[]; edges: Edge[]
}
Node = {
  id: string
  label: string                       // ≤ 3 words, mono-label type
  kind: "service" | "agent" | "store" | "queue" | "external" | "client" | "pipeline-step"
  tech: string[]                      // chips in inspector
  summary: string                     // 1–2 sentences: what it is
  rationale: string                   // why it exists / why this shape
  tradeoffs: string[]                 // ≥ 1 for non-external nodes
  decisionRefs: string[]              // → System.decisions[].id
  noteRefs: string[]                  // → note slugs
  pos: { x: number; y: number }       // hand-authored, per layer, 0–100 grid units
  size?: "sm" | "md" | "lg"
}
Group = { id, label, nodeIds[], pos, dims }        // dashed boundary boxes ("AWS ECS", "Modal")
Edge = {
  id: string; from: nodeId; to: nodeId
  label?: string                      // "embeddings", "tool call (MCP)"
  kind: "sync" | "async" | "stream" | "data"
  bidirectional?: boolean
}
Flow = {
  id: string; title: string           // "A PR review, end to end"
  layerId: string
  summary: string
  steps: Step[]                       // 4–9 steps
}
Step = {
  edgeId?: string; nodeId?: string    // exactly one; the highlighted element
  caption: string                     // ≤ 220 chars, plain language
}
```

Validation (build-gated): edge endpoints exist; step refs exist; every node has rationale + ≥1 tradeoff (except `external`/`client`); decisionRefs resolve; positions within bounds; ≥1 flow per model.

**Authoring rule:** positions are hand-placed. Auto-layout is explicitly rejected (ADR-007) — hand layout *is* the architecture communication (an engineer deciding what's central is signal), and it deletes the hardest engineering from the build.

## 3. Rendering architecture

- **`DiagramSvg` (server):** pure function `ArchitectureModel × layer → SVG`. Used for: static SSR base, `DiagramThumb` on cards, OG images, no-JS state. Nodes are `<g>` with kind-based styling; edges are curved paths with arrowheads and optional labels; groups are dashed rects behind nodes.
- **`ExplorerTextEquivalent` (server):** generated prose/list rendering of the same model (a11y strategy) — also what Pagefind indexes.
- **`ExplorerCanvas` (client, lazy):** hydrates over the SSR SVG; adds pan/zoom (pointer + wheel + buttons, CSS transform on the SVG viewport group), selection, dimming, flow pulse (single animated SVG circle along the active path), layer crossfade (Framer Motion layout for shared nodes).
- **`NodeInspector` (client):** side panel (desktop) / bottom sheet (mobile) rendering the selected node's summary, rationale, tradeoffs, tech chips, decision links (→ case-study anchors), note links.
- **`FlowStepper` (client):** prev/next + position; drives highlight state; `aria-live` captions.

State: URL is source of truth — `?layer=container&flow=pr-review&step=3&node=reranker`. Transient pan/zoom is local-only. Embedded mode (case study §5) and standalone `/explorer/[slug]` share all components; standalone adds the toolbar and full viewport.

## 4. Interaction model

| Input | Action |
|---|---|
| Click/Enter node | select → inspector opens, neighbors emphasized, others dim 40% |
| Esc / canvas click | deselect |
| Layer tabs | crossfade context ↔ container (shared nodes morph) |
| Flow select + ◀▶ (or `[` `]`) | step highlight + caption; selecting a step's node populates inspector |
| Drag / wheel / ± buttons | pan & zoom (bounded 0.5×–2×); Reset button restores |
| `?` | keyboard-help popover |
| Share button | copies current deep link |

Hover (desktop only): node emphasis + edge-label reveal. Touch: tap = select; no hover-dependent info.

## 5. UX details

- Canvas min-height 480px (embedded) / full viewport minus toolbar (standalone).
- Below `lg`: static diagram (scrollable horizontally if needed) + stepper + inspector-as-sheet; pan/zoom omitted.
- Empty/loading: silhouette skeleton in final geometry (Motion System §7).
- Each flow's final step caption ends with a pointer: "Why this design? → Decision: <title>" linking the most relevant decision record — the explorer always hands the user to the *why* narrative.

## 6. Performance budget

Interactive bundle (canvas+inspector+stepper) ≤ 35KB gzipped, zero diagram-library deps; SSR SVG counts toward HTML not JS; 60fps pan/zoom via transform-only; model JSON ≤ 15KB per system.

## 7. Non-goals (v1 fence)

No auto-layout · no user-editable diagrams · no animation timelines beyond the single flow pulse · no 3D · no live data · no more than 2 layers · no minimap. Each is a v2 candidate only if usage data (analytics events: `explorer_open`, `flow_step`, `node_inspect`) justifies it.

## 8. Acceptance criteria

1. AI Code Reviewer model: ≥ 12 nodes across 2 layers, ≥ 2 flows ("PR review end-to-end", "Index & eval pipeline"), every non-external node carrying rationale + tradeoffs + ≥1 decisionRef.
2. All §4 interactions work with mouse, touch, and keyboard; axe-clean; text equivalent complete without JS.
3. Deep links restore exact state; thumbnails render from the same model on Work index.
4. Budgets in §6 verified in CI.
