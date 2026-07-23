"use client";

import { useState, useTransition } from "react";

type InitialValues = {
  name?: string;
  type?: "TEAM" | "VOLUNTEER";
  role?: string;
  email?: string | null;
  photo?: string | null;
  city?: string | null;
  bio?: string | null;
  visible?: boolean;
  sortOrder?: number;
  joinDate?: string;
  exitDate?: string | null;
};

export default function MemberForm({
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Name
          <input
            name="name"
            required
            defaultValue={initial?.name}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Profile type
          <select
            name="type"
            defaultValue={initial?.type ?? "VOLUNTEER"}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          >
            <option value="TEAM">Core team</option>
            <option value="VOLUNTEER">Volunteer</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Role
          <input
            name="role"
            required
            defaultValue={initial?.role}
            placeholder="Education Volunteer"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          City
          <input
            name="city"
            defaultValue={initial?.city ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Email (optional)
          <input
            name="email"
            type="email"
            defaultValue={initial?.email ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Photo path (optional)
          <input
            name="photo"
            defaultValue={initial?.photo ?? ""}
            placeholder="/images/member.jpg"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
      </div>

      <label className="block font-mono text-xs uppercase tracking-wide text-muted">
        Short bio or quote (optional)
        <textarea
          name="bio"
          rows={4}
          defaultValue={initial?.bio ?? ""}
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Joining date
          <input
            name="joinDate"
            type="date"
            defaultValue={initial?.joinDate}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Exit date (optional)
          <input
            name="exitDate"
            type="date"
            defaultValue={initial?.exitDate ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-mono text-xs uppercase tracking-wide text-muted">
          Display order
          <input
            name="sortOrder"
            type="number"
            min="0"
            defaultValue={initial?.sortOrder ?? 0}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm normal-case text-paper outline-none focus:border-marigold"
          />
        </label>
        <label className="flex items-center gap-2 self-end pb-3 text-sm text-muted">
          <input
            name="visible"
            type="checkbox"
            defaultChecked={initial?.visible ?? true}
            className="h-4 w-4 rounded border-white/20 bg-ink-soft accent-[var(--color-marigold)]"
          />
          Show this profile publicly
        </label>
      </div>

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
