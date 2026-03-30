import type { BlogPostMeta } from "@/types/blog";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
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

interface BlogHeaderProps {
  post: BlogPostMeta;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="mb-10">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        className="mb-8"
      />

      <Badge variant="accent" className="mb-4">
        {categoryLabels[post.category] || post.category}
      </Badge>

      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {post.readingTime}
        </span>
      </div>

      <div className="aspect-[2/1] rounded-2xl bg-muted overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
          <span className="text-6xl text-accent/20">
            {categoryLabels[post.category]?.[0] || "B"}
          </span>
        </div>
      </div>
    </header>
  );
}
