import { z } from "zod";

export const siteSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  tagline: z.string(),
  url: z.string().url(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    whatsapp: z.string().url(),
  }),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
  }),
  nav: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  techStack: z.array(z.string()),
});
