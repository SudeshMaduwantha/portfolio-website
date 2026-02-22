import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/actions";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Layers,
  AlertCircle,
  Lightbulb,
  Network,
} from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug).catch(() => null);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug).catch(() => null);
  if (!project) notFound();

  return (
    <article className="min-h-screen px-4 py-12 max-w-4xl mx-auto">
      <AnimatedSection>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </AnimatedSection>

      {/* Header */}
      <AnimatedSection delay={0.05}>
        <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 p-10 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {project.title}
          </h1>
          <p className="text-neutral-300 text-lg max-w-2xl">{project.description}</p>
          <div className="flex gap-4 mt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <Github size={16} /> GitHub Repo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Cover Image */}
      {project.imageUrl && (
        <AnimatedSection delay={0.1} className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 object-cover max-h-[440px]"
          />
        </AnimatedSection>
      )}

      {/* Case Study Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.problem && (
          <AnimatedSection delay={0.15}>
            <div className="h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950">
                  <AlertCircle size={16} className="text-red-600 dark:text-red-400" />
                </div>
                <h2 className="font-bold text-neutral-900 dark:text-white">The Problem</h2>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                {project.problem}
              </p>
            </div>
          </AnimatedSection>
        )}

        {project.solution && (
          <AnimatedSection delay={0.2}>
            <div className="h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950">
                  <Lightbulb size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="font-bold text-neutral-900 dark:text-white">The Solution</h2>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                {project.solution}
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* Architecture */}
      {project.architecture && (
        <AnimatedSection delay={0.25} className="mt-6">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950">
                <Network size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="font-bold text-neutral-900 dark:text-white">
                Architecture &amp; Design Patterns
              </h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
              {project.architecture}
            </p>
          </div>
        </AnimatedSection>
      )}

      {/* Long Description */}
      {project.longDesc && (
        <AnimatedSection delay={0.3} className="mt-6">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950">
                <Layers size={16} className="text-violet-600 dark:text-violet-400" />
              </div>
              <h2 className="font-bold text-neutral-900 dark:text-white">Overview</h2>
            </div>
            <div
              className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.longDesc }}
            />
          </div>
        </AnimatedSection>
      )}

      {/* Tech Stack Deep Dive */}
      <AnimatedSection delay={0.35} className="mt-6">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7">
          <h2 className="font-bold text-neutral-900 dark:text-white mb-4">
            Tech Stack Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 px-3 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </article>
  );
}
