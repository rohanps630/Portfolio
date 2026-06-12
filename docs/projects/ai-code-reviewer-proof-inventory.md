# AI Code Reviewer — Proof Inventory

Everything that can serve as public evidence, ranked by **credibility value** (what it proves to a skeptic) × **ease of capture**. Items marked 🔓 require a small unblock first.

| # | Artifact | Description | Credibility value | Ease |
|---|---|---|---|---|
| P1 | **Committed eval summary (`ollama-baseline/summary.json`)** | Real scores incl. failure: judge 0.635, deterministic 0.2, FP 67%, "below-bar" verdict, per-difficulty breakdown | ★★★★★ — published failure data is the rarest credibility signal in AI portfolios; proves the harness is real and the author honest | Trivial — file exists; screenshot or render as a table |
| P2 | **Live review run (screen recording)** | Submit a diff in the web UI → SSE stream of tool calls → findings with evidence + risk heatmap | ★★★★★ — proves the system *runs*; kills the "beautiful repo, dead code" suspicion | Easy — local stack + a seeded diff from the eval set |
| P3 | **Langfuse trace of one full review** | Generations with token usage + cache hit metadata, tool events, latency waterfall | ★★★★★ — proves observability claims end-to-end; AI hiring managers live in this view | Easy — run one review with Langfuse keys; screenshot trace tree |
| P4 | **GitHub PR with inline ACR comments** 🔓 | The reviewer commenting findings on a real PR via `apps/cli` + `packages/github` | ★★★★★ — the product moment; instantly understood by every engineer | Medium — branch works; needs a sacrificial repo/PR + token; ideally merge branch first |
| P5 | **Eval CI PR comment** | `eval.yml` posting the rendered run summary on a PR | ★★★★ — "evals in CI" proven in one image | Easy — open a PR on the repo, dispatch workflow |
| P6 | **Replay timeline UI** | Persisted `agent_events` replayed step-by-step for a past review | ★★★★ — demonstrates event-sourced thinking; visually unique | Easy — exists on main |
| P7 | **Agent runtime code walk** (agent.ts) | Cost cap, timeouts, abort, stop-tool validation in one file | ★★★★ — the "no framework" claim made tangible | Trivial — link file/lines |
| P8 | **Retrieval pipeline code + retrieval-bench output** | hybrid.ts diagram-in-comments + `scripts/retrieval-bench.mjs` run on the fixture | ★★★★ — BM25/RRF/rerank claims become inspectable | Easy |
| P9 | **Semantic-cache hit demo** | Submit near-duplicate diff → instant cached response (`cache_status: semantic`) | ★★★★ — production-concern proof few portfolios have | Easy — two runs, one screenshot of timing delta |
| P10 | **Prompt-injection test + sanitizer** | `prompt-injection.test.ts` + `sanitizeUntrustedText` + a live demo of a malicious diff comment being neutralized | ★★★★ — security claims demonstrated, not asserted | Easy |
| P11 | **CI dashboard (green matrix)** | lint/typecheck/264 TS tests/162 py tests/build jobs | ★★★ — table-stakes proof, but visible | Trivial — Actions tab screenshot/badge |
| P12 | **Tree-sitter chunk visualization** | A source file next to its AST-boundary chunks (+ contextual prefixes) | ★★★ — makes "AST-aware" concrete; great explainer asset | Medium — small script or annotated screenshot from db |
| P13 | **ADR set (6) + contracts** | Decision discipline in the repo itself | ★★★ — staff-signal for those who look | Trivial — links |
| P14 | **Cost/latency dashboard (Langfuse)** 🔓 | Aggregated cost per review across runs | ★★★★ — would unlock honest cost claims | Medium — needs a batch of frontier-model runs first |
| P15 | **Frontier-model eval run** 🔓 | summary.json for claude-sonnet tier vs the local baseline (delta table) | ★★★★★ — converts "below-bar baseline" into a *story arc* (baseline → improvement) | Medium — one `pnpm cli`/workflow run + API spend (~$5–15) |

## Notes

- **P1+P15 together are the narrative**: "local-model baseline scored 0.635 with 67% FPs — here's the delta after switching tiers and fixing retrieval." That arc is worth more than any architecture diagram.
- P2/P3/P9 can be captured in one session (~an hour) once `.env` keys are set; they cover the demo plan's core footage.
- P4 is the only artifact gated on git state (branch merge) — prioritize the merge.
- Everything above is publishable without confidentiality review (sole-owned project). The only hygiene rule: scrub API keys/URLs from screenshots, and **rotate the leaked PAT before publishing anything that shows git config**.
