import type { Project } from "@/types/project";

const roofingCrm: Project = {
  slug: "roofing-crm",
  title: "Roofing Industry CRM",
  tagline:
    "Specialized mobile CRM for roofing contractors and project management",
  description:
    "A mobile-first CRM built specifically for roofing contractors, covering the entire job lifecycle from lead capture and estimation through scheduling, progress tracking, and invoicing. Designed to work reliably on job sites with limited connectivity, it reduces invoicing time by 60% and brings GPS-tagged photo documentation, weather-aware scheduling, and offline-first sync to every project.",
  category: "mobile-app",
  featured: false,
  sortOrder: 4,
  challenge:
    "Roofing contractors relied on paper-based tracking and generic CRMs that didn't fit their field-heavy workflow. Job data was scattered across clipboards, spreadsheets, and text messages, leading to lost estimates and delayed invoicing. They needed a mobile-first solution designed specifically for the roofing trade that could handle the entire job lifecycle from lead capture to final payment. Critically, the app had to function fully offline on remote job sites where cellular coverage is often unreliable.",
  role: "Mobile Developer",
  approach:
    "Employed a domain-driven design methodology, conducting on-site ride-alongs with roofing contractors to map their real-world workflows before writing any code. Built the mobile client in React Native with an offline-first SQLite layer that queues all mutations and syncs via a conflict-resolution algorithm when connectivity returns. Integrated Stripe for in-app payment processing and invoice generation directly from job line items, and connected a hyperlocal weather API to the scheduling module so crews can plan around rain days. Backed the system with a Node.js API on PostgreSQL, storing geotagged photos in AWS S3 with pre-signed URLs for fast, secure retrieval.",
  features: [
    {
      title: "Job Workflow Management",
      description:
        "End-to-end pipeline tracking from initial lead through estimation, scheduling, execution, and completion — with drag-and-drop status updates in the field.",
    },
    {
      title: "Photo Documentation and Progress Tracking",
      description:
        "Geotagged and timestamped photo capture tied to specific jobs, giving contractors a visual history of every project stage for clients and insurance purposes.",
    },
    {
      title: "Invoice Generation and Payment Tracking",
      description:
        "One-tap invoice creation from job data with integrated payment processing, reducing the gap between job completion and getting paid.",
    },
    {
      title: "Weather Integration for Scheduling",
      description:
        "Hyperlocal weather forecasts built into the scheduling view so crews can plan around rain days and optimize their weekly calendar.",
    },
    {
      title: "Offline-Capable for Job Site Use",
      description:
        "Full read-write functionality without an internet connection, with automatic background sync when connectivity returns — critical for remote job sites.",
    },
  ],
  impact: [
    {
      label: "Contractors Served",
      value: "50+",
      description: "Streamlined operations for 50+ contractors",
    },
    {
      label: "Invoicing Time",
      value: "-60%",
      description: "Reduced invoicing time by 60%",
    },
    {
      label: "Tracking Accuracy",
      value: "+80%",
      description: "Improved job tracking accuracy by 80%",
    },
  ],
  techStack: ["React Native", "Node.js", "PostgreSQL", "AWS S3", "Stripe"],
  coverImage: "/images/projects/roofing-crm/cover.webp",
  screenshots: [
    "/images/projects/roofing-crm/screenshot-1.webp",
    "/images/projects/roofing-crm/screenshot-2.webp",
    "/images/projects/roofing-crm/screenshot-3.webp",
  ],
  githubUrl: "https://github.com/rohanps630/roofing-crm",
  duration: "3 months",
  year: "2023",
};

export default roofingCrm;
