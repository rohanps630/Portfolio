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
  featured: number;
  sort_order: number;
  challenge: string;
  role: string;
  approach: string;
  features: string;
  impact: string;
  tech_stack: string;
  live_url: string | null;
  github_url: string | null;
  cover_image: string | null;
  screenshots: string | null;
  duration: string | null;
  year: string | null;
  created_at: string;
  updated_at: string;
}

function rowToProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    category: row.category as ProjectCategory,
    featured: row.featured === 1,
    sortOrder: row.sort_order,
    challenge: row.challenge,
    role: row.role,
    approach: row.approach,
    features: JSON.parse(row.features),
    impact: JSON.parse(row.impact),
    techStack: JSON.parse(row.tech_stack),
    liveUrl: row.live_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    coverImage: row.cover_image ?? "",
    screenshots: row.screenshots ? JSON.parse(row.screenshots) : [],
    duration: row.duration ?? "",
    year: row.year ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tryGetDb(): any {
  if (typeof window !== "undefined") return null;
  try {
    // Dynamic path to prevent bundler from following the import
    const dbModule = "db";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(`@/lib/${dbModule}`);
    return mod.getDb();
  } catch {
    return null;
  }
}

function queryProjects(sql: string, params?: unknown[]): ProjectRow[] {
  const db = tryGetDb();
  if (!db) return [];
  try {
    const stmt = db.prepare(sql);
    return params ? stmt.all(...params) : stmt.all();
  } catch {
    return [];
  }
}

export function getProjects(): Project[] {
  const rows = queryProjects("SELECT * FROM projects ORDER BY sort_order ASC");
  if (rows.length > 0) return rows.map(rowToProject);
  return fileProjects;
}

export function getFeaturedProjects(): Project[] {
  const rows = queryProjects(
    "SELECT * FROM projects WHERE featured = 1 ORDER BY sort_order ASC"
  );
  if (rows.length > 0) return rows.map(rowToProject);
  return fileProjects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const db = tryGetDb();
  if (db) {
    try {
      const row = db
        .prepare("SELECT * FROM projects WHERE slug = ?")
        .get(slug) as ProjectRow | undefined;
      if (row) return rowToProject(row);
    } catch {
      // fall through
    }
  }
  return fileProjects.find((project) => project.slug === slug);
}

export function getProjectCategories(): {
  value: ProjectCategory;
  label: string;
  count: number;
}[] {
  const categoryLabels: Record<ProjectCategory, string> = {
    "web-app": "Web Apps",
    "mobile-app": "Mobile Apps",
    "full-stack": "Full Stack",
    "ai-ml": "AI & ML",
  };

  const allProjects = getProjects();

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
