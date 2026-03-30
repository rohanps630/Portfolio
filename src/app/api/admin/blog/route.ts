import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import { getDb } from "@/lib/db";

const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.enum(["architecture", "react", "mobile", "ai", "devops", "career", "accessibility"]),
  tags: z.array(z.string()).default([]),
  cover_image: z.string().default(""),
  date: z.string().min(1),
  published: z.boolean().default(false),
});

function parsePost(row: Record<string, unknown>) {
  return {
    ...row,
    published: Boolean(row.published),
    tags: row.tags ? JSON.parse(row.tags as string) : [],
  };
}

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const posts = db.prepare("SELECT * FROM blog_posts ORDER BY date DESC").all();
  return NextResponse.json(posts.map((p) => parsePost(p as Record<string, unknown>)));
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = blogPostSchema.parse(body);

    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, cover_image, date, published)
      VALUES (@title, @slug, @excerpt, @content, @category, @tags, @cover_image, @date, @published)
    `);

    const result = stmt.run({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: JSON.stringify(data.tags),
      cover_image: data.cover_image,
      date: data.date,
      published: data.published ? 1 : 0,
    });

    const created = db
      .prepare("SELECT * FROM blog_posts WHERE id = ?")
      .get(result.lastInsertRowid);

    return NextResponse.json(parsePost(created as Record<string, unknown>), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
