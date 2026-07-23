import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteMemberAction } from "./actions";

export default async function MembersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin");

  const members = await prisma.member.findMany({
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-paper">People</h1>
          <p className="mt-2 text-sm text-muted">
            Manage public team and volunteer profiles.
          </p>
        </div>
        <Link
          href="/admin/members/new"
          className="shrink-0 rounded-full bg-marigold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-ink"
        >
          Add profile
        </Link>
      </div>

      {members.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No profiles added yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-card">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="min-w-0">
                <p className="truncate font-display text-base text-paper">{member.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">
                  {member.type === "TEAM" ? "Team" : "Volunteer"} - {member.role}
                  {!member.visible && " - Hidden"}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Joined {format(member.joinDate, "MMM d, yyyy")}
                  {member.exitDate && ` - Left ${format(member.exitDate, "MMM d, yyyy")}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Link
                  href={`/admin/members/${member.id}/edit`}
                  className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper hover:border-marigold/50"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <form action={deleteMemberAction.bind(null, member.id)}>
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
