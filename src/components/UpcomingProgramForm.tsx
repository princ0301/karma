"use client";

import { useState, useTransition } from "react";

type InitialValues = {
  title?: string;
  description?: string;
  startsAt?: string;
  endsAt?: string | null;
  location?: string | null;
  image?: string | null;
  registrationUrl?: string | null;
  published?: boolean;
};

export default function UpcomingProgramForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: InitialValues;
  submitLabel: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      try {
        await action(formData);
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "Something went wrong."
        );
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <label className="block font-mono text-xs uppercase tracking-wide text-muted">
        Program title
        <input
          name="title"
          required
          defaultValue={initial?.title}
          placeholder="Community learning session"
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
        />
      </label>

      <label className="block font-mono text-xs uppercase tracking-wide text-muted">
        Description
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          placeholder="What will happen and who it is for."
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Starts
          <input
            name="startsAt"
            type="datetime-local"
            required
            defaultValue={initial?.startsAt}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Ends (optional)
          <input
            name="endsAt"
            type="datetime-local"
            defaultValue={initial?.endsAt ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Location (optional)
          <input
            name="location"
            defaultValue={initial?.location ?? ""}
            placeholder="New Delhi"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Registration link (optional)
          <input
            name="registrationUrl"
            type="url"
            defaultValue={initial?.registrationUrl ?? ""}
            placeholder="https://..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
      </div>

      <label className="block font-mono text-xs uppercase tracking-wide text-muted">
        Image path (optional)
        <input
          name="image"
          defaultValue={initial?.image ?? ""}
          placeholder="/images/K_2.jpeg"
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          name="published"
          type="checkbox"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4 rounded border-white/20 bg-ink-soft accent-[var(--color-marigold)]"
        />
        Publish on the public Programs page
      </label>

      {error && (
        <p className="rounded-xl border border-rose/30 bg-rose/10 p-3 text-sm text-rose">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink disabled:opacity-60"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
