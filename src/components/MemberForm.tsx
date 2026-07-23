"use client";

import { ChangeEvent, useState, useTransition } from "react";
import { Loader2, Upload, X } from "lucide-react";

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
  const [photoUrl, setPhotoUrl] = useState(initial?.photo ?? "");
  const [uploading, setUploading] = useState(false);

  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/member-photo", {
        method: "POST",
        body: formData,
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body.url) {
        throw new Error(body.error || "Could not upload the image.");
      }

      setPhotoUrl(body.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload the image."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

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
        <div className="font-mono text-xs uppercase tracking-wide text-muted">
          Photo (optional)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoUpload}
            disabled={uploading}
            className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-ink-soft px-4 py-3 text-sm normal-case text-muted file:mr-4 file:rounded-full file:border-0 file:bg-marigold file:px-3 file:py-1.5 file:font-mono file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-ink hover:border-marigold/60 disabled:cursor-not-allowed"
          />
          <input type="hidden" name="photo" value={photoUrl} />
          {uploading && (
            <span className="mt-2 flex items-center gap-2 text-xs text-marigold">
              <Loader2 size={14} className="animate-spin" /> Uploading image...
            </span>
          )}
          {photoUrl && !uploading && (
            <span className="mt-2 flex items-center gap-2 text-xs text-marigold">
              <Upload size={14} /> Photo uploaded
              <button
                type="button"
                onClick={() => setPhotoUrl("")}
                className="flex items-center gap-1 hover:text-paper"
              >
                <X size={13} /> Remove
              </button>
            </span>
          )}
        </div>
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
            min="1"
            defaultValue={initial?.sortOrder ?? 1}
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
