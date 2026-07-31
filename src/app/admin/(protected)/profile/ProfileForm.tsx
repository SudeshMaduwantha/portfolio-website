"use client";

import { useState } from "react";
import { Loader2, Save, CheckCircle } from "lucide-react";
import type { Profile } from "@prisma/client";

interface Props {
  profile: Profile;
}

export function ProfileForm({ profile }: Props) {
  const [form, setForm] = useState({
    name: profile.name || "",
    title: profile.title || "",
    bio: profile.bio || "",
    email: profile.email || "",
    phone: profile.phone || "",
    github: profile.github || "",
    youtube: profile.youtube || "",
    linkedin: profile.linkedin || "",
    location: profile.location || "",
    cvUrl: profile.cvUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const field = (label: string, key: keyof typeof form, placeholder = "", textarea = false) => (
    <div key={key}>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={4}
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Basic Info</p>
        {field("Full Name", "name", "Sudesh Kumarasiri")}
        {field("Professional Title", "title", "Full-Stack & AI Engineer")}
        {field("Bio / About Me", "bio", "Write a short intro about yourself...", true)}
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Contact & Links</p>
        {field("Email", "email", "contact@dktech.lk")}
        {field("Phone / WhatsApp", "phone", "+94713172922")}
        {field("GitHub URL", "github", "https://github.com/SudeshMaduwantha")}
        {field("YouTube URL", "youtube", "https://youtube.com/@dktechpvtltd2131")}
        {field("LinkedIn URL", "linkedin", "https://linkedin.com/in/")}
        {field("Location", "location", "Sri Lanka")}
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">CV / Resume</p>
        {field("CV Download URL (Google Drive or any public link)", "cvUrl", "https://drive.google.com/...")}
        <p className="text-xs text-neutral-400">
          Upload your CV to Google Drive, set to &quot;Anyone with link can view&quot;, then paste the link here.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 px-3 py-2.5 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle size={15} /> Profile saved successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
