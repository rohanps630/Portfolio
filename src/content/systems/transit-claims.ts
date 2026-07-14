import type { System } from "@/lib/schemas/system";

export const transitClaims: System = {
  "slug": "transit-claims",
  "title": "Transit Claim Reporting System",
  "thesis": "Streamlined communication between restoration companies and claims adjusters",
  "tier": 3,
  "domain": "platforms",
  "context": "production",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built under confidentiality limits. Numbers are approximate.",
  "role": "Mobile Developer",
  "timeline": {
    "start": "2021"
  },
  "year": "2021",
  "executiveSummary": "A workflow-centric mobile application that digitizes the entire transit damage claim lifecycle, from initial damage reporting through resolution. By replacing fragmented phone calls, emails, and paper forms with a single source of truth, it cuts claim processing time by 40% and eliminates 70% of communication errors between restoration companies and adjusters. The system was delivered to the client.",
  "businessContext": "Furniture restoration companies and transit claims adjusters were coordinating damage claims entirely through phone calls, emails, and paper forms — with no shared source of truth for claim status, photos, or liability. Disputes were common, documentation went missing, and the time between damage report and resolution stretched for weeks. Both parties needed a single workflow they could trust.",
  "problemStatement": "Furniture restoration companies and claims adjusters had no efficient way to communicate about transit damage claims. The existing process was fragmented across phone calls, emails, and paper forms, leading to frequent delays, lost documentation, and disputed liability. There was no single source of truth for claim status, so stakeholders wasted hours tracking down updates manually. The solution needed to support annotated photo evidence, digital signatures, and automated workflow progression while remaining simple enough for non-technical field staff to adopt immediately.",
  "constraints": [
    {
      "kind": "team",
      "text": "Inherited constraints from legacy project format."
    }
  ],
  "solutionOverview": "Designed a state-machine-driven workflow engine that models each claim as a series of well-defined stages with configurable transition rules and automatic escalation timers. Built the mobile client in React Native with a camera integration that captures high-resolution, geotagged photos and provides on-device annotation tools for marking up damage. Implemented a real-time notification system using Firebase Cloud Messaging so all stakeholders receive instant updates on claim status changes. Added server-side PDF generation for auto-populated claim forms and integrated a legally binding e-signature SDK to eliminate manual paperwork entirely.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Photo-Based Damage Documentation with Annotations",
      "decision": "High-resolution photo capture with markup tools for circling, highlighting, and annotating damage — creating clear, indisputable evidence for every claim.",
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
      "title": "Real-Time Status Tracking for All Stakeholders",
      "decision": "A shared timeline view that keeps restoration companies, adjusters, and clients aligned on claim progress without a single phone call.",
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
      "title": "Automated Claim Lifecycle Management",
      "decision": "Rule-based workflows that automatically advance claims through stages, trigger reviews, and escalate overdue items to keep processing on track.",
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
      "title": "Document Generation and Digital Signatures",
      "decision": "Auto-populated claim forms and reports with legally binding e-signature capture, eliminating manual paperwork and reducing turnaround.",
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
      "title": "Push Notifications for Claim Updates",
      "decision": "Instant alerts when a claim changes status, a document is signed, or action is required — so nothing falls through the cracks.",
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
      "name": "Node.js"
    },
    {
      "name": "Express"
    },
    {
      "name": "MongoDB"
    },
    {
      "name": "AWS S3"
    }
  ],
  "outcomes": [
    {
      "value": "-40%",
      "label": "Processing Time",
      "description": "Reduced claim processing time by 40%",
      "provenance": "measured"
    },
    {
      "value": "-70%",
      "label": "Communication Errors",
      "description": "Decreased communication errors by 70%",
      "provenance": "measured"
    },
    {
      "value": "End-to-end",
      "label": "Paper Replaced",
      "description": "Replaced paper-based claim documentation with a digital lifecycle",
      "provenance": "measured"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "Digitizing a paper workflow doesn't mean automating it — it means making the implicit rules explicit. The biggest discovery was that adjusters had informal escalation criteria that existed only in their heads. Surfacing those as configurable workflow rules was the feature that drove the most adoption.",
    "PDF generation for legally-binding claim forms was harder than anticipated because the output had to match the exact format the insurers' systems expected. We ended up generating PDFs server-side with precise pixel positioning rather than using a template engine."
  ],
  "featured": false,
  "sortOrder": 5,
  "coverImage": "/images/projects/transit-claims/cover.webp"
};

export default transitClaims;
