/// UPGRADE_20260201_AGENT_RUN_CARDS_V1_20260201_193454
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AgentRunStatus = "queued" | "running" | "success" | "failure" | "skipped";

export type AgentRun = {
  id: string;
  agent: string;
  status: AgentRunStatus;
  summary?: string;
  detail?: string;
  createdAtIso: string;
  updatedAtIso?: string;
  meta?: Record<string, any>;
};

// Best-effort in-memory ring buffer (dev + warm serverless).
// Note: This is NOT durable across cold starts. It is intentionally minimal.
declare global {
  // eslint-disable-next-line no-var
  var __D8_AGENT_RUNS__: AgentRun[] | undefined;
}
const MAX = 50;

function getStore(): AgentRun[] {
  if (!globalThis.__D8_AGENT_RUNS__) globalThis.__D8_AGENT_RUNS__ = [];
  return globalThis.__D8_AGENT_RUNS__!;
}

function stamp(): string {
  return "D8_AGENT_RUNS_V1";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.max(1, Math.min(50, Number(url.searchParams.get("limit") || "20")));
  const store = getStore();
  const out = store.slice(-limit).reverse();
  return NextResponse.json({ ok: true, stamp: stamp(), count: store.length, runs: out });
}

export async function POST(req: Request) {
  let body: Partial<AgentRun> | null = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const now = new Date().toISOString();
  const run: AgentRun = {
    id: String(body?.id || "run_" + Math.random().toString(16).slice(2)),
    agent: String(body?.agent || "unknown"),
    status: (body?.status as any) || "running",
    summary: body?.summary ? String(body.summary) : undefined,
    detail: body?.detail ? String(body.detail) : undefined,
    createdAtIso: String(body?.createdAtIso || now),
    updatedAtIso: now,
    meta: (body?.meta && typeof body.meta === "object") ? body.meta as any : undefined,
  };

  const store = getStore();
  store.push(run);
  if (store.length > MAX) store.splice(0, store.length - MAX);

  return NextResponse.json({ ok: true, stamp: stamp(), saved: run });
}
