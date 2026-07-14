---
name: add-system
description: Add or update a System case study (src/content/systems/*) with the project's honesty rails — provenance labels, claim ceilings, confidentiality protocol, schema validation, and registration. Use for "add a project/system/case study", "update a metric/claim/decision", "change the ACR copy".
---

# add-system — System case study authoring with honesty rails

## Purpose

Every system case study is governed by the trust architecture (AGENTS.md §3.1):
provenance-labeled metrics, mandatory decision costs, employer disclosure
ceilings, and (for the AI Code Reviewer) an audited claim ceiling. This skill
walks a case-study change through those rails so nothing unverifiable ships.

## Triggers

- New system/project/case study requested.
- Any edit to `src/content/systems/*.ts`: metrics, decisions, claims, copy,
  tier, status, evidence.
- Requests phrased as marketing ("make the ACR project sound more impressive")
  — this skill is *especially* for those.

## Inputs

- The user's description of the system or the change.
- For ACR: `docs/projects/ai-code-reviewer-*.md` (the only permitted fact source).
- For employer systems: the public resume (`src/content/resume.ts` + PDF) as the
  disclosure ceiling; `docs/content/02-confidentiality-audit.md` and
  `03-employer-case-study-format.md`.
- Schema: `src/lib/schemas/system.ts`. Tier/presentation rules:
  `docs/architecture/02-project-showcase-framework.md`.

## Workflow

1. **Engram first.** Read `.engram/INDEX.md`; state any entry covering systems
   content (claim ceilings, provenance discipline, employer disclosure) before
   editing. An edit matching a `Not:` → stop and confirm.
2. **Classify.** `context`: `independent` | `production` | `client`. Anything
   employer-owned → confidentiality protocol applies (step 4).
3. **Source every fact.** For each metric, capability, and outcome, identify its
   source *before writing it*:
   - ACR → must appear in the audit docs. Not there? The fact enters the audit
     docs first (owner action) — do not write it into site copy.
   - Employer → must not exceed the resume's specificity. Apply the
     three-question test from the confidentiality audit.
   - Every `MetricFact` gets `provenance`: `measured` (has a real measurement),
     `target` (aspiration — must read as one), `scope-fact` (contextual scale).
4. **Employer gate.** Employer content may be *drafted* but never *published*
   without human sign-off. Draft it, list what needs sign-off, and stop there.
   Never draw real topology with renamed nodes (banned diagram class C3).
5. **Author against the schema.** Copy the shape of an existing tier-mate
   (`ai-code-reviewer.ts` for tier 1, `roofing-crm.ts` for tier 2/3).
   Non-negotiables from `systemSchema`: `executiveSummary` ≤ 800 chars; every
   decision has ≥ 1 alternative with `whyNot` and a required `cost`; tier 1/2
   needs ≥ 1 evidence link or screenshot; `lessons` include a real cost or
   mistake.
6. **Register.** New system → import + add to the array in `src/lib/systems.ts`;
   set `sortOrder` (evidence-strength ordering: verifiable first) and `featured`
   deliberately.
7. **Media.** Reference image paths where real assets will live; **never create
   placeholder files**. Validator warnings for missing media are correct output.
8. **Validate.** `bun run validate-content`, then hand off to `preflight`.
9. **Engram close-out.** If a new claim ceiling, disclosure decision, or
   rejected framing emerged, propose an entry (batched, on confirm).

## Decision tree

```
Fact to publish?
├─ ACR fact → in docs/projects/*? ──no──► STOP: audit docs first
├─ Employer fact → within resume ceiling + 3-question test? ──no──► STOP: redraft at pattern level
├─ Metric → measured? → provenance:"measured" (needs a source)
│          aspiration? → provenance:"target" (copy must read as target)
│          scale/context? → provenance:"scope-fact"
└─ Capability → built vs planned per capability matrix; "building" status is loud, never hidden
```

## Outputs

- A schema-valid system file (+ registration) or a diff to an existing one.
- A stated source for every new/changed fact.
- For employer content: a draft + explicit "pending sign-off" handoff list.
- Proposed Engram entries at the task boundary.

## Constraints & edge cases

- Renaming a slug → 301 in `next.config.ts` + sitemap + `check-links` pass.
- Tier change → presentation sections change (framework §2); check the case-study
  template renders the right sections.
- A system with no evidence and no screenshots cannot be tier 1/2 — downgrade or
  get evidence.
- Architecture explorer references (`decisions[].nodeRefs`) must match node IDs
  in `src/content/architectures/*` — the validator enforces this; fix the model
  or the refs, never delete the check.

## Failure handling

- `validate-content` schema error → fix the content, never the schema (schema
  changes are a separate, user-approved task).
- Asked for a claim you cannot source → refuse the specific wording, offer the
  strongest *sourceable* alternative, and name what evidence would unlock the
  original.

## Success criteria

- Gates 1–4 pass; no new gate exemptions.
- Every metric renders a provenance chip; every decision shows a cost.
- A skeptical staff engineer could trace each claim to its source in under a
  minute (the project's own definition of success).

## Integration

- Ends by invoking `preflight`.
- Inside a Spec Kit feature, runs during `speckit-implement` for content tasks.
- Pairs with `add-note` when a system gains a companion technique note
  (`relatedSystem` frontmatter must point at this system's slug).
