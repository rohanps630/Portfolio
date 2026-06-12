"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";

export function AboutHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <FadeIn direction="left">
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-2xl" />
          <div className="absolute inset-2 rounded-full overflow-hidden border border-border/50 ring-1 ring-inset ring-accent/10 bg-transparent">
            <Image
              src="/images/profile.png"
              alt="Rohan P. Suresh — Full Stack & AI Integration Engineer"
              width={384}
              height={384}
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
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
            Full-stack engineer with 5 years building web, mobile, and
            AI-integrated systems — real-time chat, AI voice agents, healthcare
            platforms, and developer tooling. I&apos;ve shipped products to
            production across React, React Native, Node.js, Go, Python, and
            the modern LLM stack.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Currently a Software Engineer at Innovation Incubator Advisory,
            working on AI-powered products and microservice architectures.
            Open to senior full-stack and AI-engineering roles, as well as
            selective client projects.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My approach is rooted in clear communication, clean architecture,
            and delivering software that holds up beyond launch.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
