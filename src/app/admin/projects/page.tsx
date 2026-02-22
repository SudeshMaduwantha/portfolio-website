import Link from "next/link";
import { getAllProjects } from "@/lib/actions";
import { Plus, Edit, ExternalLink, Github, Star } from "lucide-react";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";

function isNew(date: Date) {
  return Date.now() - new Date(date).getTime() < 7 * 24 * 60 * 60 * 1000;
}

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminProjectsPage() {
  const projects = await getAllProjects().catch(() => []);

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Projects
          </h1>
          <p className="text-sm text-neutral-500 mt-1">{projects.length} total · sorted: ⭐ first, newest first</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition-colors"
        >
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 py-24 text-center">
          <p className="text-neutral-500 mb-4">No projects yet.</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            <Plus size={16} /> Add Your First Project
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`flex items-center gap-4 p-4 ${
                i < projects.length - 1
                  ? "border-b border-neutral-100 dark:border-neutral-800"
                  : ""
              }`}
            >
              {/* Thumbnail */}
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950 dark:to-violet-950 shrink-0 overflow-hidden flex items-center justify-center">
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-indigo-300">
                    {project.title[0]}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-neutral-900 dark:text-white truncate">
                    {project.title}
                  </p>
                  {project.featured && (
                    <Star size={12} className="text-amber-500 shrink-0" fill="currentColor" />
                  )}
                  {isNew(project.createdAt) && (
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 truncate mt-0.5">
                  {project.description}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">{timeAgo(project.createdAt)}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-xs text-indigo-700 dark:text-indigo-300"
                    >
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs text-neutral-400">+{project.techStack.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                  >
                    <Github size={15} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 transition-colors"
                >
                  <Edit size={15} />
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
