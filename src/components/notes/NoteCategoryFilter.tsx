"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NoteCategory } from "@/types/note";

interface CategoryOption {
  value: NoteCategory;
  label: string;
  count: number;
}

interface NoteCategoryFilterProps {
  categories: CategoryOption[];
  totalCount: number;
}

export function NoteCategoryFilter({
  categories,
  totalCount,
}: NoteCategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category");

  function handleFilter(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`/notes?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-10 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div
        className="flex items-center gap-2 pb-2"
        role="tablist"
        aria-label="Filter notes notes by category"
      >
        <button
          role="tab"
          aria-selected={!activeCategory}
          onClick={() => handleFilter(null)}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
            !activeCategory
              ? "bg-accent text-white shadow-lg shadow-accent/20"
              : "border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
          )}
        >
          All
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs",
              !activeCategory
                ? "bg-white/20 text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            {totalCount}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => handleFilter(cat.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
              activeCategory === cat.value
                ? "bg-accent text-white shadow-lg shadow-accent/20"
                : "border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
            )}
          >
            {cat.label}
            <span
              className={cn(
                "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs",
                activeCategory === cat.value
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
