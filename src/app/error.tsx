"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the console; a real APM hook (Sentry) would go here.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-heading text-7xl md:text-8xl font-bold text-accent/20">
        Oops
      </p>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md">
        An unexpected error occurred while rendering this page. You can try again,
        or head back home.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-accent/30"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
