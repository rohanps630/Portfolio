import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function PUT(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  const existing = db.prepare("SELECT * FROM contact_submissions WHERE id = ?").get(id);
  if (!existing) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  db.prepare("UPDATE contact_submissions SET read = 1 WHERE id = ?").run(id);

  const updated = db.prepare("SELECT * FROM contact_submissions WHERE id = ?").get(id);
  return NextResponse.json(updated);
}
