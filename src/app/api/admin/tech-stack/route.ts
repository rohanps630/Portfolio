import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const techStackSchema = z.object({
  name: z.string().min(1),
  category: z.string().default(""),
  icon: z.string().default(""),
  proficiency: z.number().int().min(0).max(100).default(0),
  sort_order: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await sql`SELECT * FROM tech_stack ORDER BY sort_order`;
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = techStackSchema.parse(body);

    const [created] = await sql`
      INSERT INTO tech_stack (name, category, icon, proficiency, sort_order, visible)
      VALUES (${data.name}, ${data.category}, ${data.icon}, ${data.proficiency}, ${data.sort_order}, ${data.visible})
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
