"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <FadeIn delay={0}>
          <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
            {label}
          </p>
          <motion.div
            className="h-0.5 w-12 bg-accent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: align === "center" ? 0.5 : 0 }}
          />
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <HeadingTag className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {title}
        </HeadingTag>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
