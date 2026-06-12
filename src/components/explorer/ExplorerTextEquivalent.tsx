import React from "react";
import { ArchitectureModel } from "@/lib/schemas/architecture";

export function ExplorerTextEquivalent({ model, layerId }: { model: ArchitectureModel; layerId: string }) {
  const layer = model.layers.find((l) => l.id === layerId);
  if (!layer) return null;

  return (
    <div className="sr-only prose prose-sm dark:prose-invert">
      <h3>Architecture: {model.system} - {layer.title}</h3>
      
      <h4>Components</h4>
      <ul>
        {layer.nodes.map((node) => (
          <li key={node.id}>
            <strong>{node.label}</strong> ({node.kind}): {node.summary}
            {node.rationale && <p>Rationale: {node.rationale}</p>}
            {node.tradeoffs && node.tradeoffs.length > 0 && (
              <p>Tradeoffs: {node.tradeoffs.join(", ")}</p>
            )}
          </li>
        ))}
      </ul>

      <h4>Connections</h4>
      <ul>
        {layer.edges.map((edge) => {
          const from = layer.nodes.find(n => n.id === edge.from)?.label || edge.from;
          const to = layer.nodes.find(n => n.id === edge.to)?.label || edge.to;
          return (
            <li key={edge.id}>
              {from} connects to {to} ({edge.kind}){edge.label ? ` via ${edge.label}` : ""}
            </li>
          );
        })}
      </ul>

      {model.flows.filter(f => f.layerId === layerId).map((flow) => (
        <div key={flow.id}>
          <h4>Flow: {flow.title}</h4>
          <p>{flow.summary}</p>
          <ol>
            {flow.steps.map((step, idx) => {
              let focus = "";
              if (step.nodeId) {
                focus = layer.nodes.find(n => n.id === step.nodeId)?.label || step.nodeId;
              } else if (step.edgeId) {
                const edge = layer.edges.find(e => e.id === step.edgeId);
                if (edge) {
                  const from = layer.nodes.find(n => n.id === edge.from)?.label;
                  const to = layer.nodes.find(n => n.id === edge.to)?.label;
                  focus = `Connection from ${from} to ${to}`;
                }
              }
              return (
                <li key={idx}>
                  <strong>{focus}:</strong> {step.caption}
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
