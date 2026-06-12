"use client";

/* eslint-disable react-hooks/set-state-in-effect -- component is scheduled for deletion in Phase 1 (ADR-005 motion removals); not worth refactoring */

import { useEffect, useRef, useState } from "react";

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--x", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, -100px) var(--y, -100px), rgba(99,102,241,0.06), transparent 40%)",
      }}
      aria-hidden="true"
    />
  );
}
