import React from "react";
import { getNotesRelatedToSystem } from "@/lib/mdx";
import { NoteCard } from "@/components/notes/NoteCard";

export async function RelatedNotes({ systemSlug }: { systemSlug: string }) {
  const notes = await getNotesRelatedToSystem(systemSlug);
  
  if (notes.length === 0) return null;

  return (
    <section id="engineering-notes" className="scroll-mt-24 mt-24">
      <h2 className="text-3xl font-heading font-bold mb-6 text-foreground">
        Engineering Deep Dives
      </h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Articles, architecture discussions, and deep dives related to this system.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {notes.map((note, idx) => (
          <NoteCard key={note.slug} note={note} index={idx} />
        ))}
      </div>
    </section>
  );
}
