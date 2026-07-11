import type { System } from "@/lib/schemas/system";

export const eventServicesMarketplace: System = {
  "slug": "event-services-marketplace",
  "title": "Event-Services Marketplace Platform",
  "thesis": "Three-app marketplace for event services — a media-rich consumer mobile app, an admin content console, and a shared real-time API",
  "tier": 3,
  "domain": "platforms",
  "context": "client",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built for a client under confidentiality limits. Described at pattern level only — product name, organization, and API details are withheld.",
  "role": "Backend & Admin-Web Developer",
  "timeline": {
    "start": "2024-07",
    "end": "2024-10"
  },
  "year": "2024",
  "executiveSummary": "A three-application marketplace platform for event services, built by a two-person team. Consumers browse a media-rich explore feed of event photos and videos, event packages by category (weddings, baptisms, and more) with budget-tier filters, and a marketplace of related products and services with reviews. Content is admin-curated through a dedicated web console. The shared backend is a modular NestJS API on MongoDB with JWT auth, Socket.IO real-time channels, and Google Cloud Storage for media. I owned the backend and the admin console end to end, and later contributed features and fixes to the Expo-based mobile client a teammate led. The platform was delivered to the client.",
  "businessContext": "People planning events like weddings and baptisms choose vendors from scattered photos, word of mouth, and phone calls. The client wanted a curated marketplace where real event media does the selling: browse what an organizer actually produced, see packages at luxury-to-budget tiers with indicative costs, and find related products and services in one place. Curation was central to the model — only admins publish content, so the platform needed a serious content-operations console, not just a consumer app.",
  "problemStatement": "The product needed three surfaces at once: a consumer mobile app whose core is a smooth photo-and-video feed, a catalog of packages and products with category and budget filtering plus ratings and reviews, and an admin console where the client's team creates and manages all of it. Media had to be stored and served durably, engagement (likes, views, saves) tracked per post, and every post identifiable by a short unique code for admin operations. A two-person team had to build and coordinate all three codebases in parallel against one API.",
  "constraints": [
    {
      "kind": "team",
      "text": "A two-person team built three codebases — API, consumer mobile app, and admin web console — in parallel against one contract."
    },
    {
      "kind": "platform",
      "text": "The consumer experience is media-heavy: mixed photo/video posts had to upload, store, and play back smoothly on mobile."
    },
    {
      "kind": "compliance",
      "text": "Admin-only publishing was a product rule — every content path needed the curation gate, not an open social-posting model."
    }
  ],
  "solutionOverview": "Structured the backend as a modular NestJS API — separate modules for auth, feed, categories, packages, items, files, and reviews — on MongoDB via Mongoose, with JWT authentication, Socket.IO channels for real-time updates, Swagger-documented endpoints, and Sentry error tracking, deployed under a process manager behind a reverse proxy. Media uploads flow through a file module into Google Cloud Storage rather than living on the API host. The admin console is a React app built with Vite and the Mantine component system — rich-text editing, drag-and-drop media uploads, and catalog forms for categories, packages, and posts — with Redux Toolkit for state and JWT sessions against the same API. The consumer mobile client is an Expo app using file-based routing with tabs for the explore feed, packages, products, and profile, video playback in-feed, and performant long lists.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "MongoDB document model for a fast-moving catalog",
      "decision": "Modeled posts, packages, products, and reviews as Mongoose documents rather than normalized relational tables.",
      "alternatives": [
        {
          "option": "PostgreSQL with a normalized schema",
          "whyNot": "The catalog's shapes were still being discovered mid-build — mixed photo/video posts, package tiers, flexible product attributes — and document schemas absorbed those changes without migrations on every iteration."
        }
      ],
      "rationale": "For a product whose content model changed weekly during the build, schema flexibility was worth more than relational guarantees.",
      "cost": "Referential integrity became hand-rolled application logic — the backend history includes patches like accepting user references as both ObjectId and string, a bug class a relational schema would have made impossible."
    },
    {
      "id": "decision-2",
      "title": "Modular NestJS monolith, microservice-ready",
      "decision": "Built one NestJS deployment with hard module boundaries (auth, feed, category, package, item, file, review) and a microservice factory kept ready, rather than starting from separate services.",
      "alternatives": [
        {
          "option": "Plain Express monolith",
          "whyNot": "Two people maintaining three codebases needed the structure NestJS imposes for free — dependency injection, module isolation, validation pipes, and generated Swagger docs the mobile and web clients could build against."
        }
      ],
      "rationale": "Module boundaries gave the team service-shaped separation without paying the operational cost of running services, while keeping the door open.",
      "cost": "NestJS ceremony — decorators, providers, DTO classes — is real overhead for a codebase this young; some modules were more scaffolding than logic."
    },
    {
      "id": "decision-3",
      "title": "Object storage for media from day one",
      "decision": "Routed all photo and video uploads through the API's file module into Google Cloud Storage instead of storing media on the API host.",
      "alternatives": [
        {
          "option": "Serve media from the API server's disk",
          "whyNot": "A feed whose entire value is photos and videos would tie storage growth, backup, and delivery bandwidth to a single app server — the first scaling wall the product would hit."
        }
      ],
      "rationale": "Media was the product's center of gravity; separating it from compute was the one piece of scaling worth buying before launch.",
      "cost": "A cloud dependency and credential surface for a young product, and an upload pipeline (multipart handling, bucket lifecycle) that took real build time."
    },
    {
      "id": "decision-4",
      "title": "Admin console built fresh on Mantine, template rejected",
      "decision": "Evaluated an open-source Next.js analytics-dashboard template as the admin console base, then built the console fresh on Vite + Mantine instead, using the template only as reference.",
      "alternatives": [
        {
          "option": "Adopt the dashboard template wholesale",
          "whyNot": "The template's stack (Next.js, third-party auth) mismatched the platform's JWT backend and carried analytics chrome the console didn't need — adapting it would have cost more than building the needed forms and editors directly."
        }
      ],
      "rationale": "The console's real work was content operations — rich-text editing, media dropzones, catalog forms — which Mantine's primitives covered without inheriting a template's architecture.",
      "cost": "Standard dashboard chrome (navigation shell, tables, auth screens) had to be built by hand, and with one developer on the console it advanced slowly beside the backend."
    }
  ],
  "techStack": [
    {
      "name": "NestJS",
      "role": "Modular API — auth, feed, catalog, files, reviews"
    },
    {
      "name": "MongoDB + Mongoose",
      "role": "Document store for the content catalog"
    },
    {
      "name": "Socket.IO",
      "role": "Real-time channels on the API"
    },
    {
      "name": "Google Cloud Storage",
      "role": "Photo and video object storage"
    },
    {
      "name": "React + Mantine (Vite)",
      "role": "Admin content console"
    },
    {
      "name": "Expo (React Native)",
      "role": "Consumer mobile client (team-built; later contributions)"
    }
  ],
  "outcomes": [
    {
      "value": "3 apps",
      "label": "Platform Surface",
      "description": "Shared API, consumer mobile app, and admin web console built in parallel",
      "provenance": "scope-fact"
    },
    {
      "value": "Real-time",
      "label": "API Capabilities",
      "description": "Socket.IO channels alongside REST, with Swagger-documented endpoints",
      "provenance": "scope-fact"
    },
    {
      "value": "Cloud media",
      "label": "Storage Architecture",
      "description": "All photo/video content stored in Google Cloud Storage, decoupled from the API host",
      "provenance": "scope-fact"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "Document-database flexibility has a due date: letting references pass as either ObjectId or string was convenient early and became a patch-generating bug class later — the backend history is the receipt. Enforce ID discipline at the API boundary from the first schema, even in Mongo.",
    "Three surfaces in parallel with two people means every surface moves at a fraction of the team's speed — over the same months the API logged forty-one commits while the admin console logged three. Sequencing surfaces (API + one client to usable, then the next) would have produced a demonstrable slice sooner."
  ],
  "featured": false,
  "sortOrder": 9,
  "coverImage": "/images/projects/event-services-marketplace/cover.webp"
};

export default eventServicesMarketplace;
