import { siteConfig } from "@/content/site";

// --- Stats ---

export interface Stat {
  label: string;
  value: string;
}

export async function getStats(): Promise<Stat[]> {
  return siteConfig.stats.map((s) => ({ label: s.label, value: s.value }));
}
