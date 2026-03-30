"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { FadeIn } from "@/components/animations/FadeIn";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
  className?: string;
}

export function ProjectHero({ project, className }: ProjectHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background Image */}
      <div className="relative">
        <ImagePlaceholder
          title={project.title}
          category={project.category}
          aspectRatio="video"
          className="rounded-none border-0 md:aspect-[21/9]"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
            <FadeIn direction="up" delay={0.1}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="accent">{project.role}</Badge>
                <Badge variant="outline">{project.duration}</Badge>
                <Badge variant="outline">{project.year}</Badge>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                {project.tagline}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
