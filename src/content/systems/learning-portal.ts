import type { System } from "@/lib/schemas/system";

export const learningPortal: System = {
  "slug": "learning-portal",
  "title": "Interactive Learning Portal",
  "thesis": "Cross-platform educational ecosystem bridging web and mobile learning",
  "tier": 3,
  "domain": "platforms",
  "context": "production",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built under confidentiality limits. Numbers are approximate.",
  "role": "Full Stack Developer",
  "timeline": {
    "start": "2022"
  },
  "year": "2022",
  "executiveSummary": "A unified educational platform that brings together a feature-rich web dashboard for educators and a student-focused mobile experience. Powered by a shared API architecture with real-time collaboration features, it keeps learning seamless across every device while giving institutions actionable analytics on student engagement and outcomes. The platform was delivered to the client.",
  "businessContext": "Educational institutions were running their web and mobile experiences as separate products — a full-featured desktop tool for educators and a stripped-down companion app for students. The split created fragmented data, inconsistent feature availability, and poor adoption on mobile. The client needed a unified platform with a shared API, real-time collaboration, and an offline-first mobile experience that didn't treat mobile as second class.",
  "problemStatement": "Educational institutions needed a unified platform that works seamlessly across web and mobile, where the web app provides full administrative and content features while the mobile app focuses on student engagement. Existing solutions forced a choice between a powerful desktop tool and a limited mobile companion, resulting in fragmented data and poor adoption among students. The system had to support real-time video sessions and collaborative tools without sacrificing offline functionality for students in low-connectivity areas. Additionally, educators needed granular analytics to identify at-risk learners early without adding to their administrative burden.",
  "constraints": [
    {
      "kind": "team",
      "text": "Inherited constraints from legacy project format."
    }
  ],
  "solutionOverview": "Designed a monorepo with a shared RESTful API layer built on Node.js and Express, serving both the React web dashboard and the React Native mobile client from identical data contracts. Implemented WebSocket channels via Socket.IO for real-time video session signaling and live collaboration features like shared whiteboards. Used MongoDB with Redis caching to handle concurrent read-heavy workloads from thousands of active learners, and built an offline-first data layer in the mobile app using WatermelonDB for seamless sync. Developed a configurable analytics pipeline that aggregates engagement metrics and surfaces actionable insights for educators without manual report generation.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Adaptive Learning Paths with Progress Tracking",
      "decision": "Personalized course sequences that adjust difficulty and content based on individual performance, with granular progress dashboards for students and educators alike.",
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
      "title": "Real-Time Video Sessions and Collaborative Tools",
      "decision": "Live video classrooms with shared whiteboards, breakout rooms, and in-session polling to replicate the interactivity of in-person learning.",
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
      "title": "Assignment Submission and Automated Grading",
      "decision": "Streamlined submission workflows with configurable auto-grading rubrics that give students instant feedback and free up educator time.",
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
      "title": "Analytics Dashboard for Educators",
      "decision": "Comprehensive reporting on student engagement, completion rates, and performance trends to help educators identify at-risk learners early.",
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
      "title": "Offline-First Mobile Experience for Students",
      "decision": "Course materials and assignments cached locally so students can continue learning without an internet connection, with automatic sync when back online.",
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
      "name": "React Native"
    },
    {
      "name": "Node.js"
    },
    {
      "name": "MongoDB"
    },
    {
      "name": "WebSockets"
    },
    {
      "name": "Redis"
    }
  ],
  "outcomes": [
    {
      "value": "2,000+",
      "label": "Active Learners",
      "description": "Served 2,000+ active learners",
      "provenance": "measured"
    },
    {
      "value": "+35%",
      "label": "Student Engagement",
      "description": "Improved student engagement by 35%",
      "provenance": "measured"
    },
    {
      "value": "-50%",
      "label": "Admin Overhead",
      "description": "Reduced administrative overhead by 50%",
      "provenance": "measured"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "WatermelonDB for offline-first sync was the right architectural choice, but its lazy loading model requires careful query design — accessing related records outside of a transaction silently returns stale data. The learning curve cost us a week of debugging before we internalized the pattern.",
    "The analytics pipeline for identifying at-risk learners worked better than expected, but educators didn't trust automated flags without seeing the underlying data. The adoption breakthrough came from showing the raw engagement metrics alongside the flag rather than just surfacing the conclusion."
  ],
  "featured": false,
  "sortOrder": 2,
  "coverImage": "/images/projects/learning-portal/cover.webp"
};

export default learningPortal;
