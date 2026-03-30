"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/types/blog";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerChildren, staggerItemVariants } from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface BlogPreviewProps {
  posts: BlogPostMeta[];
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

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  const displayPosts = posts.slice(0, 3);

  return (
    <SectionContainer>
      <FadeIn>
        <SectionHeading
          label="From the Blog"
          title="Thoughts & Insights"
        />
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {displayPosts.map((post) => (
          <motion.div key={post.slug} variants={staggerItemVariants}>
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <Card className="h-full group">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {categoryLabels[post.category] || post.category}
                </span>

                <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{post.readingTime}</span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </StaggerChildren>

      <FadeIn delay={0.3}>
        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="secondary" size="md">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
