"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArchitectureModel, ArchitectureNode, ArchitectureStep } from "@/lib/schemas/architecture";
import { ExplorerCanvas } from "./ExplorerCanvas";
import { NodeInspector } from "./NodeInspector";
import { FlowStepper } from "./FlowStepper";
import { trackEvent } from "@/lib/analytics";

interface ExplorerProps {
  model: ArchitectureModel;
  embedded?: boolean;
}

export function Explorer({ model, embedded = false }: ExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State from URL
  const layerId = searchParams.get("layer") || model.layers[0].id;
  const flowId = searchParams.get("flow") || null;
  const stepIdx = parseInt(searchParams.get("step") || "0", 10);
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

  const currentLayer = model.layers.find((l) => l.id === layerId) || model.layers[0];
  const selectedNode = selectedNodeId ? currentLayer.nodes.find((n) => n.id === selectedNodeId) || null : null;
  const currentFlow = flowId ? model.flows.find((f) => f.id === flowId) || null : null;

  return (
    <div className={`flex flex-col md:flex-row bg-background border border-border overflow-hidden ${embedded ? "h-[600px] rounded-xl" : "h-[calc(100vh-4rem)] w-full"}`}>
      
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
            <div className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide pointer-events-auto backdrop-blur-sm">
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
