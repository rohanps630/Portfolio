"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { TechBadge } from "@/components/shared/TechBadge";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const categoryLabels: Record<string, string> = {
  "web-app": "Web App",
  "mobile-app": "Mobile App",
  "full-stack": "Full Stack",
  "ai-ml": "AI & ML",
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <TiltCard>
      <motion.article
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5",
          className
        )}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View case study: ${project.title}`}
        />

        {/* Cover Image */}
        <div className="relative overflow-hidden">
          <ImagePlaceholder
            title={project.title}
            category={project.category}
            aspectRatio="video"
            className="rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-[1]">
            <Badge variant="accent">
              {categoryLabels[project.category] || project.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {project.year} &middot; {project.duration}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              aria-hidden
            />
          </div>

          <h3 className="mb-2 font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {project.tagline}
          </p>

          {/* Tech stack preview */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
            {project.techStack.length > 3 && (
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}
