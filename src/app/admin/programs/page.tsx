import Link from "next/link";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteUpcomingProgramAction } from "./actions";

export default async function UpcomingProgramsAdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin");

  const programs = await prisma.upcomingProgram.findMany({
    orderBy: { startsAt: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-paper">Upcoming programs</h1>
          <p className="mt-2 text-sm text-muted">
            Manage events shown on the public Programs page.
          </p>
        </div>
        <Link
          href="/admin/programs/new"
          className="shrink-0 rounded-full bg-marigold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-ink"
        >
          Add program
        </Link>
      </div>

      {programs.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No upcoming programs added yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-card">
          {programs.map((program) => (
            <div key={program.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-display text-base text-paper">{program.title}</p>
                  {!program.published && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted">
                  {format(program.startsAt, "MMM d, yyyy · h:mm a")}
                  {program.location && ` · ${program.location}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Link
                  href={`/admin/programs/${program.id}/edit`}
                  className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper hover:border-marigold/50"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <form action={deleteUpcomingProgramAction.bind(null, program.id)}>
                  <button className="flex items-center gap-1 rounded-full border border-rose/30 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-rose hover:bg-rose/10">
                    <Trash2 size={13} /> Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
