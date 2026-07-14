import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: {
    kind: "production" | "building" | "archived";
    phase?: number;
    phaseTotal?: number;
  };
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let label = "Production";
  let colorClass =
    "bg-[var(--color-status-production)]/10 text-[var(--color-status-production)] ring-[var(--color-status-production)]/20";

  if (status.kind === "building") {
    label = `Building${
      status.phase && status.phaseTotal
        ? ` · Phase ${status.phase}/${status.phaseTotal}`
        : ""
    }`;
    colorClass =
      "bg-[var(--color-status-building)]/10 text-[var(--color-status-building)] ring-[var(--color-status-building)]/20";
  } else if (status.kind === "archived") {
    label = "Archived";
    colorClass =
      "bg-[var(--color-status-archive)]/10 text-[var(--color-status-archive)] ring-[var(--color-status-archive)]/20";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 mono-label ring-1 ring-inset",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
