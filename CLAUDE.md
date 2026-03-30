# Portfolio — Rohan P. Suresh

## Project Overview

Production portfolio website for a Full Stack Developer targeting international freelance clients (US, Europe, Middle East). Built to convert visitors into client inquiries. Features a fully database-driven CMS where every piece of content is controllable from an admin dashboard.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4 (CSS-first `@theme` config in globals.css)
- **3D Hero:** Three.js + @react-three/fiber + @react-three/drei
- **Animations:** Framer Motion 12 + Lenis (smooth scroll)
- **Database:** Supabase PostgreSQL via `postgres` (porsager/postgres)
- **Blog:** MDX content stored in DB, compiled with next-mdx-remote/rsc
- **Forms:** react-hook-form + Zod 4 validation
- **Email:** Resend (contact form submissions)
- **Auth:** JWT sessions (jose) + bcryptjs password hashing
- **Fonts:** Satoshi (headings) + General Sans (body), self-hosted in public/fonts/
- **Package Manager:** Bun
- **Deployment Target:** Vercel

## Architecture

### Pages (8 public + admin dashboard)
- `src/app/page.tsx` — Home (hero, projects, tech stack, services, testimonials, blog preview, CTA)
- `src/app/about/` — About page
- `src/app/projects/` — Project listing + `[slug]` case study detail
- `src/app/services/` — Services, process steps, FAQ
- `src/app/blog/` — Blog listing + `[slug]` post detail
- `src/app/contact/` — Contact form
- `src/app/admin/` — CMS admin dashboard (13 management sections)

### Data Flow
All content loads from Supabase PostgreSQL with static file fallback:
1. Server components call async functions from `src/lib/data.ts`, `src/lib/projects.ts`, `src/lib/mdx.ts`
2. These query PostgreSQL via `src/lib/db.ts` (tagged template queries, SQL-injection safe)
3. If DB unavailable, falls back to static files in `src/content/`
4. Client components receive data as props from parent server components

### Database (12 tables)
- `projects` — 6 case studies (visible toggle)
- `blog_posts` — 10 articles with MDX content (published + visible)
- `contact_submissions` — Form submissions (read status)
- `site_config` — Key-value pairs (name, tagline, email, phone, social links)
- `nav_items` — Navigation links (reorderable, hideable)
- `stats` — Hero stats bar items
- `tech_stack` — Tech marquee items
- `services` — Service tiers with JSONB features
- `testimonials` — Client testimonials
- `faqs` — FAQ accordion items
- `process_steps` — Development process steps
- `page_sections` — Toggle visibility of any page/section

### Components (~120 files)
- `src/components/layout/` — Navbar, Footer, MobileNav, SmoothScroll, PublicShell, SectionContainer
- `src/components/ui/` — Button, Card, Input, Select, Badge, ThemeToggle, MagneticButton, TiltCard, CursorSpotlight, ScrollProgress, BackToTop
- `src/components/home/` — HeroSection, HeroScene (Three.js 3D), FeaturedProjects, TechStackBar, ServicesPreview, TestimonialSection, BlogPreview, CTASection
- `src/components/animations/` — FadeIn, SlideUp, StaggerChildren, TextScramble, ParallaxWrapper
- `src/components/admin/` — AdminSidebar, ProjectForm, BlogForm, DeleteButton, InlineEditableList, SubmissionsList

## Key Patterns

- **Database-first content:** ALL content loads from Supabase. `src/content/` files are fallback only.
- **Data access:** `src/lib/data.ts` for configurable content (site config, nav, stats, tech stack, services, testimonials, FAQs, process steps, page sections). `src/lib/projects.ts` and `src/lib/mdx.ts` for projects and blog.
- **Async data:** All data functions are `async`. Client components receive data as props — they never fetch directly.
- **Auth:** JWT cookie sessions. Middleware at `src/middleware.ts` protects `/admin/*` and `/api/admin/*`. Login/logout via `/api/auth/`.
- **SEO:** Every page exports `generateMetadata()`. JSON-LD schemas via `src/lib/seo.ts`. Sitemap/robots auto-generated.
- **Animations:** FadeIn, StaggerChildren, TextScramble wrappers. All respect `prefers-reduced-motion`. Lenis for smooth scroll. Three.js for 3D hero (desktop only, CSS orb fallback on mobile).
- **Dark/light mode:** Default dark. Controlled via next-themes with `data-theme` attribute. CSS variables in globals.css.
- **Container:** Use `SectionContainer` component or `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Do NOT use Tailwind's `container` class (no max-width in v4).
- **Admin/public separation:** `PublicShell` component conditionally renders Navbar/Footer (hidden on `/admin/*` routes). Admin has its own layout with sidebar.
- **DB connection:** Uses `postgres` with `prepare: false` (required for Supabase connection pooler).

## Commands

```bash
bun run dev      # Start dev server (Turbopack)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint
```

## Environment Variables

```
DATABASE_URL         # Supabase PostgreSQL pooler connection string (port 6543)
RESEND_API_KEY       # Resend API key (optional in dev — falls back to console.log)
CONTACT_EMAIL        # Email for contact form submissions
NEXT_PUBLIC_SITE_URL # Site URL
ADMIN_PASSWORD_HASH  # bcrypt hash (generate with: npx tsx scripts/hash-password.ts <password>)
ADMIN_SECRET         # JWT signing key (32+ chars)
```

## Admin Dashboard

- **URL:** `/admin` (redirects to `/admin/login` if not authenticated)
- **Default password:** Set via `ADMIN_PASSWORD_HASH` env var
- **13 sections:** Dashboard, Projects, Blog, Submissions, Site Config, Pages, Services, Testimonials, FAQs, Navigation, Stats, Tech Stack, Process Steps
- **Page visibility:** Toggle any page or section on/off from `/admin/pages`

## Adding Content

### Via Admin (Recommended)
Login at `/admin` and use the dashboard to manage all content.

### Via Database Directly
All 12 tables in Supabase can be edited via the Supabase dashboard.

### Via File Fallback
Static files in `src/content/` serve as fallback when DB is unavailable:
- **New project:** Create TS file in `src/content/projects/`, import in `src/lib/projects.ts`
- **New blog post:** Create .mdx in `src/content/blog/` with frontmatter
- **Blog categories:** architecture, react, mobile, ai, devops, career, accessibility

## Important Notes

- Brand icons (GitHub, LinkedIn) are inline SVGs in `SocialLinks.tsx` — lucide-react v1.7 removed brand icons
- Contact form honeypot field ("website") must remain hidden — it's spam prevention
- Project/blog filtering uses URL search params for SEO-friendly shareable URLs
- All animations use Framer Motion only — no mixing animation libraries
- 3D hero uses dynamic import with `ssr: false` — hidden on mobile for performance
- The `postgres` library needs `prepare: false` for Supabase pooler connections
- Admin pages use route group `(authenticated)` to separate login from protected pages
- Duplicate seeding is prevented by unique constraints on key columns
