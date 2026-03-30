import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sections = await sql`SELECT * FROM page_sections ORDER BY id`;
  return NextResponse.json(sections);
}

const putSchema = z.object({
  id: z.number().int(),
  visible: z.boolean(),
});

export async function PUT(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, visible } = putSchema.parse(body);

    const [updated] = await sql`
      UPDATE page_sections SET visible = ${visible} WHERE id = ${id} RETURNING *
    `;

    if (!updated) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
