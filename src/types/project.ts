export type ProjectCategory = "web-app" | "mobile-app" | "full-stack" | "ai-ml";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectImpact {
  label: string;
  value: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  sortOrder: number;
  challenge: string;
  role: string;
  approach: string;
  features: ProjectFeature[];
  impact: ProjectImpact[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  coverImage: string;
  screenshots: string[];
  duration: string;
  year: string;
}
