import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

import { siteConfig } from "../src/content/site";
import { siteSchema } from "../src/lib/schemas/site";
import { noteSchema } from "../src/lib/schemas/note";
import { getSystems } from "../src/lib/systems";
import { architectures } from "../src/content/architectures";
import { architectureModelSchema } from "../src/lib/schemas/architecture";

async function main() {
  let hasError = false;
  let warnCount = 0;
  const error = (msg: string) => {
    console.error(`❌ ${msg}`);
    hasError = true;
  };
  const warn = (msg: string) => {
    console.warn(`⚠️  ${msg}`);
    warnCount += 1;
  };
  const checkImage = (publicPath: string, owner: string) => {
    const imgPath = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    if (!existsSync(imgPath)) {
      warn(`Image missing (fallback will render): ${publicPath} (${owner})`);
    } else if (statSync(imgPath).size === 0) {
      warn(`Image file is empty — delete or replace with a real asset: ${publicPath} (${owner})`);
    }
  };

  console.log("Validating site config...");
  const siteResult = siteSchema.safeParse(siteConfig);
  if (!siteResult.success) {
    error(`Site config validation failed: ${siteResult.error.message}`);
  }

  console.log("Validating systems...");
  const systems = await getSystems();
  const systemSlugs = new Set<string>();
  
  for (const system of systems) {
    if (systemSlugs.has(system.slug)) {
      error(`Duplicate system slug found: ${system.slug}`);
    }
    systemSlugs.add(system.slug);

    if (system.coverImage) {
      checkImage(system.coverImage, `System: ${system.slug}`);
    }

    // Referential checks
    const decisionIds = new Set<string>();
    for (const d of system.decisions) {
      if (decisionIds.has(d.id)) {
        error(`Duplicate decision ID found: ${d.id} in system ${system.slug}`);
      }
      decisionIds.add(d.id);
    }

    // Evidence rule
    if (system.tier <= 2) {
      if (system.evidence.length === 0 && system.screenshots.length === 0) {
        warn(`Tier ${system.tier} system ${system.slug} has no evidence or screenshots (required in Phase 2)`);
      }
    }
  }

  console.log("Validating architectures...");
  for (const arch of architectures) {
    const archResult = architectureModelSchema.safeParse(arch);
    if (!archResult.success) {
      error(`Architecture model validation failed for system '${arch.system}': ${archResult.error.message}`);
    } else {
      const model = archResult.data;
      
      // Ensure system exists
      if (!systemSlugs.has(model.system)) {
        error(`Architecture model references unknown system: ${model.system}`);
      }

      // Collect all node IDs across layers
      const nodeIds = new Set<string>();
      for (const layer of model.layers) {
        for (const node of layer.nodes) {
          if (nodeIds.has(node.id)) {
            error(`Duplicate node ID '${node.id}' in architecture for system '${model.system}'`);
          }
          nodeIds.add(node.id);
        }
      }

      // Validate edge endpoints
      for (const layer of model.layers) {
        for (const edge of layer.edges) {
          if (!nodeIds.has(edge.from)) {
            error(`Edge '${edge.id}' references unknown 'from' node '${edge.from}' in system '${model.system}'`);
          }
          if (!nodeIds.has(edge.to)) {
            error(`Edge '${edge.id}' references unknown 'to' node '${edge.to}' in system '${model.system}'`);
          }
        }
      }

      // Validate flow step references
      for (const flow of model.flows) {
        for (const step of flow.steps) {
          if (step.nodeId && !nodeIds.has(step.nodeId)) {
            error(`Step in flow '${flow.id}' references unknown node '${step.nodeId}' in system '${model.system}'`);
          }
          // Edge refs validation could also go here
        }
      }

      // Confidentiality/Mode validation
      if (model.disclosure === "conceptual") {
        if (model.layers.length > 1) {
          error(`Conceptual mode architecture for '${model.system}' must have exactly one layer.`);
        }
        for (const layer of model.layers) {
          for (const node of layer.nodes) {
            if (node.repoPath) {
              error(`Conceptual mode architecture for '${model.system}' cannot contain repoPath on node '${node.id}'.`);
            }
          }
        }
      } else if (model.disclosure === "full") {
        // Full mode rules
        let hasRationaleAndTradeoff = true;
        for (const layer of model.layers) {
          for (const node of layer.nodes) {
            if (node.kind !== "external" && node.kind !== "client") {
              if (!node.rationale || !node.tradeoffs || node.tradeoffs.length === 0) {
                hasRationaleAndTradeoff = false;
                error(`Full mode node '${node.id}' in system '${model.system}' must have rationale and >= 1 tradeoff.`);
              }
            }
          }
        }
      }
    }
  }

  console.log("Validating notes notes...");
  const blogDir = join(process.cwd(), "src", "content", "notes");
  if (existsSync(blogDir)) {
    const files = readdirSync(blogDir).filter(f => f.endsWith(".mdx"));
    
    for (const file of files) {
      const filePath = join(blogDir, file);
      const content = readFileSync(filePath, "utf-8");
      const { data } = matter(content);
      const slug = file.replace(/\.mdx$/, "");

      const noteResult = noteSchema.safeParse({ ...data, slug });
      if (!noteResult.success) {
        error(`Note note validation failed for ${file}: ${noteResult.error.message}`);
      } else {
        const coverImage = noteResult.data.coverImage;
        if (coverImage) {
          checkImage(coverImage, `Note: ${file}`);
        }
      }
    }
  }

  if (hasError) {
    process.exit(1);
  } else if (warnCount > 0) {
    console.log(`✅ Content valid (${warnCount} media warning${warnCount === 1 ? "" : "s"} — real assets pending).`);
  } else {
    console.log("✅ All content validated successfully.");
  }
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
