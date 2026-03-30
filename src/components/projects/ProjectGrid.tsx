"use client";

import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </AnimatePresence>
    </div>
  );
}
