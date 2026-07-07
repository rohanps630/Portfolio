export const siteConfig = {
  name: "Rohan P. Suresh",
  title: "Rohan P. Suresh — Full Stack & AI Integration Engineer",
  description: "Rohan P. Suresh — full-stack engineer building web, mobile, and AI-integrated systems with React, React Native, Next.js, Node.js & modern LLM tooling.",
  tagline: "Web, mobile, and AI — built to ship.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rohan.codenforge.com",
  contact: {
    email: "rohanpsuresh@gmail.com",
    phone: "+91 8921355003",
    location: "Kottayam, Kerala, India",
    whatsapp: "https://wa.me/918921355003"
  },
  social: {
    github: "https://github.com/rohanps630",
    linkedin: "https://linkedin.com/in/rohanpsuresh"
  },
  stats: [
    { label: "Years Building", value: "5" },
    { label: "Products Shipped", value: "7+" },
    { label: "AI Integrations", value: "4+" }
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Notes", href: "/notes" },
    { label: "Contact", href: "/contact" }
  ],
  techStack: [
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Go",
    "Python",
    "Django",
    "Kotlin",
    "PostgreSQL",
    "pgvector",
    "MongoDB",
    "Docker",
    "AWS",
    "Google ADK",
    "Gemini",
    "Tailwind CSS",
    "GraphQL",
    "WebSockets"
  ]
} as const;
