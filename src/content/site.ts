import content from "@/content/content.json";

export const siteConfig = {
  name: content.site.name,
  title: content.site.title,
  description: content.site.description,
  tagline: content.site.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL || content.site.url,
  contact: content.site.contact,
  social: content.site.social,
  stats: content.stats,
  nav: content.nav,
  techStack: content.techStack,
} as const;
