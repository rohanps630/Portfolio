import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPostMeta, BlogPost, BlogCategory } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function getPostSlugsFromFiles(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function getPostBySlugFromFile(slug: string): BlogPost {
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

function getAllPostsFromFiles(): BlogPostMeta[] {
  const slugs = getPostSlugsFromFiles();
  return slugs
    .map((slug) => {
      const post = getPostBySlugFromFile(slug);
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostSlugs(): Promise<string[]> {
  return getPostSlugsFromFiles();
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  return getPostBySlugFromFile(slug);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  return getAllPostsFromFiles();
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPostMeta[]> {
  return getAllPostsFromFiles().filter((post) => post.category === category);
}

export async function getAllCategories(): Promise<{ value: BlogCategory; label: string; count: number }[]> {
  const labels: Record<BlogCategory, string> = {
    architecture: "Architecture",
    react: "React",
    mobile: "Mobile",
    ai: "AI",
    devops: "DevOps",
    career: "Career",
    accessibility: "Accessibility",
  };

  const posts = getAllPostsFromFiles();
  const categoryMap = new Map<BlogCategory, number>();

  for (const post of posts) {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([value, count]) => ({
      value,
      label: labels[value] || value,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
