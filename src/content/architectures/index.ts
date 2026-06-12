import { ArchitectureModel } from "@/lib/schemas/architecture";

// This file serves as a registry for all architecture models.
import { aiCodeReviewerModel } from "./ai-code-reviewer";
import { multiAgentOpsModel } from "./multi-agent-ops";

export const architectures: ArchitectureModel[] = [
  aiCodeReviewerModel,
  multiAgentOpsModel,
];

export function getArchitectureBySlug(slug: string): ArchitectureModel | undefined {
  return architectures.find((a) => a.system === slug);
}
