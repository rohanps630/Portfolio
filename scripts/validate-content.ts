import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

import { siteConfig } from "../src/content/site";
import { siteSchema } from "../src/lib/schemas/site";
import { noteSchema } from "../src/lib/schemas/note";
import { getSystems } from "../src/lib/systems";

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

  console.log("Validating blog posts...");
  const blogDir = join(process.cwd(), "src", "content", "blog");
  if (existsSync(blogDir)) {
    const files = readdirSync(blogDir).filter(f => f.endsWith(".mdx"));
    
    for (const file of files) {
      const filePath = join(blogDir, file);
      const content = readFileSync(filePath, "utf-8");
      const { data } = matter(content);
      const slug = file.replace(/\.mdx$/, "");

      const noteResult = noteSchema.safeParse({ ...data, slug });
      if (!noteResult.success) {
        error(`Blog post validation failed for ${file}: ${noteResult.error.message}`);
      } else {
        const coverImage = noteResult.data.coverImage;
        if (coverImage) {
          checkImage(coverImage, `Post: ${file}`);
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
