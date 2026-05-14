import type { Project } from "@/types/project";

const aiAutomationHub: Project = {
  slug: "ai-automation-hub",
  title: "AI-Powered Automation Hub",
  tagline:
    "Intelligent customer support and lead generation with AI voice agents",
  description:
    "An AI-driven platform that transforms customer support and lead generation through intelligent voice agents, automated workflows, and real-time conversation analytics. By combining NLP-powered voice agents with machine learning lead scoring, it helps businesses respond to inquiries in under two minutes and increase lead conversion rates by up to 45%.",
  category: "ai-ml",
  featured: true,
  sortOrder: 3,
  challenge:
    "Businesses were losing potential customers due to slow response times and inconsistent support quality across multiple communication channels. Their existing support infrastructure averaged four-hour response times and lacked any intelligent routing or prioritization, causing high-value leads to go cold. They needed an AI-powered solution that could handle customer interactions autonomously while maintaining a human touch and knowing when to escalate. The system also had to integrate with existing CRM and telephony infrastructure without requiring a costly migration.",
  role: "Primary Full Stack Developer",
  approach:
    "Architected an event-driven microservices platform using NestJS with a message queue backbone powered by Redis Streams for reliable asynchronous processing. Integrated Twilio Programmable Voice for inbound and outbound call handling, layering OpenAI GPT models on top for real-time natural language understanding and context-aware response generation. Built a custom ML pipeline for lead scoring that analyzes conversation sentiment, engagement patterns, and demographic signals to prioritize the highest-value prospects. Implemented a React-based operator dashboard with live WebSocket feeds for real-time conversation monitoring, analytics, and manual escalation controls.",
  features: [
    {
      title: "AI-Powered Voice Agents via Twilio Integration",
      description:
        "Conversational voice agents that handle inbound and outbound calls with natural language understanding, routing complex cases to human agents when needed.",
    },
    {
      title: "Intelligent Lead Scoring and Qualification",
      description:
        "Machine-learning models that analyze conversation signals, engagement patterns, and demographic data to prioritize the highest-value prospects automatically.",
    },
    {
      title: "Automated Customer Support Workflows",
      description:
        "Configurable automation pipelines that resolve routine inquiries end-to-end, from ticket creation through resolution and follow-up.",
    },
    {
      title: "Real-Time Analytics and Conversation Insights",
      description:
        "Live dashboards surfacing sentiment trends, resolution rates, and agent performance so teams can optimize operations on the fly.",
    },
    {
      title: "Multi-Channel Communication",
      description:
        "Unified inbox spanning voice, chat, and email so customers get consistent service regardless of how they reach out.",
    },
  ],
  impact: [
    {
      label: "Inquiry Automation",
      value: "70%",
      description: "Automated 70% of routine customer inquiries",
    },
    {
      label: "Lead Conversion",
      value: "+45%",
      description: "Increased lead conversion rate by 45%",
    },
    {
      label: "Response Time",
      value: "<2 min",
      description:
        "Reduced average response time from 4 hours to under 2 minutes",
    },
  ],
  techStack: [
    "React",
    "NestJS",
    "MongoDB",
    "Twilio",
    "OpenAI API",
    "Redis",
    "Docker",
  ],
  coverImage: "/images/projects/ai-automation-hub/cover.webp",
  screenshots: [
    "/images/projects/ai-automation-hub/screenshot-1.webp",
    "/images/projects/ai-automation-hub/screenshot-2.webp",
    "/images/projects/ai-automation-hub/screenshot-3.webp",
  ],
  duration: "5 months",
  year: "2024",
};

export default aiAutomationHub;
