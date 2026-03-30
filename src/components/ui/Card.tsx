import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 transition-all duration-300",
        hover && "hover:bg-card-hover hover:border-accent/20 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
