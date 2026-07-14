import { siteConfig } from "@/content/site";
import { getSystems } from "@/lib/systems";

// --- Stats ---

export interface Stat {
  label: string;
  value: string;
}

export async function getStats(): Promise<Stat[]> {
  // "Products Shipped" is derived from the systems registry, not hardcoded:
  // a hardcoded count drifted ("7+" against 13 published case studies).
  // The registry holds only the major shipped systems (the real total is
  // higher), so the stat floors to the nearest 5 with a "+" — an understated
  // claim the case studies themselves can always back (owner-directed
  // 2026-07-12). Systems still "building" haven't shipped, so they don't
  // count.
  const systems = await getSystems();
  const shipped = systems.filter((s) => s.status.kind !== "building").length;
  const [yearsBuilding, aiIntegrations] = siteConfig.stats;
  return [
    { label: yearsBuilding.label, value: yearsBuilding.value },
    { label: "Products Shipped", value: `${Math.floor(shipped / 5) * 5}+` },
    { label: aiIntegrations.label, value: aiIntegrations.value },
  ];
}
