import { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, Plus, Home, Shield, User, Lock, Globe } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 fixed top-20 bottom-0 left-0 z-40">
        <div className="px-4 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Shield size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm text-neutral-900 dark:text-white">
              Admin Panel
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">Content</p>
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <FolderOpen size={16} /> Projects
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Plus size={16} /> Add Project
          </Link>
          <Link
            href="/admin/clients"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Globe size={16} /> Client Sites
          </Link>

          <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">Account</p>
          <Link
            href="/admin/profile"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <User size={16} /> Profile &amp; CV
          </Link>
          <Link
            href="/admin/security"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Lock size={16} /> Security
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Home size={16} /> Back to Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-60">{children}</main>
    </div>
  );
}
