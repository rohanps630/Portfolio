import sql from "@/lib/db";
import { siteConfig } from "@/content/site";
import services from "@/content/services";

// --- Site Config ---

export async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const rows = await sql<{ key: string; value: string }[]>`
      SELECT key, value FROM site_config
    `;
    if (rows.length > 0) {
      return Object.fromEntries(rows.map((r) => [r.key, r.value]));
    }
  } catch {
    // fall through to static fallback
  }
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
  try {
    const rows = await sql<NavItem[]>`
      SELECT label, href, sort_order FROM nav_items WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows;
  } catch {
    // fall through to static fallback
  }
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
  try {
    const rows = await sql<(Stat & { sort_order: number })[]>`
      SELECT label, value, sort_order FROM stats WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows.map(({ label, value }) => ({ label, value }));
  } catch {
    // fall through to static fallback
  }
  return siteConfig.stats.map((s) => ({ label: s.label, value: s.value }));
}

// --- Tech Stack ---

export async function getTechStack(): Promise<string[]> {
  try {
    const rows = await sql<{ name: string }[]>`
      SELECT name FROM tech_stack WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows.map((r) => r.name);
  } catch {
    // fall through to static fallback
  }
  return [...siteConfig.techStack];
}

// --- Services ---

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  timeline: string;
  features: string[];
  highlighted: boolean;
  cta_text: string;
  sort_order: number;
}

interface ServiceRow {
  id: string;
  title: string;
  description: string;
  price: string;
  timeline: string;
  features: string[] | string;
  highlighted: boolean;
  cta_text: string;
  sort_order: number;
}

export async function getServices(): Promise<Service[]> {
  try {
    const rows = await sql<ServiceRow[]>`
      SELECT id, title, description, price, timeline, features, highlighted, cta_text, sort_order
      FROM services WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) {
      return rows.map((r) => ({
        ...r,
        features: typeof r.features === "string" ? JSON.parse(r.features) as string[] : r.features,
      }));
    }
  } catch {
    // fall through to static fallback
  }
  return services.map((s, i) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    price: s.price,
    timeline: s.timeline,
    features: s.features,
    highlighted: s.highlighted,
    cta_text: s.ctaText,
    sort_order: i,
  }));
}

// --- Testimonials ---

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  sort_order: number;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await sql<Testimonial[]>`
      SELECT quote, name, role, company, sort_order
      FROM testimonials WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows;
  } catch {
    // fall through to static fallback
  }
  return [
    {
      quote:
        "Rohan took our rough concept and turned it into a polished product in record time. His ability to translate business needs into clean, maintainable code is exceptional.",
      name: "Aditya Menon",
      role: "Co-founder",
      company: "TechLaunch Solutions",
      sort_order: 0,
    },
    {
      quote:
        "Working with Rohan was a game changer for our team. He brought structure to our codebase, mentored junior developers, and delivered features ahead of schedule consistently.",
      name: "Sarah Mitchell",
      role: "Product Manager",
      company: "CloudNine Apps",
      sort_order: 1,
    },
    {
      quote:
        "Rohan has a rare combination of deep technical skill and genuine care for the end-user experience. He is the kind of developer every startup needs on their side.",
      name: "Vivek Krishnan",
      role: "CTO",
      company: "FinEdge Technologies",
      sort_order: 2,
    },
  ];
}

// --- FAQs ---

export interface FAQ {
  question: string;
  answer: string;
  sort_order: number;
}

export async function getFaqs(): Promise<FAQ[]> {
  try {
    const rows = await sql<FAQ[]>`
      SELECT question, answer, sort_order FROM faqs WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows;
  } catch {
    // fall through to static fallback
  }
  return [
    { question: "What is your typical response time?", answer: "I respond to all inquiries within 24 hours. For ongoing projects, I maintain regular communication through daily or weekly check-ins depending on the project phase and your preference.", sort_order: 0 },
    { question: "Do you work with clients in different time zones?", answer: "Absolutely. I've worked with clients across the US, Europe, and Middle East. I adapt my schedule to ensure overlap hours for real-time collaboration while maintaining async communication for everything else.", sort_order: 1 },
    { question: "What if my project scope changes mid-development?", answer: "Scope changes are a natural part of development. I use agile practices so we can adapt as your product evolves. I'll communicate any impact on timeline or budget upfront so there are no surprises.", sort_order: 2 },
    { question: "Do you provide post-launch support?", answer: "Yes, all my service packages include post-launch support. The duration varies by plan — from 30 days for MVP development to 90 days for full product builds, with ongoing support available as a separate engagement.", sort_order: 3 },
    { question: "What technologies do you specialize in?", answer: "My core stack includes React, React Native, Next.js, Node.js, NestJS, Python, and Django. For databases I work with MongoDB and PostgreSQL, and I have extensive experience with Docker, AWS, and CI/CD pipelines.", sort_order: 4 },
    { question: "How do we communicate during the project?", answer: "I believe in transparent, regular communication. Depending on your preference, we can use Slack, Discord, email, or scheduled video calls. You'll always have visibility into progress through shared project boards and regular updates.", sort_order: 5 },
  ];
}

// --- Process Steps ---

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  sort_order: number;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const rows = await sql<ProcessStep[]>`
      SELECT number, title, description, sort_order FROM process_steps WHERE visible = true ORDER BY sort_order ASC
    `;
    if (rows.length > 0) return rows;
  } catch {
    // fall through to static fallback
  }
  return [
    { number: 1, title: "Discovery", description: "Understanding your vision and requirements", sort_order: 0 },
    { number: 2, title: "Architecture", description: "Designing the technical foundation", sort_order: 1 },
    { number: 3, title: "Development", description: "Building with clean, tested code", sort_order: 2 },
    { number: 4, title: "Testing", description: "Ensuring quality across all scenarios", sort_order: 3 },
    { number: 5, title: "Launch", description: "Deploying to production with confidence", sort_order: 4 },
    { number: 6, title: "Support", description: "Ongoing maintenance and optimization", sort_order: 5 },
  ];
}

// --- Page Sections ---

export interface PageSection {
  key: string;
  visible: boolean;
}

export async function getPageSections(): Promise<PageSection[]> {
  try {
    const rows = await sql<PageSection[]>`
      SELECT key, visible FROM page_sections
    `;
    if (rows.length > 0) return rows;
  } catch {
    // fall through to static fallback
  }
  return [];
}

export async function isPageVisible(key: string): Promise<boolean> {
  try {
    const rows = await sql<{ visible: boolean }[]>`
      SELECT visible FROM page_sections WHERE key = ${key}
    `;
    if (rows.length > 0) return rows[0].visible;
  } catch {
    // fall through to default
  }
  return true;
}
