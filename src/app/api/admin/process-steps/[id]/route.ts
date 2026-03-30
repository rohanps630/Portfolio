import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const processStepUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  sort_order: z.number().int().optional(),
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
  const [step] = await sql`SELECT * FROM process_steps WHERE id = ${id}`;

  if (!step) {
    return NextResponse.json({ error: "Process step not found" }, { status: 404 });
  }

  return NextResponse.json(step);
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
    const data = processStepUpdateSchema.parse(body);

    const [existing] = await sql`SELECT * FROM process_steps WHERE id = ${id}`;
    if (!existing) {
      return NextResponse.json({ error: "Process step not found" }, { status: 404 });
    }

    const merged = { ...existing, ...data };

    const [updated] = await sql`
      UPDATE process_steps SET
        title = ${merged.title as string},
        description = ${merged.description as string},
        icon = ${merged.icon as string},
        sort_order = ${merged.sort_order as number}
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
  const [existing] = await sql`SELECT * FROM process_steps WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Process step not found" }, { status: 404 });
  }

  await sql`DELETE FROM process_steps WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
