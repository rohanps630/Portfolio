# Portfolio — Rohan P. Suresh

Full Stack Developer portfolio built with Next.js 16, Tailwind CSS 4, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS 4 + Framer Motion 12
- **Blog:** MDX with next-mdx-remote
- **Forms:** react-hook-form + Zod validation
- **Email:** Resend
- **Fonts:** Satoshi + General Sans (self-hosted)
- **Package Manager:** Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=        # Resend API key for contact form emails
CONTACT_EMAIL=         # Email to receive contact form submissions
NEXT_PUBLIC_SITE_URL=  # Site URL (http://localhost:3000 for dev)
```

The contact form works without `RESEND_API_KEY` in development — submissions are logged to the console.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── about/        # About page
│   ├── blog/         # Blog listing + [slug] detail
│   ├── contact/      # Contact page
│   ├── projects/     # Projects listing + [slug] detail
│   ├── services/     # Services page
│   └── api/contact/  # Contact form API route
├── components/       # React components by domain
│   ├── layout/       # Navbar, Footer, SectionContainer
│   ├── ui/           # Button, Card, Input, Badge, etc.
│   ├── home/         # Home page sections
│   ├── projects/     # Project components
│   ├── blog/         # Blog components
│   ├── about/        # About page components
│   ├── services/     # Services components
│   ├── contact/      # Contact form components
│   ├── shared/       # SectionHeading, TechBadge, etc.
│   └── animations/   # FadeIn, TextReveal, etc.
├── content/          # Content data
│   ├── projects/     # Project case studies (TypeScript)
│   ├── blog/         # Blog posts (MDX)
│   ├── services.ts   # Service tiers
│   └── site.ts       # Site config
├── lib/              # Utilities and data access
├── hooks/            # Custom React hooks
└── types/            # TypeScript type definitions
```

## Adding Content

### New Blog Post

Create a `.mdx` file in `src/content/blog/` with frontmatter:

```mdx
---
title: "Your Post Title"
excerpt: "A brief description"
date: "2026-01-15"
category: "react"
tags: ["react", "performance"]
coverImage: "/images/blog/your-post.jpg"
published: true
---

Your markdown content here...
```

Categories: `architecture`, `react`, `mobile`, `ai`, `devops`, `career`, `accessibility`

### New Project

Create a TypeScript file in `src/content/projects/` exporting a `Project` object, then import it in `src/lib/projects.ts`.

## Deployment

Deploy to Vercel:

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

All rights reserved.
