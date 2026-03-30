"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground",
        className
      )}
    >
      {name}
    </motion.span>
  );
}
