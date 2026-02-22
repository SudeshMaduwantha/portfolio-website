import Link from "next/link";
import { getAllProjects } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import {
  FolderOpen,
  Plus,
  Mail,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export default async function AdminDashboard() {
  const [projects, contacts] = await Promise.all([
    getAllProjects().catch(() => []),
    prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []),
  ]);

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage your portfolio content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <FolderOpen size={18} className="text-indigo-500 mb-3" />
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">{projects.length}</p>
          <p className="text-xs text-neutral-500 mt-1">Total Projects</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <BarChart3 size={18} className="text-emerald-500 mb-3" />
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
            {projects.filter((p) => p.featured).length}
          </p>
          <p className="text-xs text-neutral-500 mt-1">Featured Projects</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <Mail size={18} className="text-orange-500 mb-3" />
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">{unread}</p>
          <p className="text-xs text-neutral-500 mt-1">Unread Messages</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 p-5 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
            <Plus size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-neutral-900 dark:text-white">Add New Project</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Create a new project case study
            </p>
          </div>
          <ArrowRight size={16} className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/admin/projects"
          className="flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <FolderOpen size={18} className="text-neutral-600 dark:text-neutral-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-neutral-900 dark:text-white">Manage Projects</p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Edit or delete existing projects
            </p>
          </div>
          <ArrowRight size={16} className="text-neutral-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Messages */}
      {contacts.length > 0 && (
        <div>
          <h2 className="font-bold text-neutral-900 dark:text-white mb-4">
            Recent Messages
          </h2>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
            {contacts.map((c, i) => (
              <div
                key={c.id}
                className={`flex items-start gap-4 p-4 ${
                  i < contacts.length - 1
                    ? "border-b border-neutral-100 dark:border-neutral-800"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 font-bold text-sm text-neutral-700 dark:text-neutral-300 shrink-0">
                  {c.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                      {c.name}
                    </p>
                    {!c.read && (
                      <span className="shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{c.email}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                    {c.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
