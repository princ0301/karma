"use client";

import { ChangeEvent, useState, useTransition } from "react";
import { Loader2, Upload, X } from "lucide-react";

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
  const [imageUrl, setImageUrl] = useState(initial?.image ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/program-image", {
        method: "POST",
        body: formData,
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body.url) {
        throw new Error(body.error || "Could not upload the image.");
      }

      setImageUrl(body.url);
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

      <div className="font-mono text-xs uppercase tracking-wide text-muted">
        Program image (optional)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageUpload}
          disabled={uploading}
          className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-white/20 bg-ink-soft px-4 py-3 text-sm normal-case text-muted file:mr-4 file:rounded-full file:border-0 file:bg-marigold file:px-3 file:py-1.5 file:font-mono file:text-xs file:font-medium file:uppercase file:tracking-wide file:text-ink hover:border-marigold/60 disabled:cursor-not-allowed"
        />
        <input type="hidden" name="image" value={imageUrl} />
        {uploading && (
          <span className="mt-2 flex items-center gap-2 text-xs text-marigold">
            <Loader2 size={14} className="animate-spin" /> Uploading image...
          </span>
        )}
        {imageUrl && !uploading && (
          <span className="mt-2 flex items-center gap-2 text-xs text-marigold">
            <Upload size={14} /> Image uploaded
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="flex items-center gap-1 hover:text-paper"
            >
              <X size={13} /> Remove
            </button>
          </span>
        )}
      </div>

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
