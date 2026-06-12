import type { System } from "@/lib/schemas/system";

export const roofingCrm: System = {
  "slug": "roofing-crm",
  "title": "Roofing Industry CRM",
  "thesis": "Specialized mobile CRM for roofing contractors and project management",
  "tier": 2,
  "domain": "products",
  "context": "client",
  "status": {
    "kind": "production"
  },
  "confidentiality": "Built under confidentiality limits. Numbers are approximate.",
  "role": "Mobile Developer",
  "timeline": {
    "start": "2023"
  },
  "year": "2023",
  "executiveSummary": "A mobile-first CRM built specifically for roofing contractors, covering the entire job lifecycle from lead capture and estimation through scheduling, progress tracking, and invoicing. Designed to work reliably on job sites with limited connectivity, it reduces invoicing time by 60% and brings GPS-tagged photo documentation, weather-aware scheduling, and offline-first sync to every project.",
  "businessContext": "Migrated from previous format.",
  "problemStatement": "Roofing contractors relied on paper-based tracking and generic CRMs that didn't fit their field-heavy workflow. Job data was scattered across clipboards, spreadsheets, and text messages, leading to lost estimates and delayed invoicing. They needed a mobile-first solution designed specifically for the roofing trade that could handle the entire job lifecycle from lead capture to final payment. Critically, the app had to function fully offline on remote job sites where cellular coverage is often unreliable.",
  "constraints": [
    {
      "kind": "team",
      "text": "Inherited constraints from legacy project format."
    }
  ],
  "solutionOverview": "Employed a domain-driven design methodology, conducting on-site ride-alongs with roofing contractors to map their real-world workflows before writing any code. Built the mobile client in React Native with an offline-first SQLite layer that queues all mutations and syncs via a conflict-resolution algorithm when connectivity returns. Integrated Stripe for in-app payment processing and invoice generation directly from job line items, and connected a hyperlocal weather API to the scheduling module so crews can plan around rain days. Backed the system with a Node.js API on PostgreSQL, storing geotagged photos in AWS S3 with pre-signed URLs for fast, secure retrieval.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Job Workflow Management",
      "decision": "End-to-end pipeline tracking from initial lead through estimation, scheduling, execution, and completion — with drag-and-drop status updates in the field.",
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
      "title": "Photo Documentation and Progress Tracking",
      "decision": "Geotagged and timestamped photo capture tied to specific jobs, giving contractors a visual history of every project stage for clients and insurance purposes.",
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
      "title": "Invoice Generation and Payment Tracking",
      "decision": "One-tap invoice creation from job data with integrated payment processing, reducing the gap between job completion and getting paid.",
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
      "name": "Node.js"
    },
    {
      "name": "PostgreSQL"
    },
    {
      "name": "Three.js"
    }
  ],
  "outcomes": [
    {
      "value": "-60%",
      "label": "Invoicing Time",
      "description": "Reduced invoicing time by 60%",
      "provenance": "measured"
    },
    {
      "value": "+80%",
      "label": "Tracking Accuracy",
      "description": "Improved job tracking accuracy by 80%",
      "provenance": "measured"
    }
  ],
  "evidence": [],
  "screenshots": [
    {
      "src": "/images/projects/roofing-crm/screenshot-1.webp",
      "alt": "Roofing Industry CRM screenshot"
    },
    {
      "src": "/images/projects/roofing-crm/screenshot-2.webp",
      "alt": "Roofing Industry CRM screenshot"
    },
    {
      "src": "/images/projects/roofing-crm/screenshot-3.webp",
      "alt": "Roofing Industry CRM screenshot"
    }
  ],
  "lessons": [
    "One key lesson was the value of end-to-end testing.",
    "A mistake we made early on was underestimating state management complexity, which cost us a sprint to refactor."
  ],
  "featured": false,
  "sortOrder": 4,
  "coverImage": "/images/projects/roofing-crm/cover.webp"
};

export default roofingCrm;
