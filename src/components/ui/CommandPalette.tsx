"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, FileText, Code2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface PagefindResult {
  url: string;
  meta: { title: string };
  excerpt: string;
}

interface PagefindAPI {
  options: (opts: Record<string, unknown>) => Promise<void>;
  search: (query: string) => Promise<{ results: Array<{ data: () => Promise<PagefindResult> }> }>;
}

// Pagefind indexes .next/server/app, so result URLs come back as
// "/notes/<slug>.html" (and "/index.html" for the home page). Map them back
// to real routes before they reach the router or the DOM.
function normalizePagefindUrl(raw: string): string {
  let url = raw;
  if (url.endsWith("/index.html")) url = url.slice(0, -"index.html".length);
  else if (url.endsWith(".html")) url = url.slice(0, -".html".length);
  if (url.length > 1 && url.endsWith("/")) url = url.slice(0, -1);
  return url === "" ? "/" : url;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pagefindInstance, setPagefindInstance] = useState<PagefindAPI | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  // Monotonic token so out-of-order search responses can never overwrite
  // newer ones (results and spinner both key off the latest request).
  const searchSeqRef = useRef(0);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    searchSeqRef.current++;
    setIsSearching(false);
    previousFocusRef.current?.focus();
    previousFocusRef.current = null;
  }, []);

  // Global hotkey (open/close) + Escape-from-anywhere while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          previousFocusRef.current = document.activeElement as HTMLElement | null;
          setIsOpen(true);
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePalette]);

  // Initialize Pagefind only when opened
  useEffect(() => {
    if (isOpen && !pagefindInstance) {
      async function loadPagefind() {
        try {
          // @ts-expect-error — pagefind has no types; loaded dynamically from the static build output
          const pagefind = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
          await pagefind.options({
            ranking: {
              pageLength: 0.5,
              termFrequency: 1.0,
            }
          });
          setPagefindInstance(pagefind);
        } catch {
          console.warn("Pagefind not found (it requires a production build). Search will not work in dev.");
        }
      }
      loadPagefind();
    }
  }, [isOpen, pagefindInstance]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = useCallback(
    async (q: string) => {
      setQuery(q);
      const seq = ++searchSeqRef.current;
      if (!q.trim() || !pagefindInstance) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const searchRes = await pagefindInstance.search(q);
        const fiveResults = await Promise.all(
          searchRes.results.slice(0, 5).map((r) => r.data())
        );
        if (seq !== searchSeqRef.current) return; // stale response — a newer search superseded it
        setResults(
          fiveResults.map((r) => ({ ...r, url: normalizePagefindUrl(r.url) }))
        );
        trackEvent("Search Executed", { query: q, resultCount: fiveResults.length });
      } catch {
        if (seq === searchSeqRef.current) setResults([]);
      } finally {
        if (seq === searchSeqRef.current) setIsSearching(false);
      }
    },
    [pagefindInstance]
  );

  const handleSelect = (url: string) => {
    trackEvent("Search Result Selected", { url, query });
    router.push(url);
    closePalette();
  };

  // Keep Tab cycling inside the dialog while it is open
  const handleTrapKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'input, button, [href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          previousFocusRef.current = e.currentTarget;
          setIsOpen(true);
        }}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/40 hover:bg-muted/80 hover:text-foreground border border-border rounded-lg transition-colors ml-4"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-sans font-medium bg-background border border-border rounded shadow-sm">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              onClick={closePalette}
              aria-hidden="true"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site search"
              onKeyDown={handleTrapKeyDown}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-2xl bg-card border border-border shadow-2xl overflow-hidden rounded-xl"
            >
              <div className="flex items-center px-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search architecture, notes, and decisions..."
                  className="flex-1 w-full bg-transparent px-4 py-4 outline-none text-foreground placeholder:text-muted-foreground"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {isSearching && (
                  <Loader2 className="h-5 w-5 text-muted-foreground animate-spin shrink-0" />
                )}
                <kbd className="hidden sm:inline-block ml-4 px-1.5 py-0.5 text-[10px] font-sans font-medium text-muted-foreground bg-muted border border-border rounded shadow-sm">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                {query && results.length > 0 ? (
                  <ul className="p-2">
                    {results.map((res, i) => {
                      const isSystem = res.url.includes("/projects/");
                      const Icon = isSystem ? Code2 : FileText;
                      return (
                        <li key={i}>
                          <button
                            className="w-full flex items-start gap-4 p-4 text-left rounded-lg hover:bg-muted/50 transition-colors group"
                            onClick={() => handleSelect(res.url)}
                          >
                            <div className="p-2 bg-background border border-border rounded shrink-0 mt-0.5">
                              <Icon className="h-4 w-4 text-accent group-hover:text-foreground transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-foreground truncate">
                                {res.meta.title}
                              </div>
                              <div
                                className="text-sm text-muted-foreground line-clamp-2 mt-1"
                                dangerouslySetInnerHTML={{ __html: res.excerpt }}
                              />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 flex items-center justify-center self-center pl-4">
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : query && !isSearching ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No results found for &ldquo;{query}&rdquo;.
                  </div>
                ) : !query ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Try searching for &ldquo;architecture&rdquo;, &ldquo;microservices&rdquo;, or &ldquo;React&rdquo;.
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
