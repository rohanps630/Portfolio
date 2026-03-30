import type { Project } from "@/types/project";

const transitClaims: Project = {
  slug: "transit-claims",
  title: "Transit Claim Reporting System",
  tagline:
    "Streamlined communication between restoration companies and claims adjusters",
  description:
    "A workflow-centric mobile application that digitizes the entire transit damage claim lifecycle — from initial damage reporting through resolution — replacing fragmented phone calls, emails, and paper forms with a single source of truth for all stakeholders.",
  category: "mobile-app",
  featured: false,
  sortOrder: 5,
  challenge:
    "Furniture restoration companies and claims adjusters had no efficient way to communicate about transit damage claims. The process involved phone calls, emails, and paper forms, leading to delays and lost information.",
  role: "Mobile Developer",
  approach:
    "Designed a workflow-centric mobile application that digitizes the entire transit claim lifecycle, from initial damage reporting through resolution, with real-time status updates.",
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
      label: "Digitization",
      value: "100%",
      description: "Digitized 100% of claim documentation",
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
