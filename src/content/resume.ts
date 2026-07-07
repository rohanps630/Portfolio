// Resume content — the single source of truth for experience entries. The
// About-page timeline (src/components/about/Timeline.tsx) renders from this
// object, so the two cannot drift. Identity fields are kept in sync with
// src/content/site.ts. Validated against resumeSchema by validate-content.
//
// TODO (owner action required — cannot be inferred from the repo): add real
// `education` entries (institution, degree, dates). Until then the resume renders
// without an Education section rather than shipping placeholder data.
export const resumeData = {
  name: "Rohan P. Suresh",
  title: "Full Stack & AI Integration Engineer",
  email: "rohanpsuresh@gmail.com",
  location: "Kottayam, Kerala, India",
  summary:
    "Full-stack engineer with 5 years building web, mobile, and AI-integrated systems across React, React Native, Next.js, Node.js, Go, and Python. I focus on shipping production-ready products — state-machine-driven UIs, real-time features, and observability for non-deterministic LLM flows.",
  experience: [
    {
      company: "Innovation Incubator Advisory",
      role: "Lead Full-Stack Engineer",
      date: "Jun 2024 — Present",
      description: [
        "Leading the frontend re-architecture for a multi-agent customer operations platform.",
        "Establishing observability baselines (OpenTelemetry) for non-deterministic LLM flows.",
        "Architecting state-machine-driven UIs to handle complex agent orchestration streams.",
        "Collaborating across teams to deliver production-ready, AI-integrated features.",
      ],
    },
    {
      company: "Elsys Intelligent Devices",
      role: "Senior Full Stack Engineer",
      date: "Aug 2023 — May 2024",
      description: [
        "Architected a unified React Native Web POS system powering hundreds of retail terminals.",
        "Enforced strict state machines for transactional flows, ensuring offline persistence.",
        "Redesigned key modules, improving user engagement and application resilience.",
        "Mentored developers and enforced clean coding, architectural, and code-review standards.",
      ],
    },
    {
      company: "JitTech Technology Services",
      role: "Full Stack Developer",
      date: "Jul 2021 — Jul 2023",
      description: [
        "Built backend services with Node.js and NestJS for cross-platform products.",
        "Implemented real-time collaboration features using WebSockets and Redis.",
        "Delivered cross-platform mobile apps with local-first data synchronization.",
      ],
    },
  ],
  education: [] as { institution: string; degree: string; date: string }[],
  skills: [
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "NestJS",
    "Go",
    "Python",
  ],
};
