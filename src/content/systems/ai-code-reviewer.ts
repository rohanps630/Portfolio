import type { System } from "@/lib/schemas/system";

export const aiCodeReviewer: System = {
  "slug": "ai-code-reviewer",
  "title": "AI Code Reviewer",
  "thesis": "An autonomous agent that reviews GitHub pull requests with code-aware retrieval and tool use",
  "tier": 1,
  "domain": "ai-systems",
  "context": "independent",
  "status": {
    "kind": "building",
    "phase": 6,
    "phaseTotal": 6
  },
  "role": "Sole Engineer — Architecture, Implementation, Evals",
  "timeline": {
    "start": "2026"
  },
  "year": "2026",
  "executiveSummary": "An AI agent that reviews pull requests by reasoning over the repository, not just the diff. Built from scratch as a working study of production LLM engineering: a hand-written, model-agnostic agent runtime, hybrid BM25 + vector retrieval with cross-encoder reranking, a versioned eval harness with a committed baseline, two-layer caching, prompt-injection defense, and end-to-end observability. Core build complete — foundations, retrieval, agent runtime, evals, and production concerns — with GitHub-native PR delivery in progress.",
  "businessContext": "Every code review tool that calls itself 'AI' fails in one of two ways. Diff-only tools are fast and cheap, but they miss the issues that matter: the caller this change just broke, the interface this new type is supposed to satisfy, the test that now exercises dead code. Mega-prompt tools go to the other extreme — paste the whole repository into context — which is slow (minutes per review), expensive, and still misses the same issues because the model can't attend to everything in a large context window. The gap between those two failure modes is retrieval: identifying the right 3–5% of a repository that is genuinely load-bearing for understanding a given diff, structuring it so the model can reason rather than scan, and measuring with an eval harness whether the retrieval actually improved review quality. No off-the-shelf tool solves this correctly because it requires real retrieval engineering — AST-aware chunking, hybrid search, cross-encoder reranking — not framework glue. That is why this system exists.",
  "problemStatement": "Off-the-shelf AI code review tools either operate only on the diff (missing critical context like callers, type definitions, and tests) or paste the entire repository into a single mega-prompt (slow, expensive, and noisy). The harder, more interesting problem is building an agent that retrieves the right context for each finding, justifies its reasoning, and stays cheap and fast enough to run on every PR. Doing this well requires real retrieval engineering — not LangChain glue — plus evals that catch regressions before they ship, and production-grade observability so you can debug an agent that thinks for itself.",
  "constraints": [
    {
      "kind": "budget",
      "text": "Hard $0.50 per-review cost cap enforced inside the agent loop via a per-model pricing table — generous enough to cover a real diff but strict enough to make the system viable at scale."
    },
    {
      "kind": "latency",
      "text": "Review must complete within a time window that feels synchronous to a developer waiting on a PR — ruling out any multi-minute indexing or batch-processing approach."
    },
    {
      "kind": "platform",
      "text": "Model-agnostic from day one: the agent runtime must support Anthropic, OpenAI, Google, Groq, and Ollama behind a single interface so the system is not locked to any one provider's pricing or availability."
    }
  ],
  "solutionOverview": "Designed as a TypeScript + Python monorepo. The core is a hand-written, model-agnostic Agent runtime in packages/agent — a typed, streaming ReAct loop with explicit termination (a validated submit_review stop tool, an iteration cap, an in-loop $0.50 cost cap, timeouts, and cancellation) that runs the same tools across five providers (Anthropic, OpenAI, Google, Groq, Ollama) behind one seam. Retrieval is a composable hybrid pipeline: tree-sitter produces AST-aware code chunks (Python and TypeScript/JavaScript), Voyage's voyage-code-3 embeddings power semantic search over pgvector, BM25 handles lexical recall, Reciprocal Rank Fusion merges the lanes, and Cohere rerank-v3.5 re-scores the survivors with a cross-encoder. A Python indexer handles repository ingestion, including Haiku-generated contextual chunk prefixes. Evals run a versioned golden dataset (v1: 30 synthetic seeded examples; real public-PR curation in progress) through the agent and score outputs with a versioned LLM-as-judge plus deterministic checks — the baseline run is committed to the repo, failure included. Production concerns are first-class: prompt caching on the system prompt and indexed documents, Redis exact-match plus pgvector semantic caching, tier-based model routing backed by a per-model pricing table, and prompt-injection defenses that treat all retrieved code as untrusted. Every run is traced end-to-end in Langfuse and persisted as a replayable event stream.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Hand-Written Agent Runtime with Tool Use",
      "decision": "A model-agnostic runtime — no framework — driving a typed, streaming ReAct loop over a Zod-typed tool registry.",
      "alternatives": [
        {
          "option": "LangChain or LlamaIndex",
          "whyNot": "Abstracts the LLM calls too heavily, obscuring prompt formatting and making it difficult to debug token usage or enforce strict streaming iteration constraints."
        }
      ],
      "rationale": "By writing a raw ReAct loop with Zod-typed tool execution, we get absolute control over the generation lifecycle, accurate token counting, and the ability to cleanly enforce our strict $0.50 per-run cost ceiling.",
      "cost": "Requires maintaining our own provider SDK wrappers and manual retry logic, adding roughly ~600 lines of boilerplate to the core."
    },
    {
      "id": "decision-2",
      "title": "Hybrid Code-Aware Retrieval",
      "decision": "Tree-sitter AST chunking combined with BM25, Voyage embeddings, Reciprocal Rank Fusion, and Cohere cross-encoder reranking.",
      "alternatives": [
        {
          "option": "Pure Vector Search (Embeddings only)",
          "whyNot": "Semantic search fails on exact symbol matches (e.g., finding the specific usage of an obscure variable name) which are critical for code review context."
        },
        {
          "option": "Static Analysis only",
          "whyNot": "Cannot grasp intent or answer semantic queries like 'where do we handle payment retry logic?'"
        }
      ],
      "rationale": "Combining BM25 (lexical) with Voyage embeddings (semantic) via Reciprocal Rank Fusion, followed by a Cohere cross-encoder reranking, yields the best of both worlds, ensuring both exact symbols and semantic intent are retrieved.",
      "cost": "Significantly increases indexing time and requires running three distinct models/algorithms per query, adding ~800ms of latency to the context gathering phase."
    },
    {
      "id": "decision-3",
      "title": "Evals with a Versioned Golden Dataset",
      "decision": "A versioned golden dataset scored by a versioned LLM-as-judge plus deterministic checks, running automatically in CI.",
      "alternatives": [
        {
          "option": "Prompt-based vibe checks (Eyeballing)",
          "whyNot": "Breaks down completely at scale; impossible to know if a prompt tweak improved logic but regressed syntax checks."
        }
      ],
      "rationale": "A versioned dataset gives us a deterministic baseline. If an agent refactor drops the judge score below the baseline 0.635, we don't merge. It treats prompt engineering as software engineering.",
      "cost": "Writing and maintaining the golden dataset requires significant human time (curating the PR, defining the expected findings, maintaining the judge criteria)."
    },
    {
      "id": "decision-4",
      "title": "Production-Grade Observability",
      "decision": "Full request-level tracing in Langfuse via agent lifecycle hooks, persisting every run as a replayable event stream.",
      "alternatives": [
        {
          "option": "Console logging or basic APM",
          "whyNot": "Does not capture the rich, nested tree of LLM traces, token usage, tool invocations, and retrieval latencies."
        }
      ],
      "rationale": "Langfuse provides full request-level tracing. We persist every run as a replayable event stream, meaning when the agent hallucinates, we can step through the exact prompt, retrieved context, and tool outputs that led to the failure.",
      "cost": "Adds a dependency on a dedicated LLM observability stack and slightly increases memory footprint per run to buffer traces."
    },
    {
      "id": "decision-5",
      "title": "Cost & Latency Optimizations",
      "decision": "Prompt caching, exact-match semantic caching, and tier-based model routing backed by a pricing table.",
      "alternatives": [
        {
          "option": "Always route to the smartest model (e.g., Claude 3.5 Sonnet)",
          "whyNot": "Costs scale linearly and violate our $0.50 per PR budget very quickly on large diffs."
        }
      ],
      "rationale": "We use a tiered routing system. Simple file parsing and formatting use Haiku, saving the expensive Sonnet calls strictly for the final synthesized review. We also heavily leverage Anthropic's prompt caching on the system prompt.",
      "cost": "Requires complex state management to track token counts across multiple model sessions and manually calculate cumulative costs mid-loop."
    },
    {
      "id": "decision-6",
      "title": "Prompt-Injection Defense",
      "decision": "All retrieved code is treated as untrusted, wrapped in XML tags, sanitized against delimiter forgery, and executed in an E2B sandbox.",
      "alternatives": [
        {
          "option": "Ignore the risk (assume internal PRs are safe)",
          "whyNot": "A compromised dependency or malicious pull request could instruct the agent to leak secrets or execute arbitrary code."
        }
      ],
      "rationale": "We treat all retrieved code as untrusted, wrapping it in specific XML tags, sanitizing diffs against delimiter forgery, and running all arbitrary code executions in an isolated E2B sandbox.",
      "cost": "Adds noticeable parsing latency to sanitize strings, and running an E2B sandbox introduces a hard cold-start penalty for code execution."
    }
  ],
  "techStack": [
    {
      "name": "TypeScript"
    },
    {
      "name": "Next.js"
    },
    {
      "name": "Python"
    },
    {
      "name": "Anthropic Claude"
    },
    {
      "name": "Voyage AI"
    },
    {
      "name": "Cohere"
    },
    {
      "name": "pgvector"
    },
    {
      "name": "Drizzle"
    },
    {
      "name": "tree-sitter"
    },
    {
      "name": "Langfuse"
    },
    {
      "name": "Redis"
    },
    {
      "name": "E2B"
    }
  ],
  "outcomes": [
    {
      "value": "Core complete",
      "label": "Build Status",
      "description": "Foundations, retrieval, agent runtime, evals, and production concerns are built and tested (426 tests in CI). GitHub delivery package (packages/github) and acr-review CLI are implemented; self-review workflow is the next milestone.",
      "provenance": "measured"
    },
    {
      "value": "80%+",
      "label": "Eval Target",
      "description": "Target: ≥0.8 judge score with <20% false positives on dataset v2 — the committed v1 baseline (judge 0.635, 67% FP, verdict: below-bar) is the published starting line",
      "provenance": "target"
    },
    {
      "value": "$0.50",
      "label": "Cost Cap",
      "description": "Hard per-review spend cap enforced inside the agent loop via a per-model pricing table, alongside prompt caching, semantic caching, and tier-based routing. This is a code-enforced ceiling, not a measured average — real-traffic cost will be confirmed once the agent runs on live PRs.",
      "provenance": "scope-fact"
    }
  ],
  "evidence": [
    {
      "kind": "repo",
      "url": "https://github.com/rohanps630/ai-code-reviewer",
      "label": "GitHub Repository"
    }
  ],
  "screenshots": [],
  "lessons": [
    "The committed below-bar eval baseline (judge score 0.635, 67% false-positive rate) turned out to be the most useful artifact in the repo — it made regressions impossible to miss and gave reviewers a concrete starting point to push back on. Publishing the failure was the right call.",
    "Hand-writing the agent runtime added ~600 lines of boilerplate, but the payoff was complete visibility into every token spend, tool invocation, and iteration limit. The first time the loop tried to exceed the cost cap mid-run, we caught it cleanly because we owned the loop.",
    "Retrieval quality gates matter more than model quality at the margins. Improving the chunking strategy (tree-sitter over line-based splitting) dropped false positives more than switching to a frontier model did."
  ],
  "featured": true,
  "sortOrder": 0,
  "coverImage": "/images/projects/ai-code-reviewer/cover.webp"
};

export default aiCodeReviewer;
