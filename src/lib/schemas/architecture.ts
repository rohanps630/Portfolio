import { z } from "zod";

export const nodeKindSchema = z.enum([
  "service",
  "agent",
  "store",
  "queue",
  "external",
  "client",
  "pipeline-step",
]);

export const nodeSchema = z.object({
  id: z.string(),
  label: z.string().max(30), // <= 3 words roughly
  kind: nodeKindSchema,
  tech: z.array(z.string()),
  summary: z.string().max(250), // 1-2 sentences
  rationale: z.string().optional(),
  tradeoffs: z.array(z.string()).optional(),
  decisionRefs: z.array(z.string()).optional(),
  noteRefs: z.array(z.string()).optional(),
  repoPath: z.string().optional(), // full mode only
  illustrative: z.boolean().optional(), // conceptual mode only
  pos: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }),
  size: z.enum(["sm", "md", "lg"]).optional(),
});

export const groupSchema = z.object({
  id: z.string(),
  label: z.string(),
  nodeIds: z.array(z.string()),
  pos: z.object({
    x: z.number().min(0).max(100),
    y: z.number().min(0).max(100),
  }),
  dims: z.object({
    w: z.number().min(0).max(100),
    h: z.number().min(0).max(100),
  }),
});

export const edgeKindSchema = z.enum(["sync", "async", "stream", "data"]);

export const edgeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
  kind: edgeKindSchema,
  bidirectional: z.boolean().optional(),
});

export const stepSchema = z.object({
  edgeId: z.string().optional(),
  nodeId: z.string().optional(),
  caption: z.string().max(220),
});

export const flowSchema = z.object({
  id: z.string(),
  title: z.string(),
  layerId: z.string(),
  summary: z.string(),
  steps: z.array(stepSchema).min(1),
});

export const layerSchema = z.object({
  id: z.enum(["context", "container"]),
  title: z.string(),
  nodes: z.array(nodeSchema),
  groups: z.array(groupSchema).optional().default([]),
  edges: z.array(edgeSchema),
});

export const architectureModelSchema = z.object({
  system: z.string(), // relates to System.slug
  disclosure: z.enum(["full", "conceptual"]),
  layers: z.array(layerSchema).min(1),
  flows: z.array(flowSchema).min(1),
});

// Infer types
export type NodeKind = z.infer<typeof nodeKindSchema>;
export type ArchitectureNode = z.infer<typeof nodeSchema>;
export type ArchitectureGroup = z.infer<typeof groupSchema>;
export type EdgeKind = z.infer<typeof edgeKindSchema>;
export type ArchitectureEdge = z.infer<typeof edgeSchema>;
export type ArchitectureStep = z.infer<typeof stepSchema>;
export type ArchitectureFlow = z.infer<typeof flowSchema>;
export type ArchitectureLayer = z.infer<typeof layerSchema>;
export type ArchitectureModel = z.infer<typeof architectureModelSchema>;
