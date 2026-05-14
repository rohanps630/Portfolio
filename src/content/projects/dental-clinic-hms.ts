import type { Project } from "@/types/project";

const dentalClinicHms: Project = {
  slug: "dental-clinic-hms",
  title: "Dental Clinic Management System",
  tagline:
    "Mobile-first healthcare management for small and medium dental clinics",
  description:
    "A native Android application paired with a robust NestJS backend, purpose-built for small and medium dental clinics that need affordable, mobile-first practice management. Covering scheduling with conflict detection, electronic health records, treatment planning, and automated billing, it has been adopted by over 15 clinics and reduced scheduling conflicts by 90%.",
  category: "full-stack",
  featured: false,
  sortOrder: 6,
  challenge:
    "Small dental clinics struggled with managing patient records, scheduling, and billing using outdated paper systems or prohibitively expensive enterprise software designed for hospital-scale operations. Double bookings were common, patient histories were difficult to retrieve during appointments, and billing was a manual, error-prone process. The solution needed to be affordable for independent practices while still meeting healthcare data security standards. It also had to integrate seamlessly into existing clinical workflows without requiring extensive staff training.",
  role: "Primary Developer",
  approach:
    "Built the client as a native Android application in Kotlin, leveraging Jetpack Compose for a modern, responsive UI that feels natural on tablets and phones used in clinical settings. Backed it with a NestJS API on PostgreSQL, implementing row-level security and AES-256 encryption at rest for HIPAA-conscious data handling. Designed the scheduling engine with a constraint-satisfaction algorithm that accounts for procedure duration, provider availability, and room assignment to prevent conflicts. Integrated Firebase Cloud Messaging for automated appointment reminders via SMS and push notifications, with configurable timing and confirmation tracking.",
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
  techStack: ["React", "Go", "PostgreSQL", "Kotlin", "Android SDK"],
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
