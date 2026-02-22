import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const sites = await prisma.clientSite.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(sites);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, url, description, category, techStack } = await request.json();

    const count = await prisma.clientSite.count();
    const site = await prisma.clientSite.create({
      data: {
        name,
        url,
        description: description || "",
        category: category || "Web Development",
        techStack: techStack || [],
        order: count,
      },
    });

    return NextResponse.json({ success: true, site });
  } catch (error) {
    console.error("Client site create error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
