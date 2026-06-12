"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArchitectureModel, ArchitectureFlow } from "@/lib/schemas/architecture";
import { DiagramSvg } from "./DiagramSvg";

interface ExplorerCanvasProps {
  model: ArchitectureModel;
  layerId: string;
  selectedNodeId: string | null;
  onNodeSelect: (id: string | null) => void;
  currentFlow: ArchitectureFlow | null;
  stepIdx: number;
}

export function ExplorerCanvas({ model, layerId, selectedNodeId, onNodeSelect, currentFlow, stepIdx }: ExplorerCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const activeStep = currentFlow?.steps[stepIdx];

  // Pan & Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault(); // Need a passive:false listener in reality, but this is a rough approximation
    const zoomSensitivity = 0.001;
    const newScale = Math.min(Math.max(0.5, transform.scale - e.deltaY * zoomSensitivity), 2.5);
    setTransform(t => ({ ...t, scale: newScale }));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest(".explorer-node")) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const handleClick = (e: React.MouseEvent) => {
    const nodeEl = (e.target as Element).closest(".explorer-node");
    if (nodeEl) {
      const id = nodeEl.getAttribute("data-node-id");
      if (id) onNodeSelect(id);
    } else {
      onNodeSelect(null);
    }
  };

  // Add passive false wheel listener manually
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScale = Math.min(Math.max(0.5, transform.scale - e.deltaY * 0.001), 2.5);
      setTransform(t => ({ ...t, scale: newScale }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [transform.scale]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative bg-grid-pattern"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      <div
        className="w-full h-full origin-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        <DiagramSvg model={model} layerId={layerId} interactive={true} />

        {/* Overlays for interaction states */}
        {selectedNodeId && (
          <style>{`
            .explorer-node:not([data-node-id="${selectedNodeId}"]) { opacity: 0.4; }
            .explorer-edge { opacity: 0.2; }
          `}</style>
        )}
        {activeStep && (
          <style>{`
            ${activeStep.nodeId ? `.explorer-node[data-node-id="${activeStep.nodeId}"] rect { stroke: var(--color-accent); stroke-width: 3px; }` : ""}
            ${activeStep.edgeId ? `.explorer-edge[data-edge-id="${activeStep.edgeId}"] path { stroke: var(--color-accent); stroke-width: 3px; opacity: 1 !important; }` : ""}
          `}</style>
        )}
      </div>
    </div>
  );
}
