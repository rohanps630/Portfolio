"use client";

import React from "react";
import { ArchitectureFlow } from "@/lib/schemas/architecture";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface FlowStepperProps {
  flows: ArchitectureFlow[];
  currentFlowId: string | null;
  stepIdx: number;
  onFlowSelect: (flowId: string | null) => void;
  onStepChange: (stepIdx: number) => void;
}

export function FlowStepper({ flows, currentFlowId, stepIdx, onFlowSelect, onStepChange }: FlowStepperProps) {
  const currentFlow = currentFlowId ? flows.find(f => f.id === currentFlowId) : null;

  if (!currentFlowId || !currentFlow) {
    if (flows.length === 0) return null;
    return (
      <div className="flex gap-2 pointer-events-auto">
        {flows.map(f => (
          <button
            key={f.id}
            onClick={() => onFlowSelect(f.id)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm hover:border-accent hover:text-accent transition-colors text-sm font-medium"
          >
            <Play className="h-4 w-4" />
            Play Flow: {f.title}
          </button>
        ))}
      </div>
    );
  }

  const isFirst = stepIdx === 0;
  const isLast = stepIdx === currentFlow.steps.length - 1;

  const handleNext = () => !isLast && onStepChange(stepIdx + 1);
  const handlePrev = () => !isFirst && onStepChange(stepIdx - 1);
  const handleClose = () => onFlowSelect(null);

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg pointer-events-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Flow: {currentFlow.title}
        </span>
        <button onClick={handleClose} className="text-xs font-medium hover:text-accent transition-colors">
          Exit Flow
        </button>
      </div>

      {/* Main Step Area */}
      <div className="flex items-center p-4 gap-4">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex-1 text-center" aria-live="polite">
          <p className="text-sm md:text-base font-medium text-foreground">
            {currentFlow.steps[stepIdx].caption}
          </p>
          <div className="mt-2 flex justify-center gap-1">
            {currentFlow.steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === stepIdx ? "w-4 bg-accent" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={isLast}
          className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next step"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
