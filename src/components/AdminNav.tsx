"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AdminNav() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-white/[0.06] bg-ink-soft">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/admin" className="font-display text-lg text-paper">
          Karma <span className="text-muted">/ admin</span>
        </Link>

        {session?.user && (
          <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-wide">
            <Link href="/admin" className="text-muted hover:text-paper">
              Posts
            </Link>
            <Link href="/admin/posts/new" className="text-muted hover:text-paper">
              New post
            </Link>
            {session.user.role === "admin" && (
              <>
                <Link href="/admin/members" className="text-muted hover:text-paper">
                  People
                </Link>
                <Link href="/admin/team" className="text-muted hover:text-paper">
                  Team
                </Link>
              </>
            )}
            <span className="text-marigold">{session.user.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-muted hover:text-paper"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
