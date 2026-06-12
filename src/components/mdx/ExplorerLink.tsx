import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface ExplorerLinkProps {
  slug: string;
  title: string;
  description?: string;
}

export function ExplorerLink({ slug, title, description }: ExplorerLinkProps) {
  return (
    <Link
      href={`/explorer/${slug}`}
      className="not-prose my-6 flex items-start gap-4 p-5 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/10 hover:border-accent/40 transition-colors group"
    >
      <div className="p-2.5 bg-accent/10 rounded-lg shrink-0 mt-0.5">
        <Search className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-1 flex items-center justify-between">
          <span>Interactive Architecture Explorer</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Open &rarr;</span>
        </div>
        <div className="font-bold text-foreground mb-1">
          {title}
        </div>
        {description && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
