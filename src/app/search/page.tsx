import { createMetadata } from "@/lib/seo";
import { CommandPalette } from "@/components/ui/CommandPalette";

// Search is a thin, JS-only UI with no indexable content of its own — keep it
// out of the index but let crawlers follow its links.
export const metadata = {
  ...createMetadata({
    title: "Search",
    description: "Search across Rohan P. Suresh's projects and engineering notes.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-heading font-bold mb-4">Search</h1>
      <p className="text-muted-foreground mb-8">
        Press <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm mx-1">⌘K</kbd> to open search from anywhere on the site.
      </p>
      <CommandPalette />
    </div>
  );
}
