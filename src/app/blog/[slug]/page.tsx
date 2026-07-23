import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Karma Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/blog"
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted hover:text-paper"
      >
        <ArrowLeft size={14} /> Journal
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-marigold-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-marigold"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mt-5 font-display text-3xl leading-tight text-paper md:text-4xl">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date ? format(new Date(post.date), "MMMM d, yyyy") : ""}</span>
      </div>

      {post.cover && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
          <Image src={post.cover} alt="" fill priority className="object-cover" />
        </div>
      )}

      <div className="prose-blog mt-10">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
