"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const CHARS = "!<>-_\\/[]{}--=+*^?#";

export function TextScramble({
  text,
  className,
  delay = 0,
  duration = 1.5,
}: TextScrambleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const totalChars = text.length;
    const durationMs = duration * 1000;
    const charResolveInterval = durationMs / totalChars;
    let resolvedCount = 0;
    let rafId: number;
    let startTime: number | null = null;

    function update(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // How many characters should be resolved by now
      resolvedCount = Math.min(
        totalChars,
        Math.floor(elapsed / charResolveInterval)
      );

      let result = "";
      for (let i = 0; i < totalChars; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < resolvedCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);

      if (resolvedCount < totalChars) {
        rafId = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
      }
    }

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [text, duration]);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    if (prefersReducedMotion) {
      setDisplayText(text);
      hasAnimated.current = true;
      return;
    }

    // Initialize with scrambled characters
    setDisplayText(
      text
        .split("")
        .map((c) =>
          c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("")
    );

    const timer = setTimeout(() => {
      scramble();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, prefersReducedMotion, text, delay, scramble]);

  // Before in-view, show nothing (or the scrambled text will flash)
  if (!isInView && !hasAnimated.current) {
    return (
      <span ref={containerRef} className={className} aria-label={text}>
        {text.split("").map(() => "\u00A0").join("")}
      </span>
    );
  }

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {displayText || text}
    </span>
  );
}
