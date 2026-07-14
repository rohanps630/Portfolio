# Project Showcase Framework

A single reusable framework governing how **every** system is presented. It replaces the marketing-shaped `Project` type (challenge/approach/features/impact) with an engineering case-study model. The framework has three parts: the data schema, the presentation sequence, and the honesty rules.

---

## 1. Data schema (Zod-first; replaces `src/types/project.ts`)

```ts
System = {
  // Identity
  slug: string
  title: string
  thesis: string            // one sentence: what this system proves about the engineer
  tier: 1 | 2 | 3
  domain: "ai-systems" | "platforms" | "products"
  context: "production" | "independent" | "client"
  status: { kind: "production" | "building" | "archived"; phase?: number; phaseTotal?: number }
  confidentiality?: string   // rendered as a visible note on employer work
  role: string               // scoped: "Sole engineer" / "Frontend lead, team of N"
  timeline: { start: string; end?: string }   // ISO dates; rendered as duration
  year: string               // display

  // Narrative
  executiveSummary: string          // ≤ 120 words, written for a skimming evaluator
  businessContext: string           // why the system needed to exist
  problemStatement: string          // what was technically hard, specifically
  constraints: Constraint[]         // { kind: budget|latency|compliance|team|legacy|platform, text }

  // Engineering
  solutionOverview: string          // prose bridge into the architecture
  architectureRef?: string          // slug of ArchitectureModel (Tier 1 only)
  staticDiagrams?: Diagram[]        // { src, alt, caption, summary } for non-explorer systems
  decisions: DecisionRecord[]       // see §2 — the heart of the framework
  techStack: TechEntry[]            // { name, role? } — role: "retrieval", "state", … (not a logo wall)

  // Proof
  outcomes: MetricFact[]            // { value, label, description, provenance: "measured"|"target"|"scope-fact", source? }
  evidence: EvidenceLink[]          // { kind: repo|live|writeup|talk, url, label }
  screenshots: Screenshot[]         // { src, alt, caption }
  lessons: string[]                 // 2–4 first-person paragraphs, incl. ≥1 genuine mistake/cost

  featured: boolean; sortOrder: number; coverImage: string
}
```

### §2 DecisionRecord (mini-ADR, embedded per system)

```ts
DecisionRecord = {
  id: string                 // anchor: /projects/slug#decision-{id}
  title: string              // "Hand-written agent loop instead of LangChain"
  decision: string           // what was chosen, one paragraph
  alternatives: { option: string; whyNot: string }[]   // ≥ 1
  rationale: string          // the why — constraints it satisfied
  cost: string               // REQUIRED: what this choice gave up / still hurts
  nodeRefs?: string[]        // links into ArchitectureModel nodes
}
```

`cost` is non-optional by design: a decision without an acknowledged cost is marketing, and evaluators know it.

## 2. Presentation sequence (binds to UX spec §3)

| # | Section | Source fields | Tier 1 | Tier 2 | Tier 3 |
|---|---------|--------------|--------|--------|--------|
| 1 | Header (title, thesis, role, status, stack, links, confidentiality note) | identity block | ✅ | ✅ | card only |
| 2 | TL;DR metric strip | `outcomes[0..3]` | ✅ | ✅ | ✅ (in card) |
| 3 | Context & problem | `businessContext`, `problemStatement` | ✅ | ✅ | — |
| 4 | Constraints | `constraints` | ✅ | ✅ collapsed | — |
| 5 | Architecture | explorer embed / `staticDiagrams` | **Explorer** | static diagram, collapsed | — |
| 6 | Decisions | `decisions` (expandable blocks) | 4–6 | 2–3 | — |
| 7 | Outcomes & evidence | `outcomes`, `evidence`, `screenshots` | ✅ | ✅ | — |
| 8 | Lessons | `lessons` | ✅ | ✅ | optional one-liner |
| 9 | Footer (related notes, prev/next, contact band) | derived | ✅ | ✅ | — |

Tier-2 ordering inverts emphasis: outcomes (business) render before architecture (client persona). The template is one component tree with tier-conditional density — not three templates.

## 3. Honesty rules (enforced editorially + by schema)

1. **Provenance labels are rendered.** Every metric shows its tag: `measured` (green), `target` (amber, "Target:" prefix), `scope-fact` (neutral — e.g., "hundreds of terminals"). The AI Code Reviewer's current copy violates this (audit §8) and is the first migration test case.
2. **Status is loud.** `building` systems show "Building · Phase n/m" in the header and cards. In-progress ≠ weak; mislabeled ≠ forgivable.
3. **Confidentiality is explicit.** Employer systems render a note: "Built at <employer>. Described within confidentiality limits; numbers are approximate scopes, diagrams are abstracted." Abstracted explorer models for employer work omit proprietary specifics (service names, vendors where sensitive).
4. **Every Tier-1/2 system needs ≥ 1 EvidenceLink or screenshot.** No evidence → Tier 3.
5. **Lessons must include a real cost or mistake.** Reviewed at content time; "I learned the value of teamwork" is a rejection.

## 4. Migration map (current 7 projects + 2 new)

| System | Tier | Notes |
|---|---|---|
| AI Code Reviewer | 1 | Model exists in rich prose — restructure into schema; fix target/measured framing |
| **Multi-Agent Customer Ops Platform (NEW)** | 1 | From resume; confidentiality-abstracted; explorer model of the 6-agent hierarchy + MCP orchestration |
| **Telecom POS Platform (NEW)** | 1 | From resume; RN Web/terminal architecture + tenant pipeline explorer model |
| Dental Clinic HMS | 2 | Strong end-to-end ownership story (Go/React/Kotlin) |
| AI Automation Hub | 2 | Verify claims against reality before publishing (audit §8) |
| Roofing CRM | 2 | Client-context framing |
| Learning Portal · Transit Claims · Accessible Chat | 3 | Archive rows; Accessible Chat may earn Tier 2 if a11y evidence is real |

## 5. Definition of done (per system)

Schema-valid · all referential links resolve · provenance on every metric · cost on every decision · confidentiality note where applicable · evidence rule satisfied · reviewed against resume for factual consistency (years, scope, stack).
