import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/PostForm";
import { updatePostAction } from "@/app/admin/actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) notFound();

  const post = await prisma.post.findFirst({
    where:
      session.user.role === "admin" ? { id } : { id, authorId: session.user.id },
  });
  if (!post) notFound();

  const action = updatePostAction.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl text-paper">Edit post</h1>
      <div className="mt-8">
        <PostForm
          action={action}
          submitLabel="Save changes"
          initial={{
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            cover: post.cover,
            tags: post.tags,
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
