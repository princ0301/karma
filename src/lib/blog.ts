import { prisma } from "@/lib/prisma";

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string | null;
  tags: string[];
  author: string;
};

export type Post = PostMeta & {
  content: string;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: p.createdAt.toISOString(),
    excerpt: p.excerpt,
    cover: p.cover,
    tags: p.tags,
    author: p.author.name,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });
  if (!post || !post.published) return null;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.createdAt.toISOString(),
    excerpt: post.excerpt,
    cover: post.cover,
    tags: post.tags,
    author: post.author.name,
    content: post.content,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}
