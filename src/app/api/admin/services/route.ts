import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { verifySession } from "@/lib/auth";
import sql from "@/lib/db";

const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().default(""),
  description: z.string().default(""),
  icon: z.string().default(""),
  features: z.array(z.string()).default([]),
  price_label: z.string().default(""),
  sort_order: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export async function GET() {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const services = await sql`SELECT * FROM services ORDER BY sort_order`;
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = serviceSchema.parse(body);

    const [created] = await sql`
      INSERT INTO services (title, slug, tagline, description, icon, features, price_label, sort_order, visible)
      VALUES (${data.title}, ${data.slug}, ${data.tagline}, ${data.description}, ${data.icon}, ${sql.json(data.features)}, ${data.price_label}, ${data.sort_order}, ${data.visible})
      RETURNING *
    `;

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
