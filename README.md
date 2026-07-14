# Portfolio — Rohan P. Suresh

Personal portfolio for a full-stack & AI integration engineer. All content is local — no database — so the site is fully self-contained and trivially deployable.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) + Framer Motion 12 |
| Content | Local TS project files + MDX notes (no DB) |
| Notes | MDX via next-mdx-remote/rsc, syntax highlighting with Shiki/rehype-pretty-code |
| Search | Pagefind (static index built post-build) |
| Forms | react-hook-form + Zod validation |
| Email | Resend (contact form delivery) |
| Fonts | Satoshi + General Sans (self-hosted, woff2) |
| Package Manager | Bun |
| Deployment | Vercel |

> Note: an earlier iteration used Three.js/React Three Fiber for a 3D hero and Lenis for smooth scroll; both were removed (ADR-005). The hero is now CSS-only and there is no WebGL dependency.

## Getting Started

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Fill in RESEND_API_KEY and CONTACT_EMAIL (both optional in dev — see below)

# Start dev server
bun run dev
```

In development, if `RESEND_API_KEY` is unset the contact form logs submissions to the
console instead of sending email, so you can develop without credentials.

## Build & search index

The build has pre/post steps that matter:

```bash
bun run build
# 1. prebuild  → validate-content (schema + referential checks; FAILS the build on any error)
# 2. build     → next build
# 3. postbuild → pagefind indexes .next/server/app into public/pagefind
```

`public/pagefind/` is gitignored and **regenerated on every deploy** by `postbuild`.
Site search (`⌘K` / `/search`) only works after a production `bun run build` — it does
not run in `bun run dev`.

## Project Structure

```
src/
├── app/                    Next.js App Router routes
│   ├── page.tsx            Home
│   ├── about/              About
│   ├── projects/           Project listing + [slug] case studies ("systems")
│   ├── notes/              Notes listing + [slug] posts + series/[series]
│   ├── explorer/[slug]/    Full-screen interactive architecture explorer
│   ├── search/             Pagefind-backed search (noindex)
│   ├── contact/            Contact form
│   └── api/                contact (Resend) + og (dynamic OG images)
├── components/             UI, layout, explorer, animations, page sections
├── content/
│   ├── site.ts             Site config, nav, stats, tech stack
│   ├── resume.ts           Resume data (mirrors the About timeline)
│   ├── systems/*.ts        One file per project case study
│   ├── architectures/*.ts  Explorer diagram models
│   └── notes/*.mdx         One file per note
├── lib/
│   ├── systems.ts          Imports system TS files
│   ├── mdx.ts              Reads MDX notes
│   ├── schemas/            Zod schemas for content
│   └── seo.ts              JSON-LD + metadata helpers
└── types/                  Shared TypeScript types
```

## Editing Content

- **Site config, nav, stats, tech stack:** edit [src/content/site.ts](src/content/site.ts)
- **New project:** create a TS file in [src/content/systems/](src/content/systems), then register it in [src/lib/systems.ts](src/lib/systems.ts)
- **New note:** create a `.mdx` file in [src/content/notes/](src/content/notes) with frontmatter
- **Note categories:** `architecture`, `react`, `mobile`, `ai`, `devops`, `career`, `accessibility`

## Environment Variables

```
RESEND_API_KEY        # Resend API key (contact form email delivery)
CONTACT_EMAIL         # Email address that contact submissions are sent to
NEXT_PUBLIC_SITE_URL  # Public site URL (overrides the default in src/content/site.ts)
CONTACT_FORM_DRY_RUN  # "1" = log contact submissions instead of sending (CI/e2e only —
                      # never set in a real deployment). In production a missing
                      # RESEND_API_KEY makes /api/contact fail loudly instead of
                      # silently dropping inquiries.
```

The contact email is sent `from` a verified Resend domain (see `src/lib/email.ts`).
**Before launch, verify that sending domain in Resend** or submissions will fail in
production.

## Rate limiting

`src/app/api/contact/route.ts` ships a best-effort in-memory limiter. On serverless
this is per-instance and resets on cold start. For durable limiting, back it with
Upstash / Vercel KV or a Vercel WAF rule.

## Commands

```bash
bun run dev          # Start dev server (Turbopack)
bun run build        # Production build (runs validate-content + pagefind)
bun run start        # Start production server
bun run lint         # ESLint
bun run check-links  # Validate internal links/anchors (run after a build)
bunx playwright test # E2E smoke suite (starts `next start` itself; run after a build)
```

## Deployment

Deploy to Vercel — push to main and Vercel handles the rest. Set the three env vars
above in the Vercel project settings.
