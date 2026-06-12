import { z } from "zod";
import { noteSchema, blogCategorySchema } from "@/lib/schemas/note";

export type BlogCategory = z.infer<typeof blogCategorySchema>;
export type BlogPostMeta = z.infer<typeof noteSchema>;

export interface BlogPost extends BlogPostMeta {
  content: string;
}
