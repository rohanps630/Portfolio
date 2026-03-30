"use client";

import Link from "next/link";
import { Rocket, Code2, Wrench, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { motion } from "framer-motion";

const serviceItems = [
  {
    icon: Rocket,
    title: "MVP Development",
    description:
      "Go from idea to working product in weeks. Perfect for startups validating concepts.",
    href: "/services",
  },
  {
    icon: Code2,
    title: "Full Product Build",
    description:
      "End-to-end development for production-grade apps with scalable architecture.",
    href: "/services",
  },
  {
    icon: Wrench,
    title: "Ongoing Support",
    description:
      "Continuous development and maintenance to keep your product evolving.",
    href: "/services",
  },
];

export function ServicesPreview() {
  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="Services"
          title="How I Can Help"
        />
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {serviceItems.map((service) => (
          <motion.div key={service.title} variants={staggerItemVariants}>
            <Link href={service.href} className="block h-full">
              <Card className="h-full group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-5">
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="font-heading text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </StaggerChildren>
    </SectionContainer>
  );
}
