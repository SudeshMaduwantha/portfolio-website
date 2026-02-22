import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { currentPassword, newPassword, newUsername } = await request.json();

    const profile = await prisma.profile.findUnique({ where: { id: "main" } });
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    // Changing password requires current password verification
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password required to set new password" }, { status: 400 });
      }
      const match = await bcrypt.compare(currentPassword, profile.adminPassword);
      if (!match) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
      }
    }

    const updates: { adminUsername?: string; adminPassword?: string } = {};

    if (newUsername && newUsername.trim()) {
      updates.adminUsername = newUsername.trim();
    }
    if (newPassword) {
      updates.adminPassword = await bcrypt.hash(newPassword, 12);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    await prisma.profile.update({ where: { id: "main" }, data: updates });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Security update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
