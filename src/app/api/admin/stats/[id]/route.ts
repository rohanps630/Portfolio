import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const statUpdateSchema = z.object({
  label: z.string().min(1).optional(),
  value: z.string().min(1).optional(),
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
  const [stat] = await sql`SELECT * FROM stats WHERE id = ${id}`;

  if (!stat) {
    return NextResponse.json({ error: "Stat not found" }, { status: 404 });
  }

  return NextResponse.json(stat);
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
    const data = statUpdateSchema.parse(body);

    const [existing] = await sql`SELECT * FROM stats WHERE id = ${id}`;
    if (!existing) {
      return NextResponse.json({ error: "Stat not found" }, { status: 404 });
    }

    const merged = { ...existing, ...data };

    const [updated] = await sql`
      UPDATE stats SET
        label = ${merged.label as string},
        value = ${merged.value as string},
        sort_order = ${merged.sort_order as number},
        visible = ${merged.visible as boolean},
        updated_at = now()
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
  const [existing] = await sql`SELECT * FROM stats WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Stat not found" }, { status: 404 });
  }

  await sql`DELETE FROM stats WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
