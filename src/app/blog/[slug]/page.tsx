import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/mdx";
import { createMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogCard } from "@/components/blog/BlogCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { slugify } from "@/lib/utils";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    return createMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${slug}`,
      image: post.coverImage || undefined,
      type: "article",
      publishedTime: post.date,
    });
  } catch {
    return createMetadata({ title: "Post Not Found" });
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post.published) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    date: post.date,
    url: `${siteConfig.url}/blog/${slug}`,
    image: post.coverImage || undefined,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
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
          <div className="max-w-6xl mx-auto">
            <BlogHeader post={post} />

            <div className="flex gap-12">
              <div className="flex-1 min-w-0 lg:max-w-[calc(66.667%-1.5rem)]">
                <BlogContent source={post.content} />
              </div>

              <aside className="hidden lg:block w-64 shrink-0">
                <TableOfContents headings={headings} />
              </aside>
            </div>

            {relatedPosts.length > 0 && (
              <section className="mt-20 pt-12 border-t border-border">
                <FadeIn delay={0}>
                  <h2 className="font-heading text-2xl font-bold tracking-tight mb-8">
                    Related Posts
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <BlogCard
                        key={relatedPost.slug}
                        post={relatedPost}
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
