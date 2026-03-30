import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { BlogForm } from "@/components/admin/BlogForm";

interface BlogRow {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  cover_image: string;
  date: string;
  published: number;
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id) as
    | BlogRow
    | undefined;

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
    tags: row.tags ? JSON.parse(row.tags) : [],
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
