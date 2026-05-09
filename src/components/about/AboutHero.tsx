"use client";

import { FadeIn } from "@/components/animations/FadeIn";

export function AboutHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <FadeIn direction="left">
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-2xl" />
          <div className="absolute inset-2 rounded-full overflow-hidden border border-border/50 ring-1 ring-inset ring-accent/10 bg-transparent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile.png"
              alt="Rohan P. Suresh"
              className="absolute inset-0 w-full h-full object-cover object-top scale-110 translate-y-2"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn direction="right" delay={0.2}>
        <div className="space-y-6">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            About Me
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I help startups and businesses turn ideas into reliable, scalable
            software — from first prototype to production. With over 4.5 years
            of experience building web and mobile applications, I&apos;ve led
            development teams, shipped products used by thousands, and worked
            with clients across industries from healthcare to education to AI.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My approach is rooted in clear communication, clean architecture,
            and a commitment to delivering software that works — not just at
            launch, but for the long haul. I treat every project as a
            partnership, not just a transaction.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
