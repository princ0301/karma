"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  if (session.user.role !== "admin") {
    throw new Error("Only admins can manage team members.");
  }
  return session.user;
}

export async function createUserAction(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "author");

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are all required.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Someone with that email already has an account.");
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "author",
    },
  });

  revalidatePath("/admin/team");
}

export async function deleteUserAction(id: string) {
  const admin = await requireAdmin();

  if (admin.id === id) {
    throw new Error("You can't remove your own account.");
  }

  const postCount = await prisma.post.count({ where: { authorId: id } });
  if (postCount > 0) {
    throw new Error(
      "This person has published posts. Reassign or delete their posts before removing their account."
    );
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/team");
}
