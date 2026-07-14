# AI Code Reviewer — Portfolio Claim Audit

Every material claim in the live portfolio content (`src/content/projects/ai-code-reviewer.ts` + the two blog posts) judged against repo evidence. Verdicts: ✅ Supported · 🟡 Partially supported (needs requalification) · ❌ Unsupported (must change). Risk = damage if an evaluator probes it.

| # | Portfolio claim | Verdict | Evidence | Risk |
|---|---|---|---|---|
| 1 | "Hand-written agent loop … no framework, no leaky abstractions" | ✅ | Custom `Agent` runtime + `runReview`; zero agent-framework deps in package.json | Low — **upgrade**: it's now a reusable multi-provider runtime, a *stronger* story than "a loop" |
| 2 | Termination: "stop sequence, max iterations, hard cost cap" | 🟡 | Max-iter ✅, cost cap ✅, abort/timeouts ✅; termination is **stop-tool** (`submit_review`) not "stop sequence" | Low — fix terminology |
| 3 | Tool registry: "search_code, read_file, find_references, run_tests, **get_pr_discussion**" | 🟡 | First four ✅ (Zod-schema'd); `get_pr_discussion` **does not exist** | Medium — listed tool missing in code is exactly what a staff engineer greps for |
| 4 | "Zod-typed tool registry" | ✅ | Zod imported across all tool defs; registry builds JSON schema | Low |
| 5 | "Tree-sitter AST chunking preserves function/class boundaries" | ✅ | `chunking.py` + tests | Low — qualify languages (py/ts/js only) |
| 6 | "Voyage voyage-code-3 embeddings over pgvector" | ✅ | Both sides (TS query client, Py indexer), 1024-d HNSW schema | Low |
| 7 | "BM25 … lexical recall" | ✅ | Postgres FTS lane + tests | Low |
| 8 | "Cohere rerank-3 … cross-encoder" | ✅ | `rerank.ts` (rerank-v3.5) | Low |
| 9 | RRF fusion of lanes | ✅ | `rrf.ts` k=60 | Low |
| 10 | "Contextual chunk prefixing" | ✅ | `contextual.py` (Haiku + doc caching) | Low |
| 11 | "Python indexer **running on Modal**" | ❌ | Zero Modal code; CLI/local only | **High** — named-vendor claim with no code behind it |
| 12 | "Evals replay **50+ historical PRs from popular open-source repos**" | ❌ | Dataset = **30 synthetic seeded examples** (`evals/datasets/v1`) | **High** — the single most checkable false claim; the real dataset is verifiable in 30 seconds |
| 13 | "LLM-as-judge plus deterministic checks" | ✅ | Versioned judge + 5 scorers + trap/FP metrics | Low — genuinely strong |
| 14 | "Eval deltas gate every prompt change…" | 🟡 | Harness computes deltas; eval CI exists; "gates **every** change" unproven (one complete committed run) | Medium — soften to "regression deltas computed; eval CI posts summaries on PRs" |
| 15 | "Full request-level tracing in Langfuse — tool calls, token counts…" | ✅ | Hooks adapter + route wiring + cache metadata | Low |
| 16 | "Sentry for error tracking" | ✅ | Configs + instrumentation present | Low |
| 17 | "Prompt caching reduces input tokens by **80%+** on follow-up turns" | 🟡 | Mechanism implemented (`cache_control`); **no committed measurement**; 80% figure is a design estimate | Medium — restate as mechanism + Anthropic's published cache discount, or measure first |
| 18 | "Semantic caching short-circuits near-duplicate queries" | ✅ | Schema + HNSW + route wiring + TTL | Low |
| 19 | "Model router picks Haiku for classification, Sonnet for synthesis" | 🟡 | Tier router + provider cascade exist; routing is **per-run tier selection**, not per-step task routing | Medium — current copy implies intra-review routing that doesn't exist |
| 20 | "Average PR review cost stays **under $0.20**" | ❌ | No cloud-model cost data exists; only $0 local baseline | **High** — fabricated-looking number; cap is $0.50, measurements absent |
| 21 | "Prompt-injection defenses … sandboxed in a separate user-role turn" | 🟡 | Real defense: untrusted-tag delimiters + sanitizer + system-prompt rules + tests; "separate user-role turn" mischaracterizes mechanism | Low-Med — describe the actual mechanism (it's good) |
| 22 | "Injection attempts are **logged and surfaced**" | ❌ | No detection/telemetry code | Medium |
| 23 | "Sandboxed execution" (guardrail framing) | ✅ | run_tests → E2B only | Low |
| 24 | "Currently in **Phase 1** of a 6-phase roadmap" | ❌ (stale-low!) | Phases 1–5 complete per code reality (runtime, retrieval, evals, caching, security, observability all exist); GitHub delivery (Phase 7/M1) on branch | **High in reverse** — the portfolio *undersells* the repo by ~4 phases; also contradicts the repo README ("Phase 5 completed") |
| 25 | Impact: "Eval Target 80%+ … Cost Target <$0.50" labeled as targets | 🟡 | Cap ✅ ($0.50 in code); targets fine **but** feature copy (#20) contradicts the cost target with an "achieved" $0.20 | Medium — one framing, provenance-tagged |
| 26 | Blog: "streaming endpoint with a **placeholder agent**" (Phase-1 post, May 2026) | ✅ historically | Accurate for its date; now superseded — needs a follow-up post, not a rewrite | Low |
| 27 | "GitHub integration" (review-panel example claim) | 🟡 | Complete tested code on unmerged branch; not on main, no production GitHub App | Medium — say "CLI + Action example, merging" only after merge |

## Required actions (ranked)

1. **Fix the three ❌ overclaims** (#11 Modal, #12 OSS-PR dataset, #20 $0.20 cost) — each is disprovable in under a minute by anyone with the repo link. Replace with: local CLI indexer; "30-example versioned synthetic golden set (OSS-PR curation in progress)"; "$0.50 in-loop spend cap; cost measurement pending frontier-model eval runs."
2. **Fix the phase framing** (#24) — both directions: the portfolio says Phase 1; the truth (per code) is Phases 1–5 complete + GitHub delivery in progress. This is the rare audit where reality is *better* than the claim.
3. **Requalify the 🟡 five** (#2, #3, #14, #17, #19, #21): correct terminology, drop the missing tool, soften unmeasured numbers, describe the real injection mechanism.
4. **Publish the failure data** (#12-adjacent): the committed "below-bar" baseline (judge 0.635, FP 67%) is the most credible artifact in the repo — use it, don't hide it.
5. Drop #22 or implement it (1-day task in the agent hooks) — until then it's unsupported.
