import { BookOpen, HeartPulse, HandCoins, Leaf } from "lucide-react";
import type { Cause } from "@/lib/causes";

const icons = {
  book: BookOpen,
  "heart-pulse": HeartPulse,
  "hand-coins": HandCoins,
  leaf: Leaf,
};

export default function CauseCard({
  cause,
  expanded = false,
}: {
  cause: Cause;
  expanded?: boolean;
}) {
  const Icon = icons[cause.icon];

  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-card p-7 transition-colors hover:border-marigold/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold-soft text-marigold">
        <Icon size={18} />
      </div>
      <p className="mt-5 font-mono text-xs uppercase tracking-wide text-marigold">
        {cause.eyebrow}
      </p>
      <h3 className="mt-1 font-display text-xl text-paper">{cause.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {expanded ? cause.detail : cause.summary}
      </p>
    </div>
  );
}
