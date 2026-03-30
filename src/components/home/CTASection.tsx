"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionContainer } from "@/components/layout/SectionContainer";

export function CTASection() {
  return (
    <SectionContainer>
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-card p-10 md:p-16 text-center">
          {/* Accent gradient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[80%] rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-48 w-[60%] rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Have a Project in Mind?
            </h2>

            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              I&apos;m currently available for freelance work. Let&apos;s
              discuss how I can help bring your vision to life.
            </p>

            <div className="mt-8">
              <MagneticButton>
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
