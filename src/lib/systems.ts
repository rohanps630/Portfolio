import type { System } from "@/lib/schemas/system";

import aiCodeReviewer from "@/content/systems/ai-code-reviewer";
import accessibleChatSystem from "@/content/systems/accessible-chat-system";
import learningPortal from "@/content/systems/learning-portal";
import aiAutomationHub from "@/content/systems/ai-automation-hub";
import roofingCrm from "@/content/systems/roofing-crm";
import transitClaims from "@/content/systems/transit-claims";
import dentalClinicHms from "@/content/systems/dental-clinic-hms";

const systems: System[] = [
  aiCodeReviewer,
  accessibleChatSystem,
  learningPortal,
  aiAutomationHub,
  roofingCrm,
  transitClaims,
  dentalClinicHms,
].sort((a, b) => a.sortOrder - b.sortOrder);

export async function getSystems(): Promise<System[]> {
  return systems;
}

export async function getFeaturedSystems(): Promise<System[]> {
  return systems.filter((s) => s.featured);
}

export async function getSystemBySlug(slug: string): Promise<System | undefined> {
  return systems.find((s) => s.slug === slug);
}

export async function getSystemDomains(): Promise<string[]> {
  const domains = new Set(systems.map((s) => s.domain));
  return Array.from(domains);
}

export async function getSystemContexts(): Promise<string[]> {
  const contexts = new Set(systems.map((s) => s.context));
  return Array.from(contexts);
}
