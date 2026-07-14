"use client";

import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every Framer Motion animation (whileTap,
    // layout springs, ScrollProgress) honor prefers-reduced-motion globally,
    // matching the CSS reduced-motion reset in globals.css.
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
        Skip to main content
      </a>
      <Navbar />
      <ScrollProgress />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
