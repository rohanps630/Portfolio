"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/types/blog";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/animations/FadeIn";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

const categoryLabels: Record<string, string> = {
  architecture: "Architecture",
  react: "React",
  mobile: "Mobile",
  ai: "AI",
  devops: "DevOps",
  career: "Career",
  accessibility: "Accessibility",
};

interface BlogCardProps {
  post: BlogPostMeta;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="h-full group flex flex-col hover:shadow-lg hover:shadow-accent/5">
          <div className="aspect-[16/9] rounded-lg bg-muted mb-4 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
              <span className="text-4xl text-accent/30">
                {categoryLabels[post.category]?.[0] || "B"}
              </span>
            </div>
          </div>

          <Badge variant="accent" className="self-start">
            {categoryLabels[post.category] || post.category}
          </Badge>

          <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
        </Card>
      </Link>
      </motion.div>
    </FadeIn>
  );
}
