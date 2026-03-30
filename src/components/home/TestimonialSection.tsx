"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="Testimonials"
          title="What People Say"
        />
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.name} variants={staggerItemVariants}>
            <Card className="h-full flex flex-col" hover={false}>
              <Quote className="h-8 w-8 text-accent/30 mb-4" />

              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </StaggerChildren>
    </SectionContainer>
  );
}
