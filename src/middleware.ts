import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("admin-session");

  // API routes under /api/admin/* — return 401 if no session cookie
  if (pathname.startsWith("/api/admin")) {
    if (!hasSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Allow /admin/login without session
  if (pathname === "/admin/login") {
    // If already logged in, redirect to /admin
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // All other /admin/* routes require session
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
