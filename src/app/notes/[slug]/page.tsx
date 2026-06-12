import { notFound } from "next/navigation";
import { getNoteBySlug, getPostSlugs, getAllNotes } from "@/lib/mdx";
import { createMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd, generateOgImageUrl } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { NoteHeader } from "@/components/notes/NoteHeader";
import { NoteContent } from "@/components/notes/NoteContent";
import { SeriesNav } from "@/components/notes/SeriesNav";
import { RelatedSystem } from "@/components/systems/RelatedSystem";
import { TableOfContents } from "@/components/notes/TableOfContents";
import { NoteCard } from "@/components/notes/NoteCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { slugify } from "@/lib/utils";
import type { Metadata } from "next";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const note = await getNoteBySlug(slug);
    return createMetadata({
      title: note.title,
      description: note.excerpt,
      path: `/notes/${slug}`,
      type: "article",
      publishedTime: note.date,
      image: generateOgImageUrl(note.title, note.excerpt, "note", note.series),
    });
  } catch {
    return createMetadata({ title: "Note Not Found" });
  }
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length,
    });
  }

  return headings;
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;

  let note;
  try {
    note = await getNoteBySlug(slug);
  } catch {
    notFound();
  }

  if (!note.published) {
    notFound();
  }

  const headings = extractHeadings(note.content);

  const allPosts = await getAllNotes();
  const relatedPosts = allPosts
    .filter((p) => p.category === note.category && p.slug !== note.slug)
    .slice(0, 3);

  const articleJsonLd = buildArticleJsonLd({
    title: note.title,
    description: note.excerpt,
    date: note.date,
    url: `${siteConfig.url}/notes/${slug}`,
    image: note.coverImage || undefined,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Note", href: "/notes" },
    { name: note.title, href: `/notes/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto" data-pagefind-body>
            <NoteHeader note={note} />

            <div className="flex gap-12">
              <div className="flex-1 min-w-0 lg:max-w-[calc(66.667%-1.5rem)]">
                {note.relatedSystem && (
                  <RelatedSystem systemSlug={note.relatedSystem} />
                )}
                <NoteContent source={note.content} />
                {note.series && (
                  <SeriesNav series={note.series} currentSlug={note.slug} />
                )}
              </div>

              <aside className="hidden lg:block w-64 shrink-0">
                <TableOfContents headings={headings} />
              </aside>
            </div>

            {relatedPosts.length > 0 && (
              <section className="mt-20 pt-12 border-t border-border">
                <FadeIn delay={0}>
                  <h2 className="font-heading text-2xl font-bold tracking-tight mb-8">
                    Related Notes
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <NoteCard
                        key={relatedPost.slug}
                        note={relatedPost}
                        index={index}
                      />
                    ))}
                  </div>
                </FadeIn>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
