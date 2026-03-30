import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const submissions = db
    .prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    .all();

  return NextResponse.json(submissions);
}
