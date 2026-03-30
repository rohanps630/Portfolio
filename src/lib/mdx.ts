import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPostMeta, BlogPost, BlogCategory } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// --- File-based helpers (fallback) ---

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

// --- Database helpers ---

interface BlogPostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string;
  cover_image: string | null;
  published: number;
  created_at: string;
  updated_at: string;
}

function rowToMeta(row: BlogPostRow): BlogPostMeta {
  const stats = readingTime(row.content);
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    category: row.category as BlogCategory,
    tags: JSON.parse(row.tags),
    coverImage: row.cover_image ?? "",
    published: row.published === 1,
    readingTime: stats.text,
  };
}

function rowToPost(row: BlogPostRow): BlogPost {
  return {
    ...rowToMeta(row),
    content: row.content,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tryGetDb(): any {
  if (typeof window !== "undefined") return null;
  try {
    const dbModule = "db";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(`@/lib/${dbModule}`);
    return mod.getDb();
  } catch {
    return null;
  }
}

// --- Exported functions (same signatures as before) ---

export function getPostSlugs(): string[] {
  const db = tryGetDb();
  if (db) {
    try {
      const rows = db
        .prepare("SELECT slug FROM blog_posts")
        .all() as { slug: string }[];
      if (rows.length > 0) return rows.map((r: { slug: string }) => r.slug);
    } catch {
      // fall through
    }
  }
  return getPostSlugsFromFiles();
}

export function getPostBySlug(slug: string): BlogPost {
  const db = tryGetDb();
  if (db) {
    try {
      const row = db
        .prepare("SELECT * FROM blog_posts WHERE slug = ?")
        .get(slug) as BlogPostRow | undefined;
      if (row) return rowToPost(row);
    } catch {
      // fall through
    }
  }
  return getPostBySlugFromFile(slug);
}

export function getAllPosts(): BlogPostMeta[] {
  const db = tryGetDb();
  if (db) {
    try {
      const rows = db
        .prepare("SELECT * FROM blog_posts WHERE published = 1 ORDER BY date DESC")
        .all() as BlogPostRow[];
      if (rows.length > 0) return rows.map(rowToMeta);
    } catch {
      // fall through
    }
  }
  return getAllPostsFromFiles();
}

export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
  const db = tryGetDb();
  if (db) {
    try {
      const rows = db
        .prepare("SELECT * FROM blog_posts WHERE published = 1 AND category = ? ORDER BY date DESC")
        .all(category) as BlogPostRow[];
      if (rows.length > 0) return rows.map(rowToMeta);
    } catch {
      // fall through
    }
  }
  return getAllPostsFromFiles().filter((post) => post.category === category);
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
