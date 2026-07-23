import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Select an image to upload." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, or WebP image." },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image must be 5 MB or smaller." },
      { status: 400 }
    );
  }

  try {
    const blob = await put(`members/${file.name}`, file, {
      access: "private",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: `/api/member-photo?pathname=${encodeURIComponent(blob.pathname)}`,
    });
  } catch (error) {
    console.error("Member photo upload error:", error);
    return NextResponse.json(
      {
        error: process.env.BLOB_READ_WRITE_TOKEN
          ? "Could not upload the image. Please try again."
          : "Image storage is not configured. Add BLOB_READ_WRITE_TOKEN to the environment.",
      },
      { status: 503 }
    );
  }
}
