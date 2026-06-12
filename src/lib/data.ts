import { siteConfig } from "@/content/site";

// --- Site Config ---

export async function getSiteConfig(): Promise<Record<string, string>> {
  return {
    name: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    tagline: siteConfig.tagline,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    location: siteConfig.contact.location,
    whatsapp: siteConfig.contact.whatsapp,
    github: siteConfig.social.github,
    linkedin: siteConfig.social.linkedin,
  };
}

// --- Nav Items ---

export interface NavItem {
  label: string;
  href: string;
  sort_order: number;
}

export async function getNavItems(): Promise<NavItem[]> {
  return siteConfig.nav.map((item, i) => ({
    label: item.label,
    href: item.href,
    sort_order: i,
  }));
}

// --- Stats ---

export interface Stat {
  label: string;
  value: string;
}

export async function getStats(): Promise<Stat[]> {
  return siteConfig.stats.map((s) => ({ label: s.label, value: s.value }));
}

// --- Tech Stack ---

export async function getTechStack(): Promise<string[]> {
  return [...siteConfig.techStack];
}

// --- Page Sections ---

export interface PageSection {
  key: string;
  visible: boolean;
}

const DEFAULT_PAGE_SECTIONS: PageSection[] = [
  { key: "home", visible: true },
  { key: "about", visible: true },
  { key: "projects", visible: true },
  { key: "blog", visible: true },
  { key: "contact", visible: true }
];

export async function getPageSections(): Promise<PageSection[]> {
  return DEFAULT_PAGE_SECTIONS;
}

export async function isPageVisible(key: string): Promise<boolean> {
  const section = DEFAULT_PAGE_SECTIONS.find((s) => s.key === key);
  return section?.visible ?? true;
}
