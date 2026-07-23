"use client";

import { useState, useTransition } from "react";

type InitialValues = {
  title?: string;
  excerpt?: string;
  content?: string;
  cover?: string | null;
  tags?: string[];
  published?: boolean;
};

export default function PostForm({
  action,
  initial,
  submitLabel = "Publish",
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: InitialValues;
  submitLabel?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      try {
        await action(formData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Title
        </label>
        <input
          name="title"
          type="text"
          required
          defaultValue={initial?.title}
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
        />
      </div>

      <div>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Excerpt
        </label>
        <input
          name="excerpt"
          type="text"
          defaultValue={initial?.excerpt}
          placeholder="One or two sentences shown on the journal list page"
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
        />
      </div>

      <div>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Content (Markdown supported)
        </label>
        <textarea
          name="content"
          required
          rows={16}
          defaultValue={initial?.content}
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 font-mono text-sm text-paper outline-none focus:border-marigold"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Cover image URL
          </label>
          <input
            name="cover"
            type="text"
            defaultValue={initial?.cover ?? ""}
            placeholder="/images/my-cover.jpg or https://..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            type="text"
            defaultValue={initial?.tags?.join(", ")}
            placeholder="Education, Field notes"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          name="published"
          type="checkbox"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4 rounded border-white/20 bg-ink-soft accent-[var(--color-marigold)]"
        />
        Published (visible on the public site)
      </label>

      {error && (
        <div className="rounded-xl border border-rose/30 bg-rose/10 p-3 text-sm text-rose">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
