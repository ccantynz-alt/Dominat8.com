import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { listSchedulesWithContent } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const schedules = await listSchedulesWithContent();
  return NextResponse.json({ ok: true, schedules });
}