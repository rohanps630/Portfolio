import Link from "next/link";
import { getDb } from "@/lib/db";
import { Plus, Pencil, Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  category: string;
  featured: number;
  sort_order: number;
}

export default function AdminProjectsPage() {
  const db = getDb();
  const projects = db
    .prepare("SELECT id, title, slug, category, featured, sort_order FROM projects ORDER BY sort_order ASC")
    .all() as ProjectRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="bg-[#111128] border border-[#1e1e3a] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-5 py-3 text-left text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Featured
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Order
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-[#8888a0] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e3a]">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-[#8888a0] text-sm">
                  No projects yet. Create your first project.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#1e1e3a]/50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-[#f0f0f5]">{project.title}</p>
                    <p className="text-xs text-[#8888a0]">/{project.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-[#6366f1]/10 text-[#818cf8]">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    {project.featured ? (
                      <Star size={16} className="inline text-[#f59e0b] fill-[#f59e0b]" />
                    ) : (
                      <Star size={16} className="inline text-[#8888a0]/30" />
                    )}
                  </td>
                  <td className="px-5 py-3 text-center text-sm text-[#8888a0]">
                    {project.sort_order}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-1.5 text-[#8888a0] hover:text-[#6366f1] transition-colors rounded-md hover:bg-[#6366f1]/10"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteButton endpoint={`/api/admin/projects/${project.id}`} />
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
