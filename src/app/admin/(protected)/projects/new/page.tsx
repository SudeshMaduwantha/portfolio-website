import { createProject } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageUrlInput } from "@/components/ImageUrlInput";

export default function NewProjectPage() {
  return (
    <div className="px-6 py-8 max-w-3xl">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Add New Project
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Fill in the details below. The project will appear on your portfolio
          immediately.
        </p>
      </div>

      <form action={createProject} className="space-y-6">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">
            Basic Info
          </h2>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Project Title *
            </label>
            <input
              name="title"
              required
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Car Rental Management System"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Short Description *
            </label>
            <input
              name="description"
              required
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="One sentence summary of the project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Tech Stack *{" "}
              <span className="text-xs text-neutral-400">(comma separated)</span>
            </label>
            <input
              name="techStack"
              required
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Next.js, Prisma, PostgreSQL, Tailwind CSS"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Category
              </label>
              <select
                name="category"
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="fullstack">Full-Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ai">AI / ML</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Featured Project
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">
            Links &amp; Media
          </h2>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Cover Image URL
            </label>
            <ImageUrlInput name="imageUrl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                GitHub URL
              </label>
              <input
                name="githubUrl"
                type="url"
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Live URL
              </label>
              <input
                name="liveUrl"
                type="url"
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">
            Case Study
          </h2>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              The Problem
            </label>
            <textarea
              name="problem"
              rows={4}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="What problem were you solving? What were the pain points?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              The Solution
            </label>
            <textarea
              name="solution"
              rows={4}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="How did you solve it? What approach did you take?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Architecture &amp; Design Patterns
            </label>
            <textarea
              name="architecture"
              rows={4}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Prisma schema design, API routes, design patterns used..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Full Overview (HTML supported)
            </label>
            <textarea
              name="longDesc"
              rows={6}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
              placeholder="Detailed description, features, challenges, learnings..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Save Project
          </button>
          <Link
            href="/admin/projects"
            className="rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
