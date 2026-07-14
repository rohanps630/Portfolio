import { existsSync } from "fs";
import { join } from "path";

import type { System } from "@/lib/schemas/system";

import aiCodeReviewer from "@/content/systems/ai-code-reviewer";
import accessibleChatSystem from "@/content/systems/accessible-chat-system";
import learningPortal from "@/content/systems/learning-portal";
import aiAutomationHub from "@/content/systems/ai-automation-hub";
import roofingCrm from "@/content/systems/roofing-crm";
import transitClaims from "@/content/systems/transit-claims";
import dentalClinicHms from "@/content/systems/dental-clinic-hms";
import multiAgentOps from "@/content/systems/multi-agent-ops";
import telecomPos from "@/content/systems/telecom-pos";
import insuranceClaimsFieldApp from "@/content/systems/insurance-claims-field-app";
import elearningStudentApp from "@/content/systems/elearning-student-app";
import eventServicesMarketplace from "@/content/systems/event-services-marketplace";
import supplyChainFieldApp from "@/content/systems/supply-chain-field-app";

const systems: System[] = [
  aiCodeReviewer,
  accessibleChatSystem,
  learningPortal,
  aiAutomationHub,
  roofingCrm,
  transitClaims,
  dentalClinicHms,
  multiAgentOps,
  telecomPos,
  insuranceClaimsFieldApp,
  elearningStudentApp,
  eventServicesMarketplace,
  supplyChainFieldApp,
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

// Missing media is a designed state: the validator warns, and the UI must fall
// back rather than ship a broken <img>. This runs at build time (the site is
// fully static), so client trees only ever receive the resolved src as a prop.
export async function getSystemCoverMap(
  list: System[]
): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  for (const system of list) {
    const file = join(process.cwd(), "public", system.coverImage.replace(/^\//, ""));
    if (existsSync(file)) {
      map[system.slug] = system.coverImage;
    }
  }
  return map;
}
