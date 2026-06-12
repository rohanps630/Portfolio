import type { System } from "@/lib/schemas/system";

export const telecomPos: System = {
  slug: "telecom-pos",
  title: "Telecom POS Platform",
  thesis: "A unified, multi-tenant Point of Sale system powering hundreds of retail terminals across North America.",
  tier: 1,
  domain: "platforms",
  context: "client",
  status: {
    kind: "production",
  },
  confidentiality: "Enterprise Confidentiality (Abstracted Architecture)",
  role: "Senior Frontend Engineer — Application Architecture",
  timeline: {
    start: "2023-03",
    end: "2024-12"
  },
  year: "2024",
  executiveSummary: "Architected and delivered the frontend for a massive multi-tenant Point of Sale (POS) system for a major telecom provider. We utilized React Native Web to maintain a single codebase across iPad kiosks and desktop terminals, implementing complex transactional flows and hardware integrations.",
  businessContext: "The telecom provider was running on severely outdated legacy POS terminals that frequently crashed during complex multi-line activations, causing massive customer churn in-store. They needed a modern, resilient, and blazing-fast application that could run on both modern tablets and older desktop machines.",
  problemStatement: "Building a POS system is fundamentally an exercise in robust state management. A single transaction might involve credit checks, inventory reservation, trade-in valuations, and payment processing. If the network drops or the hardware glitches mid-flow, the application must recover perfectly without double-charging the customer or losing the cart.",
  constraints: [
    {
      kind: "platform",
      text: "Must run seamlessly on both iPad (touch) and Windows desktop (mouse/keyboard) from a single codebase."
    },
    {
      kind: "legacy",
      text: "Required integration with 15+ legacy SOAP APIs for inventory and billing."
    }
  ],
  solutionOverview: "We architected a unified frontend using React Native Web, allowing us to share 95% of the codebase between the native iOS app (for iPads) and the web app (for desktops). We implemented a strict unidirectional data flow using Redux Toolkit, modeling every step of the checkout process as a deterministic transactional state. We introduced a Backend-for-Frontend (BFF) layer in Node.js to aggregate the legacy SOAP APIs into a clean GraphQL graph for the client.",
  decisions: [
    {
      id: "decision-1",
      title: "React Native Web for Omni-channel",
      decision: "Selected React Native Web to build a single codebase targeting both iOS (via React Native) and Desktop (via Web).",
      alternatives: [
        {
          option: "Separate Native iOS and React DOM codebases",
          whyNot: "Would double the engineering effort required for every feature, and maintaining feature parity in a complex POS is historically a nightmare."
        }
      ],
      rationale: "The UI requirements for both platforms were identical. By building responsive primitives in RNW, we achieved massive velocity gains while still retaining the ability to drop into native iOS code for specific hardware integrations (e.g., barcode scanners).",
      cost: "RNW has specific styling quirks and limitations compared to pure DOM, requiring us to build custom abstractions for things like focus management and complex grid layouts."
    },
    {
      id: "decision-2",
      title: "Redux Toolkit for Transactional Flow",
      decision: "Enforced strict Redux Toolkit state machines for the entire checkout flow, banning local React state for any transaction-critical data.",
      alternatives: [
        {
          option: "React Context + useReducer",
          whyNot: "Lacks the rich middleware ecosystem required for offline persistence, crash reporting, and time-travel debugging."
        }
      ],
      rationale: "A POS checkout is a highly sequential process. Redux allowed us to persist the exact state to local storage at every step, meaning if the iPad died, the associate could boot it back up and resume the transaction exactly where they left off.",
      cost: "Heavy boilerplate overhead; simple UI toggles required actions and reducers to adhere to the strict architecture."
    }
  ],
  techStack: [
    { name: "React Native Web" },
    { name: "TypeScript" },
    { name: "Redux Toolkit" },
    { name: "Node.js (BFF)" },
    { name: "GraphQL" }
  ],
  outcomes: [
    {
      value: "Hundreds",
      label: "Terminals",
      description: "Successfully deployed and actively powering hundreds of retail terminals across North America.",
      provenance: "scope-fact"
    },
    {
      value: "95%",
      label: "Code Sharing",
      description: "Achieved 95% code sharing between the iOS tablet application and the desktop web application.",
      provenance: "measured"
    }
  ],
  evidence: [],
  screenshots: [
    {
      src: "/images/projects/telecom-pos/screenshot-1.webp",
      alt: "Telecom POS Platform Interface"
    }
  ],
  lessons: [
    "React Native Web is an incredibly powerful paradigm for enterprise applications where feature parity across platforms is more important than bespoke platform aesthetics.",
    "A Backend-for-Frontend (BFF) is absolutely mandatory when modernizing a frontend against a sprawling legacy SOAP backend."
  ],
  featured: true,
  sortOrder: 2,
  coverImage: "/images/projects/telecom-pos/cover.webp"
};

export default telecomPos;
