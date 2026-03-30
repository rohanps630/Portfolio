import Link from "next/link";
import sql from "@/lib/db";
import { Plus, Pencil, Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  sort_order: number;
}

export default async function AdminProjectsPage() {
  const projects = await sql`
    SELECT id, title, slug, category, featured, sort_order FROM projects ORDER BY sort_order ASC
  ` as ProjectRow[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Featured
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Order
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">
                  No projects yet. Create your first project.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-border/50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-foreground">{project.title}</p>
                    <p className="text-xs text-muted-foreground">/{project.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    {project.featured ? (
                      <Star size={16} className="inline text-warning fill-warning" />
                    ) : (
                      <Star size={16} className="inline text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="px-5 py-3 text-center text-sm text-muted-foreground">
                    {project.sort_order}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-1.5 text-muted-foreground hover:text-accent transition-colors rounded-md hover:bg-accent/10"
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
