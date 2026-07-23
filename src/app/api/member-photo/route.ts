import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pathname = new URL(request.url).searchParams.get("pathname");

  if (!pathname?.startsWith("members/") || pathname.includes("..")) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  try {
    const result = await get(pathname, {
      access: "private",
      ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
    });

    if (!result) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    if (result.statusCode === 304) {
      return new Response(null, {
        status: 304,
        headers: {
          ETag: result.blob.etag,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType,
        "X-Content-Type-Options": "nosniff",
        ETag: result.blob.etag,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Member photo retrieval error:", error);
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
