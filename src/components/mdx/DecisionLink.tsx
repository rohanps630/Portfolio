import React from "react";
import Link from "next/link";
import { GitCommitHorizontal } from "lucide-react";

interface DecisionLinkProps {
  id: string;
  system: string;
  title: string;
}

export function DecisionLink({ id, system, title }: DecisionLinkProps) {
  return (
    <Link
      href={`/projects/${system}#decision-${id.toLowerCase()}`}
      className="not-prose my-6 flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors group"
    >
      <div className="p-2 bg-card rounded shadow-sm border border-border shrink-0">
        <GitCommitHorizontal className="h-5 w-5 text-accent" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Architectural Decision: {id}
        </div>
        <div className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {title}
        </div>
      </div>
    </Link>
  );
}
