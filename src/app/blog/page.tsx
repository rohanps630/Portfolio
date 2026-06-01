import { Suspense } from "react";
import { getAllPosts, getPostsByCategory, getAllCategories } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogGrid } from "@/components/blog/BlogGrid";
import type { BlogCategory } from "@/types/blog";

export const metadata = createMetadata({
  title: "Blog — Architecture, React, AI & DevOps",
  description:
    "Writing by Rohan P. Suresh on software architecture, React, React Native, AI integration, and lessons from shipping production apps.",
  path: "/blog",
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  const [allPosts, categories, filteredPosts] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    category
      ? getPostsByCategory(category as BlogCategory)
      : getAllPosts(),
  ]);

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          label="Blog"
          title="Writing by Rohan P. Suresh"
          subtitle="Thoughts on software architecture, development practices, and lessons learned from building production applications."
        />

        <Suspense fallback={null}>
          <BlogCategoryFilter
            categories={categories}
            totalCount={allPosts.length}
          />
        </Suspense>

        <BlogGrid posts={filteredPosts} />
      </div>
    </main>
  );
}
