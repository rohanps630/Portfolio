# Employer-System Case Study Format & Reconstructed-Diagram Methodology

Covers Tasks 2–3: the case-study format for employer-owned systems (a constrained profile of the Showcase Framework, not a new framework) and the methodology for conceptual architecture diagrams.

---

## Part 1 — Case-study format (employer profile)

### 1.1 What replaces screenshots

Screenshots prove *it existed*. For employer systems we substitute three stronger seniority proofs, in this order:
1. **Decision records with costs** — judgment is the product; it needs no pixels.
2. **Conceptual diagrams + steppable pattern flows** — architecture thinking made visual without topology.
3. **Constraint narratives** — "hundreds of terminals on retail-floor networks" communicates scale better than a dashboard screenshot would.

The absence of screenshots is *named, not hidden* (the framing note) — evaluators at the target level have all signed NDAs themselves; respected confidentiality reads as experience, while suspicious vagueness reads as fabrication. The difference is explicitness.

### 1.2 Section sequence (System schema unchanged; emphasis re-weighted)

| # | Section | Employer-profile treatment | Length |
|---|---|---|---|
| 1 | Header | Title, thesis, **role-scoped attribution**, status, stack chips (resume-ceiling only), **framing note** directly under header | — |
| 2 | TL;DR strip | 3 scope-facts only (`provenance: scope-fact`), e.g. "6 specialized agents · MCP tool orchestration · enterprise production" | 3 items |
| 3 | Context & problem | Generic problem space + why it's technically hard. No customer specifics | 120–180 words |
| 4 | Constraints | The richest safe section — 4–5 constraint cards; this is where scale/complexity lives | 4–5 × ~25 words |
| 5 | **My role** (employer profile promotes this to its own section) | Exactly what Rohan owned vs contributed to; team context | 80–120 words |
| 6 | Architecture (conceptual) | Reconstructed diagram + 1–2 pattern flows (Part 2). Labeled "conceptual reconstruction" | diagram + 100 words |
| 7 | Decisions | **The centerpiece: 3–4 decision records**, weighted to personally-owned decisions | 3–4 × 120–180 words |
| 8 | Outcomes | Qualitative + scope-facts; "happy to go deeper in conversation" line | 60–100 words |
| 9 | Lessons | 2–3, at least one genuine cost/mistake | 2–3 × 50–80 words |

**Total target: 900–1,300 words** — deliberately *shorter* than the AI Code Reviewer study (1,800–2,200). Depth budget goes where evidence can follow it; padding an abstracted study to flagship length would manufacture exactly the vague bulk that triggers fabrication-suspicion.

### 1.3 Storytelling structure

Spine per system (CS §3 applies, tuned):
- **Multi-Agent Platform:** *"Agentic systems are easy to demo and brutal to operate"* → enterprise constraints → my two ownership arcs (registry-driven UI: taming frontend churn under fast-moving agent capabilities; observability/security baseline: making a non-deterministic system debuggable and auditable) → lessons about MCP/agent platforms in production.
- **Telecom POS:** *"One codebase, hundreds of terminals, zero tolerance for a broken sale"* → retail-floor constraints → ownership arcs (RN Web single-codebase bet; transactional state machine; tenant-aware pipeline) → honest RN Web cost accounting.

Each study ends by linking the related technique note (CS §4 pipeline #6 and #7) — depth continues in the educational register, where confidentiality pressure is lowest.

## Part 2 — Reconstructed-architecture methodology

### 2.1 The three diagram classes

| Class | Definition | Source of truth | Employer systems |
|---|---|---|---|
| **C1 Conceptual (pattern)** | The *industry pattern* the system instantiates, drawn generically — could describe any company's implementation of the pattern | Published pattern literature + resume-public facts | ✅ primary class |
| **C2 Educational (contribution)** | The *shape* of a subsystem Rohan personally designed, abstracted to its reusable idea (registry-driven UI; tenant-aware build fan-out) | His own design knowledge, stripped of instantiation detail | ✅ secondary, 1 per system max |
| **C3 Reconstructed (topology)** | Redrawing the actual system from memory with renamed boxes | The production architecture | ❌ **banned** — renaming nodes does not de-proprietarize a topology; this is the trap that burns people |

The methodology in one rule: **draw the pattern you'd teach, never the system you shipped.** Validity test per diagram: "Could I have drawn this before joining, knowing only the resume bullet and public engineering literature?" If no → it contains proprietary information → cut or generalize.

### 2.2 Multi-Agent Platform — diagram plan

- **C1 / context layer:** hierarchical multi-agent pattern — user/channel → supervisor agent → six specialist agents (labeled `Specialist A…` or illustrative roles tagged `illustrative`) → MCP tool layer → external systems (generic: "ops systems", "knowledge sources" feeding RAG) → observability plane (tracing spans). Abstraction level: AWS named only as platform group label (resume-public); no service topology.
- **C1 flow:** "An operational request through the hierarchy" — 6–7 steps: intent → supervisor route → specialist plan → MCP tool call → grounded synthesis (RAG) → response, with a tracing-span callout. Educational, generic, steppable.
- **C2:** *registry-driven UI pattern* — capability registry → screen composition → Zustand state slices → SSE telemetry feed → digital-twin view. This diagrams *his* design idea, not the platform.
- Both carry the caption: *"Conceptual reconstruction — illustrates the pattern, not the production topology."*

### 2.3 Telecom POS — diagram plan

- **C1 / context layer:** single RN Web codebase → platform targets (iPad terminal / desktop terminal) → BFF layer → backend services (one generic box) — with the tenant dimension shown as N parallel branded builds from one pipeline.
- **C1 flow:** "One transaction, many failure modes" — a generic multi-step retail transaction through the state machine with interruption/resume branches (the *general* problem, not their step sequence).
- **C2:** *tenant-aware build fan-out* — source → config/branding/feature resolution → per-tenant artifacts → terminal fleets. His pipeline contribution as a reusable idea.

### 2.4 Production rules

All diagrams use the standard `ArchitectureModel` schema and renderer (no special casing in code — the abstraction lives in the *content*); every employer-system node's `summary/rationale/tradeoffs` written at pattern level and three-question-tested; node `tech` chips limited to resume-named technologies; flows ≤ 7 steps; the `illustrative` tag rendered wherever invented labels appear.
