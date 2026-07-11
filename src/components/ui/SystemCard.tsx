import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { System } from "@/lib/schemas/system";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MetricFact } from "@/components/ui/MetricFact";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";

interface SystemCardProps {
  system: System;
  // Resolved server-side (file-existence checked); absent → designed fallback.
  coverSrc?: string;
}

export function SystemCard({ system, coverSrc }: SystemCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-md group relative">
      {coverSrc ? (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
          <Image
            src={coverSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <ImagePlaceholder title={system.title} aspectRatio="video" />
      )}
      <div className="p-6 flex flex-col flex-grow gap-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {system.title}
          </h3>
          <StatusBadge status={system.status} />
        </div>

        {system.outcomes.length > 0 && system.tier <= 2 && (
          <div className="py-3 mb-2 border-y border-border/50">
            <MetricFact fact={system.outcomes[0]} />
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-3 mb-2 flex-grow">
          {system.thesis}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {system.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech.name}
              className="mono-label text-[0.7rem] bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
            >
              {tech.name}
            </span>
          ))}
          {system.techStack.length > 3 && (
            <span className="mono-label text-[0.7rem] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
              +{system.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
      <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
          View case study
        </span>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
      </div>
      <Link href={`/projects/${system.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {system.title}</span>
      </Link>
    </Card>
  );
}
