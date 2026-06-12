"use client";

import { FadeIn } from "@/components/animations/FadeIn";

interface TimelineEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

const experiences: TimelineEntry[] = [
  {
    title: "Lead Full-Stack Engineer",
    company: "Innovation Incubator Advisory",
    period: "Jun 2024 — Present",
    bullets: [
      "Leading the frontend re-architecture for a multi-agent customer operations platform.",
      "Establishing observability baselines (OpenTelemetry) for non-deterministic LLM flows.",
      "Architecting state-machine-driven UIs to handle complex agent orchestration streams.",
      "Collaborating across teams to deliver production-ready, AI-integrated features.",
    ],
  },
  {
    title: "Senior Full Stack Engineer",
    company: "Elsys Intelligent Devices",
    period: "Aug 2023 — May 2024",
    bullets: [
      "Architected a unified React Native Web POS system powering hundreds of retail terminals.",
      "Enforced strict state machines for transactional flows, ensuring offline persistence.",
      "Redesigned key modules, improving user engagement and application resilience.",
      "Mentored developers and enforced clean coding, architectural standards, and review practices.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "JitTech Technology Services",
    period: "Jul 2021 — Jul 2023",
    bullets: [
      "Built scalable backend services using Node.js and NestJS for cross-platform platforms.",
      "Implemented real-time collaboration features using WebSockets and Redis.",
      "Delivered cross-platform mobile apps with local-first data synchronization capabilities.",
    ],
  },
];

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-12">
        {experiences.map((entry, index) => (
          <FadeIn key={entry.company} delay={index * 0.15} direction="up">
            <div className="relative pl-12 md:pl-20">
              {/* Dot */}
              <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-background" />

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-accent">
                    {entry.period}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mt-1">
                    {entry.title}
                  </h3>
                  <p className="text-muted-foreground">{entry.company}</p>
                </div>

                <ul className="space-y-2">
                  {entry.bullets.map((bullet) => (
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
