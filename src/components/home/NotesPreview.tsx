"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NoteMeta } from "@/types/note";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface NotesPreviewProps {
  notes: NoteMeta[];
}

const categoryLabels: Record<string, string> = {
  architecture: "Architecture",
  react: "React",
  mobile: "Mobile",
  ai: "AI",
  devops: "DevOps",
  career: "Career",
  accessibility: "Accessibility",
};

export function NotesPreview({ notes }: NotesPreviewProps) {
  if (notes.length === 0) return null;

  const displayPosts = notes.slice(0, 3);

  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="From the Notes"
          title="Thoughts & Insights"
        />
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {displayPosts.map((note) => (
          <motion.div key={note.slug} variants={staggerItemVariants}>
            <Link href={`/notes/${note.slug}`} className="block h-full">
              <Card className="h-full group">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {categoryLabels[note.category] || note.category}
                </span>

                <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                  {note.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {note.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{note.readingTime}</span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </StaggerChildren>

      <FadeIn delay={0.3}>
        <div className="mt-12 text-center">
          <ButtonLink href="/notes" variant="secondary" size="md">
            View All Notes
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
