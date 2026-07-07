import type { System } from "@/lib/schemas/system";

export const accessibleChatSystem: System = {
  "slug": "accessible-chat-system",
  "title": "Accessible Real-Time Chat System",
  "thesis": "Inclusive communication platform for individuals with speech and hearing impairments",
  "tier": 2,
  "domain": "products",
  "context": "production",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built under confidentiality limits. Numbers are approximate.",
  "role": "Primary Developer",
  "timeline": {
    "start": "2023"
  },
  "year": "2023",
  "executiveSummary": "A real-time communication platform purpose-built for accessibility, combining WebSocket-powered messaging with text-to-speech and speech-to-text capabilities. Designed to break down communication barriers for individuals with speech and hearing impairments, it delivers sub-100ms message latency with full WCAG 2.1 AA compliance across every interaction.",
  "businessContext": "Mainstream chat applications were built for able-bodied users and left individuals with speech and hearing impairments with no usable real-time communication option. The goal was a platform designed from first principles for accessibility — where text-to-speech, speech-to-text, and ARIA-first semantics were core requirements rather than afterthoughts.",
  "problemStatement": "Built for individuals with speech and hearing impairments who face significant barriers in real-time digital communication. Existing chat applications lacked critical accessibility features like text-to-speech and screen reader support, making them effectively unusable for this community. The platform also needed to handle unreliable network conditions gracefully, since many users depend on mobile devices in environments with spotty connectivity. Balancing real-time performance with robust accessibility was a core technical tension that shaped every design decision.",
  "constraints": [
    {
      "kind": "team",
      "text": "Inherited constraints from legacy project format."
    }
  ],
  "solutionOverview": "Adopted an empathy-driven design methodology, conducting usability sessions with individuals who have speech and hearing impairments to inform every interface decision. Built on a WebSocket architecture using Socket.IO for bidirectional, low-latency messaging with automatic reconnection and message queuing. Integrated the Web Speech API alongside a server-side fallback engine for text-to-speech and speech-to-text conversion, ensuring consistent behavior across devices. Implemented ARIA live regions, logical focus management, and high-contrast theming from the ground up to meet WCAG 2.1 AA compliance.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Real-Time Messaging with WebSockets",
      "decision": "Low-latency bidirectional communication delivering messages in under 100ms, ensuring conversations feel natural and uninterrupted.",
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
      "title": "Text-to-Speech and Speech-to-Text Integration",
      "decision": "Built-in speech engine that converts typed messages to audio output and spoken words to text, enabling seamless communication across different ability levels.",
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
      "title": "Accessible UI with Screen Reader Support",
      "decision": "Every interface element designed with ARIA labels, logical focus order, and high-contrast visuals to work flawlessly with assistive technologies.",
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
      "title": "Push Notifications with Visual and Haptic Alerts",
      "decision": "Multi-sensory notification system combining visual banners, screen flashes, and haptic feedback so no message goes unnoticed.",
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
      "title": "Offline Message Queuing and Sync",
      "decision": "Messages composed offline are queued locally and delivered automatically when connectivity is restored, ensuring reliability in any environment.",
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
      "name": "React Native"
    },
    {
      "name": "WebSockets"
    },
    {
      "name": "Node.js"
    },
    {
      "name": "Express"
    },
    {
      "name": "MongoDB"
    }
  ],
  "outcomes": [
    {
      "value": "500+",
      "label": "Users Served",
      "description": "Enabled accessible communication for 500+ users",
      "provenance": "measured"
    },
    {
      "value": "<100ms",
      "label": "Message Latency",
      "description": "Reduced message delivery latency to under 100ms",
      "provenance": "measured"
    },
    {
      "value": "WCAG 2.1 AA",
      "label": "Accessibility Standard",
      "description": "Achieved WCAG 2.1 AA compliance",
      "provenance": "measured"
    }
  ],
  "evidence": [],
  "screenshots": [
    {
      "src": "/images/projects/accessible-chat-system/screenshot-1.webp",
      "alt": "Accessible Real-Time Chat System screenshot"
    },
    {
      "src": "/images/projects/accessible-chat-system/screenshot-2.webp",
      "alt": "Accessible Real-Time Chat System screenshot"
    },
    {
      "src": "/images/projects/accessible-chat-system/screenshot-3.webp",
      "alt": "Accessible Real-Time Chat System screenshot"
    }
  ],
  "lessons": [
    "Testing with actual users who have speech and hearing impairments revealed assumptions we hadn't noticed — default browser speech synthesis sounded nothing like natural speech on lower-end Android devices, which forced a server-side fallback engine we hadn't planned for.",
    "ARIA live regions need to be tuned carefully in a chat context: announcing every message immediately interrupts the screen reader mid-sentence. The right pattern was a politeness level that batched rapid messages rather than interrupting on each one."
  ],
  "featured": false,
  "sortOrder": 4,
  "coverImage": "/images/projects/accessible-chat-system/cover.webp"
};

export default accessibleChatSystem;
