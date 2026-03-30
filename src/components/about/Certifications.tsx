"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { TechBadge } from "@/components/shared/TechBadge";

const tools = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Docker",
  "AWS",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Figma",
  "VS Code",
];

export function Certifications() {
  return (
    <FadeIn>
      <div className="rounded-2xl border border-border bg-card/50 p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Certifications & Tools
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Certifications will be added here soon. In the meantime, here are the
          tools I work with daily.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {tools.map((tool) => (
            <TechBadge key={tool} name={tool} />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
