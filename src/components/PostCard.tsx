import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/blog";

export default function PostCard({
  post,
  priority = false,
}: {
  post: PostMeta;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-card transition-colors hover:border-marigold/40"
    >
      {post.cover && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={post.cover}
            alt=""
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-marigold-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-marigold"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-display text-xl text-paper">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date ? format(new Date(post.date), "MMM d, yyyy") : ""}</span>
        </div>
      </div>
    </Link>
  );
}
