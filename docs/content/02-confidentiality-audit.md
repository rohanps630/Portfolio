# Confidentiality Audit — Employer-Owned Systems

**Scope:** Enterprise Multi-Agent Customer Operations Platform (Innovation Incubator Advisory, 2025–present) · Enterprise Telecom POS Platform (contributed at IIA; frontend lead era). **Companion docs:** case-study format (`03`), diagram methodology (within `03`), explorer strategy (`04`), final synthesis (`05`).

---

## 1. Governing principles

1. **The resume is the disclosure ceiling.** The PDF resume is already public and presumably employer-tolerated. Anything stated there (six agents, MCP, Bedrock, SSE telemetry, digital twins, "hundreds of terminals", RN Web single codebase, tenant-aware pipelines) is the *maximum* specificity the site may use. The site may *teach more general lessons* than the resume, but never *reveal more specifics*.
2. **Patterns are public; instantiations are proprietary.** Hierarchical agent supervision, MCP tool orchestration, BFF, registry-driven UI, tenant-aware builds — all are published industry patterns. Describing *that the system uses a pattern and why* is safe. Describing *how this company's instantiation deviates, its topology, names, contracts, or numbers* is not.
3. **Disclose the engineer, not the system.** The content's subject is Rohan's decisions, constraints, and lessons — the system appears only as the context in which those happened. This inversion is both the confidentiality shield and, conveniently, exactly what evaluators want to read.
4. **Three-question test before publishing any sentence:** (a) Could a competitor learn something non-public and useful from this? (b) Could the employer's counsel reasonably object? (c) Could a teammate read this and feel work was overclaimed? Any yes → rewrite or cut.
5. **Process hygiene (recommended, outside the site):** re-read the employment agreement's confidentiality/IP clauses before Phase 2 authoring, and where the relationship allows, show the manager the drafted case study. A 10-minute Slack approval converts risk into a leadership signal ("cleared for public discussion with my employer").

## 2. System A — Multi-Agent Customer Operations Platform

### ✅ Safe to show
- **Problem space (generic):** enterprises drowning in operational workflows; conversational interfaces over operational tooling; why multi-agent beats single-prompt for this class of problem.
- **Pattern-level architecture:** hierarchical supervisor → specialist agents; MCP as the tool-integration seam; RAG for grounding; SSE for telemetry streaming; digital-twin visualization as a concept. Six agents (resume-public) as a count — without naming their real domains.
- **Personal contributions as engineering stories:** the registry-driven UI re-architecture (the pattern, the Zustand state design rationale, what it replaced *conceptually*); the observability baseline (why property-based testing for agent UIs, what Datadog APM tracing buys in an agentic system); SSO integration *as a category of work* (Cognito + Azure AD federation pattern).
- **Constraints (generalized):** enterprise security/audit expectations, real-time telemetry latency, the testing problem of non-deterministic agent outputs, frontend churn under fast-moving agent capabilities.
- **Tradeoffs & lessons:** registry-driven UI vs hand-built screens; where MCP abstraction helped vs hurt; what observability for LLM systems actually requires; SSE vs WebSocket choice rationale.
- **Stack names already on the resume:** Bedrock, Strands Agents SDK, FastAPI, FastMCP, ECS, Cognito, Datadog, Zustand.

### ⚠️ Potentially risky — use only with abstraction rules
- **Agent domain names** (what the six agents actually do): use *illustrative* generic roles, explicitly labeled illustrative.
- **Workflow narratives:** describe *a* customer-operations flow shape, never *the* flows (which encode business logic). Frame as "flows of this shape".
- **Topology counts** beyond "six agents": no service counts, no environment details, no team size unless resume-stated.
- **Performance/scale numbers:** none are public → none on the site. Use qualitative constraint language ("interactive latency under streaming telemetry").
- **Customer industry specifics:** "enterprise customer operations" only; no verticals, no customer count, no logos.

### ❌ Never
Screenshots, UI recordings, internal dashboards · real agent/service/queue names · prompts, agent instructions, tool schemas, API contracts · the actual architecture diagram (even redrawn) · internal metrics, costs, SLAs, incident details · customer names/data · roadmap or unreleased capabilities · code.

## 3. System B — Enterprise Telecom POS Platform

### ✅ Safe to show
- **Problem space (generic):** multi-tenant retail POS for telecom; the cross-platform terminal problem (iPad + desktop, one team); why duplicate codebases die.
- **Pattern-level architecture:** React Native Web single-codebase strategy; BFF layer (Node/Moleculer) as a pattern; tenant-aware build/deploy pipeline concept (config + branding + feature flags resolved at build); multi-step transactional state machine design in Redux Toolkit.
- **Personal contributions:** frontend architecture leadership; the state-management design for long transactional flows (failure/resume/abandonment as a *general* design problem); catalog-onboarding subsystem as a *pattern* (publish-to-terminal pipeline concept).
- **Constraints (generalized):** retail-floor reliability (flaky networks, mid-transaction interruptions), hundreds of terminals (resume-public scope-fact), tenant divergence pressure vs single-codebase economics.
- **Tradeoffs & lessons:** RN Web's real costs (platform-specific escape hatches, web-perf ceilings) honestly assessed; Redux Toolkit vs lighter state for transactional integrity; where tenant-aware builds beat runtime config and where they hurt.

### ⚠️ Potentially risky
- **Terminal/tenant counts:** "hundreds of terminals" verbatim from resume; never tenant counts, retailer names, or geography.
- **Transaction-flow detail:** the *shape* of a device-sale flow is industry-generic (safe); the actual step sequences, carrier integrations, and contract logic are proprietary (cut).
- **Catalog subsystem mechanics:** describe as concept; the data model and publish mechanics are IP.
- **Performance numbers, transaction volumes, revenue:** none public → none used.

### ❌ Never
Screenshots/UI of terminals or back-office · carrier/retailer/vendor names and integrations · API contracts, data models, pricing/contract logic · the real deployment topology · internal metrics or volumes · code.

## 4. Cross-cutting recommendations

1. **Visible framing note on both case studies** (extends Showcase Framework §3.3): *"This system is owned by my employer. Everything here describes industry-standard patterns and my own contributions at the level already public in my resume; diagrams are conceptual reconstructions, not the production architecture. Specific metrics, names, and internals are deliberately omitted."* — The note itself is a seniority signal: it demonstrates professional judgment, which is the meta-skill being evaluated.
2. **Role attribution discipline:** "I led / I built / I contributed to" used precisely per the resume's own verbs. The multi-agent platform = "built within a team; I owned frontend re-architecture and the observability/security baseline." Overclaiming is both an integrity and a confidentiality failure (it invites probing).
3. **Illustrative-label convention:** any invented example (agent roles, tenant names like "Tenant A", flow steps) is visually tagged `illustrative` in the UI — same token system as metric provenance tags. One mechanism, two honesty jobs.
4. **No employer-system content in screenshots/OG images** beyond the conceptual diagrams; OG images for these systems use the brand motif + thesis text only.
5. **Interview-depth reserve:** the case studies should explicitly say "happy to go deeper in conversation" — signaling that the public abstraction is a floor, not a ceiling, and routing depth-hungry evaluators to the channel where NDA-respecting detail is appropriate.
