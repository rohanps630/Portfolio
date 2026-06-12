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
  date: z.string(),
  category: noteCategorySchema,
  tags: z.array(z.string()),
  coverImage: z.string(),
  published: z.boolean(),
  readingTime: z.string().optional(),
  series: z.string().optional(),
  seriesOrder: z.number().optional(),
  relatedSystem: z.string().optional(),
  canonicalFrom: z.string().optional(),
});
