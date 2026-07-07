"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { resumeData } from "@/content/resume";

// Renders directly from resumeData so the About timeline and the resume page
// share one source of truth and cannot drift.
export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-12">
        {resumeData.experience.map((entry, index) => (
          <FadeIn key={entry.company} delay={index * 0.15} direction="up">
            <div className="relative pl-12 md:pl-20">
              {/* Dot */}
              <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-background" />

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-accent">
                    {entry.date}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mt-1">
                    {entry.role}
                  </h3>
                  <p className="text-muted-foreground">{entry.company}</p>
                </div>

                <ul className="space-y-2">
                  {entry.description.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
