# AI Code Reviewer — Repository Audit (Evidence-Based)

**Audited:** 2026-06-12 · **Repo:** `~/Work/Personal/ai-code-reviewer` @ branch `feat/github-ci-review` (HEAD `638fd5e`) · **Method:** source/tests/config inspection only; READMEs, roadmaps, and TODOs ignored as evidence. File references are repo-relative.

⚠️ **Two security findings, reported separately at top:**
1. **GitHub PAT embedded in the local git remote URL** (`git remote -v` shows `https://rohanps630:ghp_…@github.com/…`). Local config only — not committed — but readable by any local process and by anyone the directory is shared with. **Action: revoke/rotate the token; switch the remote to SSH or a credential helper.**
2. `apps/web/.env.local` exists on disk; verified **not** tracked by git (`git ls-files` shows only `.env.example`). No committed secrets found; `.gitleaks.toml` present.

---

## 1. Shape of the repo

pnpm + Turbo monorepo, TypeScript project references, plus a uv-managed Python workspace:

- `packages/agent` — agent runtime, providers, tools, prompts, retrieval (TS)
- `packages/db` — Drizzle schemas + SQL migrations (Postgres + pgvector)
- `packages/shared` — env validation, cross-app types
- `packages/github` ⚠️ *branch-only* — PR fetch, diff mapping, review submission
- `apps/web` — Next.js 16 app (review UI, API routes, streaming, replay)
- `apps/indexer` — Python 3.12: tree-sitter chunking, Voyage embeddings, contextual prefixes, eval harness
- `apps/worker` ⚠️ *branch-only* — async review queue processor
- `apps/cli` ⚠️ *branch-only* — local review CLI wiring agent + github packages
- `evals/` — versioned dataset v1 (30 examples) + **committed result runs**
- `knowledge/adr/` — 6 ADRs · `contracts/` — 3 interface contracts · `.github/workflows/` — CI + eval workflows

**Branch state matters:** `origin/main` contains `packages/{agent,db,shared}` + `apps/{web,indexer}` only. The GitHub integration, worker, and CLI exist on the un-merged `feat/github-ci-review` branch (latest commits, incl. "Milestone 1" `adffe40`/`e31cbf4`).

## 2. Agent system — **substantial and real**

- `packages/agent/src/agent.ts` (778 lines): model-agnostic `Agent` runtime — typed streaming event loop (`run_start | model_call_start | model_response | tool_call | tool_result | final | run_error`), ReAct-shaped, with: **cost cap** (typed `AgentCostCapError`), **max iterations**, **abort via signal**, **timeouts** (`AgentTimeoutError`, budget type), **stop-tool contract** with output validation, **lifecycle hooks** (the seam Langfuse plugs into), tool concurrency limits, accumulated usage tracking.
- `packages/agent/src/loop.ts` (524 lines): `runReview` as a documented thin specialization — system prompt + review tools + `submit_review` stop tool + pricing; constants `MAX_ITERATIONS = 10`, `COST_CAP_USD = 0.5` (loop.ts:62–63).
- **Providers** (`src/providers/`): Anthropic, OpenAI, Google, Groq, Ollama, openai-compat behind one `ModelProvider` seam. Anthropic provider implements **prompt caching** (`cache_control: {type:"ephemeral"}`, anthropic.ts:42,105).
- **Model routing** (`src/models.ts`, 144 lines): tier table (haiku/sonnet/opus → concrete IDs per provider), per-MTok pricing table driving the spend cap, provider preference cascade (Anthropic → Groq → OpenAI → Google → Ollama). Covered by `tests/routing.test.ts`, `tests/models.test.ts`.
- **Tests:** 264 TS test cases across runtime, loop, providers, tools, retrieval (incl. `agent-runtime.test.ts`, `loop-agent.test.ts`).

## 3. Retrieval system — **implemented end-to-end**

`packages/agent/src/retrieval/`: BM25 lane (Postgres FTS, `bm25.ts`) ∥ vector lane (pgvector HNSW cosine, voyage-code-3 1024-dim, `vector.ts` + `embeddings.ts` Voyage client with retry/backoff and dimension validation) → **RRF fusion k=60** (`rrf.ts`) → optional **Cohere rerank-v3.5** cross-encoder (`rerank.ts`, 221 lines, retry/backoff, injectable fetch). Orchestrated in `hybrid.ts` with parallel lanes and DI for embedder/executor/reranker. Lane-rank breadcrumbs preserved on results. Each stage unit-tested (`tests/retrieval/*.test.ts`, 6 files). `scripts/retrieval-bench.mjs` + `evals/retrieval-v0/` fixture exist for retrieval benchmarking.

## 4. Indexing — **implemented (Python, local execution)**

`apps/indexer/src/indexer/`: **tree-sitter AST chunking** preserving function/class boundaries with byte-budget fallback (`chunking.py`, 196 lines) — **languages: Python + TS/JS family only** (`languages.py` extension map); **voyage-code-3 embeddings** with batching (`embeddings.py`); **contextual retrieval prefixes** per Anthropic's technique using Haiku with `cache_control: ephemeral` document caching (`contextual.py`, 207 lines); pipeline → Postgres chunks table (`pipeline.py`, `db.py`). **No Modal integration exists anywhere** (grep across code/config: zero hits outside comments saying "planned"). Indexer runs via CLI. 162 Python test functions.

