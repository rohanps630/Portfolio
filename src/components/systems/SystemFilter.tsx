"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SystemFilterProps {
  domains: string[];
  contexts: string[];
  totalCount: number;
}

export function SystemFilter({
  domains,
  contexts,
  totalCount,
}: SystemFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentDomain = searchParams.get("domain");
  const currentContext = searchParams.get("context");

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      if (params.get(key) === value) {
        params.delete(key); // toggle off
      } else {
        params.set(key, value);
      }
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2 self-center">
            Domain:
          </span>
          {domains.map((domain) => {
            const isActive = currentDomain === domain;
            return (
              <button
                key={domain}
                onClick={() => updateParams("domain", domain)}
                className={cn(
                  "px-3 py-1 text-sm rounded-full border transition-colors",
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-border text-muted-foreground hover:border-muted-foreground"
                )}
              >
                {domain}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2 self-center">
            Context:
          </span>
          {contexts.map((context) => {
            const isActive = currentContext === context;
            return (
              <button
                key={context}
                onClick={() => updateParams("context", context)}
                className={cn(
                  "px-3 py-1 text-sm rounded-full border transition-colors",
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-border text-muted-foreground hover:border-muted-foreground"
                )}
              >
                {context}
              </button>
            );
          })}
        </div>
      </div>
      {(currentDomain || currentContext) && (
        <button
          onClick={() => {
            router.push(pathname, { scroll: false });
          }}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          Reset filters ({totalCount} total)
        </button>
      )}
    </div>
  );
}
