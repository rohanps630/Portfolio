import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const statSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  sort_order: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await sql`SELECT * FROM stats ORDER BY sort_order`;
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = statSchema.parse(body);

    const [created] = await sql`
      INSERT INTO stats (label, value, sort_order, visible)
      VALUES (${data.label}, ${data.value}, ${data.sort_order}, ${data.visible})
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
