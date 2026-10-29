import type { System } from "@/lib/schemas/system";

export const multiAgentOps: System = {
  slug: "multi-agent-ops",
  title: "Multi-Agent Customer Ops Platform",
  thesis:
    "A chat-plus-live-panels assistant that lets a support rep run a whole customer interaction from one conversation, backed by a supervisor agent and specialist sub-agents.",
  tier: 1,
  domain: "ai-systems",
  context: "client",
  status: {
    kind: "production",
  },
  confidentiality: "Enterprise Confidentiality (Abstracted Architecture)",
  role: "Full-Stack Engineer — Frontend Architecture, Agent Integration, Design System, Quality",
  timeline: {
    start: "2026-02",
  },
  year: "2026",
  executiveSummary:
    "A multi-tenant AI assistant for enterprise support reps. A rep types a request in plain English; the assistant fetches live data from back-office systems and shows it in interactive panels (tables, charts, forms, step-by-step wizards) beside the chat. This case study covers the frontend architecture, agent integration, design-system and quality decisions, at pattern level, under enterprise confidentiality.",
  businessContext:
    "Support reps jump between several back-office tools (accounts, billing, ticketing and more) for every customer interaction. Calls run long, training is expensive, and the same lookups repeat all day. The goal was one conversation from which a rep can see data, act on it, and finish the interaction.",
  problemStatement:
    "The hard part is the UI: it has to stream non-deterministic agent output into stable, interactive panels, safely, for several tenants served from one deployment. Agent text varies run to run, yet panels must stay predictable, risky actions must stay gated, and no request may ever reach another tenant's backend.",
  constraints: [
    {
      kind: "compliance",
      text: "Security: enterprise SSO, and no backend credentials stored anywhere. Every layer forwards the signed-in user's token downstream.",
    },
    {
      kind: "compliance",
      text: "Safety: risky mutations must never be triggerable by typed text or model output.",
    },
    {
      kind: "platform",
      text: "Multi-tenancy: one build and one server for every tenant, with no chance of cross-tenant routing.",
    },
    {
      kind: "platform",
      text: "Testing: agent output is non-deterministic, so example-based tests alone are not enough.",
    },
  ],
  solutionOverview:
    "A supervisor agent routes each request to specialist sub-agents (Python, Strands Agents, FastAPI, on AWS Bedrock); a fast path handles common requests without a full reasoning loop. A tool layer wraps upstream REST APIs, and sub-agents return a typed panel description that the UI renders. The Next.js/React frontend has its own chat layer built directly on the open AG-UI streaming protocol, wrapped in a React-free module, plus a registry-driven panel system (normalizers, per-panel specs, instance IDs, confirmation lifecycles). IDs travel in structured request context, never in model prose. The tenant is resolved per request from the Host header; per-tenant config is loaded at runtime with a TTL cache and single-flight loading, and fails closed. Sign-in uses Cognito with enterprise SSO (Azure AD / SAML) and token passthrough. Datadog APM carries a W3C traceparent from the browser through the UI server and agent to upstream APIs; browser errors go to a privacy-safe, rate-limited endpoint that strips tokens, IDs and query strings. The platform runs on ECS Fargate.",
  decisions: [
    {
      id: "decision-1",
      title: "Own the chat layer on an open protocol",
      decision:
        "Replaced a third-party chat SDK with an in-house chat layer built directly on the AG-UI streaming protocol.",
      alternatives: [
        {
          option: "Keep the third-party chat SDK",
          whyNot:
            "It caused duplicated and truncated replies when panels mounted, and hid control of streaming, history and panel lifecycle.",
        },
      ],
      rationale:
        "Full control over streaming, history and panel lifecycle. The migration was planned in phases, then switched over in one go.",
      cost: "The team now owns streaming and history code a vendor used to maintain, plus the migration effort and the risk of a single cutover.",
      nodeRefs: ["rep-workspace"],
    },
    {
      id: "decision-2",
      title: "Two data paths: agent for questions, direct routes for panel controls",
      decision:
        "Questions go through the agent; deterministic panel controls call direct server routes instead.",
      alternatives: [
        {
          option: "Route every interaction through the agent",
          whyNot:
            "A deterministic toggle, such as a dashboard date range, would pay an LLM round-trip in latency and cost.",
        },
      ],
      rationale:
        "Use the model where judgement is needed and plain code where the answer is deterministic.",
      cost: "Two paths to keep consistent, and the direct routes must enforce the same auth and tenant rules as the agent path.",
      nodeRefs: ["rep-workspace", "panel-routes"],
    },
    {
      id: "decision-3",
      title: "Resolve the tenant per request, fail closed",
      decision:
        "Resolve the tenant from the Host header on every request and load its config at runtime. A missing or broken config is an error, never a fallback.",
      alternatives: [
        {
          option: "Per-tenant builds or build-time config",
          whyNot: "One build per tenant, and config drift between them.",
        },
        {
          option: "Fall back to a default tenant on a config miss",
          whyNot: "It silently routes one tenant's traffic to another tenant's backend.",
        },
      ],
      rationale:
        "One build and one server serve every tenant, and a wrong-tenant response becomes impossible by construction rather than by care.",
      cost: "A missing or broken config is a hard outage for that tenant instead of degraded service, and the TTL cache and single-flight loading add complexity.",
      nodeRefs: ["panel-routes", "tool-layer"],
    },
    {
      id: "decision-4",
      title: "Confirmation is a structured signal checked in code",
      decision:
        "Risky mutations run only when the request carries a structured confirmation from a UI Confirm button, verified by the backend.",
      alternatives: [
        {
          option: "Let the model ask for and interpret confirmation",
          whyNot: "Typed text or model output could then trigger a destructive change.",
        },
      ],
      rationale:
        "Confirmation used to be LLM-mediated. Moving it into a code-checked signal means the model can propose an action but can never approve it.",
      cost: "Every risky tool needs a confirmation contract and a UI step, and reps pay one extra click.",
      nodeRefs: ["action-specialists", "rep-workspace", "tool-layer"],
    },
    {
      id: "decision-5",
      title: "One trace from click to upstream call",
      decision:
        "Propagate a W3C traceparent from the browser through the UI server and agent to upstream APIs, without adding a browser SDK.",
      alternatives: [
        {
          option: "Per-service logs without propagated context",
          whyNot:
            "No way to tie a rep's click to the downstream calls and log lines it caused.",
        },
      ],
      rationale:
        "A single trace makes a slow or failed interaction debuggable end to end, including across the agent hop.",
      cost: "Context has to be propagated by hand at every hop, including the agent, and sensitive data stripped on the way.",
      nodeRefs: ["rep-workspace", "supervisor", "tool-layer"],
    },
  ],
  techStack: [
    { name: "TypeScript" },
    { name: "Next.js" },
    { name: "React" },
    { name: "Zustand" },
    { name: "Zod" },
    { name: "Recharts" },
    { name: "Tailwind CSS" },
    { name: "AG-UI" },
    { name: "Python" },
    { name: "Strands Agents" },
    { name: "FastAPI" },
    { name: "AWS Bedrock" },
    { name: "Amazon Cognito" },
    { name: "AWS ECS Fargate" },
    { name: "Datadog" },
    { name: "Vitest" },
    { name: "fast-check" },
    { name: "pytest" },
    { name: "Hypothesis" },
  ],
  outcomes: [
    {
      value: "1 build",
      label: "Every tenant",
      description:
        "One build and one server serve every tenant on its own subdomain, resolved per request.",
      provenance: "scope-fact",
    },
    {
      value: "0",
      label: "Stored backend credentials",
      description: "Each layer forwards the signed-in user's token downstream.",
      provenance: "scope-fact",
    },
  ],
  evidence: [],
  screenshots: [],
  lessons: [
    "Confirmation used to be LLM-mediated, and that let typed text stand in for a button press. Safety-critical approval belongs in a structured, code-checked signal.",
    "Owning the chat layer cost a phased migration, but made streaming bugs fixable at the root: stale \"running\" state in panels mounted mid-run was fixed with one page-level run tracker instead of per-case patches.",
    "Fail loudly on tenant config: a fallback default is a cross-tenant incident waiting to happen.",
    "Property-based tests (fast-check, Hypothesis) suit agent-driven UIs, where outputs vary. Bug fixes start with a failing \"bug condition\" test plus \"preservation\" tests for behaviour that must not change.",
  ],
  featured: true,
  sortOrder: 1,
  coverImage: "/images/projects/multi-agent-ops/cover.webp",
};

export default multiAgentOps;
