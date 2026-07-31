"use client";

import { useState } from "react";
import { Plus, Trash2, ExternalLink, Loader2, Save, Globe } from "lucide-react";
import type { ClientSite } from "@prisma/client";

interface Props {
  initialSites: ClientSite[];
}

const empty = {
  name: "",
  url: "",
  description: "",
  category: "Web Development",
  techStack: [] as string[],
};

export function ClientSitesManager({ initialSites }: Props) {
  const [sites, setSites] = useState<ClientSite[]>(initialSites);
  const [form, setForm] = useState({ ...empty });
  const [techInput, setTechInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function addTech() {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      setForm({ ...form, techStack: [...form.techStack, t] });
    }
    setTechInput("");
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.url) return;
    setAdding(true);
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const { site } = await res.json();
        setSites([...sites, site]);
        setForm({ ...empty });
        setShowForm(false);
      }
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this client site?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      setSites(sites.filter((s) => s.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-3xl space-y-5">
      {/* Site List */}
      {sites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-10 text-center text-neutral-400 text-sm">
          No client sites yet. Add your first one below.
        </div>
      ) : (
        <div className="space-y-3">
          {sites.map((site) => (
            <div
              key={site.id}
              className="flex items-start gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950">
                <Globe size={18} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-neutral-900 dark:text-white text-sm">{site.name}</p>
                  <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500">
                    {site.category}
                  </span>
                </div>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-500 hover:underline flex items-center gap-1 mt-0.5"
                >
                  {site.url} <ExternalLink size={10} />
                </a>
                {site.description && (
                  <p className="text-xs text-neutral-500 mt-1">{site.description}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {site.techStack.map((t) => (
                    <span key={t} className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDelete(site.id)}
                disabled={deletingId === site.id}
                className="shrink-0 flex h-8 w-8 items-center justify-center rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                {deletingId === site.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Form Toggle */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 px-5 py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition-colors w-full justify-center"
        >
          <Plus size={16} /> Add New Client Site
        </button>
      ) : (
        <form
          onSubmit={handleAdd}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-4"
        >
          <h3 className="font-semibold text-neutral-900 dark:text-white">Add New Client Site</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                Site Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Wildcat Safari"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                URL *
              </label>
              <input
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                required
                type="url"
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Web Development"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Brief description of the website..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. WordPress, PHP... (press Enter to add)"
              />
              <button type="button" onClick={addTech} className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.techStack.map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-950 px-2.5 py-0.5 text-xs text-indigo-700 dark:text-indigo-300">
                  {t}
                  <button type="button" onClick={() => setForm({ ...form, techStack: form.techStack.filter((x) => x !== t) })} className="hover:text-red-500 ml-0.5">×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={adding}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-4 py-2 text-sm font-semibold text-white transition-colors"
            >
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {adding ? "Saving..." : "Save Site"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm({ ...empty }); }}
              className="rounded-xl border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
