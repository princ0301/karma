"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";

export default function RemoveUserButton({
  action,
  name,
}: {
  action: () => Promise<void>;
  name: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleClick() {
    if (!confirm(`Remove ${name}'s account? They won't be able to sign in anymore.`)) {
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        await action();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't remove this account.");
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={pending}
        className="flex items-center gap-1 rounded-full border border-rose/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-rose hover:bg-rose/10 disabled:opacity-60"
      >
        <X size={13} /> Remove
      </button>
      {error && <p className="max-w-[220px] text-right text-xs text-rose">{error}</p>}
    </div>
  );
}
