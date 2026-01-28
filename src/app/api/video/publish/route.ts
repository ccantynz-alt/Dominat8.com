import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kvSetJson, projectVideoKey } from "@/lib/d8kv";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return NextResponse.json({ ok: false, error: "Missing BLOB_READ_WRITE_TOKEN (required for publish)." }, { status: 200 });
    }

    const form = await req.formData();
    const projectId = String(form.get("projectId") || "").trim();
    const file = form.get("file");

    if (!projectId) return NextResponse.json({ ok: false, error: "projectId is required." }, { status: 200 });
    if (!file || !(file instanceof Blob)) return NextResponse.json({ ok: false, error: "file is required (multipart/form-data)." }, { status: 200 });

    const safeProject = projectId.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60);
    const now = new Date();
    const stamp =
      now.getUTCFullYear().toString() +
      String(now.getUTCMonth() + 1).padStart(2, "0") +
      String(now.getUTCDate()).padStart(2, "0") + "_" +
      String(now.getUTCHours()).padStart(2, "0") +
      String(now.getUTCMinutes()).padStart(2, "0") +
      String(now.getUTCSeconds()).padStart(2, "0");

    const filename = `projects/${safeProject}/video_${stamp}.webm`;

    const uploaded = await put(filename, file, {
      access: "public",
      token: blobToken,
      addRandomSuffix: false,
      contentType: "video/webm",
    });

    const meta = {
      projectId,
      url: uploaded.url,
      pathname: uploaded.pathname,
      contentType: "video/webm",
      createdAtIso: new Date().toISOString(),
      source: "video-studio",
    };

    await kvSetJson(projectVideoKey(projectId), meta);

    return NextResponse.json({ ok: true, meta });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 200 });
  }
}