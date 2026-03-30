"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { ServiceTier } from "@/content/services";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceTier;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={cn(
          "relative flex flex-col h-full hover:shadow-lg hover:shadow-accent/5",
          service.highlighted && "border-accent/50 shadow-lg shadow-accent/10"
        )}
      >
        {service.highlighted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
              Most Popular
            </span>
          </div>
        )}

        <div className="space-y-4 flex-1">
          <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{service.price}</p>
            <p className="text-sm text-muted-foreground">
              Timeline: {service.timeline}
            </p>
          </div>

          <ul className="space-y-3 pt-4 border-t border-border">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className={cn(
              "block w-full rounded-lg py-3 text-center text-sm font-medium transition-all duration-200",
              service.highlighted
                ? "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20"
                : "border border-border text-foreground hover:bg-muted hover:border-accent/50"
            )}
          >
            {service.ctaText}
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
