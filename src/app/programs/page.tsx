import type { Metadata } from "next";
import CauseCard from "@/components/CauseCard";
import { causes } from "@/lib/causes";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs — Karma",
  description:
    "Explore Karma's programs across education, health, livelihood, and environment.",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
        Programs
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
        Four causes we return to, again and again.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        Each program is run with local partners and volunteers, shaped by
        what each community tells us it needs most.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {causes.map((cause) => (
          <CauseCard key={cause.slug} cause={cause} expanded />
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-white/[0.07] bg-ink-soft px-8 py-12 text-center md:px-16">
        <h2 className="font-display text-2xl text-paper">
          Want to volunteer or partner with us?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          We&apos;re always glad to hear from people and organizations who
          want to work alongside us.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
