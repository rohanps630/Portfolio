import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNotesInSeries, getSeriesSlugs } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";
import { NoteCard } from "@/components/notes/NoteCard";

export async function generateStaticParams() {
  const slugs = await getSeriesSlugs();
  return slugs.map((series) => ({ series }));
}

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { series } = await params;
  
  // Pretty up the series name (e.g. "ai-code-reviewer" -> "Ai Code Reviewer")
  const title = series.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return createMetadata({
    title: `${title} Series — Notes`,
    description: `A collection of notes in the ${title} series.`,
  });
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;
  const notes = await getNotesInSeries(series);

  if (!notes || notes.length === 0) {
    notFound();
  }

  const title = series.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main className="pb-24 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link 
        href="/notes" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Notes
      </Link>
      
      <header className="mb-12">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2 block">
          Series Hub
        </span>
        <h1 className="text-4xl font-bold font-heading mb-4 text-foreground">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">
          Part of an ongoing deep dive. Read them in order.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note, idx) => (
          <NoteCard key={note.slug} note={note} index={idx} />
        ))}
      </div>
    </main>
  );
}
