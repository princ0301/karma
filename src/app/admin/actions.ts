"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  return session.user;
}

async function findPostForUser(id: string, user: { id?: string; role?: string }) {
  return prisma.post.findFirst({
    where: user.role === "admin" ? { id } : { id, authorId: user.id },
  });
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  if (!raw) return [];
  return String(raw)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = slugify(base) || "post";
  let attempt = 0;

  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    attempt += 1;
    slug = `${slugify(base)}-${attempt + 1}`;
  }
}

export async function createPostAction(formData: FormData) {
  const user = await requireUser();

  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const cover = String(formData.get("cover") || "").trim() || null;
  const tags = parseTags(formData.get("tags"));
  const published = formData.get("published") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const slug = await uniqueSlug(title);

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      cover,
      tags,
      published,
      authorId: user.id!,
    },
  });

  revalidatePath("/blog");
  redirect("/admin");
}

export async function updatePostAction(id: string, formData: FormData) {
  const user = await requireUser();

  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const cover = String(formData.get("cover") || "").trim() || null;
  const tags = parseTags(formData.get("tags"));
  const published = formData.get("published") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const existing = await findPostForUser(id, user);
  if (!existing) throw new Error("Post not found.");

  const slug =
    existing.title === title ? existing.slug : await uniqueSlug(title, id);

  await prisma.post.update({
    where: { id },
    data: { title, slug, excerpt, content, cover, tags, published },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${slug}`);
  redirect("/admin");
}

export async function deletePostAction(id: string) {
  const user = await requireUser();

  const existing = await findPostForUser(id, user);
  if (!existing) return;

  await prisma.post.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  redirect("/admin");
}
