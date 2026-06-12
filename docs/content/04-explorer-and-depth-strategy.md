# Explorer Dual-Mode, Content Depth & Showcase Prioritization

Covers Tasks 4–6. Amends the explorer spec and Phase 3 task list where noted (amendment log in `05-showcase-strategy-final.md` §4).

---

## Part 1 — Architecture Explorer: two modes, one renderer

The explorer gets a per-system `disclosure` field, not a forked experience:

```ts
ArchitectureModel.disclosure: "full" | "conceptual"
```

### Full mode — AI Code Reviewer (and future personal systems)
Everything the spec allows, plus the assets only ownership permits:
- Both layers at real fidelity (actual component names, actual tech), 2 flows, deep node inspectors with **measured** metrics where they exist (token costs, retrieval scores once Phase 2 evals land), and inspector links out to **the actual source file on GitHub** per node (`evidence: { repoPath }`) — the single highest-credibility interaction on the entire site: *click a node, see its code.*
- Screenshots/eval results live in the case study, not the canvas (the canvas stays a thinking surface, not a gallery).

### Conceptual mode — employer systems
- **One layer only** (the C1 pattern view). The container layer is where topology lives; omitting it *is* the confidentiality boundary, and a tab that says "Pattern view" honestly frames it.
- 1–2 pattern flows (per diagram plans in `03`); node inspectors carry pattern-level rationale/tradeoffs + `decisionRefs` + the `illustrative` tag where applicable; **no repo links, no metrics**.
- Persistent canvas banner (toolbar-level, not a modal): *"Conceptual reconstruction — pattern, not production topology."*
- Inspector depth is allowed to be *opinion-rich* even though it is *fact-poor*: tradeoff text like "registry indirection costs onboarding clarity — every new engineer asks 'where is this screen defined?'" discloses nothing and signals everything.

### Why one renderer, two modes (and not two experiences)
The UI consistency makes the *content* difference legible: evaluators see the same instrument applied at two disclosure levels and understand why — which itself communicates professional judgment. Engineering cost is one enum and a few conditional affordances.

## Part 2 — Content depth ladder (anti-wiki rules)

Four depth levels; every surface declares one. **The rule: each level answers one question and seduces toward the next — it never answers the next level's question early.**

| Level | Surface | Question answered | Budget | Interaction pattern |
|---|---|---|---|---|
| L0 | Homepage hero + cards | "Who is this and why care?" | thesis ≤ 20 words/card; 3 chips; status badge | scan → click. Zero prose paragraphs per card |
| L1 | Work index rows / TL;DR strips | "What is this system and what's impressive?" | ≤ 60 words visible per system | row → case study; thumb → explorer |
| L2 | Case study | "How does he think?" | personal: 1,800–2,200 words · employer: 900–1,300 · Tier-2: 600–900 | scroll narrative; decisions collapsed by default (headline + one-line decision visible; alternatives/cost on expand) |
| L3 | Explorer + decision records + notes | "Teach me the details" | inspector ≤ 80 words/field; flow captions ≤ 220 chars; notes 1,200–2,500 words | click/step/expand — **all L3 content is pull, never pushed onto the scroll path** |

Hard anti-overwhelm rules:
1. **Nothing scroll-loads more than ~1,300 words of mandatory reading on any page except the flagship case study and notes** (which are reading destinations by intent).
2. **Decision records render collapsed** — the case study scroll shows 4 headlines + decisions, not 4 × 180 words. Expansion is the engagement event we measure (`decision_expand`).
3. **Diagrams before paragraphs:** in every architecture section the visual leads and prose annotates, never the reverse.
4. **No tabs-within-accordions-within-tabs:** maximum one disclosure level per component; depth beyond that is a *navigation* (to explorer or note), keeping each surface flat.
5. **Word budgets are schema-adjacent:** validate-content warns when `executiveSummary`, inspector fields, or captions exceed budgets — editorial discipline enforced like type safety.

## Part 3 — System showcase prioritization

| System | Homepage | Case study | Explorer | Rationale |
|---|---|---|---|---|
| **AI Code Reviewer** | **Hero CTA + card #1** | Flagship (L2 max) | **Full mode**, 2 layers, 2 flows, code links | The only system with unrestricted evidence — it must carry the *verifiable* depth for the whole site. Lead with what can be proven |
| **Multi-Agent Ops Platform** | Card #2 | Employer profile | **Conceptual mode**, 1 layer, 2 flows | Highest market-heat topic + current role; the production-AI pillar. Second position because its evidence is testimonial, not inspectable |
| **Telecom POS** | Card #3 | Employer profile | **Static C1/C2 diagrams only in v1** — explorer model deferred | Proves scale + frontend leadership (different pillar), but its patterns are less differentiating in 2026 than agent architecture; explorer effort goes where curiosity is hottest. Promote to conceptual mode later only if `explorer_open` data argues for it |
| Dental Clinic HMS | — | Tier-2 (600–900 words) | static diagram optional | Best end-to-end ownership story (Go/React/Kotlin); business framing |
| AI Automation Hub | — | Tier-2 *if claims verify*, else Tier-3 | — | Audit flagged credibility risk; verification gate before any prominence |
| Roofing CRM | — | Tier-2 | — | Client-persona service |
| Accessible Chat / Learning Portal / Transit Claims | — | Tier-3 archive rows | — | History without dilution; Accessible Chat promotable on real a11y evidence |

**Ordering logic (explicit):** homepage order is *evidence-strength order, not impressiveness order*. The fully-verifiable system leads even though "enterprise multi-agent platform" sounds bigger — because the first claim a skeptical evaluator tests sets their trust prior for everything after it. ACR survives any depth of probing; that earned trust then makes the abstracted enterprise claims believable. Reversing the order would spend credibility before it's banked.
