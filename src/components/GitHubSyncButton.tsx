"use client";

import { useState } from "react";
import { Github, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export function GitHubSyncButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [count, setCount] = useState<number | null>(null);

  const handleSync = async () => {
    setStatus("loading");
    setCount(null);
    try {
      const res = await fetch("/api/admin/github-sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");
      setCount(data.synced);
      setStatus("success");
      // Refresh the page after 1.5s so new projects appear
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={status === "loading"}
      className="flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group w-full text-left disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 transition-colors ${
        status === "success" ? "bg-emerald-600" :
        status === "error" ? "bg-red-600" :
        "bg-neutral-800 dark:bg-neutral-700"
      }`}>
        {status === "loading" ? (
          <RefreshCw size={18} className="text-white animate-spin" />
        ) : status === "success" ? (
          <CheckCircle size={18} className="text-white" />
        ) : status === "error" ? (
          <AlertCircle size={18} className="text-white" />
        ) : (
          <Github size={18} className="text-white" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-neutral-900 dark:text-white">
          {status === "loading" ? "Syncing from GitHub..." :
           status === "success" ? `Synced ${count} projects!` :
           status === "error" ? "Sync failed — try again" :
           "Sync from GitHub"}
        </p>
        <p className="text-xs text-neutral-500 mt-0.5">
          {status === "idle" && "Pull latest repos from SudeshMaduwantha"}
          {status === "loading" && "Fetching your public repositories..."}
          {status === "success" && "Page will refresh in a moment..."}
          {status === "error" && "Check your connection and try again"}
        </p>
      </div>
      {status === "idle" && (
        <RefreshCw size={16} className="text-neutral-400 group-hover:rotate-180 transition-transform duration-500 shrink-0" />
      )}
    </button>
  );
}
