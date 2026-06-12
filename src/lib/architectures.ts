import { ArchitectureModel } from "./schemas/architecture";

// We will statically import the architecture models here for now.
// In a real application with many models, we might dynamically import them or read from JSON.

export async function getArchitectures(): Promise<ArchitectureModel[]> {
  const architectures: ArchitectureModel[] = [];
  
  // We will try to dynamically import all .ts files from src/content/architectures
  // Wait, Next.js server components and Turbopack might not like dynamic FS imports.
  // We can just explicitly list them or use a require.context equivalent if needed.
  // For validation scripts, we can use fs.readdirSync.
  // For the app, we can have an index.ts in src/content/architectures.
  
  return architectures;
}
