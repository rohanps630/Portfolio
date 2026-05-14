import type { Project, ProjectCategory } from "@/types/project";

import aiCodeReviewer from "@/content/projects/ai-code-reviewer";
import accessibleChatSystem from "@/content/projects/accessible-chat-system";
import learningPortal from "@/content/projects/learning-portal";
import aiAutomationHub from "@/content/projects/ai-automation-hub";
import roofingCrm from "@/content/projects/roofing-crm";
import transitClaims from "@/content/projects/transit-claims";
import dentalClinicHms from "@/content/projects/dental-clinic-hms";

const projects: Project[] = [
  aiCodeReviewer,
  accessibleChatSystem,
  learningPortal,
  aiAutomationHub,
  roofingCrm,
  transitClaims,
  dentalClinicHms,
].sort((a, b) => a.sortOrder - b.sortOrder);

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
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

  const counts = projects.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (Object.keys(categoryLabels) as ProjectCategory[])
    .filter((c) => counts[c] > 0)
    .map((c) => ({ value: c, label: categoryLabels[c], count: counts[c] }));
}
