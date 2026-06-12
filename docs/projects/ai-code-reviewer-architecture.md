# AI Code Reviewer — Extracted Architecture (from code, not docs)

Inferred exclusively from source: imports, schemas, route handlers, DI seams. **Solid boxes = on `origin/main`. Dashed = branch `feat/github-ci-review` only. (planned) = no code.**

---

## 1. System diagram (runtime, as implemented)

```
                ┌─────────────────────────────────────────────────────────┐
                │ apps/web (Next.js 16) — NOT publicly deployed           │
                │                                                         │
 Browser ──────▶│ POST /api/reviews ──▶ access-key auth ─▶ rate limit     │
   ▲            │        │   (lib/access-key.ts, lib/rate-limit.ts)       │
   │ SSE        │        ▼                                                │
   │            │  1. exact cache (Redis) ──hit──▶ persist + return       │
   │            │  2. semantic cache (pgvector HNSW over diff embeddings, │
   │            │     1-day TTL, model-scoped) ──hit──▶ persist + return  │
   │            │  3. miss ─▶ reviews row (status: pending) ─▶ stream     │
   │            │                                                         │
   │            │ GET /api/reviews/[id]/stream ──▶ ReviewChunk SSE        │
   │            │ GET /api/reviews/[id]/events ──▶ replay (agent_events)  │
   └────────────│ UI: review form · activity timeline · diff viewer ·     │
                │     finding evidence + risk heatmap · replay timeline   │
                └───────────────┬─────────────────────────────────────────┘
                                │ runReview(deps)            Langfuse hooks adapter
                                ▼                            (generations + tool events)
        ┌───────────────────────────────────────────┐        Sentry (errors)
        │ packages/agent — Agent runtime            │
        │  ReAct loop: model ⇄ tools until          │
        │  submit_review | max-iter(10) |           │
        │  cost cap($0.50) | timeout | abort        │
        │                                           │
        │  Providers (one seam): Anthropic*/OpenAI/ │   *prompt caching via
        │  Google/Groq/Ollama  + tier router        │    cache_control:ephemeral
        │                                           │
        │  Tools: search_code · read_file ·         │   run_tests → E2B sandbox
        │  find_references · run_tests              │   (cloud microVM)
        └───────────┬───────────────────────────────┘
                    │ search_code
                    ▼
        ┌───────────────────────────────────────────┐
        │ Retrieval (packages/agent/src/retrieval)  │
        │  query ─┬▶ Voyage embedQuery ─▶ pgvector  │
        │         │   (HNSW, cosine, 1024-d)        │
        │         └▶ BM25 (Postgres FTS/ts_rank)    │
        │              └──▶ RRF (k=60) ─▶ [Cohere   │
        │                   rerank-v3.5, optional]  │
        └───────────┬───────────────────────────────┘
                    ▼
        ┌───────────────────────────────────────────┐     ┌──────────────────────────┐
        │ Postgres (Supabase) + pgvector            │◀────│ apps/indexer (Python)    │
        │  repos · documents · chunks(embedding,    │     │  tree-sitter AST chunking│
        │  tsv) · reviews · agent_events ·          │     │  (py/ts/js) → contextual │
        │  semantic_cache                           │     │  prefix (Haiku, cached)  │
        └───────────────────────────────────────────┘     │  → voyage-code-3 → db    │
                                                          │  CLI-run, local. (Modal  │
                                                          │  = planned, no code)     │
                                                          └──────────────────────────┘
   ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   ╎ BRANCH-ONLY (feat/github-ci-review):                                       ╎
   ╎  apps/worker — polls reviews queue → runReview → flushes agent_events      ╎
   ╎  packages/github — PR fetch (Octokit) → diff-mapper (findings → line       ╎
   ╎    positions/sides) → review-submitter (batched inline PR review)          ╎
   ╎  apps/cli — local fetch→review→submit; examples/github-actions/ Action     ╎
   └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
```

