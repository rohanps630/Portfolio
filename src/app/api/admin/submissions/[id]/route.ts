import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

export async function PUT(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [existing] = await sql`SELECT * FROM contact_submissions WHERE id = ${id}`;
  if (!existing) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  const [updated] = await sql`
    UPDATE contact_submissions SET read = true WHERE id = ${id}
    RETURNING *
  `;

  return NextResponse.json(updated);
}
