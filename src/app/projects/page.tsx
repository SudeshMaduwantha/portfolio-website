import { Metadata } from "next";
import { getAllProjects } from "@/lib/actions";
import { syncGitHubProjects } from "@/lib/github-sync";
import { ProjectCard } from "@/components/ProjectCard";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack project case studies  Car Rental System, Web POS, DKTech AI and more. Built with Next.js, Prisma, PHP, and Python.",
};

const categories = ["all", "systems", "fullstack", "ai", "backend", "frontend", "other"];

const categoryLabels: Record<string, string> = {
  all: "All Projects",
  systems: "Systems",
  fullstack: "Full-Stack",
  ai: "AI / ML",
  backend: "Backend",
  frontend: "Frontend",
  other: "Other",
};

const categoryColors: Record<string, string> = {
  systems: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  fullstack: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  ai: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  backend: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800",
  frontend: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  other: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700",
};

export default async function ProjectsPage() {
  // Auto-sync GitHub repos on every page load
  try {
    await syncGitHubProjects();
  } catch {
    // Silently fail if GitHub API is unavailable
  }

  const projects = await getAllProjects().catch(() => []);

  // Group projects by category
  const systemsProjects = projects.filter((p) => p.category === "systems");
  const restProjects = projects.filter((p) => p.category !== "systems");

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
          Projects
        </h1>
        <p className="mt-3 text-neutral-500 max-w-2xl">
          Every project is a deep-dive case study  architecture decisions,
          problems solved, design patterns used, and lessons learned.
          GitHub repos are synced automatically.
        </p>
      </AnimatedSection>

      {/* Category legend */}
      <AnimatedSection delay={0.1} className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
              cat === "all"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent"
                : categoryColors[cat] ?? categoryColors.other
            }`}
          >
            {categoryLabels[cat] ?? cat}
          </span>
        ))}
      </AnimatedSection>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 py-24 text-center">
          <p className="text-neutral-500">
            No projects yet. Add them via the{" "}
            <a href="/admin" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Admin Panel
            </a>
            .
          </p>
        </div>
      ) : (
        <>
          {/* Systems Section (featured) */}
          {systemsProjects.length > 0 && (
            <AnimatedSection delay={0.15} className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="rounded-full border border-violet-200 dark:border-violet-800 bg-violet-100 dark:bg-violet-950 px-4 py-1 text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider">
                  Systems
                </span>
                <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemsProjects.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 0.08}>
                    <ProjectCard {...project} />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* All Other Projects */}
          {restProjects.length > 0 && (
            <AnimatedSection delay={0.2} className="mt-12">
              {systemsProjects.length > 0 && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                  <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-1 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    More Projects
                  </span>
                  <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restProjects.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 0.08}>
                    <ProjectCard {...project} />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          )}
        </>
      )}
    </div>
  );
}
