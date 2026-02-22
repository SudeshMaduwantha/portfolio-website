"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  slug: string;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  techStack,
  imageUrl,
  githubUrl,
  liveUrl,
  slug,
  featured,
  className,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-shadow hover:shadow-xl hover:shadow-indigo-500/10",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950 dark:to-violet-950">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-bold text-indigo-200 dark:text-indigo-800">
              {title[0]}
            </span>
          </div>
        )}
        {featured && (
          <span className="absolute top-3 right-3 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-xs text-neutral-500">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <Link
            href={`/projects/${slug}`}
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Case Study <ArrowRight size={14} />
          </Link>
          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
