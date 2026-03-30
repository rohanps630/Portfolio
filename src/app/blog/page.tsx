import { Suspense } from "react";
import { getAllPosts, getPostsByCategory, getAllCategories } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogGrid } from "@/components/blog/BlogGrid";
import type { BlogCategory } from "@/types/blog";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Thoughts on software architecture, React, mobile development, AI integration, and lessons from building production applications.",
  path: "/blog",
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const filteredPosts = category
    ? getPostsByCategory(category as BlogCategory)
    : allPosts;

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="Thoughts & Insights"
          subtitle="Writing about software architecture, development practices, and lessons learned from building production applications."
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
