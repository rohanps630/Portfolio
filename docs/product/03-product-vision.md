# Product Vision

The portfolio is redesigned as a **product**, not a brochure. Working title for the experience concept: **"The Lab"** — an interactive engineering showcase where visitors don't read *about* the work, they *walk through* it.

---

## 1. Mission

Make Rohan's engineering judgment **directly observable**. A resume asserts capability; this product demonstrates it — by letting hiring managers explore real system architectures, follow real data flows, and read real tradeoff decisions, in a site that is itself evidence (fast, accessible, observable, disciplined).

**The site is exhibit zero.** Every quality claim the content makes must be true of the site itself: if the copy says "cost discipline," the site ships a minimal bundle; if it says "observability," the site publishes its own Web Vitals; if it says "evals," the repo has CI gates. This recursive honesty is the product's soul.

## 2. Goals (measurable)

| Goal | Metric | Target |
|---|---|---|
| G1: Convert P1 evaluators to contact/interview | Contact submissions + recruiter emails citing the site | Qualitative now; instrumented after analytics phase |
| G2: Depth engagement | % of project-page visitors who open Architecture Explorer or a decision record | ≥ 30% |
| G3: Peer amplification | Engineering Notes referral traffic / shares | Growing month-over-month post-launch |
| G4: Credibility floor | Lighthouse ≥ 95 all categories; zero factual inconsistencies; WCAG 2.2 AA | Hard gate |
| G5: Recruiter efficiency | Time from landing → resume access | 1 click, < 5 s |

## 3. Personas & journeys

Defined in `02-positioning-strategy.md` §4 (P1 hiring manager, P2 recruiter, P3 client, P4 peer). Core journeys:

**J1 — The Skeptical Hiring Manager (the journey we optimize hardest):**
Lands on Home (often from resume link) → hero states the thesis in 5 seconds → scrolls into "Systems" section → opens AI Code Reviewer case study → expands the Architecture Explorer, steps through the "PR review request" data flow, inspects the retrieval pipeline node, reads the "Why no LangChain" decision record → checks the GitHub repo link → reads one Engineering Note → contacts. **Emotional arc: skepticism → curiosity → respect → intent.**

**J2 — The 90-Second Recruiter:** Home → `/resume` (one nav click) → scans structured resume → downloads PDF → contacts or shortlists. Nothing may interrupt this path; no animation may delay it.

**J3 — The Prospective Client:** Home → Work (filters to "Client products") → Dental HMS / Roofing CRM case studies (business-outcome framing) → Contact with engagement-type selector.

**J4 — The Peer Engineer:** Search/social → an Engineering Note → inline links to the related system in the Explorer → GitHub / follows. This journey feeds J1 over time (referrals).

## 4. Core experiences (ranked)

1. **Architecture Explorer** — the flagship. Interactive system diagrams with steppable data flows and inspectable components, each node linked to decisions and tradeoffs. (Full spec: `docs/architecture/03-architecture-explorer-spec.md`.)
2. **Case Study v2** — every system presented through the engineering framework (context → constraints → architecture → decisions → outcomes → lessons). (Spec: `docs/architecture/02-project-showcase-framework.md`.)
3. **Engineering Notes** — the rebranded blog: technique-depth posts cross-linked to systems. The "building in public" spine of the AI Code Reviewer gives it a serialized narrative.
4. **Resume surface** — `/resume` structured page + PDF, the recruiter superhighway.
5. **The Lab index (Home)** — a control-room-feel landing that routes all four personas in one screen.

Explicitly **not** core: gimmick interactivity (terminal easter eggs, 3D scenes, cursor effects). Cut unless they explain something.

## 5. Emotional outcomes

- P1 leaves thinking: *"I learned something from his site."* (The strongest possible hiring signal.)
- P2 leaves thinking: *"Easiest candidate page I've processed this week."*
- P3 leaves thinking: *"This person could own my whole product."*
- P4 leaves thinking: *"Bookmarking this."*

## 6. Why visitors will remember this site

Not the visuals — the **inversion**: every other portfolio says "trust me, I'm senior." This one says "here's the architecture — inspect it yourself." Memorability comes from (a) the Explorer being genuinely useful as a learning artifact, (b) the unusual honesty (phase status, cost tables, failure notes), and (c) the recursion of the site practicing what it preaches. People remember the portfolio that taught them how RRF retrieval fusion works.

## 7. Non-goals & guardrails

- No CMS, no database, no auth — content-as-code stays (it *is* part of the demonstration).
- No fabricated metrics, logos, or testimonials; employer work is described within confidentiality limits.
- No redesign-for-redesign: the existing token system, typography, and component base evolve; they are not discarded.
- Scope honesty: this is one engineer's evening project — the roadmap (docs/roadmap) is phased so that **every phase ships a complete, better site**, never a half-built lab.
