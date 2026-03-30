"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
  className?: string;
}

export function ProjectNavigation({
  prevProject,
  nextProject,
  className,
}: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Project navigation"
      className={cn("border-t border-border py-12 md:py-16", className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Previous project */}
          <div>
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col items-start gap-2 rounded-xl border border-border p-4 transition-colors hover:border-accent/40 hover:bg-card sm:p-6"
              >
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ArrowLeft
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                    aria-hidden
                  />
                  Previous
                </span>
                <span className="font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-accent sm:text-base">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Next project */}
          <div>
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end gap-2 rounded-xl border border-border p-4 text-right transition-colors hover:border-accent/40 hover:bg-card sm:p-6"
              >
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  Next
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
                <span className="font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-accent sm:text-base">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
