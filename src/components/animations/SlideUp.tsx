"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function SlideUp({ children, delay, className }: SlideUpProps) {
  return (
    <FadeIn direction="up" delay={delay} className={cn(className)}>
      {children}
    </FadeIn>
  );
}
