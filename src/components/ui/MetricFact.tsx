import { cn } from "@/lib/utils";
import type { MetricFact as MetricFactType } from "@/lib/schemas/system";

interface MetricFactProps {
  fact: MetricFactType;
  className?: string;
}

export function MetricFact({ fact, className }: MetricFactProps) {
  let provenanceColor =
    "text-[var(--color-provenance-measured)] bg-[var(--color-provenance-measured)]/10 ring-[var(--color-provenance-measured)]/20";
  let provenanceLabel = "Measured";

  if (fact.provenance === "target") {
    provenanceColor =
      "text-[var(--color-provenance-target)] bg-[var(--color-provenance-target)]/10 ring-[var(--color-provenance-target)]/20";
    provenanceLabel = "Target";
  } else if (fact.provenance === "scope-fact") {
    provenanceColor =
      "text-[var(--color-provenance-scope)] bg-[var(--color-provenance-scope)]/10 ring-[var(--color-provenance-scope)]/20";
    provenanceLabel = "Scope Fact";
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-heading font-bold text-foreground">
          {fact.value}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-1.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase ring-1 ring-inset",
            provenanceColor
          )}
          title={`Provenance: ${provenanceLabel}`}
        >
          {provenanceLabel}
        </span>
      </div>
      <p className="text-sm font-medium text-foreground">{fact.label}</p>
      <p className="text-sm text-muted-foreground leading-snug">
        {fact.description}
      </p>
    </div>
  );
}
