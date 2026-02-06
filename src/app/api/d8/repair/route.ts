import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

function unauthorized(msg: string) {
  return NextResponse.json({ ok: false, error: "unauthorized", message: msg }, { status: 401 });
}
function badRequest(msg: string) {
  return NextResponse.json({ ok: false, error: "bad_request", message: msg }, { status: 400 });
}

async function readJson(req: Request): Promise<any> {
  try { return await req.json(); } catch { return null; }
}

function requireAdmin(req: Request) {
  const expected = process.env.D8_ADMIN_KEY || "";
  if (!expected || expected.length < 12) return { ok: false, reason: "D8_ADMIN_KEY not configured" };
  const got = req.headers.get("x-admin-key") || "";
  if (!got) return { ok: false, reason: "Missing X-Admin-Key header" };
  if (got !== expected) return { ok: false, reason: "Invalid admin key" };
  return { ok: true };
}

async function triggerRedeploy() {
  const hook = process.env.D8_VERCEL_DEPLOY_HOOK_URL || "";
  if (!hook || !hook.startsWith("https://")) {
    return { ok: false, message: "D8_VERCEL_DEPLOY_HOOK_URL not set" };
  }
  const res = await fetch(hook, { method: "POST" });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, statusText: res.statusText, responseText: (text || "").slice(0, 2000) };
}

export async function POST(req: Request) {
  const gate = requireAdmin(req);
  if (!gate.ok) return unauthorized(gate.reason);

  const payload = await readJson(req);
  if (!payload) return badRequest("Expected JSON body");

  const action = (payload.action || "").toString().toLowerCase().trim();
  if (action !== "redeploy") return badRequest("Unknown action. Supported: redeploy");

  const result = await triggerRedeploy();
  const ok = !!result?.ok;

  return NextResponse.json({
    ok,
    stamp: "D8_COM_API_20260206_185436",
    time: new Date().toISOString(),
    action,
    result
  }, { status: ok ? 200 : 502 });
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Use POST" }, { status: 405 });
}