# Portfolio — Rohan P. Suresh

Personal portfolio for a full-stack & AI integration engineer. All content is local — no database — so the site is fully self-contained and trivially deployable.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 + Framer Motion 12 |
| 3D | Three.js + React Three Fiber |
| Content | Local JSON + TS project files + MDX blog posts |
| Blog | MDX with next-mdx-remote/rsc |
| Forms | react-hook-form + Zod validation |
| Email | Resend (contact form delivery) |
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
# Fill in RESEND_API_KEY and CONTACT_EMAIL

# Start dev server
bun run dev
```

## Project Structure

```
src/
├── app/                    Next.js App Router routes
│   ├── page.tsx            Home
│   ├── about/              About
│   ├── projects/           Project listing + [slug] case studies
│   ├── blog/               Blog listing + [slug] posts
│   ├── contact/            Contact form
│   └── api/contact/        Contact form handler (email via Resend)
├── components/             UI, layout, animations, page sections
├── content/
│   ├── content.json        Site config, nav, stats, tech stack
│   ├── projects/*.ts       One file per project case study
│   └── blog/*.mdx          One file per blog post
├── lib/
│   ├── data.ts             Reads content.json
│   ├── projects.ts         Imports project TS files
│   ├── mdx.ts              Reads MDX blog files
│   └── seo.ts              JSON-LD + metadata helpers
└── types/                  Shared TypeScript types
```

## Editing Content

- **Site config, nav, stats, tech stack:** edit [src/content/content.json](src/content/content.json)
- **New project:** create a TS file in [src/content/projects/](src/content/projects), then import it in [src/lib/projects.ts](src/lib/projects.ts)
- **New blog post:** create a `.mdx` file in [src/content/blog/](src/content/blog) with frontmatter
- **Blog categories:** `architecture`, `react`, `mobile`, `ai`, `devops`, `career`, `accessibility`

## Environment Variables

```
RESEND_API_KEY        # Resend API key (contact form email delivery)
CONTACT_EMAIL         # Email address that contact submissions are sent to
NEXT_PUBLIC_SITE_URL  # Public site URL (overrides default in content.json)
```

## Commands

```bash
bun run dev      # Start dev server (Turbopack)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint
```

## Deployment

Deploy to Vercel — push to main and Vercel handles the rest. Set the three env vars above in the Vercel project settings.
