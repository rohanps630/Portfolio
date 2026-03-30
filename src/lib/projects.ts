import type { Project, ProjectCategory } from "@/types/project";

import accessibleChatSystem from "@/content/projects/accessible-chat-system";
import learningPortal from "@/content/projects/learning-portal";
import aiAutomationHub from "@/content/projects/ai-automation-hub";
import roofingCrm from "@/content/projects/roofing-crm";
import transitClaims from "@/content/projects/transit-claims";
import dentalClinicHms from "@/content/projects/dental-clinic-hms";

const allProjects: Project[] = [
  accessibleChatSystem,
  learningPortal,
  aiAutomationHub,
  roofingCrm,
  transitClaims,
  dentalClinicHms,
].sort((a, b) => a.sortOrder - b.sortOrder);

export function getProjects(): Project[] {
  return allProjects;
}

export function getFeaturedProjects(): Project[] {
  return allProjects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
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
