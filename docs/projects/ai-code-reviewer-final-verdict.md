# AI Code Reviewer — Final Verdict

Evidence over optimism. Reality over aspiration. All answers grounded in the audit (`ai-code-reviewer-audit.md`) and capability matrix.

---

**1. What is actually built today?**
A working agent system, not a scaffold: a 778-line model-agnostic agent runtime (streaming ReAct loop, cost cap, timeouts, cancellation, stop-tool validation, hooks) with five providers; full hybrid retrieval (tree-sitter AST chunking → contextual prefixes → voyage-code-3/pgvector + BM25 → RRF → Cohere rerank); a complete eval harness (versioned 30-example dataset, versioned LLM judge + deterministic scorers, CI integration) **with a committed, honest baseline result**; two-layer caching (Redis exact + pgvector semantic); prompt-injection defense with tests; E2B-sandboxed execution; Langfuse tracing via hooks; event-sourced replay; a web UI with live streaming; 426 tests in CI; 6 ADRs.

**2. What is partially built?**
GitHub-native delivery (PR fetch, diff-position mapping, inline review submission), the async worker, and the local CLI — all complete and tested **but on an unmerged feature branch**. Prompt-caching savings and per-review cost: mechanisms implemented, **measurements absent**. Eval evidence: one complete run (local model, below-bar), one aborted run, **zero frontier-model runs**.

**3. What is planned but not built?**
Modal-hosted indexing · OSS-PR golden dataset · `get_pr_discussion` tool · injection-attempt logging · hosted public demo · languages beyond Python/TS/JS · fine-tuning (explicitly archived).

**4. What should appear on the portfolio?**
Everything in the public-disclosure ✅ list — led by the three artifacts competitors won't have: the **published below-bar baseline**, the **runtime-as-curriculum decision record**, and the **Langfuse trace of a real run**. The system's honesty arc (synthetic baseline → measured improvement) should be the narrative spine of the case study and the building-in-public notes.

**5. What should not appear?**
The five current falsehoods: "50+ OSS PRs," "Modal," "<$0.20/review," "get_pr_discussion," "injection attempts logged." Also the "Phase 1 of 6" status — which *undersells* by four phases. The portfolio currently manages to be wrong in both directions at once; both directions get fixed by the replacement content doc.

**6. What would a Staff Engineer challenge immediately?**
(a) "Your dataset is planted bugs — this measures detection, not review." (b) "Judge and agent were the same model family in the baseline — self-grading." (c) "67% false positives means engineers mute the bot — what changed because of that number?" (d) "Half your delivery story is on an unmerged branch." All four have honest answers; none has a *finished* answer. That's interview material, not a flaw to hide.

**7. What would increase credibility most?**
In order, by cost-benefit: **(1) one frontier-model eval run committed next to the baseline** (~hours + ~$10 — turns a static number into a delta story and unlocks honest cost claims); (2) merge the GitHub branch and capture one real PR with inline ACR comments; (3) the 2-minute live-run video; (4) one Langfuse trace screenshot; (5) judge-calibration note (hand-check 20 examples, publish agreement rate).

**8. What is the strongest proof artifact?**
`evals/results/ollama-baseline/summary.json` — a committed, versioned, *failing* benchmark with per-difficulty breakdown and a self-assigned "below-bar" verdict. It proves the harness exists, the methodology is real, and the author measures instead of markets. Nothing else in the repo — and almost nothing in any portfolio — does that much work in one file.

**9. What is the weakest area?**
Measurement of the actual product claim. The system is built to review code well and cheaply — and there is no committed evidence of it reviewing code well (no frontier run, no real PRs, high FP baseline) or cheaply (no cost data). The engineering around the claim is excellent; the claim itself is still unmeasured. Second: main/branch drift; third: no deployment.

**10. Is the project portfolio-ready today?**
**Yes, conditionally — readier than its own portfolio copy.** The repo can carry the flagship role *today* if the case study tells the truth: core build complete, GitHub delivery merging, evals honest and ugly, measurement in progress. It is **not** ready to support the currently-published claims — those must be replaced with the evidence-backed content doc before anything else ships. Conditions: rotate the leaked PAT (before any publicity), fix the five falsehoods, decide the branch merge. With those done, this is a genuinely top-decile portfolio project — not because everything works, but because everything is *accounted for*.
