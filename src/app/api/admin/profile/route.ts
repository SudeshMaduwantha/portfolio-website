import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();
    const { name, title, bio, email, phone, github, youtube, linkedin, location, cvUrl } = data;

    const profile = await prisma.profile.upsert({
      where: { id: "main" },
      update: { name, title, bio, email, phone, github, youtube, linkedin, location, cvUrl },
      create: {
        id: "main",
        name,
        title,
        bio,
        email,
        phone,
        github,
        youtube,
        linkedin,
        location,
        cvUrl,
        adminUsername: "admin",
        adminPassword: "",
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
