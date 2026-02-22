import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    // Get or create profile
    let profile = await prisma.profile.findUnique({ where: { id: "main" } });

    if (!profile) {
      const hashed = await bcrypt.hash("admin123", 12);
      profile = await prisma.profile.create({
        data: {
          id: "main",
          adminUsername: "admin",
          adminPassword: hashed,
        },
      });
    }

    // Check credentials
    if (username !== profile.adminUsername) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    let passwordMatch = false;

    if (profile.adminPassword.startsWith("$2")) {
      // bcrypt hash
      passwordMatch = await bcrypt.compare(password, profile.adminPassword);
    } else {
      // plain text fallback (first setup)
      passwordMatch = password === profile.adminPassword;
      if (passwordMatch) {
        // upgrade to hash
        const hashed = await bcrypt.hash(password, 12);
        await prisma.profile.update({ where: { id: "main" }, data: { adminPassword: hashed } });
      }
    }

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ username });
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
