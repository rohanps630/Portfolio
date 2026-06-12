"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-heading text-8xl md:text-9xl font-bold text-accent/20">
        404
      </p>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-accent/30"
        >
          Back to Home
        </Link>
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
        >
          <Search className="h-4 w-4" />
          Search Site
        </button>
      </div>
    </main>
  );
}
