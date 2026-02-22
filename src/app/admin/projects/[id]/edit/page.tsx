import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import { ImageUrlInput } from "@/components/ImageUrlInput";

interface PageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();

  const action = updateProject.bind(null, project.id);

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
          Edit Project
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Changes save directly to the database — no deploy needed.
        </p>
      </div>

      <form action={action} className="space-y-6">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Basic Info</h2>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Title *</label>
            <input name="title" required defaultValue={project.title}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Short Description *</label>
            <input name="description" required defaultValue={project.description}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Tech Stack <span className="text-xs text-neutral-400">(comma separated)</span></label>
            <input name="techStack" required defaultValue={project.techStack.join(", ")}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Category</label>
              <select name="category" defaultValue={project.category}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="fullstack">Full-Stack</option>
                <option value="systems">Systems</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ai">AI / ML</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" defaultChecked={project.featured}
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Featured Project</span>
              </label>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 p-6 space-y-4">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Featured Image</h2>
          <ImageUrlInput defaultValue={project.imageUrl || ""} name="imageUrl" />
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">GitHub URL</label>
              <input name="githubUrl" type="url" defaultValue={project.githubUrl || ""}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Live URL</label>
              <input name="liveUrl" type="url" defaultValue={project.liveUrl || ""}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://..." />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-900 dark:text-white text-sm uppercase tracking-wider">Case Study</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">The Problem</label>
            <textarea name="problem" rows={4} defaultValue={project.problem || ""}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">The Solution</label>
            <textarea name="solution" rows={4} defaultValue={project.solution || ""}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Architecture &amp; Design Patterns</label>
            <textarea name="architecture" rows={4} defaultValue={project.architecture || ""}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Full Overview (HTML supported)</label>
            <textarea name="longDesc" rows={6} defaultValue={project.longDesc || ""}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-colors">
            Save Changes
          </button>
          <Link href="/admin/projects"
            className="rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
