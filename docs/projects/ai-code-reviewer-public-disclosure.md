# AI Code Reviewer — Public Disclosure Guide

What may be claimed publicly, given the evidence (own project — no confidentiality limits; the only constraint is **provability**). Three buckets. A claim moves up only when its evidence moves up.

---

## ✅ Safe to claim (evidence exists; link it when claiming)

**Architecture & engineering**
- Built a model-agnostic agent runtime from scratch (no agent framework): typed streaming event loop, lifecycle hooks, cost cap, timeouts, cancellation, stop-tool contract — with the PR reviewer as a thin specialization. *(agent.ts, loop.ts, ADR-005)*
- Five model providers behind one seam (Anthropic, OpenAI, Google, Groq, Ollama) with tier-based model resolution and a provider preference cascade. *(providers/, models.ts)*
- Hybrid retrieval pipeline: BM25 (Postgres FTS) + vector search (pgvector HNSW, voyage-code-3) fused with RRF, optional Cohere rerank-v3.5 cross-encoder; every stage hand-written, injectable, unit-tested. *(retrieval/)*
- AST-aware code chunking with tree-sitter (Python + TS/JS), contextual chunk prefixes generated via Haiku with Anthropic prompt caching. *(indexer/)*
- Two-layer review caching: Redis exact-match + pgvector semantic cache with TTL. *(review-cache.ts, semantic_cache.ts)*
- Prompt-injection defense: untrusted-content tagging of all retrieved code, delimiter-forgery sanitization, versioned system prompts — with dedicated tests. *(system-v0.3.ts, prompt-injection.test.ts)*
- Sandboxed test execution via E2B; the agent never runs untrusted code on the host. *(run-tests.ts)*
- End-to-end Langfuse tracing via runtime hooks (generations with token usage + cache metadata, tool events); Sentry; full agent-event persistence with a replay UI. *(langfuse-hooks-adapter.ts, agent_events)*
- In-loop spend cap ($0.50/review) enforced by a pricing table inside the runtime. *(models.ts, agent.ts)*
- Eval harness with a versioned 30-example synthetic golden dataset, versioned LLM-as-judge plus deterministic scorers (findings/location/severity/category), false-positive and trap-example metrics, regression deltas, and an eval CI workflow that posts run summaries on PRs. *(evals/, eval.yml)*
- **The baseline eval result itself, failure included:** local-model baseline scored judge 0.635 with a 67% false-positive rate — verdict "below-bar" — and that number is committed to the repo. This is the single most differentiating claim available; almost nobody publishes their bad baselines.
- ~426 tests (264 TS + 162 Python) across runtime, retrieval, tools, indexer, evals; CI with lint/typecheck/test/build; 6 ADRs; conventional commits; protected-file conventions.

**Framing**
- "Built as a self-directed deep study of production LLM engineering" — supported by the ADRs, versioning discipline, and roadmap honesty.

## 🟡 Claim carefully (true with qualification — use the exact qualifiers)

| Claim | Required qualifier |
|---|---|
| GitHub-native PR review (fetch → diff-map → inline comments) | "implemented and tested, currently on a feature branch / merging" — or merge first, then claim plainly |
| Prompt caching savings | "prompt caching enabled on system prompt + retrieved documents" — **no percentage** until measured from Langfuse data |
| Model routing | "tier-based model selection (haiku/sonnet/opus) across five providers" — *not* "routes classification to Haiku and synthesis to Sonnet" (per-step routing doesn't exist) |
| Cost per review | "enforced $0.50 in-loop cap" — no average-cost figure until a frontier-model eval run is committed |
| Eval gating | "eval CI computes regression deltas on PRs" — not "gates every change" |
| Async worker / queue | "poll-based worker persisting replayable event streams" — branch-only; simple by design |
| Language support | always "Python and TypeScript/JavaScript" — never "any language" |

## ❌ Do not claim (no evidence — currently on the portfolio and must be removed)

- ~~"Evals replay 50+ historical PRs from popular open-source repos"~~ → 30 synthetic seeds; OSS curation not started in code.
- ~~"Indexer running on Modal"~~ → no Modal anywhere.
- ~~"Average PR review cost stays under $0.20"~~ → zero cloud-cost measurements exist.
- ~~"get_pr_discussion" tool~~ → not implemented.
- ~~"Injection attempts are logged and surfaced"~~ → no detection telemetry.
- ~~"Phase 1 of 6"~~ → replace with truthful status: core phases (foundations → RAG → agent → evals → production concerns) complete; GitHub-native delivery in progress.
- Any uptime/throughput/user numbers — the system is not publicly deployed.

## Standing rule

Every ✅ claim should carry a link (file, ADR, eval summary, or trace screenshot) on the portfolio. A claim that can't carry a link gets a `target`/`in progress` provenance tag or doesn't ship. This repo can afford that rule — which is exactly what makes it the right flagship.
