import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import { getDb } from "@/lib/db";

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

function parsePost(row: Record<string, unknown>) {
  return {
    ...row,
    published: Boolean(row.published),
    tags: row.tags ? JSON.parse(row.tags as string) : [],
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const post = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(parsePost(post as Record<string, unknown>));
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

    const db = getDb();
    const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const fields: string[] = [];
    const values: Record<string, unknown> = { id };

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) continue;

      if (key === "published") {
        fields.push(`${key} = @${key}`);
        values[key] = value ? 1 : 0;
      } else if (key === "tags") {
        fields.push(`${key} = @${key}`);
        values[key] = JSON.stringify(value);
      } else {
        fields.push(`${key} = @${key}`);
        values[key] = value;
      }
    }

    if (fields.length > 0) {
      db.prepare(`UPDATE blog_posts SET ${fields.join(", ")} WHERE id = @id`).run(values);
    }

    const updated = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id);
    return NextResponse.json(parsePost(updated as Record<string, unknown>));
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
  const db = getDb();
  const existing = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id);

  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
