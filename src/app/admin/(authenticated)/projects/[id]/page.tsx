import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface ProjectRow {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  featured: number;
  sort_order: number;
  challenge: string;
  role: string;
  approach: string;
  features: string;
  impact: string;
  tech_stack: string;
  duration: string;
  year: string;
  live_url: string;
  github_url: string;
  cover_image: string;
  screenshots: string;
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as
    | ProjectRow
    | undefined;

  if (!row) {
    notFound();
  }

  const project = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    featured: Boolean(row.featured),
    sort_order: row.sort_order,
    challenge: row.challenge || "",
    role: row.role || "",
    approach: row.approach || "",
    features: row.features ? JSON.parse(row.features) : [],
    impact: row.impact ? JSON.parse(row.impact) : [],
    tech_stack: row.tech_stack ? JSON.parse(row.tech_stack) : [],
    duration: row.duration || "",
    year: row.year || "",
    live_url: row.live_url || "",
    github_url: row.github_url || "",
    cover_image: row.cover_image || "",
    screenshots: row.screenshots ? JSON.parse(row.screenshots) : [],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-[#f0f0f5]">
        Edit Project
      </h1>
      <ProjectForm initialData={project} />
    </div>
  );
}
