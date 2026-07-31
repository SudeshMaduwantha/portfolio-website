import { prisma } from "./prisma";
import { slugify } from "./utils";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  private: boolean;
}

function categorizeRepo(repo: GitHubRepo): string {
  const name = repo.name.toLowerCase();
  const lang = (repo.language || "").toLowerCase();
  const topics = repo.topics.map((t) => t.toLowerCase());

  if (
    name.includes("system") ||
    name.includes("management") ||
    name.includes("pos") ||
    name.includes("rental") ||
    topics.includes("management-system") ||
    topics.includes("system")
  ) return "systems";

  if (
    topics.includes("ai") ||
    topics.includes("machine-learning") ||
    topics.includes("nlp") ||
    name.includes("ai") ||
    name.includes("ml") ||
    lang === "python"
  ) return "ai";

  if (
    topics.includes("frontend") ||
    name.includes("ui") ||
    name.includes("landing")
  ) return "frontend";

  if (
    topics.includes("backend") ||
    topics.includes("api") ||
    lang === "php" ||
    lang === "go"
  ) return "backend";

  return "fullstack";
}

function getTechStack(repo: GitHubRepo): string[] {
  const stack: string[] = [];
  if (repo.language) stack.push(repo.language);
  const topicMap: Record<string, string> = {
    nextjs: "Next.js",
    "next-js": "Next.js",
    react: "React",
    typescript: "TypeScript",
    javascript: "JavaScript",
    tailwindcss: "Tailwind CSS",
    tailwind: "Tailwind CSS",
    prisma: "Prisma",
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    php: "PHP",
    python: "Python",
    nodejs: "Node.js",
    "node-js": "Node.js",
    fastapi: "FastAPI",
    django: "Django",
    laravel: "Laravel",
    bootstrap: "Bootstrap",
  };
  for (const topic of repo.topics) {
    const mapped = topicMap[topic.toLowerCase()];
    if (mapped && !stack.includes(mapped)) stack.push(mapped);
  }
  return stack.length > 0 ? stack : [repo.language || "Code"];
}

export async function syncGitHubProjects(username = "SudeshMaduwantha") {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    // Unauthenticated GitHub API calls are capped at 60 req/hour per IP, which
    // Vercel's shared serverless IPs burn through fast. A token (no scopes
    // needed, just "public_repo" read) raises that to 5000/hour.
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers,
        cache: "no-store", // always fetch fresh — no caching
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status}`);
      return { synced: 0, error: `GitHub API returned ${res.status}` };
    }

    const repos: GitHubRepo[] = await res.json();
    const EXCLUDED = ["portfolio-website", "SudeshMaduwantha"]; // exclude portfolio + profile repos
    const filtered = repos.filter((r) => !r.fork && !r.private && !EXCLUDED.includes(r.name));

    let synced = 0;
    for (const repo of filtered) {
      const slug = `github-${slugify(repo.name)}`;
      const description = repo.description || `${repo.name} — GitHub project`;
      const techStack = getTechStack(repo);
      const category = categorizeRepo(repo);

      // Projects with a hand-written case study (problem filled in via the
      // admin panel) keep their curated description/techStack/category —
      // only refresh the metrics GitHub actually owns.
      const existing = await prisma.project.findUnique({
        where: { slug },
        select: { problem: true },
      });
      const isCurated = !!existing?.problem;

      await prisma.project.upsert({
        where: { slug },
        update: isCurated
          ? {
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              githubStars: repo.stargazers_count,
            }
          : {
              description,
              techStack,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              language: repo.language,
              category,
              source: "github",
              githubStars: repo.stargazers_count,
            },
        create: {
          title: repo.name
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          slug,
          description,
          techStack,
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          language: repo.language,
          category,
          source: "github",
          featured: false,
          status: "completed",
          githubStars: repo.stargazers_count,
          images: [],
        },
      });
      synced++;
    }

    return { synced };
  } catch (err) {
    console.error("GitHub sync failed:", err);
    return { synced: 0, error: String(err) };
  }
}
