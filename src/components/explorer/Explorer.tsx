"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArchitectureModel } from "@/lib/schemas/architecture";
import { ExplorerCanvas } from "./ExplorerCanvas";
import { NodeInspector } from "./NodeInspector";
import { FlowStepper } from "./FlowStepper";
import { ExplorerTextEquivalent } from "./ExplorerTextEquivalent";
import { trackEvent } from "@/lib/analytics";

interface ExplorerProps {
  model: ArchitectureModel;
  embedded?: boolean;
}

export function Explorer({ model, embedded = false }: ExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State from URL — these params arrive from shareable/hand-editable links,
  // so every one of them must resolve to a valid state, never a crash.
  const rawLayerId = searchParams.get("layer");
  const flowId = searchParams.get("flow") || null;
  const rawStep = parseInt(searchParams.get("step") || "0", 10);
  const selectedNodeId = searchParams.get("node") || null;

  // Track open
  useEffect(() => {
    trackEvent("explorer_open", { system: model.system, embedded });
  }, [model.system, embedded]);

  const updateState = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v === null) params.delete(k);
      else params.set(k, v);
    });
    // Use replace for fast state updates
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleNodeSelect = (nodeId: string | null) => {
    if (nodeId) trackEvent("node_inspect", { system: model.system, nodeId });
    updateState({ node: nodeId });
  };

  const handleLayerSelect = (id: string) => {
    updateState({ layer: id, flow: null, step: null, node: null });
  };

  const currentLayer = model.layers.find((l) => l.id === rawLayerId) || model.layers[0];
  const layerId = currentLayer.id;
  const selectedNode = selectedNodeId ? currentLayer.nodes.find((n) => n.id === selectedNodeId) || null : null;
  const currentFlow = flowId ? model.flows.find((f) => f.id === flowId) || null : null;
  const stepIdx = currentFlow
    ? Math.min(Math.max(Number.isNaN(rawStep) ? 0 : rawStep, 0), currentFlow.steps.length - 1)
    : 0;

  return (
    <div className={`flex flex-col md:flex-row bg-background border border-border overflow-hidden ${embedded ? "h-[600px] rounded-xl" : "h-[calc(100vh-4rem)] w-full"}`}>
      {/* Accessible text equivalent — visible only to screen readers */}
      <ExplorerTextEquivalent model={model} layerId={layerId} />

      {/* Main Canvas Area */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <div className="flex gap-2 pointer-events-auto bg-card border border-border p-1 rounded-lg shadow-sm">
            {model.layers.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLayerSelect(l.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  l.id === layerId ? "bg-accent text-white" : "hover:bg-muted text-muted-foreground"
                }`}
              >
                {l.title}
              </button>
            ))}
          </div>
          {model.disclosure === "conceptual" && (
            <div className="inline-flex items-center gap-1.5 bg-warning/10 text-foreground border border-warning/40 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide pointer-events-auto backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
              Conceptual Reconstruction
            </div>
          )}
        </div>

        {/* The SVG Canvas */}
        <ExplorerCanvas
          model={model}
          layerId={layerId}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handleNodeSelect}
          currentFlow={currentFlow}
          stepIdx={stepIdx}
        />

        {/* Bottom Stepper Area */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <FlowStepper
            flows={model.flows.filter((f) => f.layerId === layerId)}
            currentFlowId={flowId}
            stepIdx={stepIdx}
            onFlowSelect={(fId) => updateState({ flow: fId, step: "0", node: null })}
            onStepChange={(sIdx) => {
              updateState({ step: sIdx.toString() });
              trackEvent("flow_step", { system: model.system, flowId, stepIdx: sIdx });
            }}
          />
        </div>
      </div>

      {/* Side Inspector Panel */}
      {(selectedNode || (!embedded && model.disclosure === "full")) && (
        <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-border bg-card/50 backdrop-blur overflow-y-auto">
          <NodeInspector node={selectedNode} system={model.system} mode={model.disclosure} />
        </div>
      )}
    </div>
  );
}
