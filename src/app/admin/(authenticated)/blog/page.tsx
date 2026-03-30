import Link from "next/link";
import { getDb } from "@/lib/db";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

interface BlogRow {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  published: number;
}

export default function AdminBlogPage() {
  const db = getDb();
  const posts = db
    .prepare(
      "SELECT id, title, slug, category, date, published FROM blog_posts ORDER BY date DESC"
    )
    .all() as BlogRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
          Blog Posts
        </h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="bg-[#111128] border border-[#1e1e3a] rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-5 py-3 text-left text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e3a]">
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-8 text-center text-[#8888a0] text-sm"
                >
                  No blog posts yet. Create your first post.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-[#1e1e3a]/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-[#f0f0f5]">
                      {post.title}
                    </p>
                    <p className="text-xs text-[#8888a0]">/{post.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-[#6366f1]/10 text-[#818cf8]">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#8888a0]">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 text-xs text-[#22c55e]">
                        <Eye size={14} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-[#8888a0]">
                        <EyeOff size={14} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-1.5 text-[#8888a0] hover:text-[#6366f1] transition-colors rounded-md hover:bg-[#6366f1]/10"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/blog/${post.id}`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
