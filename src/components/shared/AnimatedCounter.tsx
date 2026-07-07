"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { numberStr: "0", suffix: value };
  return { numberStr: match[1], suffix: match[2] };
}

/** A single digit that "rolls" from 0 to its target via translateY. */
function RollingDigit({
  digit,
  delay,
  isInView,
}: {
  digit: string;
  delay: number;
  isInView: boolean;
}) {
  const target = parseInt(digit, 10);
  const [, setSettled] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setSettled(true), delay * 1000 + 800);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  // Build a column of digits 0-9, then show the target at the end
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <span
      className="inline-block overflow-hidden relative"
      style={{ height: "1em", width: "0.65em" }}
    >
      {/* The whole rolling column is visual-only; the sr-only span below is
          the single source screen readers announce (previously the target
          digit was exposed twice). */}
      <span
        className="inline-flex flex-col"
        aria-hidden="true"
        style={{
          transform: isInView
            ? `translateY(-${target * 10}%)`
            : "translateY(0%)",
          transition: isInView
            ? `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
            : "none",
        }}
      >
        {digits.map((d) => (
          <span key={d} className="block text-center leading-[1em]">
            {d}
          </span>
        ))}
      </span>
      {/* Screen reader accessible value */}
      <span className="sr-only">{digit}</span>
    </span>
  );
}

export function AnimatedCounter({
  value,
  label,
  className,
}: AnimatedCounterProps) {
  const { numberStr, suffix } = parseValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  // No manual reduced-motion branch (it caused a server/client tree mismatch):
  // the globals.css prefers-reduced-motion rule forces transition-duration to
  // 0.01ms !important, which collapses the roll to an instant settle.

  // Split the numeric portion into individual characters (digits and dots),
  // preserving the precision the caller provided (e.g. "5.0" stays as "5.0").
  const chars = numberStr.split("");

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <p className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
        {chars.map((char, i) => {
          if (char === ".") {
            return (
              <span key={`dot-${i}`} className="inline-block">
                .
              </span>
            );
          }
          return (
            <RollingDigit
              key={`digit-${i}`}
              digit={char}
              delay={i * 0.08}
              isInView={isInView}
            />
          );
        })}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
