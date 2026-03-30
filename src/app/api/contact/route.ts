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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
