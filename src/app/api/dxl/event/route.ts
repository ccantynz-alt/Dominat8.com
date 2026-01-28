import { NextResponse } from "next/server";

function nowIso() {
  try { return new Date().toISOString(); } catch { return ""; }
}

function envFirst(names: string[]): string {
  for (const n of names) {
    const v = process.env[n];
    if (v && String(v).trim()) return String(v).trim();
  }
  return "";
}

function upstashConfig(): { url: string; token: string } | null {
  const url = envFirst(["KV_REST_API_URL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_API_URL"]);
  const token = envFirst(["KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN", "UPSTASH_REDIS_REST_API_TOKEN"]);
  if (!url || !token) return null;
  return { url, token };
}

async function upstashGet(key: string): Promise<string> {
  const cfg = upstashConfig();
  if (!cfg) return "";
  try {
    const res = await fetch(`${cfg.url}/get/${encodeURIComponent(key)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${cfg.token}` },
      cache: "no-store",
    });
    if (!res.ok) return "";
    const j = (await res.json()) as { result?: string | null };
    const v = j?.result;
    return v === null || v === undefined ? "" : String(v);
  } catch {
    return "";
  }
}

async function upstashSet(key: string, value: string): Promise<boolean> {
  const cfg = upstashConfig();
  if (!cfg) return false;
  try {
    const res = await fetch(`${cfg.url}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${cfg.token}` },
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

function noStore(json: any) {
  return NextResponse.json(json, {
    headers: { "cache-control": "no-store, max-age=0", "x-dxl": "DXL07_20260128" },
  });
}

function requireAdmin(req: Request): boolean {
  const expected = envFirst(["ADMIN_TOKEN"]);
  if (!expected) return false;
  const got = req.headers.get("x-admin-token") || "";
  return got === expected;
}

type DxlEvent = {
  id: string;
  at: string;        // ISO
  kind: string;      // e.g. "optimized" | "scheduled" | "published" | "bundle"
  title: string;     // short
  detail?: string;   // optional
};

function makeId(): string {
  // short-ish unique
  return Math.random().toString(36).slice(2, 10) + "_" + Date.now().toString(36);
}

const KEY = "dxl:events:latest"; // stores JSON array of events

async function readEvents(): Promise<DxlEvent[]> {
  const raw = await upstashGet(KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 20);
  } catch {
    return [];
  }
}

async function writeEvents(events: DxlEvent[]): Promise<void> {
  const cfg = upstashConfig();
  if (!cfg) return; // fallback: no persistence
  const trimmed = events.slice(0, 20);
  await upstashSet(KEY, JSON.stringify(trimmed));
}

export async function GET(req: Request) {
  // Polling endpoint: returns latest events; client will dedupe by id.
  const url = new URL(req.url);
  const since = url.searchParams.get("since") || ""; // optional last seen id
  const events = await readEvents();

  if (!since) return noStore({ ok: true, events, at: nowIso(), source: upstashConfig() ? "upstash" : "fallback" });

  const idx = events.findIndex(e => e.id === since);
  const newer = idx >= 0 ? events.slice(0, idx) : events; // events newest-first
  return noStore({ ok: true, events: newer, at: nowIso(), source: upstashConfig() ? "upstash" : "fallback" });
}

export async function POST(req: Request) {
  if (!requireAdmin(req)) return noStore({ ok: false, error: "forbidden", at: nowIso() });

  let body: any = {};
  try { body = await req.json(); } catch { body = {}; }

  const kind = typeof body?.kind === "string" ? body.kind : "optimized";
  const title = typeof body?.title === "string" ? body.title : "Optimized";
  const detail = typeof body?.detail === "string" ? body.detail : "";

  const evt: DxlEvent = {
    id: makeId(),
    at: nowIso(),
    kind,
    title,
    detail: detail || undefined,
  };

  const events = await readEvents();
  const next = [evt, ...events].slice(0, 20);
  await writeEvents(next);

  return noStore({ ok: true, event: evt, at: nowIso(), source: upstashConfig() ? "upstash" : "fallback" });
}