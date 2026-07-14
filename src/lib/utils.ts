import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatDate(date: string): string {
  // Date-only strings parse as UTC midnight; without an explicit timeZone the
  // rendered date shifts a day backwards for visitors west of UTC.
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const TITLE_ACRONYMS = new Set(["ai", "api", "llm", "seo", "css", "ui"]);

// "ai-code-reviewer" → "AI Code Reviewer" (naive per-word capitalization
// renders "Ai Code Reviewer").
export function formatSeriesTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) =>
      TITLE_ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
}
