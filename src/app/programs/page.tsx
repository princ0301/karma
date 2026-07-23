import type { Metadata } from "next";
import Image from "next/image";
import CauseCard from "@/components/CauseCard";
import { causes } from "@/lib/causes";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Programs — Karma",
  description:
    "Explore Karma's programs across education, health, livelihood, and environment.",
};

export default async function ProgramsPage() {
  const upcomingPrograms = await prisma.upcomingProgram.findMany({
    where: {
      published: true,
      startsAt: { gte: new Date() },
    },
    orderBy: { startsAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid items-end gap-8 md:grid-cols-[1fr_0.9fr]">
        <div>
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
        </div>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/K_4.jpeg"
            alt="Children taking part in a Karma learning activity"
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover"
          />
        </figure>
      </div>

      {upcomingPrograms.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-marigold">
                Join us
              </p>
              <h2 className="mt-2 font-display text-2xl text-paper md:text-3xl">
                Upcoming programs
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Find a program near you and be part of the next ripple.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {upcomingPrograms.map((program) => (
              <article
                key={program.id}
                className="overflow-hidden rounded-3xl border border-white/[0.07] bg-card"
              >
                {program.image && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-marigold">
                    <CalendarDays size={15} />
                    {format(program.startsAt, "EEE, MMM d · h:mm a")}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-paper">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {program.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
                    {program.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} className="text-marigold" />
                        {program.location}
                      </span>
                    )}
                    {program.endsAt && (
                      <span>
                        Ends {format(program.endsAt, "MMM d · h:mm a")}
                      </span>
                    )}
                  </div>
                  {program.registrationUrl && (
                    <a
                      href={program.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-marigold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
                    >
                      Register now <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

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
