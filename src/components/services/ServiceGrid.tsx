"use client";

import { motion } from "framer-motion";
import type { ServiceTier } from "@/content/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import {
  StaggerChildren,
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";

interface ServiceGridProps {
  services: ServiceTier[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service) => (
        <motion.div key={service.id} variants={staggerItemVariants}>
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
