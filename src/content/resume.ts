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
      role: "Software Engineer",
      date: "Jun 2024 — Present",
      description: [
        "Building the frontend architecture and agent integration for a multi-tenant, multi-agent customer operations assistant (Next.js, React, Strands Agents, AWS Bedrock).",
        "Replaced a third-party chat SDK with an in-house streaming layer on the AG-UI protocol, fixing duplicated and truncated replies.",
        "Designed backend-checked confirmation for risky agent actions and fail-closed, per-request tenant resolution.",
        "Added end-to-end Datadog tracing (browser to upstream APIs) and a property-based test baseline (fast-check, Hypothesis).",
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
