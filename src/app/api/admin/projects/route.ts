import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

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

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await sql`SELECT * FROM projects ORDER BY sort_order ASC`;
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = projectSchema.parse(body);

    const [created] = await sql`
      INSERT INTO projects (title, slug, tagline, description, category, featured, sort_order, challenge, role, approach, features, impact, tech_stack, duration, year, live_url, github_url, cover_image, screenshots)
      VALUES (${data.title}, ${data.slug}, ${data.tagline}, ${data.description}, ${data.category}, ${data.featured}, ${data.sort_order}, ${data.challenge}, ${data.role}, ${data.approach}, ${sql.json(data.features)}, ${sql.json(data.impact)}, ${sql.json(data.tech_stack)}, ${data.duration}, ${data.year}, ${data.live_url}, ${data.github_url}, ${data.cover_image}, ${sql.json(data.screenshots)})
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
