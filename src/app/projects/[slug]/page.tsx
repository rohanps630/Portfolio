import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Code2 } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectChallenge } from "@/components/projects/ProjectChallenge";
import { ProjectApproach } from "@/components/projects/ProjectApproach";
import { ProjectFeatures } from "@/components/projects/ProjectFeatures";
import { ProjectImpact } from "@/components/projects/ProjectImpact";
import { ProjectTechStack } from "@/components/projects/ProjectTechStack";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: "Project Not Found",
      path: `/projects/${slug}`,
    });
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.title, href: `/projects/${project.slug}` },
  ];

  return (
    <main className="pt-24 pb-0">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <ProjectHero project={project} />

      {/* Challenge */}
      <ProjectChallenge challenge={project.challenge} />

      {/* Approach */}
      <ProjectApproach approach={project.approach} />

      {/* Features */}
      <ProjectFeatures features={project.features} />

      {/* Impact */}
      <ProjectImpact impact={project.impact} />

      {/* Tech Stack */}
      <ProjectTechStack techStack={project.techStack} />

      {/* Links Section */}
      {(project.liveUrl || project.githubUrl) && (
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-accent/30"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View Live Demo
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:bg-muted"
                >
                  <Code2 className="h-4 w-4" aria-hidden />
                  View Source Code
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <ProjectNavigation
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}
