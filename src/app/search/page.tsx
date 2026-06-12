"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function SearchPage() {
  const router = useRouter();

  useEffect(() => {
    // Attempt to trigger the Cmd+K shortcut programmatically
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
    
    // Optional: go back after opening
    router.replace("/");
  }, [router]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-heading font-bold mb-4">Opening Search...</h1>
      <p className="text-muted-foreground mb-8">
        Press <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm mx-1">⌘K</kbd> to search anywhere on the site.
      </p>
      <CommandPalette />
    </main>
  );
}
