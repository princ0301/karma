import Link from "next/link";
import Image from "next/image";
import RippleHero from "@/components/RippleHero";
import CauseCard from "@/components/CauseCard";
import { causes } from "@/lib/causes";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-14 md:pt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
          Karma · est. [year]
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] text-paper md:text-6xl">
          Every act ripples <em className="italic text-marigold">forward.</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Karma is a nonprofit working across education, health, livelihood,
          and environment — one small, deliberate act at a time, so it can
          reach further than any one of us could alone.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/donate"
            className="rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
          >
            Support the work
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono text-sm uppercase tracking-wide text-paper transition-colors hover:border-marigold/50"
          >
            See our programs <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <RippleHero />

      <section className="mx-auto max-w-6xl px-6">
        <div className="thread" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-marigold">
              In the community
            </p>
            <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight text-paper md:text-4xl">
              Joy, curiosity, and a place to grow.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              Our work begins by showing up consistently: listening, learning,
              and creating room for children and communities to lead the way.
            </p>
            <Link
              href="/volunteer"
              className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-marigold hover:text-paper"
            >
              Meet our volunteers <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/K_6.jpeg"
                alt="Children celebrating together outdoors"
                fill
                sizes="(max-width: 768px) 60vw, 420px"
                className="object-cover"
              />
            </figure>
            <figure className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/K_5.jpeg"
                alt="Karma volunteers and children sharing artwork"
                fill
                sizes="(max-width: 768px) 40vw, 320px"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-marigold">
              Where the ripple reaches
            </p>
            <h2 className="mt-2 font-display text-2xl text-paper md:text-3xl">
              Four causes, one intention
            </h2>
          </div>
          <Link
            href="/programs"
            className="hidden shrink-0 font-mono text-xs uppercase tracking-wide text-muted hover:text-paper md:block"
          >
            All programs →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {causes.map((cause) => (
            <CauseCard key={cause.slug} cause={cause} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="thread" />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-white/[0.07] bg-ink-soft px-8 py-14 text-center md:px-16">
          <h2 className="font-display text-2xl text-paper md:text-3xl">
            One act of good doesn&apos;t stay small for long.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Whichever way you choose to give — time, skill, or support —
            it travels further than you&apos;ll ever see.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-block rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
