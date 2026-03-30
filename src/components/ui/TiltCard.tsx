"use client";

import { useRef, useEffect, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion.current || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1..1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // rotateX is inverted (mouse moving down = positive Y = negative rotation)
      const rotateX = -normalizedY * tiltAmount;
      const rotateY = normalizedX * tiltAmount;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    [tiltAmount]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.4s ease-out";
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "none";
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}
