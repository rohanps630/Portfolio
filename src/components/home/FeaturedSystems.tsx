"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SystemCard } from "@/components/ui/SystemCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/layout/SectionContainer";
import type { System } from "@/lib/schemas/system";

interface FeaturedSystemsProps {
  systems: System[];
}

export function FeaturedSystems({ systems }: FeaturedSystemsProps) {
  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading label="Selected Work" title="Systems I'm Proud Of" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {systems.map((system, index) => (
          <FadeIn key={system.slug} delay={index * 0.15}>
            <SystemCard system={system} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="secondary" size="md">
              View All Systems
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
