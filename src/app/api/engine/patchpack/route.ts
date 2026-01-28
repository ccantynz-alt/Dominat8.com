// ENGINE_INSTALL_010 — Patch Pack Store (KV)
// Route: /api/engine/patchpack
//
// Behavior:
//  - GET  /api/engine/patchpack?projectId=...&runId=...
//  - GET  /api/engine/patchpack?projectId=...&latest=1
//  - POST /api/engine/patchpack  { projectId, runId, script, who?, summary?, filesChanged?, meta? }
//
// Storage:
//  - Always: in-memory fallback (dev)
//  - KV (Upstash REST): if KV_REST_API_URL + KV_REST_API_TOKEN exist
// Keys:
//  - engine:patchpack:<projectId>:<runId>         (full patchpack record)
//  - engine:patchpack:latest:<projectId>          (pointer to latest runId)

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ENGINE_INSTALL = "010";
const ENGINE_STAMP = "ENGINE_INSTALL_010_STAMP_2026-01-29_NZ";
const ENGINE_PROOF_PREFIX = "ENGINE_INSTALL_010_PATCHPACK_TS_OK_";

type PatchPackRecord = {
  projectId: string;
  runId: string;
  script: string; // PowerShell patch script text
  who?: string;
  summary?: string;
  filesChanged?: string[];
  meta?: Record<string, any>;
  createdAt: string; // ISO
};

const mem = new Map<string, PatchPackRecord>(); // key = `${projectId}:${runId}`
const memLatest = new Map<string, string>(); // projectId -> runId

function engineHeaders(ts: string) {
  return {
    "x-dominat8-engine-install": ENGINE_INSTALL,
    "x-dominat8-engine-stamp": ENGINE_STAMP,
    "x-dominat8-engine-proof": `${ENGINE_PROOF_PREFIX}${ts}`,
  } as Record<string, string>;
}

function kvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function requireAdmin(req: NextRequest) {
  const token = process.env.ENGINE_ADMIN_TOKEN;
  if (!token) return; // optional
  const got = req.headers.get("x-engine-admin-token") || "";
  if (got !== token) {
    const ts = `${Date.now()}`;
    return NextResponse.json(
      {
        ok: false,
        error: "unauthorized",
        hint: "Missing/invalid x-engine-admin-token",
      },
      { status: 401, headers: engineHeaders(ts) }
    );
  }
}

