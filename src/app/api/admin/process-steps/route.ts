import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const processStepSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  icon: z.string().default(""),
  sort_order: z.number().int().default(0),
});

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const steps = await sql`SELECT * FROM process_steps ORDER BY sort_order`;
  return NextResponse.json(steps);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = processStepSchema.parse(body);

    const [created] = await sql`
      INSERT INTO process_steps (title, description, icon, sort_order)
      VALUES (${data.title}, ${data.description}, ${data.icon}, ${data.sort_order})
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
