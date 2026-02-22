"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions";

interface DeleteProjectButtonProps {
  id: string;
  title: string;
}

export function DeleteProjectButton({ id, title }: DeleteProjectButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${title}"?`)) return;
    await deleteProject(id);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500 transition-colors"
    >
      <Trash2 size={15} />
    </button>
  );
}
