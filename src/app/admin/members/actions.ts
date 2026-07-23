"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "admin") {
    throw new Error("Only admins can manage member profiles.");
  }
}

function memberData(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const type = formData.get("type") === "TEAM" ? "TEAM" : "VOLUNTEER";

  if (!name || !role) {
    throw new Error("Name and role are required.");
  }

  const joinDateValue = String(formData.get("joinDate") || "").trim();
  const exitDateValue = String(formData.get("exitDate") || "").trim();
  const joinDate = joinDateValue ? new Date(`${joinDateValue}T00:00:00.000Z`) : undefined;
  const exitDate = exitDateValue ? new Date(`${exitDateValue}T00:00:00.000Z`) : null;

  if ((joinDate && Number.isNaN(joinDate.getTime())) || (exitDate && Number.isNaN(exitDate.getTime()))) {
    throw new Error("Enter valid joining and exit dates.");
  }

  return {
    name,
    role,
    type,
    email: String(formData.get("email") || "").trim() || null,
    photo: String(formData.get("photo") || "").trim() || null,
    city: String(formData.get("city") || "").trim() || null,
    bio: String(formData.get("bio") || "").trim() || null,
    visible: formData.get("visible") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0) || 0,
    joinDate,
    exitDate,
  };
}

function revalidateMemberPages() {
  revalidatePath("/about");
  revalidatePath("/volunteer");
  revalidatePath("/admin/members");
}

export async function createMemberAction(formData: FormData) {
  await requireAdmin();
  await prisma.member.create({ data: memberData(formData) });
  revalidateMemberPages();
  redirect("/admin/members");
}

export async function updateMemberAction(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.member.update({ where: { id }, data: memberData(formData) });
  revalidateMemberPages();
  redirect("/admin/members");
}

export async function deleteMemberAction(id: string) {
  await requireAdmin();
  await prisma.member.delete({ where: { id } });
  revalidateMemberPages();
}
