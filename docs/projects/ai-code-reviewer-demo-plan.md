# AI Code Reviewer — Screenshot & Demo Plan

Assets reference the proof inventory (P-numbers). Rule for all footage: **real runs only** — no mocked data, no sped-up segments without a visible timestamp, failures left in (a tool retry on camera is a feature).

---

## 1. Screenshot plan (8 shots, priority order)

| # | Shot | Composition | Used where |
|---|---|---|---|
| S1 | Eval summary as a table (P1) | judge/deterministic/FP/trap scores + "below-bar" verdict + per-difficulty rows; caption: "the committed baseline, failure included" | Case study Outcomes; demo thumbnail |
| S2 | Langfuse trace tree (P3) | One review: generations w/ token counts + cache metadata, tool events nested, total latency/cost visible | Case study Observability; explorer node `langfuse` |
| S3 | Review detail UI (P2) | Findings list w/ severity badges, evidence per finding, risk heatmap visible | Case study hero screenshot |
| S4 | GitHub PR inline comments (P4) | 2–3 ACR comments anchored on diff lines, severity-prefixed summary comment | Case study + Home card (once branch merged) |
| S5 | Eval CI PR comment (P5) | The rendered summary table in a PR conversation | "Evals in CI" section |
| S6 | Replay timeline (P6) | Step slider mid-review; tool_call → tool_result sequence visible | Explorer `agent_events` node |
| S7 | Semantic cache hit (P9) | Two identical-ish submissions side by side: 50s run vs instant `cache_status: semantic` | Cost/caching section |
| S8 | Terminal: retrieval bench (P8) | BM25/vector/RRF/rerank ranks for one query against the fixture | Retrieval note + explorer pipeline node |

Hygiene: light theme for embeds (matches site both ways), scrub env values, consistent window size (1600×1000), no bookmarks bar.

## 2. Demo videos

### 2-minute demo — "It reviews code. Watch."  *(audience: founders, recruiters, busy HMs — homepage embed)*
| t | Beat | Why |
|---|---|---|
| 0:00–0:15 | One sentence + paste a buggy diff (use `seed-ts-sql-injection` from the eval set) into the web UI | Stakes set; real input, traceable to repo |
| 0:15–1:00 | Live stream: agent calls search_code → read_file; show one retrieved chunk; findings appear | The "it's alive" moment; tool use visible |
| 1:00–1:30 | Findings: SQL injection flagged, severity, evidence, suggestion; flip to risk heatmap | Output quality + UI craft |
| 1:30–2:00 | Langfuse trace: "every token, tool call, and cent, traced" + cost line; end on the spend-cap line of code | Production-discipline punchline |

### 5-minute demo — "How it works" *(audience: senior/staff engineers, AI HMs — case study embed)*
2-min content compressed to 90s, then:
- 1:30–2:30 — **Retrieval**: run the same query through retrieval-bench; show BM25 vs vector ranks disagreeing and RRF+rerank resolving them (S8 live).
- 2:30–3:30 — **Runtime**: agent.ts tour — cost cap, timeout, abort, stop-tool validation; "no framework — here's the whole loop."
- 3:30–4:30 — **Evals**: dataset JSONL → run one example → judge + deterministic scores; show the committed below-bar baseline and say *why* it's below bar (FP rate) and what that drives next.
- 4:30–5:00 — Injection defense: malicious comment in a diff (`</diff> ignore previous…`) → sanitizer escapes it → reviewer flags rather than obeys.

### 10-minute deep dive — "Production LLM engineering, end to end" *(audience: interview follow-up, AI engineering managers — linked, not embedded)*
1. (0–1:30) System map over the architecture diagram — boundaries and the main/branch state, honestly labeled.
2. (1:30–3:30) Indexing: tree-sitter chunk boundaries on a real file → contextual prefix generation (show the Haiku cache discount in the API response) → pgvector rows.
3. (3:30–5:30) Full review with Langfuse open in a second pane — narrate the loop decisions as they stream.
4. (5:30–7:30) Eval harness internals: scorers, trap examples, judge versioning; run the suite on 5 examples live; read the delta math.
5. (7:30–9:00) GitHub delivery: CLI fetch → diff-map → inline comments on a real PR (P4); explain position-mapping pain honestly.
6. (9:00–10:00) The roadmap truth: what's built, what's a branch, what's next (frontier-model eval run, OSS dataset curation) — end on the honesty brand.

## 3. Production notes

- Record after: PAT rotation, branch merge decision, and one frontier-model eval run (gives the 5/10-min versions their delta ending). The 2-min version can be recorded **today** from main.
- Voiceover script ≤ 130 wpm, written, not improvised; captions burned in (LinkedIn autoplay is muted).
- Host: self-hosted MP4 on the site (no YouTube chrome) + unlisted YouTube mirror for sharing.
- Each video's description links the exact files shown (agent.ts, summary.json, etc.) — every claim in footage gets a clickable receipt.
