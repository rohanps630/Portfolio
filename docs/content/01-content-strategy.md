# Content Strategy

Voice, narrative, messaging, and the editorial plan that fills the structures defined elsewhere. Source of truth for copy direction; actual copywriting happens in roadmap Phase 2–3 tasks.

---

## 1. Voice & tone

**Voice:** a senior engineer explaining their work to a respected peer — specific, calm, quietly confident, occasionally dry. First person singular. Numbers over adjectives; verbs over buzzwords.

Rules: never "passionate", "ninja", "cutting-edge", "leverage" (as a verb), "delighted to" · status honesty is mandatory ("Phase 1 of 6", "target, not yet measured") · every claim traceable to resume or repo · jargon used precisely or not at all (if RRF appears, it gets a one-line explanation — teaching is the brand).

## 2. Homepage narrative (section messaging, binds to UX spec §1)

- **S1 Hero:** identity line "I build AI systems that survive production." Support: "Full-stack engineer — React/Next.js, React Native, Node & FastAPI, AWS — specializing in multi-agent architectures, retrieval engineering, and LLM guardrails." Now-ticker: "Now: multi-agent customer-operations platform @ Innovation Incubator · Building in public: AI Code Reviewer (Phase 1/6)". CTAs: `Explore the AI Code Reviewer →` / `Resume`.
- **S2 Systems:** section heading "Systems, not screenshots." Card theses: AI Code Reviewer — "A PR-review agent built to learn production LLM engineering the hard way: hand-written loop, hybrid retrieval, evals that gate every change." · Multi-Agent Ops — "Six specialized agents, MCP tool orchestration, and live device telemetry — in production for enterprise customer operations." · Telecom POS — "One React Native Web codebase running hundreds of retail terminals, with tenant-aware pipelines."
- **S3 How I work:** pillar columns (positioning §2) each ending in an evidence link, e.g. "Evals before vibes → see the golden-dataset note."
- **S5 Contact band:** "Hiring for AI-heavy product work? Start with the resume." / "Building something? Tell me about it."

## 3. Project storytelling (fills Showcase Framework)

Per-system narrative spine: *stakes → constraint → decision → cost → outcome → lesson.* The differentiating beats most portfolios omit, required here:
- **The constraint paragraph** ("$0.50/PR budget", "hundreds of terminals on flaky retail networks", "enterprise SSO + audit requirements").
- **The rejected alternative** with a respectful reason ("LangChain would have shipped week one; I needed to own the loop to debug it").
- **The cost confession** ("hand-rolling retrieval cost me three weeks vs. a framework — worth it for X, painful for Y").
- **The lesson with teeth** (a real mistake per system — Showcase honesty rule 5).

### Confidentiality protocol (employer systems)
*(Expanded 2026-06-12.)* Superseded by the dedicated protocol set: per-system audit in [`02-confidentiality-audit.md`](02-confidentiality-audit.md), employer case-study format + diagram methodology in [`03-employer-case-study-format.md`](03-employer-case-study-format.md), explorer dual-mode + depth rules in [`04-explorer-and-depth-strategy.md`](04-explorer-and-depth-strategy.md), final synthesis in [`05-showcase-strategy-final.md`](05-showcase-strategy-final.md). Core rules: resume is the disclosure ceiling; patterns public, instantiations proprietary; draw the pattern you'd teach, never the system you shipped; three-question test on every sentence.

## 4. Engineering Notes plan (thought-leadership engine)

**Strategy:** depth series > one-off takes. The serialized "Building the AI Code Reviewer" is the spine — each phase ships a note (2 exist: foundations + concept post). Pipeline for the next two quarters, each targeting one technique query (SEO Track B):

1. Hybrid retrieval in practice: BM25 + embeddings + RRF + reranking (Phase 2 companion)
2. AST-aware chunking with tree-sitter — why naive splitting fails code
3. Building a golden-dataset eval harness from historical OSS PRs
4. The economics of an agent: caching, routing, and a $0.50 budget
5. Prompt-injection defense for tool-using agents
6. MCP in production: lessons from a 6-agent platform (confidentiality-safe)
7. Registry-driven UI for agent workflows (Zustand pattern from current role)

**Existing 12 posts triage:** keep + cross-link the AI/architecture posts (ai-code-reviewer ×2, voice agents, generative-ai-production, multi-tenant-saas, monolith-to-microservices, websockets, accessibility, async-collaboration) · **unpublish or rewrite** the commodity posts that lower perceived seniority ("Why Next.js is my go-to", "React performance optimization", "React Native vs native" — rewrite only if given a specific, experience-backed angle; generic versions hurt P1 perception more than they help SEO).

## 5. Page copy priorities (other surfaces)

- **About:** narrative arc "products → platforms → AI systems," scope lines on every timeline entry, a "How I lead" block (Elsys: reviews, mentoring, re-architecture), human close (Kerala, remote-first, async writing culture).
- **Resume page:** copy = `resume.ts` single source; intro line repeats positioning verbatim (recruiter keyword scan).
- **Contact:** expectation-setting ("IST · replies within 24h · remote-first"), typed inquiry framing.
- **Colophon:** the recursion essay — stack, budgets, a11y approach, analytics disclosure, link to CI workflow. Short, confident, slightly fun.

## 6. CTA system

One primary CTA per screen, persona-routed: depth CTAs (`Explore architecture →`, `Read the decision →`) for P1; access CTAs (`Resume`, `Download PDF`) for P2; scoped CTAs (`Start a project conversation`) for P3. Never two competing primaries; "Contact" in nav is the constant fallback.

## 7. Factual-consistency ledger (audit M8 — must be resolved before any copy ships)

| Inconsistency | Resolution |
|---|---|
| 4.75 vs 5 years | "5 years" everywhere (matches PDF resume); stats trio removed anyway |
| LangChain/ChatGPT in tech bar vs "no LangChain glue" | Remove both from skills; LangChain may appear only in rejected-alternatives copy |
| AI Code Reviewer "<$0.20" (feature copy) vs "<$0.50 target" (impact) | Single framing: "$0.50/PR budget (target); current measured cost published when Phase 2 evals land" |
| Resume docx (old, "4.75+", different titles) committed to repo | Remove from git; PDF is the only public resume artifact |
| Title drift ("Software Engineer" at IIA vs "Senior" branding) | Site uses role-scoped truth: job titles verbatim in timeline/resume; positioning title only as self-description, never as a job title |

## 8. Editorial definition of done (any published content)

Voice rules pass · consistency ledger clean against resume · provenance labels on all metrics · confidentiality protocol applied · one technique query served (notes) · read-aloud test (does it sound like a person?).
