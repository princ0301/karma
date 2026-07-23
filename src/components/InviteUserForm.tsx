"use client";

import { useState, useTransition } from "react";
import { createUserAction } from "@/app/admin/team/actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function InviteUserForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        await createUserAction(formData);
        setSuccess(true);
        (document.getElementById("invite-form") as HTMLFormElement)?.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form id="invite-form" action={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Temporary password
          </label>
          <input
            name="password"
            type="text"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-muted">
            Role
          </label>
          <select
            name="role"
            defaultValue="author"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          >
            <option value="author">Author (can write posts)</option>
            <option value="admin">Admin (can also manage the team)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose/30 bg-rose/10 p-3 text-sm text-rose">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-marigold/30 bg-marigold-soft p-3 text-sm text-paper">
          <CheckCircle2 size={16} className="text-marigold" />
          Account created. Share the email and temporary password with them
          directly — they can sign in at{" "}
          <code className="text-marigold">/admin/login</code>.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-marigold px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
