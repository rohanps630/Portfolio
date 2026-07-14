"use client";

import { Search } from "lucide-react";

// Opens the site-wide command palette (rendered once, in the Navbar) by
// synthesizing its ⌘K hotkey. Rendering a second <CommandPalette /> would
// register a second global hotkey listener and stack two dialogs.
export function OpenSearchButton() {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", metaKey: true })
        )
      }
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
    >
      <Search className="h-4 w-4" />
      Open Search
    </button>
  );
}
