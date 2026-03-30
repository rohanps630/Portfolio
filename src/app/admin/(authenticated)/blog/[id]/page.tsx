import { notFound } from "next/navigation";
import sql from "@/lib/db";
import { BlogForm } from "@/components/admin/BlogForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [row] = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;

  if (!row) {
    notFound();
  }

  const post = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: row.tags || [],
    cover_image: row.cover_image || "",
    date: row.date,
    published: Boolean(row.published),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
        Edit Blog Post
      </h1>
      <BlogForm initialData={post} />
    </div>
  );
}
