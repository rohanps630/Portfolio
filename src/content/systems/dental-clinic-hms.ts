import type { System } from "@/lib/schemas/system";

export const dentalClinicHms: System = {
  "slug": "dental-clinic-hms",
  "title": "Dental Clinic Management System",
  "thesis": "Mobile-first healthcare management for small and medium dental clinics",
  "tier": 3,
  "domain": "platforms",
  "context": "production",
  "status": {
    "kind": "production"
  },
  "confidentiality": "Built under confidentiality limits. Numbers are approximate.",
  "role": "Primary Developer",
  "timeline": {
    "start": "2025"
  },
  "year": "2025",
  "executiveSummary": "A native Android application paired with a robust NestJS backend, purpose-built for small and medium dental clinics that need affordable, mobile-first practice management. Covering scheduling with conflict detection, electronic health records, treatment planning, and automated billing, it has been adopted by over 15 clinics and reduced scheduling conflicts by 90%. The system was delivered to the client.",
  "businessContext": "Small dental clinics were caught between two bad options: paper-based tracking that caused double bookings and lost patient histories, or enterprise HMS software built for hospital-scale operations and priced accordingly. The client needed an affordable, mobile-first system that covered the full clinical workflow — scheduling, EHR, treatment planning, and billing — without requiring a full IT team to run it.",
  "problemStatement": "Small dental clinics struggled with managing patient records, scheduling, and billing using outdated paper systems or prohibitively expensive enterprise software designed for hospital-scale operations. Double bookings were common, patient histories were difficult to retrieve during appointments, and billing was a manual, error-prone process. The solution needed to be affordable for independent practices while still meeting healthcare data security standards. It also had to integrate seamlessly into existing clinical workflows without requiring extensive staff training.",
  "constraints": [
    {
      "kind": "team",
      "text": "Inherited constraints from legacy project format."
    }
  ],
  "solutionOverview": "Built the client as a native Android application in Kotlin, leveraging Jetpack Compose for a modern, responsive UI that feels natural on tablets and phones used in clinical settings. Backed it with a NestJS API on PostgreSQL, implementing row-level security and AES-256 encryption at rest for HIPAA-conscious data handling. Designed the scheduling engine with a constraint-satisfaction algorithm that accounts for procedure duration, provider availability, and room assignment to prevent conflicts. Integrated Firebase Cloud Messaging for automated appointment reminders via SMS and push notifications, with configurable timing and confirmation tracking.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Patient Scheduling with Conflict Detection",
      "decision": "Smart calendar that prevents double bookings, accounts for procedure duration, and suggests optimal appointment slots to maximize daily patient throughput.",
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
      "title": "Electronic Health Records (EHR) Management",
      "decision": "Secure, searchable patient records with dental charting, medical history, allergies, and treatment notes — accessible in seconds during appointments.",
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
      "title": "Treatment Planning and Progress Notes",
      "decision": "Visual treatment plans that map out multi-visit procedures with cost estimates, letting dentists and patients stay aligned on care timelines.",
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
      "title": "Billing and Insurance Claim Management",
      "decision": "Automated billing tied directly to treatment codes, with insurance claim generation and tracking to minimize revenue cycle delays.",
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
      "title": "Appointment Reminders via SMS and Push",
      "decision": "Configurable automated reminders that reduce no-shows through SMS and push notifications, with confirmation tracking for front-desk staff.",
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
      "name": "Kotlin"
    },
    {
      "name": "NestJS"
    },
    {
      "name": "PostgreSQL"
    },
    {
      "name": "Android SDK"
    },
    {
      "name": "Firebase"
    }
  ],
  "outcomes": [
    {
      "value": "15+",
      "label": "Clinic Adoption",
      "description": "Adopted by 15+ dental clinics",
      "provenance": "measured"
    },
    {
      "value": "-90%",
      "label": "Scheduling Conflicts",
      "description": "Reduced scheduling conflicts by 90%",
      "provenance": "measured"
    },
    {
      "value": "-25%",
      "label": "Patient Wait Times",
      "description": "Decreased patient wait times by 25%",
      "provenance": "measured"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "Healthcare data security is a first-class architectural concern, not a feature to add later. Row-level security in PostgreSQL and AES-256 at rest were designed in from the start; retrofitting them after the data model exists is significantly more expensive.",
    "The scheduling conflict detection algorithm was the most complex piece of the system — accounting for procedure duration, room turnover time, provider breaks, and emergency slots simultaneously. We ended up modelling it as a constraint-satisfaction problem rather than a calendar query."
  ],
  "featured": false,
  "sortOrder": 6,
  "coverImage": "/images/projects/dental-clinic-hms/cover.webp"
};

export default dentalClinicHms;
