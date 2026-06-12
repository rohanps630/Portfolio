import type { Project } from "@/types/project";

const aiCodeReviewer: Project = {
  slug: "ai-code-reviewer",
  title: "AI Code Reviewer",
  tagline:
    "An autonomous agent that reviews GitHub pull requests with code-aware retrieval and tool use",
  description:
    "An AI agent that reviews pull requests by reasoning over the repository, not just the diff. Built from scratch as a working study of production LLM engineering: a hand-written, model-agnostic agent runtime, hybrid BM25 + vector retrieval with cross-encoder reranking, a versioned eval harness with a committed baseline, two-layer caching, prompt-injection defense, and end-to-end observability. Core build complete — foundations, retrieval, agent runtime, evals, and production concerns — with GitHub-native PR delivery in progress.",
  category: "ai-ml",
  featured: true,
  sortOrder: 0,
  challenge:
    "Off-the-shelf AI code review tools either operate only on the diff (missing critical context like callers, type definitions, and tests) or paste the entire repository into a single mega-prompt (slow, expensive, and noisy). The harder, more interesting problem is building an agent that retrieves the right context for each finding, justifies its reasoning, and stays cheap and fast enough to run on every PR. Doing this well requires real retrieval engineering — not LangChain glue — plus evals that catch regressions before they ship, and production-grade observability so you can debug an agent that thinks for itself.",
  role: "Sole Engineer — Architecture, Implementation, Evals",
  approach:
    "Designed as a TypeScript + Python monorepo. The core is a hand-written, model-agnostic Agent runtime in packages/agent — a typed, streaming ReAct loop with explicit termination (a validated submit_review stop tool, an iteration cap, an in-loop $0.50 cost cap, timeouts, and cancellation) that runs the same tools across five providers (Anthropic, OpenAI, Google, Groq, Ollama) behind one seam. Retrieval is a composable hybrid pipeline: tree-sitter produces AST-aware code chunks (Python and TypeScript/JavaScript), Voyage's voyage-code-3 embeddings power semantic search over pgvector, BM25 handles lexical recall, Reciprocal Rank Fusion merges the lanes, and Cohere rerank-v3.5 re-scores the survivors with a cross-encoder. A Python indexer handles repository ingestion, including Haiku-generated contextual chunk prefixes. Evals run a versioned golden dataset (v1: 30 synthetic seeded examples; real public-PR curation in progress) through the agent and score outputs with a versioned LLM-as-judge plus deterministic checks — the baseline run is committed to the repo, failure included. Production concerns are first-class: prompt caching on the system prompt and indexed documents, Redis exact-match plus pgvector semantic caching, tier-based model routing backed by a per-model pricing table, and prompt-injection defenses that treat all retrieved code as untrusted. Every run is traced end-to-end in Langfuse and persisted as a replayable event stream.",
  features: [
    {
      title: "Hand-Written Agent Runtime with Tool Use",
      description:
        "A model-agnostic runtime — no framework — driving a typed, streaming ReAct loop over a Zod-typed tool registry: search_code, read_file, find_references, and sandboxed run_tests. Explicit termination via a validated submit_review stop tool, an iteration cap, an in-loop cost ceiling, timeouts, and cancellation.",
    },
    {
      title: "Hybrid Code-Aware Retrieval",
      description:
        "Tree-sitter AST chunking preserves function and class boundaries. BM25 + Voyage voyage-code-3 embeddings are fused with Reciprocal Rank Fusion, then re-scored by Cohere rerank-v3.5 — composed as inspectable steps you can swap, with contextual chunk prefixing for semantic recall on short snippets.",
    },
    {
      title: "Evals with a Versioned Golden Dataset",
      description:
        "A versioned golden dataset (v1: 30 synthetic seeded examples across bug, security, performance, and logic categories — real public-PR curation in progress), scored by a versioned LLM-as-judge plus deterministic checks. The baseline run is committed to the repo, below-bar verdict and 67% false-positive rate included, and eval CI posts regression deltas on pull requests.",
    },
    {
      title: "Production-Grade Observability",
      description:
        "Full request-level tracing in Langfuse via agent lifecycle hooks — tool calls, token counts, cache metadata, model latencies. Sentry for error tracking, and every run persisted as a replayable event stream with a step-by-step replay UI.",
    },
    {
      title: "Cost & Latency Optimizations",
      description:
        "Prompt caching on the system prompt and indexed documents, Redis exact-match plus pgvector semantic caching on near-duplicate diffs, and tier-based model routing (haiku/sonnet/opus per provider) backed by a pricing table that feeds a hard $0.50 in-loop spend cap. Measured average cost lands with the upcoming frontier-model eval runs.",
    },
    {
      title: "Prompt-Injection Defense",
      description:
        "All retrieved code is treated as untrusted: file contents and search results are wrapped in untrusted-content tags, diff text is sanitized against delimiter forgery, and the system prompt pins explicit injection-resistance rules — covered by a dedicated test suite. The agent executes untrusted code only inside an E2B sandbox.",
    },
  ],
  impact: [
    {
      label: "Build Status",
      value: "Core complete",
      description:
        "Foundations, retrieval, agent runtime, evals, and production concerns are built and tested (426 tests in CI); GitHub-native PR delivery is implemented and merging",
    },
    {
      label: "Eval Target",
      value: "80%+",
      description:
        "Target: ≥0.8 judge score with <20% false positives on dataset v2 — the committed v1 baseline (judge 0.635, 67% FP, verdict: below-bar) is the published starting line",
    },
    {
      label: "Cost Cap",
      value: "$0.50",
      description:
        "Hard per-review spend cap enforced inside the agent loop via a per-model pricing table, alongside prompt caching, semantic caching, and tier-based routing",
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
    "Redis",
    "E2B",
  ],
  liveUrl: undefined,
  githubUrl: "https://github.com/rohanps630/ai-code-reviewer",
  coverImage: "/images/projects/ai-code-reviewer/cover.webp",
  screenshots: [],
  duration: "Ongoing",
  year: "2026",
};

export default aiCodeReviewer;
