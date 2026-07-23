import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" aria-label="Karma home" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Karma Educational and Charitable Society"
                width={96}
                height={96}
                className="h-auto w-16 rounded-full object-cover"
              />
            </Link>
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
              <li><Link href="/volunteer" className="hover:text-paper">Volunteer</Link></li>
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
              Follow us
            </p>
            <a
              href="https://www.instagram.com/karmaa5258/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
            >
              <span aria-hidden="true" className="text-marigold">@</span>
              KARMAA5258
            </a>
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
