import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Journal — Karma",
  description: "Stories and updates from Karma's work on the ground.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
        Journal
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
        Stories from the ground.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        Updates, reflections, and field notes from our programs and the
        people we work alongside.
      </p>

      {posts.length === 0 ? (
        <p className="mt-14 text-sm text-muted">
          No posts yet. Add a <code className="text-marigold">.mdx</code>{" "}
          file to <code className="text-marigold">content/blog/</code> to
          publish your first one.
        </p>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} priority={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
