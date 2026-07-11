import type { System } from "@/lib/schemas/system";

export const insuranceClaimsFieldApp: System = {
  "slug": "insurance-claims-field-app",
  "title": "Insurance Claims Field-Reporting App",
  "thesis": "Offline-first mobile app for insurance field adjusters to track claim status, capture reports, and collect signatures on-site",
  "tier": 3,
  "domain": "products",
  "context": "client",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built for a client under confidentiality limits. Described at pattern level only — product name, backend endpoints, and internal data model are withheld.",
  "role": "Mobile Developer",
  "timeline": {
    "start": "2026"
  },
  "year": "2026",
  "executiveSummary": "An offline-first mobile app for insurance field adjusters, built in React Native for iOS, Android, and web from a single codebase. Adjusters track claim status, capture reports with photos, and collect digital signatures on-site, then bundle each completed report for upload once connectivity returns. Every screen reads through a local SQLite database (Drizzle ORM) behind a repository layer, so the app stays fully usable with no signal. The engagement also modernized the codebase onto React Native 0.81, React 19, and full TypeScript strict mode, replacing a third-party UI kit with an in-house component library to remove upgrade blockers. The app was delivered to the client.",
  "businessContext": "Insurance field adjusters assess claims on-site — often at properties with poor or no cellular coverage — and need to record claim progress, photograph damage, and capture signatures without waiting for a connection. Generic tooling assumes connectivity and treats the phone as a thin client to a server. The client needed a purpose-built field app that treated offline as the default state rather than an error condition, and that could round-trip with their existing claims backend.",
  "problemStatement": "Adjusters capture claim reports, damage photos, and signatures in the field, where connectivity is unreliable, then need that data to reconcile with an established backend once back online. A connectivity-dependent client wasn't viable — work could not stall because a property had no signal. The app had to store everything locally, remain fully functional offline, and sync complete reports opportunistically, while conforming to the response shapes of a REST API the team did not control. It also carried an aging React Native baseline that blocked current native modules and lacked end-to-end type safety, so the work included a platform and language migration alongside the feature set.",
  "constraints": [
    {
      "kind": "platform",
      "text": "The app had to work fully offline on field devices — adjusters capture claims on-site where connectivity is unreliable."
    },
    {
      "kind": "legacy",
      "text": "It had to integrate with an existing REST backend and conform to its established response shapes rather than redesign the API."
    },
    {
      "kind": "platform",
      "text": "A single React Native codebase had to ship to iOS, Android, and web."
    }
  ],
  "solutionOverview": "Built a single React Native (Expo) codebase targeting iOS, Android, and web. Made the local database the source of truth: an expo-sqlite store modeled with Drizzle ORM, accessed exclusively through a repository layer so screens never touch storage directly, with migrations applied on startup. Structured API access as an Axios client with request/response interceptors and a typed endpoint registry, so local models map cleanly onto the backend's existing response shapes. Report capture combines camera photos, on-device digital signatures, and ZIP bundling so a finished report uploads as a single atomic, retriable payload. Authentication uses token-based sessions with secure credential storage, and the UI is an in-house component library and theme layer that replaced a third-party kit removed during the migration.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Local database as the source of truth",
      "decision": "Persisted all claim, report, and progress data in a local expo-sqlite database modeled with Drizzle ORM, accessed only through a repository layer, with migrations applied on app startup.",
      "alternatives": [
        {
          "option": "Fetch on demand from the API with in-memory caching",
          "whyNot": "Adjusters routinely work with no connectivity; the app had to be fully usable offline, which requires a durable local store, not a request cache that empties when the app restarts."
        }
      ],
      "rationale": "Offline-first was a hard requirement. A typed local database behind a repository boundary keeps screens decoupled from storage and lets data sync opportunistically when a connection is available.",
      "cost": "The local schema has to be kept in lockstep with the backend's response shape through hand-managed migrations; drift on either side silently breaks reads."
    },
    {
      "id": "decision-2",
      "title": "In-house UI component library",
      "decision": "Built a custom component library (form, core, navigation, feedback, and list primitives) plus a theme layer, replacing the previous third-party UI toolkit.",
      "alternatives": [
        {
          "option": "Keep the existing third-party UI kit",
          "whyNot": "It constrained theming and added upgrade friction during the React Native and React version migration; owning the primitives removed a blocking dependency from the critical path."
        }
      ],
      "rationale": "Control over the design system and fewer upgrade blockers during the platform migration outweighed the convenience of a pre-built kit.",
      "cost": "Owning every primitive means the team now maintains the accessibility, theming, and edge-case behavior a library would otherwise have provided."
    },
    {
      "id": "decision-3",
      "title": "Platform and language modernization",
      "decision": "Migrated the app onto React Native 0.81, React 19, and full TypeScript strict mode, and moved data access onto Drizzle ORM.",
      "alternatives": [
        {
          "option": "Stay on the older React Native / JavaScript baseline",
          "whyNot": "The aging baseline blocked current Expo native modules (camera, SQLite, secure storage) and left the API and database layers without type safety."
        }
      ],
      "rationale": "Modernizing unlocked the current Expo native-module ecosystem and delivered end-to-end type safety from the API client through the database layer.",
      "cost": "A large one-time migration with broad churn and native-build risk, paid up front before any new feature value shipped."
    },
    {
      "id": "decision-4",
      "title": "Atomic on-device report capture",
      "decision": "Captured each claim report with camera photos and an on-device digital signature, bundling the report data and images into a single ZIP archive for upload.",
      "alternatives": [
        {
          "option": "Upload each photo and field individually as it is captured",
          "whyNot": "Unreliable field connectivity made per-item uploads fragile; bundling a complete report into one archive makes the sync atomic and retriable rather than partially applied."
        }
      ],
      "rationale": "An atomic, retriable upload suits an offline field workflow far better than piecemeal syncing that can leave a report half-transmitted.",
      "cost": "Bundling defers upload until a report is complete and adds archive/compression handling and larger single payloads to manage."
    }
  ],
  "techStack": [
    {
      "name": "React Native",
      "role": "Cross-platform mobile client"
    },
    {
      "name": "Expo",
      "role": "Native modules and build tooling"
    },
    {
      "name": "TypeScript",
      "role": "Strict-mode type safety"
    },
    {
      "name": "SQLite + Drizzle ORM",
      "role": "Offline-first local database"
    },
    {
      "name": "React Navigation",
      "role": "Stack and tab navigation"
    },
    {
      "name": "Axios",
      "role": "REST API client with interceptors"
    }
  ],
  "outcomes": [
    {
      "value": "iOS · Android · Web",
      "label": "Platforms",
      "description": "One React Native codebase targeting three platforms",
      "provenance": "scope-fact"
    },
    {
      "value": "Offline-first",
      "label": "Data Layer",
      "description": "A local SQLite + Drizzle store keeps the app fully usable with no connectivity",
      "provenance": "scope-fact"
    },
    {
      "value": "RN 0.81 · React 19",
      "label": "Platform Baseline",
      "description": "Migrated onto current React Native and React majors with full TypeScript strict mode",
      "provenance": "scope-fact"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "Keeping a local SQLite schema in sync with an existing backend's response shape is the recurring tax of offline-first: every table mirrors the API's nullable fields, and a change on either side has to be threaded through hand-written Drizzle migrations or reads silently break.",
    "Replacing the third-party UI kit with an in-house component library removed an upgrade blocker during the React Native / React 19 migration, but the cost is ongoing — the team now owns accessibility and theming for every primitive the library used to provide."
  ],
  "featured": false,
  "sortOrder": 7,
  "coverImage": "/images/projects/insurance-claims-field-app/cover.webp"
};

export default insuranceClaimsFieldApp;
