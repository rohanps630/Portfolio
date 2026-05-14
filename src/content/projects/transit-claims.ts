import type { Project } from "@/types/project";

const transitClaims: Project = {
  slug: "transit-claims",
  title: "Transit Claim Reporting System",
  tagline:
    "Streamlined communication between restoration companies and claims adjusters",
  description:
    "A workflow-centric mobile application that digitizes the entire transit damage claim lifecycle, from initial damage reporting through resolution. By replacing fragmented phone calls, emails, and paper forms with a single source of truth, it cuts claim processing time by 40% and eliminates 70% of communication errors between restoration companies and adjusters.",
  category: "mobile-app",
  featured: false,
  sortOrder: 5,
  challenge:
    "Furniture restoration companies and claims adjusters had no efficient way to communicate about transit damage claims. The existing process was fragmented across phone calls, emails, and paper forms, leading to frequent delays, lost documentation, and disputed liability. There was no single source of truth for claim status, so stakeholders wasted hours tracking down updates manually. The solution needed to support annotated photo evidence, digital signatures, and automated workflow progression while remaining simple enough for non-technical field staff to adopt immediately.",
  role: "Mobile Developer",
  approach:
    "Designed a state-machine-driven workflow engine that models each claim as a series of well-defined stages with configurable transition rules and automatic escalation timers. Built the mobile client in React Native with a camera integration that captures high-resolution, geotagged photos and provides on-device annotation tools for marking up damage. Implemented a real-time notification system using Firebase Cloud Messaging so all stakeholders receive instant updates on claim status changes. Added server-side PDF generation for auto-populated claim forms and integrated a legally binding e-signature SDK to eliminate manual paperwork entirely.",
  features: [
    {
      title: "Photo-Based Damage Documentation with Annotations",
      description:
        "High-resolution photo capture with markup tools for circling, highlighting, and annotating damage — creating clear, indisputable evidence for every claim.",
    },
    {
      title: "Real-Time Status Tracking for All Stakeholders",
      description:
        "A shared timeline view that keeps restoration companies, adjusters, and clients aligned on claim progress without a single phone call.",
    },
    {
      title: "Automated Claim Lifecycle Management",
      description:
        "Rule-based workflows that automatically advance claims through stages, trigger reviews, and escalate overdue items to keep processing on track.",
    },
    {
      title: "Document Generation and Digital Signatures",
      description:
        "Auto-populated claim forms and reports with legally binding e-signature capture, eliminating manual paperwork and reducing turnaround.",
    },
    {
      title: "Push Notifications for Claim Updates",
      description:
        "Instant alerts when a claim changes status, a document is signed, or action is required — so nothing falls through the cracks.",
    },
  ],
  impact: [
    {
      label: "Processing Time",
      value: "-40%",
      description: "Reduced claim processing time by 40%",
    },
    {
      label: "Communication Errors",
      value: "-70%",
      description: "Decreased communication errors by 70%",
    },
    {
      label: "Paper Replaced",
      value: "End-to-end",
      description: "Replaced paper-based claim documentation with a digital lifecycle",
    },
  ],
  techStack: ["React Native", "Node.js", "Express", "MongoDB", "AWS S3"],
  coverImage: "/images/projects/transit-claims/cover.webp",
  screenshots: [
    "/images/projects/transit-claims/screenshot-1.webp",
    "/images/projects/transit-claims/screenshot-2.webp",
    "/images/projects/transit-claims/screenshot-3.webp",
  ],
  duration: "3 months",
  year: "2022",
};

export default transitClaims;
