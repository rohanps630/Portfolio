import type { System } from "@/lib/schemas/system";

export const supplyChainFieldApp: System = {
  "slug": "supply-chain-field-app",
  "title": "Supply-Chain Field Operations App",
  "thesis": "Mobile client for a farm-to-market supply chain — purchase orders, deliveries, sales, invoices, receipts, and trip sheets from the field",
  "tier": 3,
  "domain": "products",
  "context": "client",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built for a client under confidentiality limits. Described at pattern level only — product name, backend endpoints, and API details are withheld.",
  "role": "Mobile Developer",
  "timeline": {
    "start": "2022"
  },
  "year": "2022",
  "executiveSummary": "A React Native mobile client for a farm-to-market supply-chain operation, putting the business's core documents — purchase orders and their deliveries, sales orders, invoices, receipts, and trip sheets — in field staff's hands. The app fronts a large existing backend: its API layer is organized as one module per business entity (farms, collection and distribution centers, inventory, routes, customers, units of measure, and more), more than twenty modules behind a single typed gateway. Sessions are JWT-based with a dedicated silent refresh-token flow so field users aren't logged out mid-task, and navigation is a drawer of workflow hubs with a dashboard entry point. The app was delivered to the client.",
  "businessContext": "A supply-chain business moving produce from farms through collection centers to distribution centers ran its operations on backend-managed documents — purchase orders, deliveries, sales orders, invoices, receipts, and route trip sheets. Field and operations staff needed to raise and view those documents where the work happens rather than at a back-office terminal, which meant a mobile client over the business's existing backend and its established entity model.",
  "problemStatement": "The backend already defined the business: over twenty entity types covering the chain from farm to distribution center. The mobile app's job was to expose that model faithfully to field staff — browsing inventory and routes, raising purchase orders, recording deliveries and receipts, creating sales orders and invoices, and filing trip sheets — without redefining any of it. That made the integration surface the core engineering problem: many endpoints, one consistent way to call them, and sessions that survive a full field day without re-authentication.",
  "constraints": [
    {
      "kind": "legacy",
      "text": "The app had to conform to an existing supply-chain backend and its entity model — over twenty endpoint domains, none of them negotiable."
    },
    {
      "kind": "platform",
      "text": "One React Native codebase had to serve both iOS and Android field devices."
    },
    {
      "kind": "team",
      "text": "Long field days meant sessions had to renew silently — bouncing a user to login mid trip-sheet was not acceptable."
    }
  ],
  "solutionOverview": "Built a React Native app (iOS and Android) whose center of gravity is its API layer: one module per backend entity — auth, farms, collection centers, distribution centers, inventory, items, categories, customers, routes, units of measure, purchase orders and their deliveries, sales orders, invoices, receipts, reports, and trip sheets — all funneled through shared typed GET/POST gateways and a single config. Authentication is JWT with a dedicated refresh-token module for silent session renewal. Navigation pairs a native stack (splash, login) with a drawer of workflow hubs — dashboard, purchase, sale, invoice, receipt, and trip — plus form screens for creating items and sales orders. The UI uses material-style text fields, progress indicators, and popup menus, with connectivity awareness for field conditions.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "One API module per backend entity",
      "decision": "Structured the integration layer as a module per business entity (20+ modules) behind shared typed GET/POST gateways and a single configuration point.",
      "alternatives": [
        {
          "option": "One flat API client with ad-hoc endpoint calls",
          "whyNot": "Twenty-plus entity domains in one file turns every workflow change into a search problem; per-entity modules keep each document flow's calls discoverable and independently changeable."
        }
      ],
      "rationale": "The backend's entity model was the product's real map — mirroring it one-to-one made the mobile codebase navigable by anyone who knew the business.",
      "cost": "A hand-written module for every entity is real boilerplate, and every backend contract change ripples through a hand-maintained module rather than a regenerated client."
    },
    {
      "id": "decision-2",
      "title": "Silent JWT refresh as a first-class module",
      "decision": "Gave refresh-token handling its own module in the auth layer so sessions renew silently instead of expiring mid-task.",
      "alternatives": [
        {
          "option": "Let tokens expire and re-prompt for login",
          "whyNot": "Field staff work long days inside multi-step document flows; forcing re-authentication mid trip-sheet or mid purchase-order loses work and trust."
        }
      ],
      "rationale": "Session longevity was a field-usability requirement, so token renewal deserved the same first-class treatment as any business endpoint.",
      "cost": "Token lifecycle edge cases — expiry races, retry-after-refresh ordering — became hand-maintained client logic instead of a library's problem."
    },
    {
      "id": "decision-3",
      "title": "Drawer navigation over tabs for many workflows",
      "decision": "Organized the app as a drawer of workflow hubs (dashboard, purchase, sale, invoice, receipt, trip) over a native stack for splash and login.",
      "alternatives": [
        {
          "option": "Bottom-tab navigation",
          "whyNot": "Six-plus top-level document workflows don't fit a tab bar; a drawer scales like the menu of business documents the users already think in."
        }
      ],
      "rationale": "The app is a menu of business documents, and the drawer matches that mental model directly.",
      "cost": "Drawer items are a tap further away and less discoverable than persistent tabs — acceptable for trained staff, wrong for a consumer app."
    }
  ],
  "techStack": [
    {
      "name": "React Native",
      "role": "iOS + Android client from one codebase"
    },
    {
      "name": "TypeScript",
      "role": "Typed API layer (screens remained JavaScript)"
    },
    {
      "name": "React Navigation",
      "role": "Drawer of workflow hubs over a native stack"
    },
    {
      "name": "Axios",
      "role": "HTTP client behind the entity modules"
    },
    {
      "name": "JWT",
      "role": "Auth with silent refresh-token renewal"
    }
  ],
  "outcomes": [
    {
      "value": "20+",
      "label": "API Modules",
      "description": "Per-entity integration modules covering the backend's full supply-chain model",
      "provenance": "scope-fact"
    },
    {
      "value": "6 hubs",
      "label": "Field Workflows",
      "description": "Dashboard, purchase, sale, invoice, receipt, and trip-sheet workflows in one app",
      "provenance": "scope-fact"
    },
    {
      "value": "iOS · Android",
      "label": "Platforms",
      "description": "Single React Native codebase serving both field platforms",
      "provenance": "scope-fact"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "Hand-mirroring a large backend costs forever: with 20+ hand-written entity modules, every backend contract change meant editing a module by hand. At this integration scale, a generated client from an API specification would have repaid its setup cost many times over.",
    "Partial TypeScript adoption protects less than it appears to: the API layer was typed but the screens consuming it stayed JavaScript, so type safety ended exactly at the boundary where the data got used. Typing the edges of a codebase without its consumers leaves the riskiest seam unchecked."
  ],
  "featured": false,
  "sortOrder": 10,
  "coverImage": "/images/projects/supply-chain-field-app/cover.webp"
};

export default supplyChainFieldApp;
