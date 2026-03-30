"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/layout/SectionContainer";
import type { Project } from "@/types/project";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="Selected Work"
          title="Projects I'm Proud Of"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.15}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="secondary" size="md">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
