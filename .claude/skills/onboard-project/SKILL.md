---
name: onboard-project
description: Onboard an existing local repository into the portfolio as a System case study — investigate the repo to source every fact, classify ownership/confidentiality with the user, then author through the add-system honesty rails, register, validate, and verify in the browser. Use whenever the user points at a local project path or codebase and wants it on the site — "onboard this project", "add ~/Work/foo to the portfolio", "import my app as a case study", "add this repo to the projects list / archive" — even if they never say "case study". If the user supplies facts verbally with no repo to inspect, use add-system directly instead.
---

# onboard-project — repo-to-case-study onboarding

## Purpose

`add-system` governs *what may be published* (provenance, claim ceilings,
confidentiality). This skill governs *where the facts come from*: a real local
codebase. Its job is to guarantee that every fact in the case study traces to
something actually observed in the repo or explicitly answered by the user —
never authored from memory, marketing instinct, or invention. Onboarding
without investigation is how fabricated metrics happen.

## Triggers

- A local path to a project + any request to add it to the portfolio
  ("onboard", "import", "add to my projects", "put it in the archive").
- Re-onboarding: the source repo changed materially and the case study should
  be refreshed from it.

## Inputs

- The repo path (verify it exists before anything else).
- The user's request wording — it often carries the intended `status`
  ("keep it in the archive" → `archived`).
- `.claude/skills/add-system/SKILL.md` — the authoring rails (this skill wraps
  it; do not restate or relax its rules).
- Schema: `src/lib/schemas/system.ts` · registration: `src/lib/systems.ts`.

## Workflow

1. **Investigate the repo (fact ledger).** Read, in the source repo:
   `README*`, `CLAUDE.md`/`AGENTS.md`, the manifest (`package.json`,
   `pyproject.toml`, …), the source tree two levels deep, and
   `git log --date=short` (first/last commit, count). Build a short ledger of
   observed facts — stack, platforms, architecture patterns, domain, dates.
   This ledger is the only permitted fact source besides the user's answers.

2. **Classify with the user (AskUserQuestion — do not infer).** Two forks
   change everything downstream and are not derivable from the repo (the
   directory location and code can mislead about ownership):
   - **Ownership** → `context`: client project → `"client"` + disclosure
     ceiling · own product → `"independent"` · employer-owned →
     `"production"` + strictest rail (draft only, resume ceiling, sign-off).
   - **Naming** → real product name vs anonymized pattern-level description.

3. **Derive the honest shape.** These are computed from evidence, not chosen
   for flattery:
   - `status.kind` from the user's request; `archived` is a normal,
     respectable state — never dress it up as `production`.
   - Tier by evidence: no public evidence links **and** no real screenshots →
     tier 3. Never create placeholder images to buy a higher tier.
   - Outcomes: if the repo contains no measurements (it almost never does),
     every outcome is `provenance: "scope-fact"` (platforms, data-layer
     pattern, migration baseline). Numbers like user counts, latency, or
     business impact are **not sourceable from code** — omit them or get them
     from the owner; never invent and never label repo-derived facts
     `measured`.
   - Timeline: a squashed git history proves only the squash date, not the
     project's real start — use the narrowest date the evidence supports.

4. **Anonymization sweep (when client/employer or "anonymize" chosen).**
   Strip: product name, domains and environment URLs, internal endpoints,
   backend implementation details not publicly visible, exact table/schema
   topology. Describe at pattern level; title becomes generic
   ("<domain> <pattern> app", e.g. "Insurance Claims Field-Reporting App").
   State what's withheld in the `confidentiality` field so the omission reads
   as discipline, not thinness.

5. **Author through add-system.** Follow its workflow steps 5–7: copy a
   tier-mate's shape, every decision gets a real alternative + `whyNot` +
   `cost` (sourced from trade-offs actually visible in the repo — an ORM
   choice, a migration, a replaced dependency), `executiveSummary` ≤ 800
   chars, lessons include a genuine cost or mistake.

6. **Register.** Import + append in `src/lib/systems.ts`. `sortOrder` follows
   evidence strength: a no-evidence archived entry goes **last**. `featured`
   is almost certainly `false` for onboarded/archived work.

7. **Validate.** `bun run validate-content` (a new missing-cover warning for
   this system is expected, correct output) and `bunx tsc --noEmit`.

8. **Verify live.** Start the preview server; confirm `/projects` shows the
   card in the right section (Archive for archived) and
   `/projects/<slug>` renders the status badge, confidentiality note, and
   provenance chips. Screenshot as proof.

9. **Engram close-out.** If a disclosure ceiling or rejected framing emerged
   (it usually does for client/employer work), propose an entry — batched,
   written only on the user's confirm.

## Sourcing rules

| Repo artifact | May substantiate |
|---|---|
| Manifest (`package.json`, …) | Tech stack, versions, platform targets, scripts |
| `README`/`CLAUDE.md`/`AGENTS.md` | Domain, features, architecture — cross-check against the source tree |
| Source tree | Architecture patterns (repository layer, offline store, custom UI lib) |
| Git history | Timeline bounds, migration events |
| **Nothing in a repo** | User counts, latency, uptime, revenue, "% improvement" — owner-supplied or absent |

## Outputs

- A schema-valid `src/content/systems/<slug>.ts` + registration diff.
- A stated source (ledger item or user answer) for every fact.
- Browser-verified rendering with screenshot.
- Proposed Engram entry at the task boundary.

## Failure handling

- Repo path missing/unreadable → stop and ask; do not author from the name.
- Employer-owned → draft only + explicit pending-sign-off list (add-system
  step 4); never publish in the same turn.
- User requests a metric the repo can't support → refuse the wording, offer
  the strongest scope-fact alternative, name what evidence would unlock it.

## Success criteria

- A skeptical reader could trace each claim to the repo or a recorded user
  decision in under a minute.
- Gates pass: validate-content ✅, typecheck exit 0, page renders live.
- Nothing confidential from the source repo (URLs, schema topology, product
  identifiers when anonymized) appears anywhere in the published copy.

## Integration

- Wraps `add-system` (which ends by invoking `preflight` before commit).
- Pairs with `add-note` if the onboarded system deserves a companion
  technique note (`relatedSystem` → this slug).
