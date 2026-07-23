import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "About | Karma",
  description: "Our mission, story, and the values behind Karma's work.",
};

const values = [
  {
    title: "Every act counts",
    body: "We do not wait for a perfect, large-scale fix. We start with the act in front of us, done well.",
  },
  {
    title: "Communities lead",
    body: "We build with the people we work alongside, not for them - they know their own needs best.",
  },
  {
    title: "Transparency, always",
    body: "Where support goes and what it does is something every supporter should be able to see clearly.",
  },
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

export default async function AboutPage() {
  const teamMembers = await prisma.member.findMany({
    where: { type: "TEAM", visible: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
        About Karma
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-paper md:text-5xl">
        We believe good intent, acted on, does not stop at the person it
        started with.
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-paper">Our story</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Karma began with a simple observation: help given in one place
            tends to move outward, touching lives well beyond the one it was
            aimed at.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-paper">Our mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            To work alongside communities on the causes that shape everyday
            life - education, health, livelihood, and environment - through
            programs that are practical, local, and built to last.
          </p>
        </div>
      </div>

      <div className="thread my-16" />

      <h2 className="font-display text-2xl text-paper">What we hold to</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-2xl border border-white/[0.07] bg-card p-6"
          >
            <h3 className="font-display text-lg text-marigold">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
          </div>
        ))}
      </div>

      <div className="thread my-16" />

      <h2 className="font-display text-2xl text-paper">Our team</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        The people guiding Karma&apos;s work and helping turn good intent into
        sustained action.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-white/[0.07] bg-card p-6"
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                width={96}
                height={96}
                className="h-auto w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink font-display text-xl text-marigold">
                {initials(member.name)}
              </div>
            )}
            <h3 className="mt-5 font-display text-xl text-paper">{member.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-marigold">
              {member.role}
            </p>
            {member.bio && (
              <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
            )}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
              {member.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {member.city}
                </span>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-1.5 text-marigold hover:underline"
                >
                  <Mail size={14} /> Contact
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