## 5. Evaluation system — **implemented, with committed results**

- Harness: `apps/indexer/src/evals/` — runner, Node↔Python agent bridge (`bridge.py` + `scripts/agent-bridge.mjs`), **LLM-as-judge** (versioned: `judges/versions/main_judge_v1.py`; Anthropic and Groq judge clients), **deterministic scorers** (findings match, location, severity, category, token budget), false-positive and **trap-example** metrics, pricing/cost accounting, summary generation with regression `delta` and verdict.
- Dataset: `evals/datasets/v1/examples.jsonl` — **30 synthetic seeded examples** (bug/security/perf/logic; easy/medium/hard; e.g. SQL injection, race condition, ReDoS, N+1). **Not real OSS PRs.**
- **Committed baseline run** `evals/results/ollama-baseline/summary.json`: judge_score **0.635**, deterministic_score **0.2**, false_positive_rate **0.667**, p50 latency 52s, verdict **"below-bar"** — run with local `qwen3.5` as both agent and judge ($0 cost). A second run dir (`v1-20260609T191621Z`) has 19/30 raw results and **no summary** — incomplete/aborted.
- CI: `.github/workflows/eval.yml` runs the harness on PRs/dispatch and posts a rendered summary comment (`render-eval-comment.py`, tested).
- **No committed eval run uses a cloud frontier model.** No measured per-review cost on Anthropic models exists in the repo.

## 6. Caching — **two layers, both wired**

Exact-match cache (Redis, `apps/web/src/lib/redis.ts` + review-cache) and **semantic cache** (Postgres pgvector: `packages/db/src/schema/semantic_cache.ts` — diff-embedding HNSW index, 1-day TTL, model-scoped; lookup/insert wired in `apps/web/src/app/api/reviews/route.ts:82–104`). Tested (`review-cache` paths, `redis.test.ts`).

## 7. Security controls — **implemented**

- **Prompt-injection defense:** system prompt v0.3 declares retrieved code untrusted; tool outputs wrapped in `<untrusted_file_content>`/`<untrusted_chunk>` tags; `sanitizeUntrustedText()` (loop.ts:325–331) escapes delimiter-tag forgeries in diffs; dedicated test file `prompt-injection.test.ts`. Defense is **delimiter/role-separation based** — no injection-detection telemetry ("attempts logged and surfaced" is *not* implemented).
- **Sandboxed execution:** `run_tests` tool executes only inside an **E2B sandbox** (`run-tests.ts`, 262 lines; injectable factory, `defaultE2BFactory`).
- Access-key auth (`access-key.ts`), Redis-backed rate limiting (`rate-limit.ts`), Zod env validation (`packages/shared/src/env.ts`), gitleaks config, lefthook hooks, commitlint, CODEOWNERS, dependabot.

## 8. Observability — **implemented**

Langfuse adapter mapping agent lifecycle hooks → generations (with token usage + cache metadata) and tool events (`langfuse-hooks-adapter.ts`, tested); traces created/updated/flushed in the reviews route; Sentry server/edge/client configs present. Agent event persistence for **replay** (`agent_events` table + `replay-timeline.tsx`).

## 9. Web app & delivery surfaces

- Web (on main): review submission with model selection, SSE streaming (`use-review-stream.ts`, stream route), review detail with **activity timeline, diff viewer, finding evidence + risk heatmap, replay timeline**; repos connect page; settings; Playwright smoke e2e; Vitest route tests including model-resolution tests.
- **Not deployed** — no public URL (README states this; no deploy config found beyond Vercel-ready Next).
- GitHub-native delivery (branch only): `packages/github` — PR fetcher (Octokit), **diff mapper** (179 lines: findings → commentable line positions, side selection), review submitter (batched PR review with inline comments); `apps/cli` runs fetch→review→submit locally; `examples/github-actions/acr-review.yml` shows the intended Action usage; `apps/worker` polls the reviews queue and persists event streams.

## 10. Engineering hygiene signals (for due diligence)

CI (`ci.yml`): lint+typecheck / TS tests / web build / Python (ruff+mypy+pytest implied by config) as separate jobs with concurrency groups. Biome, strict TS project references, conventional commits enforced, 6 ADRs with a template, interface contracts (`contracts/*.md`), protected-file conventions. Recent commit history shows audit-fix discipline (`ee2e08a "execute architecture audit fixes (F1-F8)"`) and honest docs commits (`4719a43 "align project claims with implementation"`).

## 11. What is **absent** (verified negatives)

No Modal · no `get_pr_discussion` tool (tools = search_code, read_file, find_references, run_tests: `tools/index.ts`) · no OSS-PR golden dataset · no cloud-model eval results · no hosted demo · no injection-attempt logging · languages limited to Python/TS/JS · GitHub integration not on main · no load/perf testing · single semantic-cache TTL strategy (no invalidation beyond expiry).
