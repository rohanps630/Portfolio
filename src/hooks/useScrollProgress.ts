"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return progress;
}
