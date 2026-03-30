import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
  id,
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  );
}
