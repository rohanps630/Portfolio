import { Suspense } from "react";
import { getAllNotes, getPostsByCategory, getAllCategories } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { NoteCategoryFilter } from "@/components/notes/NoteCategoryFilter";
import { NoteGrid } from "@/components/notes/NoteGrid";
import type { NoteCategory } from "@/types/note";

export const metadata = createMetadata({
  title: "Note — Architecture, React, AI & DevOps",
  description:
    "Writing by Rohan P. Suresh on software architecture, React, React Native, AI integration, and lessons from shipping production apps.",
  path: "/notes",
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  const [allPosts, categories, filteredPosts] = await Promise.all([
    getAllNotes(),
    getAllCategories(),
    category
      ? getPostsByCategory(category as NoteCategory)
      : getAllNotes(),
  ]);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          label="Note"
          title="Writing by Rohan P. Suresh"
          subtitle="Thoughts on software architecture, development practices, and lessons learned from building production applications."
        />

        <Suspense fallback={null}>
          <NoteCategoryFilter
            categories={categories}
            totalCount={allPosts.length}
          />
        </Suspense>

        <NoteGrid notes={filteredPosts} />
      </div>
    </main>
  );
}
