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
  // A pan gesture ends in a browser-synthesized click on the background;
  // track travelled distance so panning is never mistaken for a deselect click.
  const dragDistance = useRef(0);

  const activeStep = currentFlow?.steps[stepIdx];

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest(".explorer-node")) return;
    setIsDragging(true);
    dragDistance.current = 0;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    dragDistance.current += Math.abs(dx) + Math.abs(dy);
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
    } else if (dragDistance.current < 5) {
      onNodeSelect(null);
    }
  };

  // Passive:false wheel listener — functional updater avoids stale closure on scale.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Plain scrolling must keep scrolling the page (the explorer is embedded
      // in case studies). Zoom only on ctrl/cmd+wheel — which also covers
      // trackpad pinch, since browsers report pinch as ctrl+wheel.
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setTransform(t => ({ ...t, scale: Math.min(Math.max(0.5, t.scale - e.deltaY * 0.001), 2.5) }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const PAN_STEP = 20;
    const keyMap: Record<string, () => void> = {
      ArrowUp: () => setTransform(t => ({ ...t, y: t.y + PAN_STEP })),
      ArrowDown: () => setTransform(t => ({ ...t, y: t.y - PAN_STEP })),
      ArrowLeft: () => setTransform(t => ({ ...t, x: t.x + PAN_STEP })),
      ArrowRight: () => setTransform(t => ({ ...t, x: t.x - PAN_STEP })),
      "+": () => setTransform(t => ({ ...t, scale: Math.min(t.scale + 0.1, 2.5) })),
      "-": () => setTransform(t => ({ ...t, scale: Math.max(t.scale - 0.1, 0.5) })),
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      keyMap[e.key]();
    }
  };

  return (
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
    /* role="application" is WAI-ARIA's correct role for an interactive canvas widget; eslint-plugin-jsx-a11y doesn't include it in its interactive-roles list */
    <div
      ref={containerRef}
      role="application"
      aria-label="Interactive architecture diagram — use arrow keys to pan, + and - to zoom, Tab to reach nodes"
      tabIndex={0}
      className="w-full h-full cursor-grab active:cursor-grabbing relative bg-grid-pattern"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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
