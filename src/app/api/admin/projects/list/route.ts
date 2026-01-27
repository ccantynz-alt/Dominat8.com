import { NextRequest, NextResponse } from "next/server";
import { listProjectsKv } from "@/lib/admin/kvAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "30", 10) || 30));

  const items = await listProjectsKv(limit);

  return NextResponse.json({
    ok: true,
    limit,
    count: items.length,
    items,
  });
}