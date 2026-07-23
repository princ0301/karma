"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-marigold/30 bg-marigold-soft p-6">
        <CheckCircle2 className="mt-0.5 shrink-0 text-marigold" size={20} />
        <div>
          <p className="font-display text-lg text-paper">Message sent.</p>
          <p className="mt-1 text-sm text-muted">
            Thanks for reaching out — we&apos;ll reply within a day or two.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="font-mono text-xs uppercase tracking-wide text-muted"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-mono text-xs uppercase tracking-wide text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-wide text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-paper outline-none focus:border-marigold"
          placeholder="How can we help, or how would you like to get involved?"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-rose/30 bg-rose/10 p-4 text-sm text-rose">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
