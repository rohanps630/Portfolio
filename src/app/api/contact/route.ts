import { NextResponse } from "next/server";
import { contactFormSchema } from "@/types/contact";
import { sendContactEmail } from "@/lib/email";

// Best-effort in-memory rate limiter. On serverless this is per-instance and
// resets on cold start — it raises the floor against trivial floods but is NOT
// a durable guarantee. For production-grade limiting back this with Upstash /
// Vercel KV or a Vercel WAF rule (see README "Rate limiting").
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
// Hard cap so spoofed unique x-forwarded-for values can't grow the map (and
// the per-request sweep) without bound on long-lived instances.
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.delete(ip); // re-insert to keep Map iteration order ≈ least-recently-seen
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
      if (hits.size <= MAX_TRACKED_IPS) break;
    }
    // Still over cap (flood of fresh unique keys): evict oldest-seen entries.
    while (hits.size > MAX_TRACKED_IPS) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body — expected JSON." },
        { status: 400 }
      );
    }

    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data. Please check your inputs." },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check — silently succeed to not reveal detection
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    await sendContactEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