## 2. Primary data flow — "a review request" (implemented path)

1. `POST /api/reviews` {diff, model tier} → auth → rate limit.
2. Redis exact-match lookup on diff hash → hit short-circuits (persisted as `cache_status: exact`).
3. Semantic-cache lookup: Voyage-embed the diff → HNSW cosine search in `semantic_cache` (model-scoped, unexpired) → hit short-circuits.
4. Miss: insert `reviews` row → tier resolved to provider via env cascade → `runReview` streams `ReviewChunk`s.
5. Agent loop: model call (Anthropic w/ cached system prompt) → tool calls (search_code → hybrid retrieval; read_file/find_references → Postgres code source; run_tests → E2B) with results re-wrapped as **untrusted-tagged** content → repeat → `submit_review` validated → final findings.
6. Chunks stream to client (SSE), persist to `agent_events` (replay), map to Langfuse generations/events; result written back to `reviews`, inserted into semantic cache with TTL.

**Indexing flow (offline, CLI):** repo files → language detect → tree-sitter chunk → Haiku contextual prefix (document-cached) → voyage-code-3 embed → `chunks` upsert (vector + tsvector lanes).
**Eval flow (CI or CLI):** dataset JSONL → runner → agent via Node bridge → deterministic scorers + versioned LLM judge → summary.json (scores, FP/trap rates, latency, cost, regression delta, verdict) → PR comment.

## 3. Service & integration boundaries

| Boundary | Contract | Notes |
|---|---|---|
| web ⇄ agent | `runReview(input, deps)` + `ReviewChunk` stream | deps injection: provider, retriever, codeSource, sandbox factory |
| agent ⇄ models | `ModelProvider` interface | 5 providers; swap without loop changes |
| agent ⇄ retrieval | `RetrieverLike.search()` | hybrid internals invisible to the loop |
| agent ⇄ code | `CodeSource` (Postgres impl) | tools never touch the filesystem |
| agent ⇄ execution | sandbox factory (E2B) | only escape hatch for running untrusted code |
| TS ⇄ Python | JSONL bridge (`scripts/agent-bridge.mjs` ⇄ `evals/bridge.py`) | evals drive the real TS agent |
| web ⇄ GitHub | `packages/github` (branch) | Octokit; diff-position mapping isolated in `diff-mapper` |
| External SaaS | Voyage, Cohere, Anthropic/OpenAI/Google/Groq, E2B, Langfuse, Sentry, Supabase, Redis | every client hand-written with retry/backoff; no LangChain/SDK frameworks |

## 4. Implemented vs planned architecture (delta table)

| Aspect | Implemented today | Planned (no code — do not present as real) |
|---|---|---|
| Review delivery | Web UI + SSE on main; GitHub PR comments end-to-end **on branch** | GitHub App / merged Action path |
| Compute | Local dev runtime; web is Vercel-shaped but undeployed | Hosted demo; Modal for indexing jobs |
| Eval evidence | 30-seed synthetic v1 + local-model baseline ("below-bar") | OSS-PR golden set; frontier-model runs; published deltas |
| Languages | Python, TS/JS | more grammars |
| Injection defense | Delimiters + sanitizer + prompt rules | detection/logging of attempts |
| Queue | Poll-based worker (branch) | — |

## 5. Architecture observations (reviewer's judgment)

**Strengths:** boundary discipline is genuinely senior — every external dependency sits behind a hand-rolled, injectable client with an explicit failure model; the runtime/specialization split (ADR-005) is the right shape; evals drive the *real* agent through a bridge rather than a reimplementation; the cost cap lives in the loop, not in hope. **Weaknesses:** main-vs-branch drift makes "what's shipped" ambiguous at a glance; the eval story's weakest link is dataset realism (synthetic seeds) and the absence of a frontier-model run; poll-based worker and single-node assumptions are fine for a portfolio system but should be framed as such.
