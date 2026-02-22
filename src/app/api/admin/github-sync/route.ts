import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { syncGitHubProjects } from "@/lib/github-sync";

export async function POST() {
  // Verify admin is logged in
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { synced, error } = await syncGitHubProjects();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true, synced });
}
