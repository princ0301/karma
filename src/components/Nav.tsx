"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Karma Educational and Charitable Society home"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/images/logo.png"
            alt="Karma Educational and Charitable Society"
            width={80}
            height={80}
            priority
            className="h-auto w-14 rounded-full object-cover"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg tracking-tight text-paper">
              Karma
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-wide text-muted">
              Educational &amp; Charitable Society
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="rounded-full bg-marigold px-5 py-2 font-mono text-[13px] font-medium uppercase tracking-wide text-ink transition-transform hover:scale-[1.03]"
          >
            Donate
          </Link>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/[0.06] px-6 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-wide text-muted hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="mt-2 w-fit rounded-full bg-marigold px-5 py-2 font-mono text-sm font-medium uppercase tracking-wide text-ink"
          >
            Donate
          </Link>
        </nav>
      )}
    </header>
  );
}
