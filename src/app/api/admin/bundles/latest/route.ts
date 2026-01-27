import { NextRequest, NextResponse } from "next/server";
import { ADMIN_DEFAULT_PROJECT_ID, getLatestBundleKv } from "@/lib/admin/kvAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const projectId = (url.searchParams.get("projectId") || ADMIN_DEFAULT_PROJECT_ID).toString();

  const latest = await getLatestBundleKv(projectId);

  return NextResponse.json({
    ok: true,
    projectId,
    latest,
  });
}