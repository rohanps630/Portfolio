import Link from "next/link";
import { Download } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AboutHero } from "@/components/about/AboutHero";
import { Timeline } from "@/components/about/Timeline";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { Certifications } from "@/components/about/Certifications";

export const metadata = createMetadata({
  title: "About — Full Stack & AI Engineer",
  description:
    "Rohan P. Suresh — full-stack engineer with 4.75+ years building web, mobile, and AI-integrated systems with React, Node.js, Go, Python & LLMs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-12 md:py-20">
          <AboutHero />
        </section>

        {/* Experience Timeline */}
        <section className="py-20 md:py-28">
          <SectionHeading
            label="Experience"
            title="Where I've Worked"
            subtitle="A timeline of my professional journey building products and leading teams."
          />
          <Timeline />
        </section>

        {/* Skills */}
        <section className="py-20 md:py-28">
          <SectionHeading
            label="Skills"
            title="My Tech Stack"
            subtitle="The technologies and tools I use to bring ideas to life."
          />
          <SkillsGrid />
        </section>

        {/* Resume */}
        <section className="py-12 text-center">
          <Link
            href="/resume/rohan-suresh-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-accent/30"
          >
            <Download className="h-5 w-5" />
            View Resume
          </Link>
        </section>

        {/* Certifications */}
        <section className="py-20 md:py-28">
          <Certifications />
        </section>
      </div>
    </main>
  );
}
