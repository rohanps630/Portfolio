import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const techStackUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  proficiency: z.number().int().min(0).max(100).optional(),
  sort_order: z.number().int().optional(),
  visible: z.boolean().optional(),
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
  const [item] = await sql`SELECT * FROM tech_stack WHERE id = ${id}`;

  if (!item) {
    return NextResponse.json({ error: "Tech stack item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
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
    const data = techStackUpdateSchema.parse(body);

    const [existing] = await sql`SELECT * FROM tech_stack WHERE id = ${id}`;
    if (!existing) {
      return NextResponse.json({ error: "Tech stack item not found" }, { status: 404 });
    }

    const merged = { ...existing, ...data };

    const [updated] = await sql`
      UPDATE tech_stack SET
        name = ${merged.name as string},
        category = ${merged.category as string},
        icon = ${merged.icon as string},
        proficiency = ${merged.proficiency as number},
        sort_order = ${merged.sort_order as number},
        visible = ${merged.visible as boolean}
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
  const [existing] = await sql`SELECT * FROM tech_stack WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Tech stack item not found" }, { status: 404 });
  }

  await sql`DELETE FROM tech_stack WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
