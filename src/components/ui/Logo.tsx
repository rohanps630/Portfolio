import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-xl font-bold tracking-tight text-foreground hover:text-accent transition-colors",
        className
      )}
      aria-label="Rohan P. Suresh — Home"
    >
      <span className="text-accent">R</span>ohan
      <span className="text-accent">.</span>
    </Link>
  );
}
