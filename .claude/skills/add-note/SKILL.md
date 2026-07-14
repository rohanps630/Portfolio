---
name: add-note
description: Author or edit an MDX note (src/content/notes/*) through the note schema, series/cross-link wiring, and the editorial definition of done. Use for "write a note/post about X", "publish the draft", "add it to the series", "link the note to a system".
---

# add-note — Note authoring pipeline

## Purpose

Notes are the site's technique-search surface and connective tissue: each one
serves a search query, cross-links to a system or explorer node, and passes an
editorial bar. This skill produces schema-valid, correctly wired, deliberately
published (or deliberately unpublished) notes.

## Triggers

- New note requested; edits to any `src/content/notes/*.mdx`.
- Frontmatter changes: publishing/unpublishing, series membership, category,
  `relatedSystem`.
- "The note doesn't show up" (usually `published` or frontmatter validity).

## Inputs

- Topic/draft from the user.
- Schema: `src/lib/schemas/note.ts` (authoritative field list — read it first).
- Editorial rules: `docs/content/01-content-strategy.md` (voice §, pipeline §4,
  ledger §7, definition of done §8).
- Existing notes as house-style references (e.g. `building-ai-code-reviewer.mdx`).

## Workflow

1. **Engram + ledger.** Read `.engram/INDEX.md`; the identity-consistency entry
   binds all copy ("5 years"; LangChain/ChatGPT never as skills — LangChain only
   inside rejected-alternatives prose).
2. **Frontmatter against `noteSchema`.** File name = slug (kebab-case). Category
   must be one of: `architecture`, `react`, `mobile`, `ai`, `devops`, `career`,
   `accessibility`. Date is ISO. `published: false` until the user says publish
   — notes fail closed (unpublished never renders, feeds, or indexes).
3. **Wiring.** `relatedSystem` must be an existing system slug (validator
   enforces). Series: consistent `series` string + `seriesOrder`; series titles
   render via `formatSeriesTitle()` (acronyms handled — check the output).
   Cross-link inside the body with the MDX components `DecisionLink` /
   `ExplorerLink`, not raw anchors.
4. **Write to the editorial DoD** (§8): voice rules pass · ledger-clean against
   the resume · provenance labels on any metric mentioned · confidentiality
   protocol on any employer mention · **one technique query served** (name the
   query; the title/headings should answer it) · read-aloud test.
5. **Honesty carry-over.** ACR facts in notes obey the same claim ceiling as
   system copy (`docs/projects/*`). No invented benchmarks or anecdotes.
6. **Media.** `coverImage` may point at a not-yet-existing path (validator
   warns); never create a placeholder file.
7. **Validate & index.** `bun run validate-content`, then `bun run build` — the
   Pagefind index only updates on build; search regressions surface here. Then
   `preflight`.

## Decision tree

```
Note request
├─ New topic → does it serve one technique query? ──no──► push back (notes pipeline CS §4)
├─ Publishing? → user explicitly approved? ──no──► keep published: false
├─ Mentions employer work? → pattern-level only + confidentiality note
├─ Part of a series? → series + seriesOrder on every member; check /notes/series/[series] renders
└─ Slug change on a published note? → 301 redirect + check-links
```

## Outputs

- A schema-valid `.mdx` file with deliberate `published` state.
- Working cross-links (system ↔ note ↔ explorer where relevant).
- The named technique query it serves (state it in your summary).

## Constraints & edge cases

- Never unpublish or rename a published note without a redirect plan — published
  URLs are load-bearing (`/blog/:slug` 301s already map old URLs).
- Draft titles/excerpts must not leak into 404 metadata or the search index
  (both fixed in the 2026-07 audit — don't regress).
- Reading time is computed; don't hand-write it.
- Code blocks get language tags (rehype-pretty-code/shiki).

## Failure handling

- Note invisible → check `published`, then frontmatter parse, then category enum.
- Validator "unknown relatedSystem" → fix the slug reference; never remove the check.
- Search doesn't find the new note → rebuild (`bun run build`); the index is
  generated postbuild, gitignored, and never hand-edited.

## Success criteria

- Gates 1–4 pass; note renders in both themes; appears in `/notes`, its
  category filter, its series nav, RSS, sitemap, and search (when published).
- Editorial DoD checklist affirmed line by line.

## Integration

- Ends by invoking `preflight`.
- Pairs with `add-system` via `relatedSystem`.
- Series work may touch `SeriesNav`/`RelatedNotes` components — that becomes a
  component change (AGENTS.md §4.2 checklist applies).
