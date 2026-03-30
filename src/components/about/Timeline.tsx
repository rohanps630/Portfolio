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
    company: "Innovation Incubator Advisory",
    period: "Jun 2025 — Present",
    bullets: [
      "Building AI-powered products using Google ADK and generative AI frameworks",
      "Designing scalable microservice architectures for early-stage startups",
      "Leading technical strategy and sprint planning for cross-functional teams",
      "Implementing CI/CD pipelines and cloud infrastructure on AWS",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Elsys Intelligent Devices",
    period: "Aug 2023 — May 2025",
    bullets: [
      "Led a team of 5+ developers across multiple product verticals",
      "Redesigned core frontend modules, improving user engagement by 20%",
      "Built React and React Native applications serving thousands of users",
      "Mentored junior developers through code reviews and pair programming",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "JitTech Technology Services",
    period: "Jul 2021 — Jul 2023",
    bullets: [
      "Built scalable backend services with Node.js, NestJS, and Django",
      "Developed production Next.js and Django web applications for clients",
      "Implemented real-time features using WebSockets and event-driven architecture",
      "Delivered cross-platform mobile apps with React Native and Kotlin",
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
