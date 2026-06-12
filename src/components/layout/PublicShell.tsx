"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CursorSpotlight />
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
    </SmoothScroll>
  );
}
