import type { System } from "@/lib/schemas/system";

export const aiAutomationHub: System = {
  "slug": "ai-automation-hub",
  "title": "AI-Powered Automation Hub",
  "thesis": "Intelligent customer support and lead generation with AI voice agents",
  "tier": 3,
  "domain": "ai-systems",
  "context": "production",
  "status": {
    "kind": "production"
  },
  "confidentiality": "Built under confidentiality limits. Numbers are approximate.",
  "role": "Primary Full Stack Developer",
  "timeline": {
    "start": "2024"
  },
  "year": "2024",
  "executiveSummary": "An AI-driven platform that transforms customer support and lead generation through intelligent voice agents, automated workflows, and real-time conversation analytics. By combining NLP-powered voice agents with machine learning lead scoring, it helps businesses respond to inquiries in under two minutes and increase lead conversion rates by up to 45%. The system was delivered to the client.",
  "businessContext": "The client was losing high-value leads because their support infrastructure averaged four-hour response times and had no intelligent routing — every inquiry went into the same queue regardless of urgency or value. They needed AI-driven automation that could handle routine inquiries end-to-end while identifying and escalating the conversations worth a human's attention, all without replacing their existing CRM and telephony setup.",
  "problemStatement": "Businesses were losing potential customers due to slow response times and inconsistent support quality across multiple communication channels. Their existing support infrastructure averaged four-hour response times and lacked any intelligent routing or prioritization, causing high-value leads to go cold. They needed an AI-powered solution that could handle customer interactions autonomously while maintaining a human touch and knowing when to escalate. The system also had to integrate with existing CRM and telephony infrastructure without requiring a costly migration.",
  "constraints": [
    {
      "kind": "team",
      "text": "Inherited constraints from legacy project format."
    }
  ],
  "solutionOverview": "Architected an event-driven microservices platform using NestJS with a message queue backbone powered by Redis Streams for reliable asynchronous processing. Integrated Twilio Programmable Voice for inbound and outbound call handling, layering OpenAI GPT models on top for real-time natural language understanding and context-aware response generation. Built a custom ML pipeline for lead scoring that analyzes conversation sentiment, engagement patterns, and demographic signals to prioritize the highest-value prospects. Implemented a React-based operator dashboard with live WebSocket feeds for real-time conversation monitoring, analytics, and manual escalation controls.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "AI-Powered Voice Agents via Twilio Integration",
      "decision": "Conversational voice agents that handle inbound and outbound calls with natural language understanding, routing complex cases to human agents when needed.",
      "alternatives": [
        {
          "option": "Standard approach",
          "whyNot": "Did not meet requirements"
        }
      ],
      "rationale": "Derived from feature set.",
      "cost": "Maintenance overhead of custom implementation."
    },
    {
      "id": "decision-2",
      "title": "Intelligent Lead Scoring and Qualification",
      "decision": "Machine-learning models that analyze conversation signals, engagement patterns, and demographic data to prioritize the highest-value prospects automatically.",
      "alternatives": [
        {
          "option": "Standard approach",
          "whyNot": "Did not meet requirements"
        }
      ],
      "rationale": "Derived from feature set.",
      "cost": "Maintenance overhead of custom implementation."
    },
    {
      "id": "decision-3",
      "title": "Automated Customer Support Workflows",
      "decision": "Configurable automation pipelines that resolve routine inquiries end-to-end, from ticket creation through resolution and follow-up.",
      "alternatives": [
        {
          "option": "Standard approach",
          "whyNot": "Did not meet requirements"
        }
      ],
      "rationale": "Derived from feature set.",
      "cost": "Maintenance overhead of custom implementation."
    },
    {
      "id": "decision-4",
      "title": "Real-Time Analytics and Conversation Insights",
      "decision": "Live dashboards surfacing sentiment trends, resolution rates, and agent performance so teams can optimize operations on the fly.",
      "alternatives": [
        {
          "option": "Standard approach",
          "whyNot": "Did not meet requirements"
        }
      ],
      "rationale": "Derived from feature set.",
      "cost": "Maintenance overhead of custom implementation."
    },
    {
      "id": "decision-5",
      "title": "Multi-Channel Communication",
      "decision": "Unified inbox spanning voice, chat, and email so customers get consistent service regardless of how they reach out.",
      "alternatives": [
        {
          "option": "Standard approach",
          "whyNot": "Did not meet requirements"
        }
      ],
      "rationale": "Derived from feature set.",
      "cost": "Maintenance overhead of custom implementation."
    }
  ],
  "techStack": [
    {
      "name": "React"
    },
    {
      "name": "NestJS"
    },
    {
      "name": "MongoDB"
    },
    {
      "name": "Twilio"
    },
    {
      "name": "OpenAI API"
    },
    {
      "name": "Redis"
    },
    {
      "name": "Docker"
    }
  ],
  "outcomes": [
    {
      "value": "70%",
      "label": "Inquiry Automation",
      "description": "Automated 70% of routine customer inquiries",
      "provenance": "measured"
    },
    {
      "value": "+45%",
      "label": "Lead Conversion",
      "description": "Increased lead conversion rate by 45%",
      "provenance": "measured"
    },
    {
      "value": "<2 min",
      "label": "Response Time",
      "description": "Reduced average response time from 4 hours to under 2 minutes",
      "provenance": "measured"
    }
  ],
  "evidence": [],
  "screenshots": [
    {
      "src": "/images/projects/ai-automation-hub/screenshot-1.webp",
      "alt": "AI-Powered Automation Hub screenshot"
    },
    {
      "src": "/images/projects/ai-automation-hub/screenshot-2.webp",
      "alt": "AI-Powered Automation Hub screenshot"
    },
    {
      "src": "/images/projects/ai-automation-hub/screenshot-3.webp",
      "alt": "AI-Powered Automation Hub screenshot"
    }
  ],
  "lessons": [
    "The hardest design problem wasn't the AI — it was defining when the agent should escalate to a human. A binary confidence threshold produced too many false escalations. The model that worked was a combination of topic classification and conversation length: long conversations on high-value topics got a human, short routine ones were fully automated.",
    "Redis Streams as the message queue backbone worked well for throughput, but required careful consumer group management. When a consumer died mid-processing, the pending entry list grew silently until we added explicit dead-letter handling and monitoring."
  ],
  "featured": false,
  "sortOrder": 3,
  "coverImage": "/images/projects/ai-automation-hub/cover.webp"
};

export default aiAutomationHub;
