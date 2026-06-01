import { Suspense } from "react";
import { getProjects, getProjectCategories } from "@/lib/projects";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import type { ProjectCategory } from "@/types/project";

export const metadata = createMetadata({
  title: "Projects — Web, Mobile & AI Case Studies",
  description:
    "Portfolio of full-stack web, mobile, and AI-integrated products by Rohan P. Suresh — case studies built with React, Next.js, Node.js, Go & LLMs.",
  path: "/projects",
});

interface ProjectsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { category } = await searchParams;
  const [allProjects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);

  const filteredProjects = category
    ? allProjects.filter((p) => p.category === (category as ProjectCategory))
    : allProjects;

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          label="Portfolio"
          title="Projects by Rohan P. Suresh"
          subtitle="A collection of full-stack, mobile, and AI-integrated products I've built — from concept to production. Each one represents a unique challenge and a story worth telling."
        />

        <Suspense fallback={null}>
          <ProjectFilter
            categories={categories}
            totalCount={allProjects.length}
          />
        </Suspense>

        <ProjectGrid projects={filteredProjects} />
      </div>
    </main>
  );
}
