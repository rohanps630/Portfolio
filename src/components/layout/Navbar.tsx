"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground link-underline"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4/5 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="hidden md:block">
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button size="sm">Let&apos;s Talk</Button>
            </motion.div>
          </Link>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
