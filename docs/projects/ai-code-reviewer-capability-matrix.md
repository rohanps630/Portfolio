# AI Code Reviewer — Capability Matrix

**As of:** 2026-06-12, branch `feat/github-ci-review` @ `638fd5e`. Statuses: **IMPLEMENTED** (working code + tests) · **PARTIAL** (real but incomplete/unmerged/unmeasured) · **PLANNED** (no code) · **ABANDONED** (evidence of stalled work). Confidence: H/M/L.

| Capability | Status | Conf | Evidence | Files |
|---|---|---|---|---|
| Agent runtime (streaming ReAct loop, typed events, hooks) | **IMPLEMENTED** | H | 778-line runtime; runtime/loop test suites | `packages/agent/src/agent.ts`, `tests/agent-runtime.test.ts` |
| Cost cap enforcement in-loop | **IMPLEMENTED** | H | `AgentCostCapError`, pricing table, $0.50 default | `agent.ts`, `models.ts`, `loop.ts:63` |
| Max-iterations / stop-tool termination | **IMPLEMENTED** | H | Typed errors; `submit_review` stop tool w/ output validation | `agent.ts`, `loop.ts` |
| Cancellation (abort) + timeouts | **IMPLEMENTED** | H | `AgentAbortedError`, `AgentTimeoutError`, budget types | `agent-types.ts`, runtime tests |
| Multi-provider model seam (Anthropic/OpenAI/Google/Groq/Ollama) | **IMPLEMENTED** | H | 6 provider impls behind `ModelProvider` | `src/providers/*` |
| Model tier routing + provider cascade | **IMPLEMENTED** | H | Tier→ID table, cascade fn, tests | `models.ts`, `tests/routing.test.ts` |
| Anthropic prompt caching | **IMPLEMENTED** (mechanism) / **PARTIAL** (no measured savings) | H/M | `cache_control: ephemeral` on system + cache metadata in traces; no committed measurement of the "80%+" figure | `providers/anthropic.ts:42,105` |
| Tool: search_code (retrieval-backed) | **IMPLEMENTED** | H | Zod-schema'd tool over HybridRetriever | `tools/search-code.ts` + test |
| Tool: read_file / find_references | **IMPLEMENTED** | H | Postgres-backed CodeSource; tests | `tools/read-file.ts`, `find-references.ts` |
| Tool: run_tests in E2B sandbox | **IMPLEMENTED** | M | Full tool + injectable E2B factory; sandbox use depends on env key at runtime | `tools/run-tests.ts` |
| Tool: get_pr_discussion | **PLANNED** | H | No such tool exists | `tools/index.ts` (absent) |
| BM25 lexical search (Postgres FTS) | **IMPLEMENTED** | H | + tests | `retrieval/bm25.ts` |
| Vector search (pgvector HNSW, voyage-code-3) | **IMPLEMENTED** | H | 1024-dim schema + HNSW index + Voyage client | `retrieval/vector.ts`, `db/schema/chunks.ts:79–94` |
| RRF fusion | **IMPLEMENTED** | H | k=60, tests | `retrieval/rrf.ts` |
| Cohere rerank-v3.5 cross-encoder | **IMPLEMENTED** | H | Full client, retry model, optional wiring | `retrieval/rerank.ts` |
| Hybrid orchestration (parallel lanes, DI) | **IMPLEMENTED** | H | + tests | `retrieval/hybrid.ts` |
| AST-aware chunking (tree-sitter) | **IMPLEMENTED** | H | Function/class-boundary chunking + fallback; tests | `indexer/chunking.py` |
| Language coverage beyond Py/TS/JS | **PLANNED** | H | Extension map is exhaustive | `indexer/languages.py` |
| Contextual retrieval prefixes (Haiku + doc caching) | **IMPLEMENTED** | H | Anthropic contextual-retrieval technique; tested | `indexer/contextual.py` |
| Indexing pipeline → Postgres | **IMPLEMENTED** | H | pipeline + db + CLI; tests | `indexer/pipeline.py` |
| Indexer on Modal | **PLANNED** | H | Zero Modal code/config | — |
| Eval harness (runner, bridge, scorers) | **IMPLEMENTED** | H | 162 py tests incl. eval modules | `src/evals/*` |
| LLM-as-judge (versioned) | **IMPLEMENTED** | H | `main_judge_v1`, Anthropic+Groq clients | `evals/judge*.py`, `judges/versions/` |
| Deterministic scorers + trap/FP metrics | **IMPLEMENTED** | H | 5 scorer modules; metrics in summary | `evals/scorers/*`, `summary.py` |
| Golden dataset | **PARTIAL** | H | v1 = **30 synthetic seeded examples**, versioned; **not OSS PRs** | `evals/datasets/v1/` |
| Committed eval results | **PARTIAL** | H | Full baseline run (local model, verdict "below-bar"); cloud-model run absent; second run incomplete | `evals/results/ollama-baseline/summary.json` |
| Eval CI (PR comment with run summary) | **IMPLEMENTED** | M | Workflow + renderer + renderer tests; can't verify recent green runs locally | `.github/workflows/eval.yml` |
| Exact-match review cache (Redis) | **IMPLEMENTED** | H | Wired in route; tested | `web/src/lib/redis.ts`, `review-cache.ts` |
| Semantic cache (pgvector, TTL) | **IMPLEMENTED** | H | Schema + HNSW + route wiring | `db/schema/semantic_cache.ts`, `reviews/route.ts:95–104` |
| Prompt-injection defense (delimiters + sanitizer + untrusted framing) | **IMPLEMENTED** | H | v0.3 prompt, `sanitizeUntrustedText`, dedicated tests | `prompts/versions/system-v0.3.ts`, `loop.ts:325`, `tests/prompt-injection.test.ts` |
| Injection-attempt logging/surfacing | **PLANNED** | H | No detection/telemetry code | — |
| Langfuse tracing via lifecycle hooks | **IMPLEMENTED** | H | Adapter + route wiring + tests | `web/src/lib/langfuse-hooks-adapter.ts` |
| Sentry error tracking | **IMPLEMENTED** | M | Server/edge/client configs + instrumentation | `apps/web/sentry.*.ts` |
| Agent event persistence + replay UI | **IMPLEMENTED** | H | `agent_events` schema + replay timeline component | `db/schema/agent_events.ts`, `replay-timeline.tsx` |
| Web review UI (submit, stream, findings, heatmap, diff) | **IMPLEMENTED** | H | Route tests + Playwright smoke | `apps/web/src/app/(app)/*` |
| Access-key auth + rate limiting | **IMPLEMENTED** | H | + tests | `web/src/lib/access-key.ts`, `rate-limit.ts` |
| Prompt versioning | **IMPLEMENTED** | H | v0.1→v0.3 versioned modules + contract doc | `prompts/versions/` |
| GitHub PR fetch / diff mapping / review submission | **PARTIAL** | H | Complete, tested code — **on unmerged branch `feat/github-ci-review`**, not on main | `packages/github/*` |
| Async review worker (queue + event flush) | **PARTIAL** | H | Working code, branch-only, poll-based | `apps/worker/src/index.ts` |
| Local review CLI | **PARTIAL** | H | Works vs local source; branch-only | `apps/cli/*` |
| Hosted public demo | **PLANNED** | H | README confirms; no deploy artifacts | — |
| Fine-tuned small model (roadmap Phase 6) | **ABANDONED** | H | Explicitly archived in roadmap; zero code | `docs/roadmap.md:100` |
| Second eval run `v1-20260609T191621Z` | **ABANDONED/INCOMPLETE** | M | 19/30 raw results, no summary.json | `evals/results/v1-…/` |

**Headline counts:** 26 IMPLEMENTED · 6 PARTIAL · 5 PLANNED · 2 ABANDONED/INCOMPLETE. Test base: **264 TS cases + 162 Python tests**, CI-enforced.
