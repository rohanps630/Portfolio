import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import { getDb } from "@/lib/db";

const projectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  tagline: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.enum(["web-app", "mobile-app", "full-stack", "ai-ml"]).optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().int().optional(),
  challenge: z.string().optional(),
  role: z.string().optional(),
  approach: z.string().optional(),
  features: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  impact: z
    .array(z.object({ label: z.string(), value: z.string(), description: z.string() }))
    .optional(),
  tech_stack: z.array(z.string()).optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  live_url: z.string().optional(),
  github_url: z.string().optional(),
  cover_image: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
});

function parseProject(row: Record<string, unknown>) {
  return {
    ...row,
    featured: Boolean(row.featured),
    features: row.features ? JSON.parse(row.features as string) : [],
    impact: row.impact ? JSON.parse(row.impact as string) : [],
    tech_stack: row.tech_stack ? JSON.parse(row.tech_stack as string) : [],
    screenshots: row.screenshots ? JSON.parse(row.screenshots as string) : [],
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
  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(parseProject(project as Record<string, unknown>));
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
    const data = projectUpdateSchema.parse(body);

    const db = getDb();
    const existing = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const fields: string[] = [];
    const values: Record<string, unknown> = { id };

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) continue;

      if (key === "featured") {
        fields.push(`${key} = @${key}`);
        values[key] = value ? 1 : 0;
      } else if (["features", "impact", "tech_stack", "screenshots"].includes(key)) {
        fields.push(`${key} = @${key}`);
        values[key] = JSON.stringify(value);
      } else {
        fields.push(`${key} = @${key}`);
        values[key] = value;
      }
    }

    if (fields.length > 0) {
      db.prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = @id`).run(values);
    }

    const updated = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
    return NextResponse.json(parseProject(updated as Record<string, unknown>));
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
  const existing = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

  if (!existing) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
