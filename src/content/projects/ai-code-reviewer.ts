import type { Project } from "@/types/project";

const aiCodeReviewer: Project = {
  slug: "ai-code-reviewer",
  title: "AI Code Reviewer",
  tagline:
    "An autonomous agent that reviews GitHub pull requests with code-aware retrieval and tool use",
  description:
    "An AI agent that reviews pull requests by reasoning over the full repository, not just the diff. Built from scratch as a working portfolio of AI-integration engineering: a hand-written agent loop, hybrid BM25 + vector retrieval, cross-encoder reranking, an eval harness over historical OSS PRs, and end-to-end observability. Currently in Phase 1 of a 6-phase roadmap covering retrieval design, prompt versioning, semantic caching, prompt-injection defense, and cost-aware model routing.",
  category: "ai-ml",
  featured: true,
  sortOrder: 0,
  challenge:
    "Off-the-shelf AI code review tools either operate only on the diff (missing critical context like callers, type definitions, and tests) or paste the entire repository into a single mega-prompt (slow, expensive, and noisy). The harder, more interesting problem is building an agent that retrieves the right context for each finding, justifies its reasoning, and stays cheap and fast enough to run on every PR. Doing this well requires real retrieval engineering — not LangChain glue — plus evals that catch regressions before they ship, and production-grade observability so you can debug an agent that thinks for itself.",
  role: "Sole Engineer — Architecture, Implementation, Evals",
  approach:
    "Designed as a TypeScript + Python monorepo. The agent core lives in packages/agent — a hand-written loop that calls Anthropic Claude with a tool-use interface and explicit termination conditions (stop sequence, max iterations, hard cost cap). Retrieval is a composable hybrid pipeline: tree-sitter produces AST-aware code chunks, Voyage's voyage-code-3 embeddings power semantic search over pgvector, BM25 handles lexical recall, and Cohere rerank-3 fuses the two with cross-encoder scoring. A Python indexer running on Modal handles repository ingestion and eval runs. Evals replay 50+ historical PRs from popular open-source repos through the agent and score outputs with an LLM-as-judge plus deterministic checks (did it flag the regression that the original reviewer flagged?). Production concerns are first-class: prompt caching reduces input tokens by 80%+ on follow-up turns, semantic caching short-circuits near-duplicate queries, a model router picks Haiku for cheap classification and Sonnet for synthesis, and prompt-injection defenses prevent malicious code comments from hijacking the agent. Every run is traced end-to-end in Langfuse.",
  features: [
    {
      title: "Hand-Written Agent Loop with Tool Use",
      description:
        "A bespoke loop that calls Claude with a Zod-typed tool registry — search_code, read_file, find_references, run_tests, get_pr_discussion — with explicit termination on stop sequence, iteration cap, or cost ceiling. No framework, no leaky abstractions.",
    },
    {
      title: "Hybrid Code-Aware Retrieval",
      description:
        "Tree-sitter AST chunking preserves function and class boundaries. BM25 + Voyage voyage-code-3 embeddings + Cohere rerank-3 are composed as inspectable steps you can swap, with contextual chunk prefixing for semantic recall on short snippets.",
    },
    {
      title: "Real Evals on Historical OSS PRs",
      description:
        "A golden dataset of 50+ PRs from real open-source repos, replayed through the agent and scored by an LLM-as-judge plus deterministic checks. Eval deltas gate every prompt change, retrieval tweak, and model upgrade.",
    },
    {
      title: "Production-Grade Observability",
      description:
        "Full request-level tracing in Langfuse — tool calls, token counts, retrieval scores, model latencies. Sentry for error tracking. Cost and latency dashboards expose exactly where each dollar and second goes.",
    },
    {
      title: "Cost & Latency Optimizations",
      description:
        "Prompt caching on the system prompt and tool schemas, semantic caching on near-duplicate retrieval queries, and a model router that sends classification to Haiku and synthesis to Sonnet. Average PR review cost stays under $0.20.",
    },
    {
      title: "Prompt-Injection Defense",
      description:
        "Adversarial inputs in code comments, commit messages, and PR descriptions are sandboxed in a separate user-role turn with explicit instructions, never blended into the system prompt. Injection attempts are logged and surfaced.",
    },
  ],
  impact: [
    {
      label: "Project Phase",
      value: "Phase 1",
      description:
        "Foundations — agent loop, retrieval pipeline, and golden eval set in active development across a 6-phase roadmap",
    },
    {
      label: "Eval Target",
      value: "80%+",
      description:
        "Goal: match or exceed the original reviewer's findings on 80%+ of replayed PRs from a 50+ OSS golden dataset",
    },
    {
      label: "Cost Target",
      value: "<$0.50",
      description:
        "Per-PR cost budget enforced through prompt caching, semantic caching, and Haiku/Sonnet model routing",
    },
  ],
  techStack: [
    "TypeScript",
    "Next.js",
    "Python",
    "Anthropic Claude",
    "Voyage AI",
    "Cohere",
    "pgvector",
    "Drizzle",
    "tree-sitter",
    "Langfuse",
    "Modal",
    "Vercel",
  ],
  liveUrl: undefined,
  githubUrl: "https://github.com/rohanps630/ai-code-reviewer",
  coverImage: "/images/projects/ai-code-reviewer/cover.webp",
  screenshots: [],
  duration: "Ongoing",
  year: "2026",
};

export default aiCodeReviewer;
