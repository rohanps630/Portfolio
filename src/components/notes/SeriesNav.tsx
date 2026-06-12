import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { getNotesInSeries } from "@/lib/mdx";

interface SeriesNavProps {
  series: string;
  currentSlug: string;
}

export async function SeriesNav({ series, currentSlug }: SeriesNavProps) {
  const notes = await getNotesInSeries(series);
  if (notes.length <= 1) return null;

  const currentIndex = notes.findIndex(n => n.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? notes[currentIndex - 1] : null;
  const next = currentIndex < notes.length - 1 ? notes[currentIndex + 1] : null;

  const title = series.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="mt-16 p-6 sm:p-8 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border/50">
        <BookOpen className="h-5 w-5 text-accent" />
        <span className="font-semibold text-foreground">
          Series: <Link href={`/notes/series/${series}`} className="hover:text-accent transition-colors">{title}</Link>
        </span>
        <span className="text-muted-foreground text-sm ml-auto">
          Part {currentIndex + 1} of {notes.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/notes/${prev.slug}`}
            className="flex flex-col gap-2 p-4 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-colors group text-left"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="font-medium text-foreground line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next && (
          <Link
            href={`/notes/${next.slug}`}
            className="flex flex-col gap-2 p-4 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-colors group text-right sm:text-right"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center justify-end gap-1">
              Next
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-medium text-foreground line-clamp-2">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
