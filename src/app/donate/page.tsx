import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, Users, PackageOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate — Karma",
  description: "Ways to support Karma's work.",
};

const ways = [
  {
    icon: HandHeart,
    title: "Give directly",
    body: "Reach out to us and we'll share bank transfer details and a receipt for your records. [Add UPI ID / bank details / payment gateway link once ready.]",
  },
  {
    icon: Users,
    title: "Volunteer your time",
    body: "Join a program on the ground — teaching, health camps, or event support. We'll match you to what fits.",
  },
  {
    icon: PackageOpen,
    title: "Give in kind",
    body: "Books, supplies, or equipment for our centers are always useful. Get in touch to check current needs.",
  },
];

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
        Donate
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-paper md:text-5xl">
        Support travels further than you&apos;ll see.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        We&apos;re currently setting up online giving. For now, the fastest
        way to give is to reach out directly — we&apos;ll walk you through
        the options and send a receipt.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {ways.map((w) => (
          <div
            key={w.title}
            className="rounded-2xl border border-white/[0.07] bg-card p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold-soft text-marigold">
              <w.icon size={18} />
            </div>
            <h3 className="mt-5 font-display text-lg text-paper">
              {w.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {w.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-white/[0.07] bg-ink-soft px-8 py-12 text-center md:px-16">
        <h2 className="font-display text-2xl text-paper">
          Ready to give?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Write to us at{" "}
          <a href="mailto:hello@karma.org" className="text-marigold underline underline-offset-4">
            hello@karma.org
          </a>{" "}
          or use the contact form, and we&apos;ll get back within a day or two.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
        >
          Contact us to donate
        </Link>
      </div>
    </div>
  );
}
