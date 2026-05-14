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
    title: "Software Engineer",
    company: "Innovation Incubator Advisory, Trivandrum",
    period: "Jun 2025 — Present",
    bullets: [
      "Working on scalable web and mobile solutions with focus on performance and architecture",
      "Integrating Google ADK and generative AI into product workflows",
      "Contributing to product design, development, and optimization across the stack",
      "Collaborating across teams to deliver production-ready features",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Elsys Intelligent Devices, Trivandrum",
    period: "Aug 2023 — May 2025",
    bullets: [
      "Built high-performance React.js applications with optimized rendering",
      "Developed cross-platform mobile apps using React Native",
      "Redesigned key modules, improving user engagement by ~20%",
      "Mentored developers and enforced clean coding and review practices",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "JitTech Technology Services, Trivandrum",
    period: "Jul 2021 — Jul 2023",
    bullets: [
      "Built scalable backend services using Node.js and NestJS",
      "Developed web apps using Next.js and Django with clean API integration",
      "Implemented real-time features using WebSockets and push notifications",
      "Delivered cross-platform mobile apps with consistent UX",
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
