import type { System } from "@/lib/schemas/system";

export const multiAgentOps: System = {
  slug: "multi-agent-ops",
  title: "Multi-Agent Customer Ops Platform",
  thesis: "An autonomous multi-agent orchestration layer that resolves complex customer operations tickets.",
  tier: 1,
  domain: "ai-systems",
  context: "client",
  status: {
    kind: "production",
  },
  confidentiality: "Enterprise Confidentiality (Abstracted Architecture)",
  role: "Lead Full-Stack Engineer — Frontend Architecture, Observability Baseline",
  timeline: {
    start: "2025-01",
    end: "2025-08"
  },
  year: "2025",
  executiveSummary: "Led the frontend re-architecture and established the observability baseline for a multi-agent AI platform designed to automate complex customer support workflows. Under strict confidentiality constraints, this case study details the frontend composition strategy and the LLM observability patterns implemented to make agent reasoning transparent to human operators.",
  businessContext: "The client needed to reduce the time-to-resolution for highly complex customer operations tickets that required reasoning across multiple disparate backend systems (billing, CRM, provisioning). A multi-agent LLM approach was chosen to handle the logic, but the human-in-the-loop operators required complete transparency into how the agents arrived at their conclusions.",
  problemStatement: "Building a complex multi-agent system requires more than just prompting; it requires a bulletproof frontend that can parse, stream, and render non-deterministic agent event streams in real-time without overwhelming the operator. Furthermore, we needed a robust observability pipeline to trace multi-agent handoffs and track token costs across thousands of invocations.",
  constraints: [
    {
      kind: "compliance",
      text: "Strict data privacy requirements necessitated heavy PII redaction before logging any LLM inputs or outputs."
    },
    {
      kind: "team",
      text: "Cross-functional team of 12 engineers; frontend needed to integrate seamlessly with the Python-based agent orchestration layer."
    }
  ],
  solutionOverview: "We implemented a React/Next.js frontend that consumed Server-Sent Events (SSE) from the orchestration layer. The frontend dynamically rendered agent 'thoughts', tool invocations, and sub-agent handoffs using a state-machine-driven UI. For observability, we integrated OpenTelemetry and a custom logging pipeline that tracked token usage, tool latency, and agent logic forks.",
  decisions: [
    {
      id: "decision-1",
      title: "Event-Driven Frontend State Machine",
      decision: "Used XState on the frontend to manage the complex, non-deterministic states of the multi-agent orchestration stream.",
      alternatives: [
        {
          option: "Standard React Context / Redux",
          whyNot: "The agent stream could yield unpredictable events (tool failures, human-intervention requests, infinite loops). Standard state management led to brittle race conditions."
        }
      ],
      rationale: "A formal state machine allowed us to explicitly model all possible agent states (thinking, acting, blocked, resolved) and gracefully handle network interruptions or unexpected LLM outputs.",
      cost: "Steep learning curve for the frontend team to adopt XState, increasing initial feature delivery time."
    },
    {
      id: "decision-2",
      title: "Structured LLM Observability Pipeline",
      decision: "Implemented a custom tracing pipeline that wraps every LLM call and tool invocation in OpenTelemetry spans, decorated with agent IDs and trace correlation IDs.",
      alternatives: [
        {
          option: "Relying on LLM provider dashboards (e.g., OpenAI/Anthropic console)",
          whyNot: "Provider dashboards do not understand multi-agent handoffs or our specific business logic, and they expose PII."
        }
      ],
      rationale: "By owning the observability pipeline, we could redact PII at the edge and correlate a single customer ticket to the exact sequence of 15+ LLM calls across 4 different agents.",
      cost: "Significant backend engineering effort to maintain the ingestion and indexing of high-volume trace data."
    }
  ],
  techStack: [
    { name: "TypeScript" },
    { name: "Next.js" },
    { name: "XState" },
    { name: "Tailwind CSS" },
    { name: "OpenTelemetry" },
    { name: "Python" }
  ],
  outcomes: [
    {
      value: "100%",
      label: "Traceability",
      description: "Achieved full request-level tracing for all agent invocations, enabling operators to audit any automated decision.",
      provenance: "measured"
    },
    {
      value: "Sub-second",
      label: "UI Latency",
      description: "Optimized SSE parsing and rendering to ensure agent 'thoughts' streamed to the UI with minimal perceived latency.",
      provenance: "measured"
    }
  ],
  evidence: [],
  screenshots: [],
  lessons: [
    "Formal state machines (XState) are invaluable when building UIs that interact with non-deterministic LLM agent streams.",
    "Observability must be built into the agent framework from day one; retrofitting traces onto a complex multi-agent system is nearly impossible."
  ],
  featured: true,
  sortOrder: 1,
  coverImage: "/images/projects/multi-agent-ops/cover.webp"
};

export default multiAgentOps;
