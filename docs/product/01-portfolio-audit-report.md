# Portfolio Audit Report

**Date:** 2026-06-11 · **Author:** Principal Engineering Review · **Scope:** Full repository + resume (`public/resume/rohan-suresh-resume.pdf`, `RoHaN-Resume-Final_RAW.docx`)

This is the evidence base for every downstream document. Findings are graded: 🔴 critical (blocks the flagship goal), 🟡 significant (weakens it), 🟢 sound (keep).

---

## 1. Executive Summary

The current site is a **well-built, conventional portfolio**. Engineering hygiene is genuinely good: typed local content layer, server-component data flow, per-page metadata, JSON-LD, reduced-motion support, self-hosted fonts. The problem is not craft — it is that **the site's strongest claim ("AI integration engineer") is under-evidenced and its strongest evidence (from the resume) is missing entirely**.

The three findings that matter most:

1. 🔴 **The resume's two flagship systems have no case studies.** The Enterprise Multi-Agent Customer Operations Platform (6 agents, AWS Bedrock, MCP, RAG, digital-twin telemetry) and the Enterprise Telecom POS Platform (RN Web across hundreds of terminals, tenant-aware pipelines) are the most senior, most differentiated work Rohan has — and neither exists in `src/content/projects/`. The site instead leads with smaller freelance-style projects.
2. 🔴 **The site shows outcomes, never thinking.** The `Project` type (`src/types/project.ts`) is marketing-shaped: challenge → approach → features → impact. There is no field for architecture, tradeoffs, decisions, constraints, or lessons learned. A hiring manager evaluating for senior/staff AI work cannot see *how Rohan reasons* anywhere on the site — which is exactly what they're hiring for.
3. 🟡 **Positioning is diluted.** Tagline "Web, mobile, and AI — built to ship" reads as generalist. The tech stack bar lists "ChatGPT" and "LangChain" as skills — while the AI Code Reviewer copy explicitly brags "no LangChain glue." The site argues against itself.

---

## 2. Product Audit

### Value proposition & messaging
- 🟡 Current proposition: "full-stack engineer who also does AI." The resume tells a sharper story: *production AI/LLM systems built with full-stack discipline* — evals, guardrails, cost engineering, observability. The site never says this.
- 🔴 No proof hierarchy. The homepage gives equal visual weight to a 2022 learning portal and the AI Code Reviewer. Featured projects = `featured: true` flag with no narrative ordering logic beyond `sortOrder`.
- 🟡 Stats block (`content.json`): "4.75 Years Building" — the decimal reads as insecurity; the resume itself says 5. "7+ Products Shipped / 4+ AI Integrations" are weak vanity metrics with no evidence trail.
- 🟢 The AI Code Reviewer case study copy is excellent — specific, honest about phase status ("Phase 1 of 6"), names real techniques (RRF, tree-sitter chunking, LLM-as-judge, cost caps). This is the quality bar the rest of the site must meet.

### Narrative & user journeys
- 🟡 Recruiter journey: Home → Projects → (maybe) one case study → Contact. There is no path that demonstrates depth: no architecture views, no decision records, no "how I think" surface. The blog partially fills this but isn't wired into project pages.
- 🟡 No dedicated `/resume` experience — the PDF opens raw in a new tab. Recruiters live in the resume; this is a missed structured-data + conversion surface.
- 🟢 Contact flow is clean (react-hook-form + Zod + Resend + honeypot).

## 3. UX Audit

- 🟢 IA is shallow and predictable (5 top-level pages) — fine for the current site, insufficient for an "engineering lab."
- 🟡 Discoverability: no search, no cross-linking between blog posts and the projects they describe (e.g., `ai-code-reviewer-phase-1-foundations.mdx` and the `ai-code-reviewer` project are siblings that never reference each other).
- 🟡 Filtering uses URL search params (good, shareable) but categories (`web-app | mobile-app | full-stack | ai-ml`) describe *form factor*, not *what was hard about it* — the dimension a senior evaluator filters on.
- 🟡 Conversion: single generic CTA ("contact me") for two very different audiences (full-time hiring vs freelance). No persona-specific paths.

## 4. Design Audit

