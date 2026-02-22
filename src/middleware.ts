import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sudesh-portfolio-jwt-secret-2024-dktech"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* but not /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
