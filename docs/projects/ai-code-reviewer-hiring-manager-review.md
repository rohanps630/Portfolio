# AI Code Reviewer — Hiring-Manager Simulation (Portfolio + Repo)

Four evaluators, each reviewing (1) the planned portfolio presentation and (2) the actual repository. Grounded in the audit — no hypothetical capabilities.

---

## Senior Engineer

**Impressed:** the retrieval pipeline reads like a textbook done right — each stage its own file with an explicit failure model (`rerank.ts` retry/backoff, injectable fetch); 426 tests; the tool framework's DI making everything stubbable. **Concerned:** main vs `feat/github-ci-review` drift — "which of this is real?" takes a `git branch -a` to answer; the incomplete second eval run looks like an aborted experiment left in the repo. **Questions:** "Why hand-roll BM25 on Postgres FTS instead of using an existing search lib?" "What broke when you swapped providers?" **Strongest proof:** the code itself — it survives reading. **Weakest proof:** no deployed instance to poke.

## Staff Engineer

**Impressed:** the runtime/specialization split (ADR-005) — recognizing that `runReview` should be a *configuration* of a general runtime is the kind of abstraction judgment they interview for; cost cap inside the loop rather than at the billing dashboard; evals driving the real agent via the bridge instead of a parallel mock. The **committed below-bar baseline** earns more trust than any green number could. **Concerned:** dataset realism — 30 synthetic seeds measure "can it find planted bugs," not "can it review code"; the FP rate (67%) suggests the synthetic framing may be teaching the judge to reward noise; current portfolio copy ("50+ OSS PRs", "$0.20/review", "Modal") would have been **disqualifying** if shipped — they grep for exactly this. **Questions:** "Trap examples: what's the design? Zero trap rate looks untested, not perfect." "When RRF and rerank disagree, who wins and how do you know?" "Why is judge_score 0.635 while deterministic is 0.2 — what's the judge over-crediting?" **Strongest proof:** eval harness internals + the honest summary. **Weakest:** no frontier-model run — the system has never been measured doing its job with the model it was designed for.

## Principal Engineer

**Impressed:** boundary discipline as a *system property* — every SaaS dependency behind a hand-written client; contracts/ and protected-file conventions in a solo repo (discipline with no audience is the real signal); prompt versioning with a contract doc. **Concerned:** is the generality premature? Five providers and a reusable runtime for a product with zero users is architecture-as-recreation — defensible *only* because the stated goal is learning production patterns, so the framing must say that; event-sourced replay is lovely but poll-based queueing and single-node assumptions cap the "production" claim at "production-shaped." **Questions:** "What would you delete?" "Where does this design break at 1000 reviews/day?" "Which abstraction cost you the most?" **Strongest proof:** ADR trail showing the runtime rebuild decision and its rationale. **Weakest:** no operational history — nothing has ever been on fire.

## AI Engineering Manager

**Impressed:** this candidate speaks the 2026 production-LLM dialect natively — contextual retrieval with cache-aware cost math (`contextual.py`'s ~85% saving analysis), tier routing with a pricing table, semantic caching with TTL and model scoping, injection defense with tests, Langfuse generations carrying cache metadata. The eval CI posting PR comments is something half of *funded AI teams* don't have. **Concerned:** judge methodology (judge model = same family as agent in the baseline run — `qwen3.5` judging `qwen3.5` — self-grading risk); no human-labeled subset to calibrate the judge; "below-bar" verdict with no committed follow-up run yet reads as a cliffhanger. **Questions:** "How do you know your judge is right? What's its agreement with you on 20 hand-checked examples?" "What did the FP analysis change in the prompt/retrieval?" "Show me the trace of your weirdest run." **Strongest proof:** Langfuse trace + eval summary side by side. **Weakest:** cost story — caps exist, measurements don't.

---

## Cross-cutting synthesis

| | Strongest proof | Weakest proof |
|---|---|---|
| Consensus | **The eval harness + committed honest baseline** (all four cite it) and the runtime code quality | **No frontier-model eval run** and **no deployed/demoable instance**; branch drift second |

**Unanimous verdicts:** (1) The repo is dramatically stronger than the current portfolio copy implies — and the copy's three false specifics (OSS PRs, Modal, $0.20) are the only things that could make this strong repo *hurt* the candidate. (2) One frontier-model eval run + one recorded live review would convert every "concerned" row above into interview questions rather than rejections — which is exactly where you want skepticism to live.
