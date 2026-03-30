"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-72 bg-background border-l border-border z-50 flex flex-col p-6"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-accent bg-accent-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  <Button className="w-full">Let&apos;s Talk</Button>
                </Link>
              </div>

              <div className="mt-auto pt-6 border-t border-border">
                <SocialLinks />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
