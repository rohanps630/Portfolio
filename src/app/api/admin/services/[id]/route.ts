import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const serviceUpdateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  timeline: z.string().optional(),
  features: z.array(z.string()).optional(),
  highlighted: z.boolean().optional(),
  cta_text: z.string().optional(),
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
  const [service] = await sql`SELECT * FROM services WHERE id = ${id}`;

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json(service);
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
    const data = serviceUpdateSchema.parse(body);

    const [existing] = await sql`SELECT * FROM services WHERE id = ${id}`;
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const merged = { ...existing, ...data };

    const [updated] = await sql`
      UPDATE services SET
        slug = ${merged.slug as string},
        title = ${merged.title as string},
        description = ${merged.description as string},
        price = ${merged.price as string},
        timeline = ${merged.timeline as string},
        features = ${sql.json(merged.features as string[])},
        highlighted = ${merged.highlighted as boolean},
        cta_text = ${merged.cta_text as string},
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
  const [existing] = await sql`SELECT * FROM services WHERE id = ${id}`;

  if (!existing) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  await sql`DELETE FROM services WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
