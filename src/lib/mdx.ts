import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPostMeta, BlogPost, BlogCategory } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  const meta: BlogPostMeta = {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category as BlogCategory,
    tags: data.tags || [],
    coverImage: data.coverImage || "",
    published: data.published ?? true,
    readingTime: stats.text,
  };

  return { ...meta, content };
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): { value: BlogCategory; label: string; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<BlogCategory, number>();

  for (const post of posts) {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  }

  const labels: Record<BlogCategory, string> = {
    architecture: "Architecture",
    react: "React",
    mobile: "Mobile",
    ai: "AI",
    devops: "DevOps",
    career: "Career",
    accessibility: "Accessibility",
  };

  return Array.from(categoryMap.entries())
    .map(([value, count]) => ({
      value,
      label: labels[value] || value,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
