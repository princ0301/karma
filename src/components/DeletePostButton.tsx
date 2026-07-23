"use client";

import { Trash2 } from "lucide-react";

export default function DeletePostButton({
  action,
  title,
}: {
  action: () => Promise<void>;
  title: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-1 rounded-full border border-rose/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-rose hover:bg-rose/10"
      >
        <Trash2 size={13} /> Delete
      </button>
    </form>
  );
}
