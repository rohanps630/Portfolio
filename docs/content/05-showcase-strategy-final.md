# Final Showcase Strategy — Personal vs Employer Systems

The opinionated synthesis (Task 7). One question: *how should the Engineering Lab showcase personal projects and employer-owned systems to maximize credibility under confidentiality, without information overload?*

---

## 1. The strategy in one paragraph

**Bank credibility on the verifiable system; spend it on the abstracted ones.** The AI Code Reviewer is the only system where every claim can be probed to source code — so it becomes the lab's center of gravity: full explorer, code-linked nodes, measured metrics, screenshots, eval results. The two enterprise systems then ride on that earned trust as *judgment showcases*: short, decision-centric case studies with conceptual pattern diagrams that teach rather than reveal, explicitly framed confidentiality, and an "ask me for depth" channel. Depth is rationed deliberately — the lab feels like an instrument panel you explore, not a wiki you endure.

## 2. The five operating principles

1. **Verifiability ordering.** Evidence-strength order everywhere (homepage, work index, explorer effort): ACR → Multi-Agent → POS. The first probed claim sets the trust prior for all subsequent claims.
2. **Asymmetric depth is honest design, not imbalance.** Personal system: 2,000 words + full explorer. Employer systems: ~1,100 words + pattern view. Equal-length treatment would force padding on one side or truncation on the other; evaluators read asymmetry correctly when the framing note explains it.
3. **Confidentiality is performed, not apologized for.** Visible framing notes, `illustrative` tags, the banned-C3 diagram rule, "happy to go deeper in conversation" — handled confidentiality is itself a senior-engineer signal. Hidden confidentiality (vague hand-waving) reads as fabrication.
4. **Judgment is the employer-system product.** Where we can't show artifacts, we show decisions-with-costs, constraints, and lessons. A decision record discloses nothing proprietary and demonstrates exactly what a staff-level interview tests.
5. **Pull, don't push.** All L3 depth (inspectors, expanded decisions, notes) is behind a deliberate user action. Mandatory scroll-reading is capped (~1,300 words outside flagship/notes). The site's restraint *is* the anti-overwhelm strategy — and restraint is on-brand.

## 3. Where I challenge the earlier blueprint (and this prompt)

1. **Three equal explorers was wrong.** The original Phase 3 plan (P3-T10) treated all Tier-1 systems as explorer-equal. Revised: ACR full mode · Multi-Agent conceptual mode (1 layer) · **POS gets static diagrams only in v1**. The POS explorer is deferred until analytics demonstrate appetite — explorer-authoring effort concentrates where topic heat (agentic systems) and disclosure freedom (ACR) are highest.
2. **The container layer is the confidentiality boundary, not node renaming.** The intuitive approach — redraw the real system with generic labels — is the one genuinely dangerous move (topology is IP even when anonymized). Banned as diagram class C3. Conceptual mode omits the container layer entirely; that structural omission is what makes everything else safely publishable.
3. **"Maximize credibility" has a non-obvious corollary: lead with the smaller system.** The enterprise platform sounds more impressive, but homepage position #1 goes to ACR because impressiveness without inspectability is a liability at the top of the page and an asset below it.
4. **Don't pad employer studies toward flagship length** even though the showcase framework permits it — the 900–1,300-word ceiling in `03` overrides the generic template lengths. Vague bulk is the failure mode that converts NDA-respect into fabrication-suspicion.
5. **One renderer, a `disclosure` enum — no special employer-system UI.** Resist any temptation to build a separate "lite explorer"; the contrast between modes inside one consistent instrument is itself communicative, and the engineering cost stays near zero.

## 4. Blueprint amendment log (applied)

| Doc | Amendment |
|---|---|
| `tasks/phase-3-tasks.md` P3-T10 | POS explorer model removed from scope; Multi-Agent model authored in **conceptual mode**; new sub-scope: `disclosure` field + conceptual-mode affordances (banner, no-metrics inspector, illustrative tags) |
| `architecture/03-architecture-explorer-spec.md` | Gains `disclosure: "full" | "conceptual"` on ArchitectureModel; conceptual rules per `content/04` Part 1 (binding addendum via this log) |
| `architecture/02-project-showcase-framework.md` §3.3 | Superseded by the fuller protocol in `content/02` + employer profile in `content/03` |
| `content/01-content-strategy.md` §3 | Confidentiality protocol now delegates to `content/02` |
| Word budgets | `content/04` Part 2 depth ladder becomes the binding length spec, refining UX-spec section lengths |

## 5. Definition of success

A staff engineer who distrusts portfolios spends 10 minutes: probes ACR to source code and finds it real; reads one enterprise decision record and recognizes lived experience; notices the confidentiality framing and reads it as professionalism; leaves having learned one technique. They contact — or they remember. Either is a win; both are now plausible because nothing on the site asked to be taken on faith except what was explicitly, visibly framed as faith.
