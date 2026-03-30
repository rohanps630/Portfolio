import { NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) {
      console.error("ADMIN_PASSWORD_HASH environment variable is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const isValid = await verifyPassword(password, storedHash);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await createSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
