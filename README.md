# Portfolio — Rohan P. Suresh

Production portfolio website for a Full Stack Developer. Features an interactive 3D hero, agency-level micro-interactions, a fully database-driven CMS admin dashboard, and 6 project case studies with 10 technical blog posts.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 + Framer Motion 12 |
| 3D | Three.js + React Three Fiber |
| Database | Supabase (PostgreSQL) |
| Blog | MDX with next-mdx-remote/rsc |
| Forms | react-hook-form + Zod validation |
| Email | Resend |
| Auth | JWT sessions (jose + bcryptjs) |
| Smooth Scroll | Lenis |
| Fonts | Satoshi + General Sans (self-hosted) |
| Package Manager | Bun |
| Deployment | Vercel |

## Getting Started

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Fill in DATABASE_URL and other values (see below)

# Create database tables
DATABASE_URL="your-connection-string" npx tsx scripts/setup-db.ts

# Seed initial data
DATABASE_URL="your-connection-string" npx tsx scripts/seed.ts

# Generate admin password hash
DATABASE_URL="your-connection-string" npx tsx scripts/hash-password.ts your-password
# Copy the output to ADMIN_PASSWORD_HASH in .env.local

# Start dev server
bun run dev

# Build for production
bun run build
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```
DATABASE_URL=              # Supabase PostgreSQL connection string (pooler URL, port 6543)
RESEND_API_KEY=            # Resend API key (optional in dev — falls back to console.log)
CONTACT_EMAIL=             # Email to receive contact form submissions
NEXT_PUBLIC_SITE_URL=      # Site URL (http://localhost:3000 for dev)
ADMIN_PASSWORD_HASH=       # bcrypt hash of admin password (generate with scripts/hash-password.ts)
ADMIN_SECRET=              # JWT signing secret (any string, 32+ chars)
```

## Admin Dashboard

Access at `/admin`. Login with the password you set during setup.

### Features
- **Dashboard** — Stats overview (projects, posts, submissions, unread)
- **Projects** — Full CRUD for project case studies
- **Blog** — Full CRUD for blog posts (MDX content)
- **Submissions** — View contact form submissions, mark as read
- **Site Config** — Edit site name, tagline, contact info, social links
- **Pages** — Toggle visibility of any page or section on the public site
- **Services** — Manage service tiers with pricing
- **Testimonials** — Manage client testimonials
- **FAQs** — Manage FAQ accordion items
- **Navigation** — Manage nav links (reorder, hide)
- **Stats** — Manage hero stats bar
- **Tech Stack** — Manage tech stack marquee items
- **Process Steps** — Manage development process steps

### Changing Admin Password

```bash
DATABASE_URL="your-connection-string" npx tsx scripts/hash-password.ts new-password
```

Update `ADMIN_PASSWORD_HASH` in `.env.local` with the output, then restart the dev server.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── about/                      # About page
│   ├── projects/                   # Projects listing + [slug] detail
│   ├── services/                   # Services page
│   ├── blog/                       # Blog listing + [slug] detail
│   ├── contact/                    # Contact page
│   ├── admin/                      # Admin dashboard (auth-protected)
│   │   ├── login/                  # Admin login
│   │   └── (authenticated)/        # Protected admin pages
│   │       ├── projects/           # Project management
│   │       ├── blog/               # Blog management
│   │       ├── submissions/        # Contact submissions
│   │       ├── site-config/        # Site settings
│   │       ├── pages/              # Page visibility
│   │       ├── services/           # Service tiers
│   │       ├── testimonials/       # Testimonials
│   │       ├── faqs/               # FAQ items
│   │       ├── nav/                # Navigation items
│   │       ├── stats/              # Stats bar
│   │       ├── tech-stack/         # Tech stack
│   │       └── process-steps/      # Process steps
│   └── api/
│       ├── contact/                # Contact form submission
│       ├── og/                     # Dynamic OG image generation
│       ├── auth/                   # Login/logout endpoints
│       └── admin/                  # Admin CRUD endpoints
├── components/
│   ├── layout/                     # Navbar, Footer, SmoothScroll, PublicShell
│   ├── ui/                         # Button, Card, Input, MagneticButton, TiltCard, CursorSpotlight
│   ├── home/                       # HeroSection, HeroScene (3D), FeaturedProjects, TechStackBar
│   ├── projects/                   # ProjectCard, ProjectFilter, case study sections
│   ├── blog/                       # BlogCard, BlogContent, TableOfContents
│   ├── about/                      # AboutHero, Timeline, SkillsGrid
│   ├── services/                   # ServiceCard, ProcessSteps, FAQSection
│   ├── contact/                    # ContactForm, ContactInfo, FormSuccess
│   ├── shared/                     # SectionHeading, AnimatedCounter, TechBadge
│   ├── animations/                 # FadeIn, TextScramble, StaggerChildren
│   └── admin/                      # AdminSidebar, ProjectForm, BlogForm, InlineEditableList
├── content/                        # Static fallback content (TS objects + MDX files)
├── lib/
│   ├── db.ts                       # PostgreSQL client (postgres)
│   ├── data.ts                     # Data access for all configurable content
│   ├── projects.ts                 # Project queries (DB + file fallback)
│   ├── mdx.ts                      # Blog queries + MDX compilation
│   ├── auth.ts                     # JWT session management
│   ├── seo.ts                      # Metadata + JSON-LD helpers
│   └── email.ts                    # Resend email integration
├── hooks/                          # useScrollProgress
├── types/                          # TypeScript interfaces
└── middleware.ts                    # Auth middleware for /admin routes
```

## Database Schema (12 tables)

| Table | Purpose |
|-------|---------|
| `projects` | Project case studies |
| `blog_posts` | Blog articles (MDX content) |
| `contact_submissions` | Contact form submissions |
| `site_config` | Key-value site settings |
| `nav_items` | Navigation links |
| `stats` | Hero stats bar items |
| `tech_stack` | Tech stack marquee items |
| `services` | Service tiers with pricing |
| `testimonials` | Client testimonials |
| `faqs` | FAQ accordion items |
| `process_steps` | Development process steps |
| `page_sections` | Page/section visibility toggles |

## Adding Content

Content can be managed via the admin dashboard at `/admin`, or directly in the database.

### Via Admin Dashboard (Recommended)
1. Login at `/admin`
2. Navigate to the content type (Projects, Blog, Services, etc.)
3. Add, edit, or delete entries
4. Toggle visibility to show/hide content on the public site

### Via File Fallback
If the database is unavailable, the site falls back to static content files:
- **Projects:** `src/content/projects/*.ts`
- **Blog:** `src/content/blog/*.mdx`
- **Site config:** `src/content/site.ts`
- **Services:** `src/content/services.ts`

## Deployment

```bash
# Deploy to Vercel
vercel

# Or connect GitHub repo for automatic deployments
```

Set all environment variables in your Vercel project settings.

## Scripts

```bash
bun run dev                  # Start dev server (Turbopack)
bun run build                # Production build
bun run start                # Production server
bun run lint                 # ESLint

# Database scripts (run with DATABASE_URL env var)
npx tsx scripts/setup-db.ts          # Create all 12 tables
npx tsx scripts/seed.ts              # Seed initial content
npx tsx scripts/hash-password.ts pw  # Generate bcrypt hash
npx tsx scripts/fix-duplicates.ts    # Remove duplicate rows
```

## License

All rights reserved.
