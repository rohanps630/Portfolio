import { z } from "zod";

export const noteCategorySchema = z.enum([
  "architecture",
  "react",
  "mobile",
  "ai",
  "devops",
  "career",
  "accessibility",
]);

export const noteSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  // An unparseable date would produce Invalid Date in the sitemap and feed.
  date: z
    .string()
    .refine((d) => !Number.isNaN(new Date(d).getTime()), {
      message: "date must be a parseable date string (YYYY-MM-DD)",
    }),
  category: noteCategorySchema,
  tags: z.array(z.string()),
  coverImage: z.string(),
  published: z.boolean(),
  readingTime: z.string().optional(),
  // Series names appear verbatim in /notes/series/[series] URLs.
  series: z
    .string()
    .regex(/^[a-z0-9-]+$/, "series must be a URL-safe slug")
    .optional(),
  seriesOrder: z.number().optional(),
  relatedSystem: z.string().optional(),
});
