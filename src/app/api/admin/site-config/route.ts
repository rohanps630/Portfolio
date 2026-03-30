import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await sql`SELECT * FROM site_config ORDER BY key`;
  const config: Record<string, string> = {};
  for (const row of rows) {
    config[row.key] = row.value;
  }
  return NextResponse.json(config);
}

const putSchema = z.object({
  entries: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string(),
    })
  ),
});

export async function PUT(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { entries } = putSchema.parse(body);

    for (const entry of entries) {
      await sql`
        INSERT INTO site_config (key, value)
        VALUES (${entry.key}, ${entry.value})
        ON CONFLICT (key) DO UPDATE SET value = ${entry.value}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
