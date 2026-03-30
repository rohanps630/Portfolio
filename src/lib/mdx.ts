import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import sql from "@/lib/db";
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
  tags: string[] | string;
  cover_image: string | null;
  published: boolean;
  visible: boolean;
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
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
    coverImage: row.cover_image ?? "",
    published: row.published,
    readingTime: stats.text,
  };
}

function rowToPost(row: BlogPostRow): BlogPost {
  return {
    ...rowToMeta(row),
    content: row.content,
  };
}

// --- Exported functions (async) ---

export async function getPostSlugs(): Promise<string[]> {
  try {
    const rows = await sql<{ slug: string }[]>`
      SELECT slug FROM blog_posts WHERE published = true AND visible = true
    `;
    if (rows.length > 0) return rows.map((r) => r.slug);
  } catch {
    // fall through to file fallback
  }
  return getPostSlugsFromFiles();
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  try {
    const rows = await sql<BlogPostRow[]>`
      SELECT * FROM blog_posts WHERE slug = ${slug}
    `;
    if (rows.length > 0) return rowToPost(rows[0]);
  } catch {
    // fall through to file fallback
  }
  return getPostBySlugFromFile(slug);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const rows = await sql<BlogPostRow[]>`
      SELECT * FROM blog_posts WHERE published = true AND visible = true ORDER BY date DESC
    `;
    if (rows.length > 0) return rows.map(rowToMeta);
  } catch {
    // fall through to file fallback
  }
  return getAllPostsFromFiles();
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPostMeta[]> {
  try {
    const rows = await sql<BlogPostRow[]>`
      SELECT * FROM blog_posts WHERE published = true AND visible = true AND category = ${category} ORDER BY date DESC
    `;
    if (rows.length > 0) return rows.map(rowToMeta);
  } catch {
    // fall through to file fallback
  }
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

  try {
    const rows = await sql<{ category: string; count: string }[]>`
      SELECT category, COUNT(*) as count FROM blog_posts WHERE published = true AND visible = true GROUP BY category
    `;
    if (rows.length > 0) {
      return rows
        .map((row) => ({
          value: row.category as BlogCategory,
          label: labels[row.category as BlogCategory] || row.category,
          count: parseInt(row.count, 10),
        }))
        .sort((a, b) => b.count - a.count);
    }
  } catch {
    // fall through to file fallback
  }

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
