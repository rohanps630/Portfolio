import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const [project] = await sql`SELECT * FROM projects WHERE id = ${id}`;

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
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

    const [existing] = await sql`SELECT * FROM projects WHERE id = ${id}`;
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Merge changes into existing row — existing has all fields, data overrides selectively
    const merged = { ...existing, ...data } as Record<string, unknown>;

    const [updated] = await sql`
      UPDATE projects SET
        title = ${merged.title as string},
        slug = ${merged.slug as string},
        tagline = ${merged.tagline as string},
        description = ${merged.description as string},
        category = ${merged.category as string},
        featured = ${merged.featured as boolean},
        sort_order = ${merged.sort_order as number},
        challenge = ${merged.challenge as string},
        role = ${merged.role as string},
        approach = ${merged.approach as string},
        features = ${sql.json(merged.features as never)},
        impact = ${sql.json(merged.impact as never)},
        tech_stack = ${sql.json(merged.tech_stack as never)},
        duration = ${merged.duration as string},
        year = ${merged.year as string},
        live_url = ${merged.live_url as string},
        github_url = ${merged.github_url as string},
        cover_image = ${merged.cover_image as string},
        screenshots = ${sql.json(merged.screenshots as never)}
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
  const [existing] = await sql`SELECT * FROM projects WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  await sql`DELETE FROM projects WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
