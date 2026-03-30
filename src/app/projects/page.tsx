import { Suspense } from "react";
import { getProjects, getProjectCategories } from "@/lib/projects";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import type { ProjectCategory } from "@/types/project";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of web apps, mobile apps, and full-stack products. Each project showcases real-world problem solving with modern technologies.",
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
          label="Portfolio"
          title="My Work"
          subtitle="A collection of projects I've built, from concept to production. Each one represents a unique challenge and a story worth telling."
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
