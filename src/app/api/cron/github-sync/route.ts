import { NextRequest, NextResponse } from "next/server";
import { syncGitHubProjects } from "@/lib/github-sync";

export const dynamic = "force-dynamic";

// Triggered by Vercel Cron (see vercel.json). Vercel sends
// "Authorization: Bearer $CRON_SECRET" automatically on cron invocations.
export async function GET(req: NextRequest) {
  if (process.env.CRON_SECRET) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const { synced, error } = await syncGitHubProjects();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true, synced });
}
