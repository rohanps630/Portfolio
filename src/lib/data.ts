import content from "@/content/content.json";

// --- Site Config ---

export async function getSiteConfig(): Promise<Record<string, string>> {
  const { site } = content;
  return {
    name: site.name,
    title: site.title,
    description: site.description,
    tagline: site.tagline,
    url: site.url,
    email: site.contact.email,
    phone: site.contact.phone,
    location: site.contact.location,
    whatsapp: site.contact.whatsapp,
    github: site.social.github,
    linkedin: site.social.linkedin,
  };
}

// --- Nav Items ---

export interface NavItem {
  label: string;
  href: string;
  sort_order: number;
}

export async function getNavItems(): Promise<NavItem[]> {
  return content.nav.map((item, i) => ({
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
  return content.stats.map((s) => ({ label: s.label, value: s.value }));
}

// --- Tech Stack ---

export async function getTechStack(): Promise<string[]> {
  return [...content.techStack];
}

// --- Page Sections ---

export interface PageSection {
  key: string;
  visible: boolean;
}

export async function getPageSections(): Promise<PageSection[]> {
  return [...content.pageSections];
}

export async function isPageVisible(key: string): Promise<boolean> {
  const section = content.pageSections.find((s) => s.key === key);
  return section?.visible ?? true;
}
