import { z } from "zod";

export const blogCategorySchema = z.enum([
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
  category: blogCategorySchema,
  tags: z.array(z.string()),
  coverImage: z.string(),
  published: z.boolean(),
  readingTime: z.string().optional(),
});
