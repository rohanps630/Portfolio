import sql from "@/lib/db";
import type { Project, ProjectCategory } from "@/types/project";

// File-based imports (fallback)
import accessibleChatSystem from "@/content/projects/accessible-chat-system";
import learningPortal from "@/content/projects/learning-portal";
import aiAutomationHub from "@/content/projects/ai-automation-hub";
import roofingCrm from "@/content/projects/roofing-crm";
import transitClaims from "@/content/projects/transit-claims";
import dentalClinicHms from "@/content/projects/dental-clinic-hms";

const fileProjects: Project[] = [
  accessibleChatSystem,
  learningPortal,
  aiAutomationHub,
  roofingCrm,
  transitClaims,
  dentalClinicHms,
].sort((a, b) => a.sortOrder - b.sortOrder);

interface ProjectRow {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  featured: boolean;
  sort_order: number;
  challenge: string;
  role: string;
  approach: string;
  features: { title: string; description: string }[] | string;
  impact: { label: string; value: string; description: string }[] | string;
  tech_stack: string[] | string;
  live_url: string | null;
  github_url: string | null;
  cover_image: string | null;
  screenshots: string[] | string | null;
  duration: string | null;
  year: string | null;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

// Parse a value that may be a JSON string or already-parsed object/array
function parseJson<T>(value: T | string): T {
  if (typeof value === "string") {
    return JSON.parse(value) as T;
  }
  return value;
}

function rowToProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    category: row.category as ProjectCategory,
    featured: row.featured,
    sortOrder: row.sort_order,
    challenge: row.challenge,
    role: row.role,
    approach: row.approach,
    features: parseJson(row.features),
    impact: parseJson(row.impact),
    techStack: parseJson(row.tech_stack),
    liveUrl: row.live_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    coverImage: row.cover_image ?? "",
    screenshots: row.screenshots ? parseJson(row.screenshots) : [],
    duration: row.duration ?? "",
    year: row.year ?? "",
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const rows = await sql<ProjectRow[]>`
      SELECT * FROM projects WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows.map(rowToProject);
  } catch {
    // fall through to file fallback
  }
  return fileProjects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const rows = await sql<ProjectRow[]>`
      SELECT * FROM projects WHERE visible = true AND featured = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows.map(rowToProject);
  } catch {
    // fall through to file fallback
  }
  return fileProjects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const rows = await sql<ProjectRow[]>`
      SELECT * FROM projects WHERE slug = ${slug} AND visible = true
    `;
    if (rows.length > 0) return rowToProject(rows[0]);
  } catch {
    // fall through to file fallback
  }
  return fileProjects.find((project) => project.slug === slug);
}

export async function getProjectCategories(): Promise<{
  value: ProjectCategory;
  label: string;
  count: number;
}[]> {
  const categoryLabels: Record<ProjectCategory, string> = {
    "web-app": "Web Apps",
    "mobile-app": "Mobile Apps",
    "full-stack": "Full Stack",
    "ai-ml": "AI & ML",
  };

  try {
    const rows = await sql<{ category: string; count: string }[]>`
      SELECT category, COUNT(*) as count FROM projects WHERE visible = true GROUP BY category
    `;
    if (rows.length > 0) {
      return rows
        .filter((row) => row.category in categoryLabels)
        .map((row) => ({
          value: row.category as ProjectCategory,
          label: categoryLabels[row.category as ProjectCategory],
          count: parseInt(row.count, 10),
        }));
    }
  } catch {
    // fall through to file fallback
  }

  const allProjects = fileProjects;
  const categoryCounts = allProjects.reduce(
    (acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (Object.keys(categoryLabels) as ProjectCategory[])
    .filter((category) => categoryCounts[category] > 0)
    .map((category) => ({
      value: category,
      label: categoryLabels[category],
      count: categoryCounts[category],
    }));
}
