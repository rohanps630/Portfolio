import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const blogPostUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  category: z.enum(["architecture", "react", "mobile", "ai", "devops", "career", "accessibility"]).optional(),
  tags: z.array(z.string()).optional(),
  cover_image: z.string().optional(),
  date: z.string().optional(),
  published: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const [post] = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = blogPostUpdateSchema.parse(body);

    const [existing] = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Merge changes into existing row — existing has all fields, data overrides selectively
    const merged = { ...existing, ...data } as Record<string, unknown>;

    const [updated] = await sql`
      UPDATE blog_posts SET
        title = ${merged.title as string},
        slug = ${merged.slug as string},
        excerpt = ${merged.excerpt as string},
        content = ${merged.content as string},
        category = ${merged.category as string},
        tags = ${sql.json(merged.tags as never)},
        cover_image = ${merged.cover_image as string},
        date = ${merged.date as string},
        published = ${merged.published as boolean}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const [existing] = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await sql`DELETE FROM blog_posts WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
