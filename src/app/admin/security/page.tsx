"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    newUsername: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (form.newPassword && form.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "", newUsername: "" });
        setTimeout(() => {
          router.push("/admin/login");
        }, 2000);
      } else {
        setError(data.error || "Failed to update credentials");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-8 max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Security Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Change your admin username and password</p>
      </div>

      {success ? (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6 flex items-center gap-3">
          <CheckCircle className="text-emerald-500" size={24} />
          <div>
            <p className="font-semibold text-emerald-800 dark:text-emerald-300">Credentials updated!</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">Redirecting to login...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              New Username (leave blank to keep current)
            </label>
            <input
              type="text"
              value={form.newUsername}
              onChange={(e) => setForm({ ...form, newUsername: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="New username"
            />
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Change Password</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={form.currentPassword}
                    onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Current password"
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={form.newPassword}
                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="New password (min 6 chars)"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2.5 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
            {loading ? "Updating..." : "Update Credentials"}
          </button>
        </form>
      )}
    </div>
  );
}
