import { NextRequest, NextResponse } from "next/server";
import { ADMIN_DEFAULT_PROJECT_ID, getBundlePatchTextKv } from "@/lib/admin/kvAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const projectId = (url.searchParams.get("projectId") || ADMIN_DEFAULT_PROJECT_ID).toString();
  const runId = (url.searchParams.get("runId") || "").toString();

  const text = await getBundlePatchTextKv(projectId, runId);

  if (!text) {
    return NextResponse.json({ ok: false, error: "patch_not_found", projectId, runId }, { status: 404 });
  }

  // Return as downloadable PowerShell text
  return new NextResponse(text, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "content-disposition": `attachment; filename="BUNDLE_PATCH_${projectId}_${runId}.ps1"`,
      "cache-control": "no-store",
    },
  });
}