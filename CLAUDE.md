# Portfolio — Rohan P. Suresh

## Project Overview

Production portfolio website for a Full Stack Developer targeting international freelance clients (US, Europe, Middle East). Built to convert visitors into client inquiries.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4 (CSS-first `@theme` config in globals.css)
- **Animations:** Framer Motion 12
- **Blog:** MDX files with next-mdx-remote/rsc
- **Forms:** react-hook-form + Zod 4 validation
- **Email:** Resend (contact form submissions)
- **Fonts:** Satoshi (headings) + General Sans (body), self-hosted in public/fonts/
- **Package Manager:** Bun
- **Deployment Target:** Vercel

## Architecture

- `src/app/` — Next.js App Router pages (8 pages + API route)
- `src/components/` — React components organized by domain (layout, ui, home, projects, blog, about, services, contact, shared, animations)
- `src/content/` — Content data layer
  - `projects/` — 6 TypeScript files (structured data, not MDX)
  - `blog/` — 10 MDX files with YAML frontmatter
  - `services.ts` — 3 service tiers
  - `site.ts` — Centralized site config (name, URLs, contact, social, stats, nav)
- `src/lib/` — Utilities and data access (mdx.ts, projects.ts, seo.ts, email.ts, utils.ts)
- `src/types/` — TypeScript interfaces (project.ts, blog.ts, contact.ts)
- `src/hooks/` — Custom hooks (useScrollProgress)

## Key Patterns

- **Content separation:** Project data is TypeScript objects (src/content/projects/*.ts), blog posts are MDX (src/content/blog/*.mdx). Both imported statically — no database or CMS.
- **Data access:** `src/lib/projects.ts` and `src/lib/mdx.ts` provide getter functions (getProjects, getAllPosts, etc.)
- **SEO:** Every page exports `generateMetadata()`. JSON-LD schemas built via `src/lib/seo.ts`. Sitemap/robots auto-generated.
- **Animations:** FadeIn, StaggerChildren, TextReveal wrappers in src/components/animations/. All respect `prefers-reduced-motion`.
- **Dark/light mode:** Default dark. Controlled via next-themes with `data-theme` attribute. CSS variables in globals.css.
- **Container:** Use `SectionContainer` component or `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Do NOT use Tailwind's `container` class (no max-width in v4).

## Commands

```bash
bun run dev      # Start dev server (Turbopack)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint
```

## Environment Variables

```
RESEND_API_KEY       # Resend API key (optional in dev — falls back to console.log)
CONTACT_EMAIL        # Email for contact form submissions
NEXT_PUBLIC_SITE_URL # Site URL
```

## Adding Content

- **New project:** Create TS file in `src/content/projects/`, import it in `src/lib/projects.ts`
- **New blog post:** Create .mdx file in `src/content/blog/` with frontmatter (title, excerpt, date, category, tags, coverImage, published)
- **Blog categories:** architecture, react, mobile, ai, devops, career, accessibility

## Important Notes

- Brand icons (GitHub, LinkedIn) are inline SVGs in `src/components/shared/SocialLinks.tsx` — lucide-react v1.7 removed brand icons
- Contact form honeypot field ("website") must remain hidden — it's spam prevention
- Project filtering uses URL search params for SEO-friendly shareable URLs
- All animations use Framer Motion only — no mixing animation libraries
