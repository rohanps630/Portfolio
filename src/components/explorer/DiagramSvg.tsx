import React from "react";
import { ArchitectureModel, ArchitectureLayer, ArchitectureNode, ArchitectureEdge, ArchitectureGroup } from "@/lib/schemas/architecture";

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

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`w-full h-full ${className}`}
      style={{ minHeight: "480px" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-muted-foreground" />
        </marker>
        <marker
          id="arrowhead-active"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-accent" />
        </marker>
      </defs>

      <g className="explorer-viewport">
        {/* Groups */}
        {layer.groups?.map((group) => (
          <GroupRect key={group.id} group={group} scale={SCALE} />
        ))}

        {/* Edges */}
        {layer.edges.map((edge) => (
          <EdgePath key={edge.id} edge={edge} nodes={layer.nodes} scale={SCALE} />
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

function EdgePath({ edge, nodes, scale }: { edge: ArchitectureEdge; nodes: ArchitectureNode[]; scale: number }) {
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
        markerEnd="url(#arrowhead)"
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

  // Kind-based colors
  const kindColors: Record<string, string> = {
    service: "bg-blue-500/10 stroke-blue-500/50 text-blue-500",
    agent: "bg-purple-500/10 stroke-purple-500/50 text-purple-500",
    store: "bg-emerald-500/10 stroke-emerald-500/50 text-emerald-500",
    queue: "bg-orange-500/10 stroke-orange-500/50 text-orange-500",
    external: "bg-muted stroke-muted-foreground/30 text-muted-foreground",
    client: "bg-cyan-500/10 stroke-cyan-500/50 text-cyan-500",
    "pipeline-step": "bg-pink-500/10 stroke-pink-500/50 text-pink-500",
  };

  const styleClass = kindColors[node.kind] || kindColors.service;

  // Map utility classes to SVG presentational attributes
  // In a real app we'd map these cleanly, but using CSS classes is standard.
  // We'll rely on the global CSS vars via currentColor or actual class names if configured.
  // For SVG we can use fill/stroke classes if we configure Tailwind, otherwise inline styles.
  // Let's use `fill-card stroke-border` base.
  
  return (
    <g
      className={`explorer-node cursor-pointer transition-all duration-300 ${interactive ? "interactive" : ""}`}
      id={`node-${node.id}`}
      data-node-id={node.id}
      transform={`translate(${x - w / 2}, ${y - h / 2})`}
    >
      <rect
        width={w}
        height={h}
        rx={8}
        className="fill-card stroke-border hover:stroke-accent"
        strokeWidth="2"
      />
      {/* Indicator for kind */}
      <circle cx={16} cy={h / 2} r={6} className="fill-accent opacity-80" />
      <text
        x={32}
        y={h / 2 + 5}
        className="fill-foreground font-medium text-sm"
        style={{ fontSize: "14px" }}
      >
        {node.label}
      </text>
    </g>
  );
}
