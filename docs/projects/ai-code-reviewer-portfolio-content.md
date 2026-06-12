# AI Code Reviewer — Evidence-Backed Portfolio Content

Drop-in replacement copy for the System record (`src/content/systems/ai-code-reviewer/`), written under the public-disclosure rules. Every paragraph is backed by the repo audit; ⚠️ marks items needing one action before publication. Provenance tags shown inline as they should render.

---

## Executive summary (case-study header / TL;DR)

> **An AI agent that reviews pull requests by reasoning over the repository, not just the diff — built from scratch as a working study of production LLM engineering.** A hand-written, model-agnostic agent runtime (no frameworks) drives a tool-using review loop over hybrid code retrieval, with a versioned eval harness, two-layer caching, prompt-injection defense, sandboxed execution, and full Langfuse tracing. Core build complete (foundations → retrieval → agent → evals → production concerns); GitHub-native PR delivery in progress. `[scope-fact]`

TL;DR strip: `426 tests across TS + Python [measured]` · `$0.50 in-loop spend cap [scope-fact]` · `5 model providers, one runtime [scope-fact]` · `Baseline eval: judge 0.635, 67% FP — published, below bar [measured]`

## Project overview (context & problem)

Off-the-shelf AI review tools either see only the diff — missing callers, types, and tests — or paste whole repositories into mega-prompts: slow, expensive, noisy. The interesting problem is an agent that *retrieves the right context per finding*, terminates predictably, stays inside a budget, and can prove whether a change made it better or worse. I built this system to learn that problem end-to-end, with every production concern treated as a first-class feature rather than a TODO.

## Architecture summary (explorer narration)

A TypeScript + Python monorepo. The center is a **model-agnostic `Agent` runtime** — a typed, streaming ReAct loop with lifecycle hooks, an in-loop cost cap, timeouts, cancellation, and a validated stop-tool contract. The PR reviewer (`runReview`) is a thin specialization of it. Five providers (Anthropic, OpenAI, Google, Groq, Ollama) sit behind one seam; a tier table maps haiku/sonnet/opus to concrete models per provider.

Context comes from a **hybrid retrieval pipeline**: tree-sitter AST chunking (Python/TS/JS) with Haiku-generated contextual prefixes → voyage-code-3 embeddings in pgvector (HNSW) in parallel with Postgres BM25 → Reciprocal Rank Fusion → optional Cohere rerank-v3.5. Each stage is a hand-written, injectable client with an explicit retry/failure model.

Around the loop: Redis exact-match + pgvector **semantic caching** (1-day TTL); retrieved code wrapped in untrusted-content tags with a delimiter-forgery sanitizer (**prompt-injection defense**, tested); `run_tests` executes only inside an **E2B sandbox**; every run is traced to **Langfuse** through runtime hooks and persisted as a replayable event stream.

## Key decisions (DecisionRecord seeds — each with cost)

1. **A general agent runtime instead of a bespoke review loop.** *Alternatives:* LangChain/LangGraph (rejected: opaque control flow where the learning is); single-purpose loop (outgrown). *Why:* termination, budgets, and tracing are runtime concerns — solving them once made the reviewer a 500-line specialization. *Cost:* weeks of building infrastructure for a product with one user; five providers is generality beyond current need — chosen deliberately because the runtime *was* the curriculum.
2. **Hybrid retrieval with hand-written stages.** *Alternatives:* vector-only (poor on identifiers); a search SaaS. *Why:* BM25 and embeddings fail differently; RRF+rerank exploits that — and owning each stage means each stage can be measured and swapped. *Cost:* maintenance surface a framework would have absorbed; three external APIs (Voyage, Cohere) on the hot path.
3. **Evals before improvement — and committing the bad baseline.** *Alternatives:* demo-driven iteration. *Why:* a versioned dataset + versioned judge + deterministic scorers makes every prompt/retrieval change measurable; CI posts the delta on PRs. *Cost:* the first committed number is ugly — judge 0.635 with 67% false positives on a local-model baseline, verdict "below-bar." It's in the repo on purpose: that number is the to-do list. `[measured]`
4. **Cost cap inside the loop, not in the billing dashboard.** *Why:* an agent that can spend without bound isn't production software; the pricing table feeds the runtime and the run dies cleanly at $0.50. *Cost:* per-model price tables to maintain; caps can truncate legitimate long reviews.
5. **All retrieved code is hostile.** Untrusted-tag wrapping + sanitizer + prompt rules, tested. *Cost:* token overhead on every tool result; defense is structural (delimiters/roles), and injection-attempt *telemetry* is not built yet. `[in progress]`

## Technical challenges & tradeoffs (lessons feedstock)

- **Judging the judge:** LLM-as-judge scores diverged from deterministic checks (0.635 vs 0.2 on the baseline) — the gap itself became the insight: the judge over-credits plausible-sounding findings; deterministic location/severity checks keep it honest. ⚠️ *needs one sentence of confirmation from the author before publishing as a lesson.*
- **The false-positive problem is the real problem:** the baseline's 67% FP rate, not missed bugs, is what would make engineers mute the bot. This reframed the roadmap (trap examples, severity calibration) more than any architecture choice.
- **Synthetic seeds vs real PRs:** 30 planted-bug examples made the harness buildable, but measure "find the planted bug," not "review like a senior engineer." Curating real public PRs is the known next step. `[in progress]`
- **Branch honesty:** GitHub-native delivery (PR fetch → diff position mapping → batched inline comments) is implemented and tested but lives on a feature branch pending merge. ⚠️ *merge or keep the qualifier.*

## Results (Outcomes section — provenance-tagged)

- Working end-to-end review system: web UI with live SSE streaming, finding evidence, risk heatmap, and event-stream replay. `[measured — demo video]`
- 264 TS + 162 Python tests in CI; eval workflow posts run summaries on PRs. `[measured]`
- Published baseline eval with failure analysis (the table from `summary.json`). `[measured]`
- $0.50/review enforced cap; semantic-cache hits return in milliseconds vs ~52s p50 uncached baseline runs. `[measured for latency; cost average pending frontier-model runs]` ⚠️
- Eval target: ≥0.8 judge score with <20% FP on dataset v2 (real-PR curation). `[target]`

## What this system is not (honesty block)

Not deployed publicly yet; not measured on frontier models yet (the committed baseline is a local model); reviews Python/TS/JS only; one user (its author). Each of those is a current roadmap line, not a footnote.

---
**Pre-publication checklist:** rotate the leaked PAT → run one frontier-model eval (`[measured]` cost line unlocks) → merge or qualify the GitHub branch → confirm the two ⚠️ author-voice items → capture S1–S3 screenshots per the demo plan.
