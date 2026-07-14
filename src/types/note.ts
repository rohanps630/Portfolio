import { z } from "zod";
import { noteSchema, noteCategorySchema } from "@/lib/schemas/note";

export type NoteCategory = z.infer<typeof noteCategorySchema>;
export type NoteMeta = z.infer<typeof noteSchema>;

export interface Note extends NoteMeta {
  content: string;
}
