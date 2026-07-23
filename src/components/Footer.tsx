import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg text-paper">Karma</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Every act ripples forward. We work across education, health,
              livelihood, and environment.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-marigold">
              Site
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-paper">About</Link></li>
              <li><Link href="/programs" className="hover:text-paper">Programs</Link></li>
              <li><Link href="/blog" className="hover:text-paper">Journal</Link></li>
              <li><Link href="/donate" className="hover:text-paper">Donate</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-marigold">
              Reach us
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>hello@karma.org</li>
              <li>+91 00000 00000</li>
              <li>New Delhi, India</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-marigold">
              Registration
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>[Add 12A / 80G registration no.]</li>
              <li>[Add NGO registration no.]</li>
            </ul>
          </div>
        </div>

        <div className="thread my-10" />

        <p className="text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} Karma. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
