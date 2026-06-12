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

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pagefindInstance, setPagefindInstance] = useState<any>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initialize Pagefind only when opened
  useEffect(() => {
    if (isOpen && !pagefindInstance) {
      async function loadPagefind() {
        try {
          // @ts-ignore
          const pagefind = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
          await pagefind.options({
            ranking: {
              pageLength: 0.5,
              termFrequency: 1.0,
            }
          });
          setPagefindInstance(pagefind);
        } catch (e) {
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
      if (!q.trim() || !pagefindInstance) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      const searchRes = await pagefindInstance.search(q);
      const fiveResults = await Promise.all(
        searchRes.results.slice(0, 5).map((r: any) => r.data())
      );
      setResults(fiveResults);
      setIsSearching(false);
      trackEvent("Search Executed", { query: q, resultCount: fiveResults.length });
    },
    [pagefindInstance]
  );

  const closePalette = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleSelect = (url: string) => {
    trackEvent("Search Result Selected", { url, query });
    router.push(url);
    closePalette();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
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
                  onKeyDown={(e) => {
                    if (e.key === "Escape") closePalette();
                  }}
                />
                {isSearching && (
                  <Loader2 className="h-5 w-5 text-muted-foreground animate-spin shrink-0" />
                )}
                <kbd className="hidden sm:inline-block ml-4 px-1.5 py-0.5 text-[10px] font-sans font-medium text-muted-foreground bg-muted border border-border rounded shadow-sm">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                {results.length > 0 ? (
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
                    No results found for "{query}".
                  </div>
                ) : !query ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Try searching for "architecture", "microservices", or "React".
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
