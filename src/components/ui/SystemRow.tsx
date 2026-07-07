import { ArrowRight, Box } from "lucide-react";
import type { System } from "@/lib/schemas/system";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MetricFact } from "@/components/ui/MetricFact";
import { ButtonLink } from "@/components/ui/Button";

interface SystemRowProps {
  system: System;
}

export function SystemRow({ system }: SystemRowProps) {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-border last:border-0 group">
      {/* Left Column: Context */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <StatusBadge status={system.status} />
          <span className="text-sm text-muted-foreground font-medium">
            {system.year}
          </span>
        </div>

        <h3 className="font-heading text-3xl font-bold text-foreground">
          {system.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">
          {system.thesis}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {system.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech.name}
              className="mono-label text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <ButtonLink href={`/projects/${system.slug}`}>
            Case study <ArrowRight className="ml-2 w-4 h-4" />
          </ButtonLink>
          <ButtonLink
            href={`/explorer/${system.slug}`}
            variant="secondary"
            className="hidden lg:inline-flex"
          >
            <Box className="mr-2 w-4 h-4" /> Explorer
          </ButtonLink>
        </div>
      </div>

      {/* Right Column: Outcomes & Visual */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          {system.outcomes.slice(0, 2).map((fact) => (
            <div
              key={fact.label}
              className="bg-card border border-border p-4 rounded-xl"
            >
              <MetricFact fact={fact} />
            </div>
          ))}
        </div>

        {/* Placeholder for DiagramThumb (added in Phase 2/3) */}
        <div className="w-full h-48 sm:h-64 bg-card border border-border rounded-xl flex items-center justify-center relative overflow-hidden group-hover:border-accent/30 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <span className="mono-label text-muted-foreground z-10 flex items-center gap-2">
            <Box className="w-4 h-4" /> System Diagram Motif
          </span>
        </div>
      </div>
    </div>
  );
}