- 🟢 Token system in `globals.css` is clean Tailwind 4 `@theme` work: semantic color variables, dark/light via `data-theme`, self-hosted variable fonts (Satoshi/General Sans), focus-visible styling, reduced-motion handling.
- 🟡 Single indigo accent (#6366f1) is the most common "developer portfolio" color of this era. Not a blocker, but it signals template, not brand.
- 🟡 The decorative-interaction inventory (MagneticButton, TiltCard, CursorSpotlight, TextScramble, 3D hero orb) is motion-for-decoration — exactly what the Stripe/Linear tier avoids. None of it explains anything.
- 🟡 No data-display primitives exist (diagram, metric, code-annotation, comparison-table components) — the building blocks an engineering showcase actually needs.

## 5. Engineering Audit

- 🟢 Architecture is appropriate: App Router, server components fetch via `src/lib/*` helpers, clients receive props. Content-as-code with typed project modules is the right call and scales to the new vision.
- 🟢 Modern, lean dependency set (Next 16, React 19, Zod 4, Tailwind 4). No dead admin/database deps after the recent cleanup commit (`420dbf4`).
- 🟡 Stale artifacts: `data/portfolio.db` (+ shm/wal) still on disk from the removed dashboard era; `scripts/` is empty; `RoHaN-Resume-Final_RAW.docx` and `Portfolio-Case-Study.docx` are **committed to git** (source docs don't belong in a public repo — the docx contains a phone number and is trivially scraped); `tsconfig.tsbuildinfo` on disk.
- 🟡 `content.json` carries vestigial freelance fields (`testimonials: []`, `faqs: []`, `processSteps: []`) and a `pageSections` visibility system nothing meaningfully uses — schema debt from the dashboard era.
- 🟡 No content validation: project TS files are typed but `content.json` and MDX frontmatter are unvalidated at build time (Zod is already a dependency — unused for this).
- 🟡 No tests of any kind, no CI. Acceptable for a static site; not acceptable for a site whose thesis is "I build with production discipline."

## 6. Performance Audit (static analysis)

- 🟢 Correct instincts: 3D hero dynamically imported with `ssr: false`, desktop-only with CSS fallback; `font-display: swap`; static-first rendering.
- 🟡 Three.js + react-three-fiber + drei (~500KB+ of JS) to render one decorative orb is the single largest performance liability, and it loads on the most important page. INP/LCP risk concentrated exactly where first impressions form.
- 🟡 Lenis smooth-scroll hijacking is a known INP and accessibility tax; the premium-feel sites it imitates (Linear, Vercel) don't hijack scroll.
- 🟡 No bundle budget, no Lighthouse CI, no Core Web Vitals monitoring (no analytics at all — see §8).

## 7. SEO Audit

- 🟢 Strong foundation: `generateMetadata()` everywhere, JSON-LD via `src/lib/seo.ts`, sitemap/robots generated, OG image route (`api/og`), recent name-search ranking work (commits `165bd67`, `a56b021`).
- 🟡 SEO currently optimizes for *name searches*. The flagship goal adds a second target: ranking for technique content ("hybrid retrieval RRF", "MCP tool orchestration") via Engineering Notes — currently unexploited.

## 8. Content Audit

**Strengths**
- AI Code Reviewer project + its two blog posts form a genuine, verifiable depth spine (GitHub repo linked, phased roadmap, honest status).
- 12 blog posts exist with real frontmatter discipline (category taxonomy, published flag).

**Gaps & credibility risks**
- 🔴 Missing the two strongest systems (multi-agent platform, telecom POS) — see §1.
- 🔴 **Evidence inconsistencies that a sharp evaluator will catch:** site stats say 4.75 years vs resume's 5; tech bar lists LangChain/ChatGPT vs project copy disavowing frameworks; the AI Code Reviewer project file says Phase 1 in-progress while impact metrics could be misread as achieved ("<$0.20 per review" appears in feature copy but "<$0.50" as a *target* in impact — pick one framing).
- 🟡 Several projects read as low-stakes filler relative to the positioning (learning portal 2022, transit claims) and dilute the lab narrative. Generic blog posts ("Why Next.js is my go-to") actively *lower* the perceived seniority next to the retrieval-engineering posts.
- 🟡 Zero visual evidence: `screenshots: []` on the flagship project, no diagrams anywhere on the site.
- 🟡 No testimonials, no GitHub activity surface, no talk/OSS/community proof.

## 9. Audit Conclusions → Mandates

| # | Mandate | Driven by |
|---|---------|-----------|
| M1 | Add the two enterprise flagship case studies; re-tier all projects | §1, §8 |
| M2 | Replace the marketing-shaped project model with an engineering case-study model (decisions, tradeoffs, architecture, evidence) | §1, Phase 8 doc |
| M3 | Build an Architecture Explorer as the flagship differentiator | Phase 9 doc |
| M4 | Reposition copy around "production AI systems, full-stack discipline" | Positioning doc |
| M5 | Replace decorative motion with explanatory motion; remove/demote Three.js | Motion doc, §6 |
| M6 | Add `/resume`, search, and cross-content linking | IA doc |
| M7 | Repo hygiene: remove docx from git, delete db artifacts, validate content with Zod, add CI + Lighthouse budget | §5, §6 |
| M8 | Resolve every factual inconsistency between site and resume | §8 |

All subsequent documents in `/docs` trace back to these mandates.
