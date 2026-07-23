import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Karma",
  description: "Our mission, story, and the values behind Karma's work.",
};

const values = [
  {
    title: "Every act counts",
    body: "We don't wait for a perfect, large-scale fix. We start with the act in front of us, done well.",
  },
  {
    title: "Communities lead",
    body: "We build with the people we work alongside, not for them — they know their own needs best.",
  },
  {
    title: "Transparency, always",
    body: "Where the support goes and what it does is something every supporter should be able to see clearly.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
        About Karma
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-paper md:text-5xl">
        We believe good intent, acted on, doesn&apos;t stop at the person
        it started with.
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-paper">Our story</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            [Add your founding story here — why Karma was started, the
            moment or need that sparked it, and how the organization has
            grown since.] Karma began with a simple observation: help given
            in one place tends to move outward, touching lives well beyond
            the one it was aimed at.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-paper">Our mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            To work alongside communities on the causes that shape everyday
            life — education, health, livelihood, and environment — through
            programs that are practical, local, and built to last.
            [Refine this mission statement as needed.]
          </p>
        </div>
      </div>

      <div className="thread my-16" />

      <h2 className="font-display text-2xl text-paper">What we hold to</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-white/[0.07] bg-card p-6"
          >
            <h3 className="font-display text-lg text-marigold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="thread my-16" />

      <h2 className="font-display text-2xl text-paper">Our team</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        [Add team member names, roles, and photos here — founders, staff,
        or key volunteers you&apos;d like to introduce.]
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/[0.07] bg-card p-6">
            <div className="h-32 w-full rounded-xl bg-ink-soft" />
            <p className="mt-4 font-display text-base text-paper">
              [Name]
            </p>
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              [Role]
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
