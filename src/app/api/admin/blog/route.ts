import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

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

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await sql`SELECT * FROM blog_posts ORDER BY date DESC`;
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = blogPostSchema.parse(body);

    const [created] = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, cover_image, date, published)
      VALUES (${data.title}, ${data.slug}, ${data.excerpt}, ${data.content}, ${data.category}, ${sql.json(data.tags)}, ${data.cover_image}, ${data.date}, ${data.published})
      RETURNING *
    `;

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
