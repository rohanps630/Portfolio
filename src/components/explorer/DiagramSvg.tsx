import React from "react";
import { ArchitectureModel, ArchitectureNode, ArchitectureEdge, ArchitectureGroup } from "@/lib/schemas/architecture";

interface DiagramSvgProps {
  model: ArchitectureModel;
  layerId: string;
  className?: string;
  interactive?: boolean;
}

export function DiagramSvg({ model, layerId, className = "", interactive = false }: DiagramSvgProps) {
  const layer = model.layers.find((l) => l.id === layerId);
  if (!layer) return null;

  // Viewport dimensions. Nodes have {x, y} mapped 0-100. Let's scale to 0-1000 for crisp SVG.
  const SCALE = 10;
  const w = 100 * SCALE;
  const h = 100 * SCALE;

  // SVG defs ids are document-global — scope the marker per system so two
  // diagrams on one page can't collide. (The unused "arrowhead-active"
  // marker was removed; step highlighting styles the path stroke instead.)
  const markerId = `arrowhead-${model.system}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "480px" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-muted-foreground" />
        </marker>
      </defs>
      {interactive && (
        <style>{`
          .explorer-node:focus { outline: none; }
          .explorer-node:focus-visible rect { stroke: var(--color-accent); stroke-width: 3px; }
        `}</style>
      )}

      <g className="explorer-viewport">
        {/* Groups */}
        {layer.groups?.map((group) => (
          <GroupRect key={group.id} group={group} scale={SCALE} />
        ))}

        {/* Edges */}
        {layer.edges.map((edge) => (
          <EdgePath key={edge.id} edge={edge} nodes={layer.nodes} scale={SCALE} markerId={markerId} />
        ))}

        {/* Nodes */}
        {layer.nodes.map((node) => (
          <NodeGroup key={node.id} node={node} scale={SCALE} interactive={interactive} />
        ))}
      </g>
    </svg>
  );
}

function GroupRect({ group, scale }: { group: ArchitectureGroup; scale: number }) {
  const x = group.pos.x * scale;
  const y = group.pos.y * scale;
  const w = group.dims.w * scale;
  const h = group.dims.h * scale;

  return (
    <g className="explorer-group" id={`group-${group.id}`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        className="fill-muted/10 stroke-muted-foreground/30 stroke-dashed"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <text
        x={x + 16}
        y={y + 24}
        className="fill-muted-foreground text-sm font-medium"
        style={{ fontSize: "14px" }}
      >
        {group.label}
      </text>
    </g>
  );
}

function EdgePath({ edge, nodes, scale, markerId }: { edge: ArchitectureEdge; nodes: ArchitectureNode[]; scale: number; markerId: string }) {
  const fromNode = nodes.find((n) => n.id === edge.from);
  const toNode = nodes.find((n) => n.id === edge.to);

  if (!fromNode || !toNode) return null;

  // Center to center for now
  const x1 = fromNode.pos.x * scale;
  const y1 = fromNode.pos.y * scale;
  const x2 = toNode.pos.x * scale;
  const y2 = toNode.pos.y * scale;

  // Simple curve
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = x1 + dx * 0.5;
  const cy1 = y1;
  const cx2 = x1 + dx * 0.5;
  const cy2 = y2;

  const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  return (
    <g className="explorer-edge" id={`edge-${edge.id}`}>
      <path
        d={d}
        className="stroke-muted-foreground/50 fill-none transition-colors duration-300"
        strokeWidth="2"
        markerEnd={`url(#${markerId})`}
        data-edge-id={edge.id}
      />
      {edge.label && (
        <text
          x={x1 + dx / 2}
          y={y1 + dy / 2 - 8}
          textAnchor="middle"
          className="fill-muted-foreground text-xs opacity-0 transition-opacity duration-300 edge-label"
          style={{ fontSize: "12px" }}
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}

function NodeGroup({ node, scale, interactive }: { node: ArchitectureNode; scale: number; interactive: boolean }) {
  const x = node.pos.x * scale;
  const y = node.pos.y * scale;

  // Node dimensions based on size (sm, md, lg)
  let w = 140;
  let h = 60;
  if (node.size === "sm") {
    w = 100; h = 40;
  } else if (node.size === "lg") {
    w = 180; h = 80;
  }

  // Kind-based indicator dot colors (CSS variable strings for inline SVG use)
  const kindDotColor: Record<string, string> = {
    service:       "#3b82f6", // blue-500
    agent:         "#a855f7", // purple-500
    store:         "#22c55e", // emerald-500
    queue:         "#f97316", // orange-500
    external:      "#71717a", // zinc-500
    client:        "#06b6d4", // cyan-500
    "pipeline-step": "#ec4899", // pink-500
  };
  const kindFill: Record<string, string> = {
    service:       "rgba(59,130,246,0.08)",
    agent:         "rgba(168,85,247,0.08)",
    store:         "rgba(34,197,94,0.08)",
    queue:         "rgba(249,115,22,0.08)",
    external:      "rgba(113,113,122,0.08)",
    client:        "rgba(6,182,212,0.08)",
    "pipeline-step": "rgba(236,72,153,0.08)",
  };

  const dotColor = kindDotColor[node.kind] ?? kindDotColor.service;
  const rectFill = kindFill[node.kind] ?? kindFill.service;

  // Selection is handled by the canvas's click delegation; for keyboard users
  // we synthesize a bubbling click so Enter/Space reach the same code path.
  const activateWithKeyboard = (e: React.KeyboardEvent<SVGGElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    e.currentTarget.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  return (
    <g
      className={`explorer-node cursor-pointer transition-all duration-300 ${interactive ? "interactive" : ""}`}
      id={`node-${node.id}`}
      data-node-id={node.id}
      transform={`translate(${x - w / 2}, ${y - h / 2})`}
      {...(interactive
        ? {
            tabIndex: 0,
            role: "button",
            "aria-label": `Inspect node: ${node.label}`,
            onKeyDown: activateWithKeyboard,
          }
        : {})}
    >
      <rect
        width={w}
        height={h}
        rx={8}
        className="stroke-border hover:stroke-accent"
        fill={rectFill}
        strokeWidth="2"
      />
      {/* Kind indicator dot */}
      <circle cx={16} cy={h / 2} r={5} fill={dotColor} opacity={0.9} />
      <text
        x={30}
        y={h / 2 + 5}
        className="fill-foreground font-medium"
        style={{ fontSize: "13px" }}
      >
        {node.label}
      </text>
    </g>
  );
}
