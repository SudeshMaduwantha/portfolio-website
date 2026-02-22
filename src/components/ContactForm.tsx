"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/lib/actions";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    if ("success" in result) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Name
          </label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
          placeholder="Your message..."
        />
      </div>

      {status === "success" && (
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-emerald-950 rounded-xl px-4 py-3">
          <CheckCircle2 size={16} />
          Message sent! I&apos;ll get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950 rounded-xl px-4 py-3">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 px-6 py-3 text-sm font-semibold text-white transition-colors"
      >
        {status === "loading" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}
