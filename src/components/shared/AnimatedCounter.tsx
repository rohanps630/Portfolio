"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseFloat(match[1]), suffix: match[2] };
}

export function AnimatedCounter({
  value,
  label,
  className,
}: AnimatedCounterProps) {
  const { number, suffix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 1.5,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(number);
    }
  }, [isInView, spring, number]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        const isDecimal = number % 1 !== 0;
        ref.current.textContent = isDecimal
          ? latest.toFixed(1)
          : Math.round(latest).toString();
      }
    });
    return unsubscribe;
  }, [spring, number]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("text-center", className)}>
        <p className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          {value}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <p className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
