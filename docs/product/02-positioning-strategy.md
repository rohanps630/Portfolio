# Positioning Strategy

**Inputs:** resume (5 yrs; Innovation Incubator multi-agent platform; AI Code Reviewer; telecom POS; team lead at Elsys), repo content audit (`docs/product/01-portfolio-audit-report.md`).

---

## 1. The positioning decision

> **Rohan P. Suresh — Full-Stack Product Engineer who ships production AI systems.**
> Multi-agent platforms, retrieval engineering, and LLM guardrails — built with the evals, observability, and cost discipline of someone who has run real products on real infrastructure.

One sentence version for the hero: **"I build AI systems that survive production."**

### Why this and not the alternatives

| Candidate positioning | Verdict | Reason |
|---|---|---|
| "Full Stack Developer" | ❌ | Commodity. 5 years experience drowns in this pool. |
| "AI Engineer" | ❌ | Crowded with prompt-tinkerers; invites skepticism without proof; abandons his genuine full-stack/mobile depth. |
| "Senior Full Stack Engineer · AI/LLM Integration" (current resume header) | ⚠️ | Accurate but additive ("and also AI"). The site can be sharper than the resume. |
| **"Full-stack engineer specializing in production AI systems"** | ✅ | The full-stack foundation becomes the *differentiator for* the AI claim, not a hedge against it. "Production" is the load-bearing word — it's what the evidence actually supports. |

The strategic insight from the evidence: most AI-engineer candidates demo notebooks; most full-stack candidates have no AI depth. Rohan's record — Datadog APM baselines, property-based testing, tenant-aware CI/CD, spend caps, prompt-injection defense, eval harnesses — sits exactly in the underpopulated intersection: **AI work held to production-engineering standards.** Every page of the site should hammer that intersection.

## 2. Core identity & pillars

Three proof pillars, each anchored to verifiable evidence. Everything on the site must ladder into one of these; content that doesn't gets cut or demoted.

1. **Agentic systems in production** — Enterprise Multi-Agent Customer Operations Platform: 6-agent hierarchy, MCP tool orchestration, RAG, SSE telemetry, digital twins, Cognito/Azure AD SSO, Datadog APM. *(Employer work — case study must be written respecting confidentiality; see Content Strategy §5.)*
2. **AI engineering depth, self-built and inspectable** — AI Code Reviewer: hand-written ReAct loop, hybrid BM25+vector retrieval with RRF and reranking, AST-aware chunking, golden-set evals, semantic caching, cost routing. Public repo. This is the pillar the Architecture Explorer showcases first because nothing is confidential.
3. **Scale-grade product engineering** — Telecom POS: one RN Web codebase across hundreds of iPad/desktop terminals, multi-step transactional state, tenant-aware build pipelines; plus team leadership at Elsys (mentoring, reviews, re-architecture).

## 3. Differentiators (claims the site is allowed to make)

- **Evals before vibes** — golden datasets, LLM-as-judge + deterministic checks, eval-gated changes. Almost no portfolio demonstrates this.
- **Cost as a first-class constraint** — per-PR budgets, prompt/semantic caching, Haiku/Sonnet routing. Hiring managers burned by LLM bills notice this immediately.
- **No-framework fluency** — hand-written agent loops, composable retrieval ("not LangChain glue"). *Requires removing LangChain/ChatGPT from the tech bar (audit M8).*
- **Security posture** — prompt-injection defense, sandboxing, SSO integration, spend caps.
- **Breadth that compounds** — web + mobile + backend + infra means he ships the *whole* AI product, not the model call.

Claims the site must **not** make: "AI researcher," team sizes/revenue numbers without evidence, achieved metrics for the in-progress AI Code Reviewer (targets must be labeled as targets).

## 4. Audiences & perception goals

| Persona | What they scan for | 30-second takeaway we engineer |
|---|---|---|
| **P1: Hiring manager / staff engineer** (primary) — senior full-stack-AI roles at product companies | How does he think? Are the AI claims real? Tradeoff literacy | "He reasons like one of my best seniors — and I can *see* the reasoning in the Architecture Explorer and ADR-style decision records." |
| **P2: Technical recruiter** (primary) — keyword + credibility filter | Title match, years, stack keywords, easy resume access | "Senior full-stack, 5 yrs, AI/LLM production work, clean resume page, obvious contact path." Served by `/resume` + structured data. |
| **P3: Freelance/founder client** (secondary) | Can he own my product end-to-end? Has he shipped for businesses? | "He's delivered clinics, CRMs, POS — and now adds AI capability." Served by a demoted-but-present client-work tier and a scoped contact path. |
| **P4: Peer engineers** (amplification) | Is the technical content actually good? | "Worth sharing" — served by Engineering Notes depth posts. |

Perception risks to manage: (a) "5 years isn't senior" → counter with scope evidence (hundreds of terminals, team lead, platform ownership), never with adjectives; (b) "AI portfolio = hype" → counter with the unprofitable details (eval failures, cost tables, phase status honesty); (c) India-based remote skepticism → counter with async-communication proof (the writing itself) and explicit timezone/remote framing on `/contact`.

## 5. Messaging hierarchy

- **Identity line (hero):** I build AI systems that survive production.
- **Support line:** Full-stack engineer (React/Next.js · React Native · Node/FastAPI · AWS) specializing in multi-agent architectures, retrieval engineering, and LLM guardrails.
- **Proof line (immediately visible):** Currently: 6-agent customer-operations platform on AWS Bedrock + MCP · Building in public: an AI code reviewer with hand-written agent loop & eval harness.
- **Tone:** measured, specific, evidence-first. Numbers over adjectives. Status honesty ("Phase 1 of 6") is a feature, not a weakness — it's the rarest credibility signal in this genre.

## 6. Acceptance criteria for this strategy

1. Every page's first screen answers "production AI + full-stack discipline" without the visitor scrolling.
2. The three pillars each have at least one deep, evidenced artifact (case study or explorer) within two clicks of Home.
3. No content contradiction survives (years, frameworks, targets-vs-achievements).
4. A P1 visitor can reach "how he thinks" content (decision records / explorer) in ≤ 2 clicks; a P2 visitor can reach the resume in 1.
