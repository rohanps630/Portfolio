# Portfolio — Rohan P. Suresh

## Project Overview

Personal portfolio for a full-stack & AI integration engineer. Built to serve both recruiters (full-time roles) and freelance clients. All content is local — no database — so the site is fully self-contained and trivially deployable.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4 (CSS-first `@theme` config in globals.css)
- **3D Hero:** Three.js + @react-three/fiber + @react-three/drei
- **Animations:** Framer Motion 12 + Lenis (smooth scroll)
- **Content:** Local JSON (`src/content/content.json`) + TS project files + MDX blog posts
- **Blog:** MDX files compiled with next-mdx-remote/rsc
- **Forms:** react-hook-form + Zod 4 validation
- **Email:** Resend (contact form delivery — no DB persistence)
- **Fonts:** Satoshi (headings) + General Sans (body), self-hosted in public/fonts/
- **Package Manager:** Bun
- **Deployment Target:** Vercel

## Architecture

### Pages (public only)
- `src/app/page.tsx` — Home (hero, featured projects, tech stack, blog preview, CTA)
- `src/app/about/` — About page
- `src/app/projects/` — Listing + `[slug]` case study detail
- `src/app/blog/` — Listing + `[slug]` post detail
- `src/app/contact/` — Contact form

### Content Sources (all local files)
- `src/content/content.json` — site config, nav, stats, tech stack, testimonials, FAQs, process steps, page visibility
- `src/content/projects/*.ts` — one file per project, exported as `Project` typed objects
- `src/content/blog/*.mdx` — MDX posts with frontmatter (title, excerpt, date, category, tags, coverImage, published)

### Data Flow
1. Server components call async helpers from `src/lib/data.ts`, `src/lib/projects.ts`, `src/lib/mdx.ts`
2. Those helpers read directly from `content.json`, project TS modules, or MDX files on disk
3. Client components receive data as props — they never fetch directly

### Components
- `src/components/layout/` — Navbar, Footer, MobileNav, SmoothScroll, PublicShell, SectionContainer
- `src/components/ui/` — Button, Card, Input, Select, Badge, ThemeToggle, MagneticButton, TiltCard, CursorSpotlight, ScrollProgress, BackToTop
- `src/components/home/` — HeroSection, HeroScene (Three.js 3D), FeaturedProjects, TechStackBar, BlogPreview, CTASection
- `src/components/animations/` — FadeIn, SlideUp, StaggerChildren, TextScramble, ParallaxWrapper

## Key Patterns

- **All content is local.** No database. Edit `content.json` or the project/blog files directly.
- **Async data helpers:** All `getX()` functions in `lib/` are async (kept that way so call sites don't change), but read synchronously from files.
- **SEO:** Every page exports `generateMetadata()`. JSON-LD schemas via `src/lib/seo.ts`. Sitemap/robots auto-generated.
- **Animations:** FadeIn, StaggerChildren, TextScramble wrappers. All respect `prefers-reduced-motion`. Lenis for smooth scroll. Three.js for 3D hero (desktop only, CSS orb fallback on mobile).
- **Dark/light mode:** Default dark. Controlled via next-themes with `data-theme` attribute. CSS variables in globals.css.
- **Container:** Use `SectionContainer` or `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Do NOT use Tailwind's `container` class (no max-width in v4).

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
CONTACT_EMAIL        # Email address that contact form submissions are delivered to
NEXT_PUBLIC_SITE_URL # Public site URL (overrides default in content.json)
```

## Adding Content

- **Edit site config / nav / stats / testimonials / FAQs / process steps:** edit `src/content/content.json`
- **New project:** create a TS file in `src/content/projects/`, then import it in `src/lib/projects.ts`
- **New blog post:** create a `.mdx` file in `src/content/blog/` with frontmatter
- **Blog categories:** architecture, react, mobile, ai, devops, career, accessibility

## Important Notes

- Brand icons (GitHub, LinkedIn) are inline SVGs in `SocialLinks.tsx` — lucide-react v1.7 removed brand icons
- Contact form honeypot field ("website") must remain hidden — it's spam prevention
- Project/blog filtering uses URL search params for SEO-friendly shareable URLs
- All animations use Framer Motion only — no mixing animation libraries
- 3D hero uses dynamic import with `ssr: false` — hidden on mobile for performance
- The contact form schema still accepts `budget` and `timeline` for back-compat, but the budget field is hidden from the UI
- Resume PDF lives at `public/resume/rohan-suresh-resume.pdf` and opens in a new tab as a preview
