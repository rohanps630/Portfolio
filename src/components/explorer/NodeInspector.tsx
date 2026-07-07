"use client";

import React from "react";
import { ArchitectureNode } from "@/lib/schemas/architecture";
import { TechBadge } from "@/components/shared/TechBadge";
import { FileCode2, ExternalLink } from "lucide-react";

interface NodeInspectorProps {
  node: ArchitectureNode | null;
  system: string;
  mode: "full" | "conceptual";
}

export function NodeInspector({ node, system, mode }: NodeInspectorProps) {
  if (!node) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-muted-foreground">
        Select a component to inspect its architecture decisions and tradeoffs.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <header>
        <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
          {node.kind}
        </div>
        <h2 className="text-2xl font-bold text-foreground leading-tight">
          {node.label}
        </h2>
        {node.illustrative && (
          <span className="inline-flex mt-2 items-center gap-1.5 rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-foreground ring-1 ring-inset ring-warning/40">
            <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
            Illustrative
          </span>
        )}
      </header>

      <section>
        <p className="text-foreground leading-relaxed">{node.summary}</p>
      </section>

      {node.tech && node.tech.length > 0 && (
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {node.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </section>
      )}

      {node.rationale && (
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Rationale</h3>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-foreground">{node.rationale}</p>
          </div>
        </section>
      )}

      {node.tradeoffs && node.tradeoffs.length > 0 && (
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Tradeoffs</h3>
          <ul className="space-y-2">
            {node.tradeoffs.map((t, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-destructive mt-0.5">-</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* GitHub Repo Path (Full mode only) */}
      {mode === "full" && node.repoPath && (
        <section>
          <a
            href={`https://github.com/rohanps630/${system}/blob/main/${node.repoPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full p-4 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-colors group"
          >
            <FileCode2 className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">View Source Code</p>
              <p className="text-xs text-muted-foreground truncate">{node.repoPath}</p>
            </div>
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>
      )}
    </div>
  );
}
