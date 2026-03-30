import { NextResponse } from "next/server";
import { contactFormSchema } from "@/types/contact";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    // Save to database
    try {
      const { getDb } = await import("@/lib/db");
      const db = getDb();
      db.prepare(
        `INSERT INTO contact_submissions (name, email, project_type, budget, timeline, message)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).run(data.name, data.email, data.projectType, data.budget, data.timeline, data.message);
    } catch (dbError) {
      console.error("Failed to save contact submission to database:", dbError);
      // Don't break the form submission if DB fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
