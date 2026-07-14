import type { NoteMeta } from "@/types/note";
import { NoteCard } from "./NoteCard";

interface NoteGridProps {
  notes: NoteMeta[];
}

export function NoteGrid({ notes }: NoteGridProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          No notes found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {notes.map((note, index) => (
        <NoteCard key={note.slug} note={note} index={index} />
      ))}
    </div>
  );
}
