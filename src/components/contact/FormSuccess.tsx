"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function FormSuccess() {
  return (
    <div
      role="status"
      className="flex flex-col items-center text-center py-12 space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10"
      >
        <Check className="h-8 w-8 text-success" />
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground">
          Thank you for reaching out!
        </h3>
        <p className="text-muted-foreground max-w-md">
          I&apos;ll review your project details and get back to you within 24
          hours. In the meantime, feel free to connect on LinkedIn or check out
          my work.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted hover:border-accent/50"
      >
        Back to Home
      </Link>
    </div>
  );
}
