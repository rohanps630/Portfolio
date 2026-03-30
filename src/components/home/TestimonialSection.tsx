"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { SectionContainer } from "@/components/layout/SectionContainer";

// TODO: Replace with real testimonials
const testimonials = [
  {
    quote:
      "Rohan took our rough concept and turned it into a polished product in record time. His ability to translate business needs into clean, maintainable code is exceptional.",
    name: "Aditya Menon",
    role: "Co-founder",
    company: "TechLaunch Solutions",
  },
  {
    quote:
      "Working with Rohan was a game changer for our team. He brought structure to our codebase, mentored junior developers, and delivered features ahead of schedule consistently.",
    name: "Sarah Mitchell",
    role: "Product Manager",
    company: "CloudNine Apps",
  },
  {
    quote:
      "Rohan has a rare combination of deep technical skill and genuine care for the end-user experience. He is the kind of developer every startup needs on their side.",
    name: "Vivek Krishnan",
    role: "CTO",
    company: "FinEdge Technologies",
  },
];

export function TestimonialSection() {
  return (
    <SectionContainer>
      {/* TODO: Replace with real testimonials */}
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
