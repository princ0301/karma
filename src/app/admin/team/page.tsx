import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import InviteUserForm from "@/components/InviteUserForm";
import RemoveUserButton from "@/components/RemoveUserButton";
import { deleteUserAction } from "@/app/admin/team/actions";

export default async function TeamPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Team</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Add accounts for anyone who should be able to write blog posts.
        Share their email and temporary password with them directly —
        there&apos;s no automatic invite email yet.
      </p>

      <div className="mt-8 rounded-2xl border border-white/[0.07] bg-card p-6">
        <h2 className="font-display text-lg text-paper">Add someone</h2>
        <div className="mt-5">
          <InviteUserForm />
        </div>
      </div>

      <div className="mt-10 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-card">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-4 px-6 py-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-base text-paper">
                  {user.name}
                </p>
                <span className="rounded-full bg-marigold-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-marigold">
                  {user.role}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">
                {user.email} · {user._count.posts} post
                {user._count.posts === 1 ? "" : "s"} · joined{" "}
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </p>
            </div>

            {session.user.id !== user.id && (
              <RemoveUserButton
                action={deleteUserAction.bind(null, user.id)}
                name={user.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
