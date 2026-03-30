import type { Project } from "@/types/project";

const dentalClinicHms: Project = {
  slug: "dental-clinic-hms",
  title: "Dental Clinic Management System",
  tagline:
    "Mobile-first healthcare management for small and medium dental clinics",
  description:
    "A native Android application paired with a robust NestJS backend, purpose-built for small and medium dental clinics that need affordable, mobile-first practice management — covering scheduling, electronic health records, treatment planning, and billing in one streamlined package.",
  category: "full-stack",
  featured: false,
  sortOrder: 6,
  challenge:
    "Small dental clinics struggled with managing patient records, scheduling, and billing using outdated paper systems or expensive enterprise software. They needed an affordable, mobile-first solution.",
  role: "Lead Developer",
  approach:
    "Native Android development with Kotlin for optimal performance and platform integration, backed by a robust NestJS API. Designed with HIPAA-conscious security practices and intuitive clinical workflows.",
  features: [
    {
      title: "Patient Scheduling with Conflict Detection",
      description:
        "Smart calendar that prevents double bookings, accounts for procedure duration, and suggests optimal appointment slots to maximize daily patient throughput.",
    },
    {
      title: "Electronic Health Records (EHR) Management",
      description:
        "Secure, searchable patient records with dental charting, medical history, allergies, and treatment notes — accessible in seconds during appointments.",
    },
    {
      title: "Treatment Planning and Progress Notes",
      description:
        "Visual treatment plans that map out multi-visit procedures with cost estimates, letting dentists and patients stay aligned on care timelines.",
    },
    {
      title: "Billing and Insurance Claim Management",
      description:
        "Automated billing tied directly to treatment codes, with insurance claim generation and tracking to minimize revenue cycle delays.",
    },
    {
      title: "Appointment Reminders via SMS and Push",
      description:
        "Configurable automated reminders that reduce no-shows through SMS and push notifications, with confirmation tracking for front-desk staff.",
    },
  ],
  impact: [
    {
      label: "Clinic Adoption",
      value: "15+",
      description: "Adopted by 15+ dental clinics",
    },
    {
      label: "Scheduling Conflicts",
      value: "-90%",
      description: "Reduced scheduling conflicts by 90%",
    },
    {
      label: "Patient Wait Times",
      value: "-25%",
      description: "Decreased patient wait times by 25%",
    },
  ],
  techStack: ["Kotlin", "NestJS", "PostgreSQL", "Firebase", "Android SDK"],
  coverImage: "/images/projects/dental-clinic-hms/cover.webp",
  screenshots: [
    "/images/projects/dental-clinic-hms/screenshot-1.webp",
    "/images/projects/dental-clinic-hms/screenshot-2.webp",
    "/images/projects/dental-clinic-hms/screenshot-3.webp",
  ],
  duration: "5 months",
  year: "2024",
};

export default dentalClinicHms;
