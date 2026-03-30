import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import { getDb } from "@/lib/db";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["web-app", "mobile-app", "full-stack", "ai-ml"]),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  challenge: z.string().default(""),
  role: z.string().default(""),
  approach: z.string().default(""),
  features: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
  impact: z
    .array(z.object({ label: z.string(), value: z.string(), description: z.string() }))
    .default([]),
  tech_stack: z.array(z.string()).default([]),
  duration: z.string().default(""),
  year: z.string().default(""),
  live_url: z.string().default(""),
  github_url: z.string().default(""),
  cover_image: z.string().default(""),
  screenshots: z.array(z.string()).default([]),
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

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const projects = db.prepare("SELECT * FROM projects ORDER BY sort_order ASC").all();
  return NextResponse.json(projects.map((p) => parseProject(p as Record<string, unknown>)));
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = projectSchema.parse(body);

    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO projects (title, slug, tagline, description, category, featured, sort_order, challenge, role, approach, features, impact, tech_stack, duration, year, live_url, github_url, cover_image, screenshots)
      VALUES (@title, @slug, @tagline, @description, @category, @featured, @sort_order, @challenge, @role, @approach, @features, @impact, @tech_stack, @duration, @year, @live_url, @github_url, @cover_image, @screenshots)
    `);

    const result = stmt.run({
      title: data.title,
      slug: data.slug,
      tagline: data.tagline,
      description: data.description,
      category: data.category,
      featured: data.featured ? 1 : 0,
      sort_order: data.sort_order,
      challenge: data.challenge,
      role: data.role,
      approach: data.approach,
      features: JSON.stringify(data.features),
      impact: JSON.stringify(data.impact),
      tech_stack: JSON.stringify(data.tech_stack),
      duration: data.duration,
      year: data.year,
      live_url: data.live_url,
      github_url: data.github_url,
      cover_image: data.cover_image,
      screenshots: JSON.stringify(data.screenshots),
    });

    const created = db
      .prepare("SELECT * FROM projects WHERE id = ?")
      .get(result.lastInsertRowid);

    return NextResponse.json(
      parseProject(created as Record<string, unknown>),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
