import { z } from "zod";

export const constraintSchema = z.object({
  kind: z.enum(["budget", "latency", "compliance", "team", "legacy", "platform"]),
  text: z.string(),
});

export const decisionRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  decision: z.string(),
  alternatives: z.array(
    z.object({
      option: z.string(),
      whyNot: z.string(),
    })
  ).min(1),
  rationale: z.string(),
  cost: z.string(), // REQUIRED: what this choice gave up / still hurts
  nodeRefs: z.array(z.string()).optional(),
});

export const techEntrySchema = z.object({
  name: z.string(),
  role: z.string().optional(),
});

export const metricFactSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string(),
  provenance: z.enum(["measured", "target", "scope-fact"]),
  source: z.string().optional(),
});

export const evidenceLinkSchema = z.object({
  kind: z.enum(["repo", "live", "writeup", "talk"]),
  url: z.string().url(),
  label: z.string(),
});

export const screenshotSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const diagramSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  summary: z.string().optional(),
});

export const systemSchema = z.object({
  // Identity
  slug: z.string(),
  title: z.string(),
  thesis: z.string(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  domain: z.enum(["ai-systems", "platforms", "products"]),
  context: z.enum(["production", "independent", "client"]),
  status: z.object({
    kind: z.enum(["production", "building", "archived"]),
    phase: z.number().optional(),
    phaseTotal: z.number().optional(),
  }),
  confidentiality: z.string().optional(),
  role: z.string(),
  timeline: z.object({
    start: z.string(), // ISO date like "2024-01" or "2024-01-01"
    end: z.string().optional(),
  }),
  year: z.string(),

  // Narrative
  executiveSummary: z.string().max(800), // ~120 words
  businessContext: z.string(),
  problemStatement: z.string(),
  constraints: z.array(constraintSchema),

  // Engineering
  solutionOverview: z.string(),
  staticDiagrams: z.array(diagramSchema).optional(),
  decisions: z.array(decisionRecordSchema),
  techStack: z.array(techEntrySchema),

  // Proof
  outcomes: z.array(metricFactSchema),
  evidence: z.array(evidenceLinkSchema),
  screenshots: z.array(screenshotSchema),
  lessons: z.array(z.string()),

  featured: z.boolean(),
  sortOrder: z.number(),
  coverImage: z.string(),
});

export type System = z.infer<typeof systemSchema>;
export type DecisionRecord = z.infer<typeof decisionRecordSchema>;
export type MetricFact = z.infer<typeof metricFactSchema>;
export type Constraint = z.infer<typeof constraintSchema>;
export type EvidenceLink = z.infer<typeof evidenceLinkSchema>;
export type TechEntry = z.infer<typeof techEntrySchema>;
export type Screenshot = z.infer<typeof screenshotSchema>;
export type Diagram = z.infer<typeof diagramSchema>;
