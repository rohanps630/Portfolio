"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DecisionRecord } from "@/lib/schemas/system";

interface DecisionRecordProps {
  decision: DecisionRecord;
  defaultOpen?: boolean;
}

export function DecisionRecordBlock({ decision, defaultOpen = false }: DecisionRecordProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    // Handle hash linking
    if (window.location.hash === `#${decision.id}`) {
      setTimeout(() => {
        setIsOpen(true);
        // Small delay to ensure the DOM has expanded before scrolling
        setTimeout(() => {
          document.getElementById(decision.id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }, 0);
    }
  }, [decision.id]);

  return (
    <div 
      id={decision.id}
      className="border border-border rounded-lg overflow-hidden bg-card"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1">
          <span className="mono-label text-accent uppercase">Decision</span>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {decision.title}
          </h3>
        </div>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 pt-0 border-t border-border">
              <div className="space-y-6 mt-4">
                
                {/* Chosen Decision */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    Chosen Approach
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{decision.decision}</p>
                </div>

                {/* Alternatives */}
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Rejected Alternatives
                  </h4>
                  <ul className="space-y-4">
                    {decision.alternatives.map((alt, i) => (
                      <li key={i} className="pl-4 border-l-2 border-border">
                        <span className="font-medium text-foreground block mb-1">
                          {alt.option}
                        </span>
                        <span className="text-muted-foreground text-sm leading-relaxed block">
                          {alt.whyNot}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rationale */}
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Rationale
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{decision.rationale}</p>
                </div>

                {/* Cost (Visually Distinct) */}
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
                  <h4 className="font-semibold text-warning mb-1 flex items-center gap-2 text-sm uppercase tracking-wider">
                    Trade-off / Cost
                  </h4>
                  <p className="text-warning text-sm leading-relaxed">
                    {decision.cost}
                  </p>
                </div>

                {/* Node Refs (inert until P3) */}
                {decision.nodeRefs && decision.nodeRefs.length > 0 && (
                  <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mr-2">Architecture Nodes:</span>
                    {decision.nodeRefs.map((ref) => (
                      <span key={ref} className="px-2 py-1 bg-muted rounded text-xs font-mono text-muted-foreground border border-border">
                        {ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
