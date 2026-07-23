import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Sprout,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Volunteer | Karma",
  description: "Join Karma's volunteer community and contribute your time and skills.",
};

const opportunities = [
  {
    title: "Teaching & mentoring",
    body: "Support learning sessions, tutoring, and confidence-building for children.",
    icon: BookOpen,
  },
  {
    title: "Community outreach",
    body: "Help us listen, connect families to programs, and spread awareness locally.",
    icon: HeartHandshake,
  },
  {
    title: "Events & fundraising",
    body: "Bring energy to drives, campaigns, workshops, and community gatherings.",
    icon: Megaphone,
  },
  {
    title: "Environment drives",
    body: "Join plantation, clean-up, and everyday climate-awareness initiatives.",
    icon: Sprout,
  },
];

const steps = [
  "Tell us how you would like to contribute.",
  "Have a short conversation with our team.",
  "Join an orientation or upcoming activity.",
  "Work alongside the community and share the impact.",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default async function VolunteerPage() {
  const volunteers = await prisma.member.findMany({
    where: { type: "VOLUNTEER", visible: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
          Volunteer with Karma
        </p>
        <div className="mt-4 grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div>
            <h1 className="max-w-3xl font-display text-4xl leading-tight text-paper md:text-5xl">
              Give your time. Grow the ripple.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Meaningful change is built by people who choose to show up.
              Join a community of volunteers supporting education, wellbeing,
              livelihoods, and the environment.
            </p>
          </div>
          <div className="rounded-2xl border border-marigold/20 bg-marigold-soft p-6">
            <Users className="text-marigold" size={26} />
            <p className="mt-4 font-display text-xl text-paper">
              There is a place for your time, skill, and care.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Help once at an event, volunteer on weekends, or become part of
              an ongoing program.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-paper py-16 text-ink md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ad741e]">
            Our volunteer community
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
            People who make the work possible.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Meet the people who bring their time, skills, and care to Karma&apos;s
            work.
          </p>

          {volunteers.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {volunteers.map((volunteer) => (
                <article
                  key={volunteer.name}
                  className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {volunteer.photo ? (
                      <Image
                        src={volunteer.photo}
                        alt={volunteer.name}
                        width={96}
                        height={96}
                        className="h-auto w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xl text-marigold">
                        {initials(volunteer.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-xl text-ink">
                        {volunteer.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-[#8d631d]">
                        {volunteer.role}
                      </p>
                    </div>
                  </div>

                  {volunteer.bio && (
                    <p className="mt-5 text-sm leading-relaxed text-slate-600">
                      &ldquo;{volunteer.bio}&rdquo;
                    </p>
                  )}

                  {(volunteer.city || volunteer.email) && (
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
                      {volunteer.city && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {volunteer.city}
                        </span>
                      )}
                      {volunteer.email && (
                        <a
                          href={`mailto:${volunteer.email}`}
                          className="flex items-center gap-1.5 text-[#8d631d] hover:underline"
                        >
                          <Mail size={14} /> Contact
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-ink/20 bg-white/70 p-8 text-sm leading-relaxed text-slate-600">
              Our volunteer profiles will be added here soon.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
          Ways to contribute
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-paper md:text-4xl">
          Bring the skill you already have.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.title}
              className="rounded-2xl border border-white/[0.07] bg-card p-6"
            >
              <opportunity.icon className="text-marigold" size={20} />
              <h3 className="mt-5 font-display text-xl text-paper">
                {opportunity.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {opportunity.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-ink-soft py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-marigold" size={20} />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
              Your volunteer journey
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="relative border-l border-marigold/40 pl-5 md:border-l-0 md:border-t md:pl-0 md:pt-5">
                <span className="absolute -left-2.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-marigold font-mono text-[10px] text-ink md:-top-2.5 md:left-0">
                  {index + 1}
                </span>
                <p className="font-display text-lg text-paper">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="rounded-3xl border border-white/[0.07] bg-card px-8 py-14 text-center md:px-16">
          <h2 className="font-display text-3xl text-paper md:text-4xl">
            You don&apos;t need to do everything.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            One meaningful contribution can travel further than you expect.
            Tell us how you would like to get involved.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 font-mono text-sm font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.02]"
          >
            Join the volunteer community <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