async function kvFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.KV_REST_API_URL!;
  const token = process.env.KV_REST_API_TOKEN!;
  const url = base.replace(/\/$/, "") + path;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }

  if (!res.ok) {
    const msg = (json && (json.error || json.message)) ? (json.error || json.message) : `KV HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json as T;
}

function keyPack(projectId: string, runId: string) {
  return `engine:patchpack:${projectId}:${runId}`;
}

function keyLatest(projectId: string) {
  return `engine:patchpack:latest:${projectId}`;
}

async function kvSetJson(key: string, value: any) {
  // Upstash REST: /set/<key> with JSON-encoded value in body, or /set/<key>/<value>
  // Safer: /set/<key> with {"value": "..."} is not universal. Common approach: /set/<key>/<value> where value is encoded.
  // We'll use /set/<key> with body as raw JSON string via /set/<key>/<encoded>.
  const encoded = encodeURIComponent(JSON.stringify(value));
  await kvFetch(`/set/${encodeURIComponent(key)}/${encoded}`, { method: "POST" });
}

async function kvGetJson<T>(key: string): Promise<T | null> {
  const out = await kvFetch<{ result: any }>(`/get/${encodeURIComponent(key)}`, { method: "GET" });
  if (!out || typeof out !== "object") return null;
  const v = (out as any).result;
  if (v === null || v === undefined) return null;
  // Upstash returns the decoded string (it may already be an object if Upstash parses; usually it's string)
  if (typeof v === "string") {
    try { return JSON.parse(v) as T; } catch { return null; }
  }
  return v as T;
}

export async function GET(req: NextRequest) {
  const ts = `${Date.now()}`;
  const url = new URL(req.url);

  const projectId = (url.searchParams.get("projectId") || "").trim();
  const runId = (url.searchParams.get("runId") || "").trim();
  const latest = (url.searchParams.get("latest") || "").trim();

  if (!projectId) {
    return NextResponse.json(
      { ok: false, error: "missing_projectId" },
      { status: 400, headers: engineHeaders(ts) }
    );
  }

  const useKv = kvConfigured();

  try {
    let effectiveRunId = runId;

    if (!effectiveRunId && latest === "1") {
      if (useKv) {
        const p = await kvGetJson<{ runId: string }>(keyLatest(projectId));
        effectiveRunId = (p && p.runId) ? p.runId : "";
      } else {
        effectiveRunId = memLatest.get(projectId) || "";
      }
    }

    if (!effectiveRunId) {
      return NextResponse.json(
        {
          ok: true,
          found: false,
          kvConfigured: useKv,
          projectId,
          runId: null,
          record: null,
        },
        { status: 200, headers: engineHeaders(ts) }
      );
    }

    const memKey = `${projectId}:${effectiveRunId}`;

    let record: PatchPackRecord | null = null;

    if (useKv) {
      record = await kvGetJson<PatchPackRecord>(keyPack(projectId, effectiveRunId));
    } else {
      record = mem.get(memKey) || null;
    }

    if (!record) {
      return NextResponse.json(
        {
          ok: true,
          found: false,
          kvConfigured: useKv,
          projectId,
          runId: effectiveRunId,
          record: null,
        },
        { status: 200, headers: engineHeaders(ts) }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        found: true,
        kvConfigured: useKv,
        projectId,
        runId: record.runId,
        record,
      },
      { status: 200, headers: engineHeaders(ts) }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: "get_failed",
        message: e?.message || String(e),
        kvConfigured: useKv,
      },
      { status: 500, headers: engineHeaders(ts) }
    );
  }
}

export async function POST(req: NextRequest) {
  const authFail = requireAdmin(req);
  if (authFail) return authFail;

  const ts = `${Date.now()}`;
  const useKv = kvConfigured();

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400, headers: engineHeaders(ts) }
    );
  }

  const projectId = (body?.projectId || "").toString().trim();
  const runId = (body?.runId || "").toString().trim();
  const script = (body?.script || "").toString();

  if (!projectId || !runId || !script) {
    return NextResponse.json(
      {
        ok: false,
        error: "missing_fields",
        need: ["projectId", "runId", "script"],
      },
      { status: 400, headers: engineHeaders(ts) }
    );
  }

  const record: PatchPackRecord = {
    projectId,
    runId,
    script,
    who: body?.who ? String(body.who) : undefined,
    summary: body?.summary ? String(body.summary) : undefined,
    filesChanged: Array.isArray(body?.filesChanged) ? body.filesChanged.map((x: any) => String(x)) : undefined,
    meta: (body?.meta && typeof body.meta === "object") ? body.meta : undefined,
    createdAt: new Date().toISOString(),
  };

  // Always store in memory (dev fallback)
  mem.set(`${projectId}:${runId}`, record);
  memLatest.set(projectId, runId);

  try {
    if (useKv) {
      await kvSetJson(keyPack(projectId, runId), record);
      await kvSetJson(keyLatest(projectId), { runId, updatedAt: new Date().toISOString() });
    }

    return NextResponse.json(
      {
        ok: true,
        kvConfigured: useKv,
        stored: {
          mem: true,
          kv: useKv,
        },
        projectId,
        runId,
      },
      { status: 200, headers: engineHeaders(ts) }
    );
  } catch (e: any) {
    // Even if KV fails, memory has it — return 200 with kv error details so caller knows.
    return NextResponse.json(
      {
        ok: true,
        kvConfigured: useKv,
        stored: {
          mem: true,
          kv: false,
        },
        kvError: e?.message || String(e),
        projectId,
        runId,
      },
      { status: 200, headers: engineHeaders(ts) }
    );
  }
}