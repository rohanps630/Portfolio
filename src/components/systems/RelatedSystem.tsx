import React from "react";
import Link from "next/link";
import { getSystemBySlug } from "@/lib/systems";
import { ArrowRight, Code2 } from "lucide-react";

export async function RelatedSystem({ systemSlug }: { systemSlug: string }) {
  const system = await getSystemBySlug(systemSlug);
  
  if (!system) return null;

  return (
    <div className="my-8 p-6 bg-card border border-border rounded-xl">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-muted rounded-lg shrink-0">
          <Code2 className="h-6 w-6 text-foreground" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-1 block">
            Context: Deployed System
          </span>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {system.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {system.executiveSummary}
          </p>
          <Link
            href={`/projects/${system.slug}`}
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            View Full Case Study
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
