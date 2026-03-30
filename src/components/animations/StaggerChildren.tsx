"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = (delay: number, staggerDelay: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: delay,
      staggerChildren: staggerDelay,
    },
  },
});

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function StaggerChildren({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={containerVariants(delay, staggerDelay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
