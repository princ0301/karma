"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Only admins can manage upcoming programs.");
  }
}

function parseDate(value: FormDataEntryValue | null, field: string) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Enter a valid ${field} date and time.`);
  }
  return date;
}

function programData(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const startsAt = parseDate(formData.get("startsAt"), "start");
  const endsAt = parseDate(formData.get("endsAt"), "end");
  const location = String(formData.get("location") || "").trim() || null;
  const image = String(formData.get("image") || "").trim() || null;
  const registrationUrl =
    String(formData.get("registrationUrl") || "").trim() || null;

  if (!title || !description || !startsAt) {
    throw new Error("Title, description, and start date are required.");
  }
  if (endsAt && endsAt < startsAt) {
    throw new Error("End time must be after the start time.");
  }
  if (image && !image.startsWith("/api/program-image?pathname=programs%2F")) {
    throw new Error("Upload a program image using the image field.");
  }
  if (registrationUrl) {
    try {
      const url = new URL(registrationUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error();
      }
    } catch {
      throw new Error("Enter a valid registration URL.");
    }
  }

  return {
    title,
    description,
    startsAt,
    endsAt,
    location,
    image,
    registrationUrl,
    published: formData.get("published") === "on",
  };
}

function revalidatePrograms() {
  revalidatePath("/programs");
  revalidatePath("/admin/programs");
}

export async function createUpcomingProgramAction(formData: FormData) {
  await requireAdmin();
  await prisma.upcomingProgram.create({ data: programData(formData) });
  revalidatePrograms();
  redirect("/admin/programs");
}

export async function updateUpcomingProgramAction(
  id: string,
  formData: FormData
) {
  await requireAdmin();
  await prisma.upcomingProgram.update({
    where: { id },
    data: programData(formData),
  });
  revalidatePrograms();
  redirect("/admin/programs");
}

export async function deleteUpcomingProgramAction(id: string) {
  await requireAdmin();
  await prisma.upcomingProgram.delete({ where: { id } });
  revalidatePrograms();
}
