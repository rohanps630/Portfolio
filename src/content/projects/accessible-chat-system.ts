import type { Project } from "@/types/project";

const accessibleChatSystem: Project = {
  slug: "accessible-chat-system",
  title: "Accessible Real-Time Chat System",
  tagline:
    "Inclusive communication platform for individuals with speech and hearing impairments",
  description:
    "A real-time communication platform purpose-built for accessibility, combining WebSocket-powered messaging with text-to-speech and speech-to-text capabilities. Designed to break down communication barriers for individuals with speech and hearing impairments, it delivers sub-100ms message latency with full WCAG 2.1 AA compliance across every interaction.",
  category: "mobile-app",
  featured: true,
  sortOrder: 1,
  challenge:
    "Built for individuals with speech and hearing impairments who face significant barriers in real-time digital communication. Existing chat applications lacked critical accessibility features like text-to-speech and screen reader support, making them effectively unusable for this community. The platform also needed to handle unreliable network conditions gracefully, since many users depend on mobile devices in environments with spotty connectivity. Balancing real-time performance with robust accessibility was a core technical tension that shaped every design decision.",
  role: "Lead Developer",
  approach:
    "Adopted an empathy-driven design methodology, conducting usability sessions with individuals who have speech and hearing impairments to inform every interface decision. Built on a WebSocket architecture using Socket.IO for bidirectional, low-latency messaging with automatic reconnection and message queuing. Integrated the Web Speech API alongside a server-side fallback engine for text-to-speech and speech-to-text conversion, ensuring consistent behavior across devices. Implemented ARIA live regions, logical focus management, and high-contrast theming from the ground up to meet WCAG 2.1 AA compliance.",
  features: [
    {
      title: "Real-Time Messaging with WebSockets",
      description:
        "Low-latency bidirectional communication delivering messages in under 100ms, ensuring conversations feel natural and uninterrupted.",
    },
    {
      title: "Text-to-Speech and Speech-to-Text Integration",
      description:
        "Built-in speech engine that converts typed messages to audio output and spoken words to text, enabling seamless communication across different ability levels.",
    },
    {
      title: "Accessible UI with Screen Reader Support",
      description:
        "Every interface element designed with ARIA labels, logical focus order, and high-contrast visuals to work flawlessly with assistive technologies.",
    },
    {
      title: "Push Notifications with Visual and Haptic Alerts",
      description:
        "Multi-sensory notification system combining visual banners, screen flashes, and haptic feedback so no message goes unnoticed.",
    },
    {
      title: "Offline Message Queuing and Sync",
      description:
        "Messages composed offline are queued locally and delivered automatically when connectivity is restored, ensuring reliability in any environment.",
    },
  ],
  impact: [
    {
      label: "Users Served",
      value: "500+",
      description: "Enabled accessible communication for 500+ users",
    },
    {
      label: "Message Latency",
      value: "<100ms",
      description: "Reduced message delivery latency to under 100ms",
    },
    {
      label: "Accessibility Standard",
      value: "WCAG 2.1 AA",
      description: "Achieved WCAG 2.1 AA compliance",
    },
  ],
  techStack: ["React Native", "WebSockets", "Node.js", "Express", "MongoDB"],
  coverImage: "/images/projects/accessible-chat-system/cover.webp",
  screenshots: [
    "/images/projects/accessible-chat-system/screenshot-1.webp",
    "/images/projects/accessible-chat-system/screenshot-2.webp",
    "/images/projects/accessible-chat-system/screenshot-3.webp",
  ],
  githubUrl: "https://github.com/rohanps630/accessible-chat-app",
  duration: "4 months",
  year: "2023",
};

export default accessibleChatSystem;
