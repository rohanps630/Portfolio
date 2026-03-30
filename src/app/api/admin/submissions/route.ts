import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`;

  return NextResponse.json(submissions);
}
