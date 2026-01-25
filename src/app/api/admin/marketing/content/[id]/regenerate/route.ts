import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/marketingMachine/adminAuth";
import { regenerateContent } from "@/lib/marketingMachine/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.reason }, { status: 401 });

  const id = String(ctx.params.id || "");
  const body = await req.json().catch(() => ({} as any));
  const mode = String(body.mode || "all");
  if (!["hooks","all"].includes(mode)) {
    return NextResponse.json({ ok: false, error: "mode must be hooks|all" }, { status: 400 });
  }

  const r = await regenerateContent(id, mode as any);
  if (!r.ok) return NextResponse.json({ ok: false, error: r.error || "Regenerate failed" }, { status: 400 });

  return NextResponse.json({ ok: true, content: r.content, complianceWarnings: r.complianceWarnings || [] });
}