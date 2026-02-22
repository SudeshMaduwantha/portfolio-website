import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-neutral-500 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
