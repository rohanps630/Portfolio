import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "bg-accent-muted text-accent": variant === "accent",
          "border border-border text-muted-foreground": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
