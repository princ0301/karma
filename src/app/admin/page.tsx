import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deletePostAction } from "@/app/admin/actions";
import DeletePostButton from "@/components/DeletePostButton";
import { format } from "date-fns";
import { Pencil } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    where:
      session.user.role === "admin" ? undefined : { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-paper">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-marigold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-ink"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          No posts yet.{" "}
          <Link href="/admin/posts/new" className="text-marigold underline">
            Write your first one.
          </Link>
        </p>
      ) : (
        <div className="mt-8 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-card">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-display text-base text-paper">
                    {post.title}
                  </p>
                  {!post.published && (
                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs text-muted">
                  {post.author.name} ·{" "}
                  {format(new Date(post.createdAt), "MMM d, yyyy")}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper hover:border-marigold/50"
                >
                  <Pencil size={13} /> Edit
                </Link>
                <DeletePostButton
                  action={deletePostAction.bind(null, post.id)}
                  title={post.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
