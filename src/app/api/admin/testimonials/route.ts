import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().default(""),
  company: z.string().default(""),
  content: z.string().min(1),
  avatar: z.string().default(""),
  rating: z.number().int().min(1).max(5).default(5),
  sort_order: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const testimonials = await sql`SELECT * FROM testimonials ORDER BY sort_order`;
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = testimonialSchema.parse(body);

    const [created] = await sql`
      INSERT INTO testimonials (name, role, company, content, avatar, rating, sort_order, visible)
      VALUES (${data.name}, ${data.role}, ${data.company}, ${data.content}, ${data.avatar}, ${data.rating}, ${data.sort_order}, ${data.visible})
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
