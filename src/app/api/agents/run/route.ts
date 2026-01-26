import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type KVLike = {
  set: (key: string, value: any) => Promise<any>;
};

function stamp(prefix: string) {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${prefix}_${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}_${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
}

function runId() {
  // not crypto-grade, but fine for correlation ids
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function isSafeAgentId(agentId: string) {
  // allow: letters/numbers/_/-
  return /^[a-zA-Z0-9_-]+$/.test(agentId);
}

async function loadPromptMarkdown(agentId: string) {
  if (!isSafeAgentId(agentId)) {
    return { ok: false as const, status: 400, error: "Invalid agentId (allowed: letters, numbers, _ and -)." };
  }

  const agentsDir = path.join(process.cwd(), "agents");
  const mdPath = path.join(agentsDir, `${agentId}.md`);

  try {
    const promptMarkdown = await fs.readFile(mdPath, "utf8");
    return { ok: true as const, promptMarkdown, mdPath };
  } catch (e: any) {
    const code = e?.code || "READ_FAIL";
    if (code === "ENOENT") {
      return { ok: false as const, status: 404, error: `Agent prompt not found: agents/${agentId}.md`, mdPath };
    }
    return { ok: false as const, status: 500, error: `Failed to read agent prompt (${code}).`, mdPath };
  }
}

async function getKV(): Promise<KVLike | null> {
  try {
    // Dynamic import so build can still succeed even if kv is temporarily not wired
    const mod: any = await import("@vercel/kv");
    if (mod?.kv?.set) return mod.kv as KVLike;
    return null;
  } catch {
    return null;
  }
}

async function persistRun(kv: KVLike | null, projectId: string, rid: string, payload: any) {
  if (!kv) return { ok: false as const, reason: "kv_unavailable" };
  if (!projectId) return { ok: false as const, reason: "missing_projectId" };

  const base = `agentRun:project:${projectId}`;
  const keyLatest = `${base}:latest`;
  const keyById = `${base}:${rid}`;
  const keyGlobal = `agentRun:${rid}`;

  const toStore = {
    ...payload,
    persistedAt: new Date().toISOString(),
    kvKeys: { keyLatest, keyById, keyGlobal },
  };

  await kv.set(keyById, toStore);
  await kv.set(keyGlobal, toStore);
  await kv.set(keyLatest, toStore);

  return { ok: true as const, kvKeys: { keyLatest, keyById, keyGlobal } };
}

async function callOpenAIResponses(args: {
  apiKey: string;
  model: string;
  reasoningEffort: "low" | "medium" | "high";
  maxOutputTokens: number;
  instructions: string;
  input: any;
}) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      model: args.model,
      reasoning: { effort: args.reasoningEffort },
      max_output_tokens: args.maxOutputTokens,
      instructions: args.instructions,
      input: args.input,
    }),
  });

  const text = await res.text();
  let json: any = null;
  try { json = JSON.parse(text); } catch { /* ignore */ }

  if (!res.ok) {
    return {
      ok: false as const,
      status: res.status,
      error: "OpenAI request failed",
      raw: json ?? text,
    };
  }

  // Docs show `output_text` as a convenience field in examples
  const outputText = (json && typeof json.output_text === "string") ? json.output_text : null;

  return {
    ok: true as const,
    status: res.status,
    outputText,
    raw: json,
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const agentId = url.searchParams.get("agentId") || undefined;

  const base = {
    ok: true,
    mode: "real-run",
    stamp: stamp("AGENT_RUNNER_OK"),
    now: new Date().toISOString(),
    hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_MODEL || "gpt-5",
    hint: "POST with {agentId, projectId, input} to execute via OpenAI + persist to KV (if available).",
  };

  if (!agentId) {
    return NextResponse.json(base, { status: 200, headers: { "Cache-Control": "no-store" } });
  }

  const loaded = await loadPromptMarkdown(agentId);
  if (!loaded.ok) {
    return NextResponse.json(
      { ok: false, mode: "real-run", stamp: stamp("AGENT_RUNNER_FAIL"), agentId, error: loaded.error, mdPath: loaded.mdPath },
      { status: loaded.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { ...base, agentId, mdPath: loaded.mdPath, promptPreview: loaded.promptMarkdown.slice(0, 4000) },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, mode: "real-run", stamp: stamp("AGENT_RUNNER_FAIL"), error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const agentId = String(body?.agentId || "");
  const projectId = String(body?.projectId || "");
  const input = body?.input ?? null;

  if (!agentId) {
    return NextResponse.json(
      { ok: false, mode: "real-run", stamp: stamp("AGENT_RUNNER_FAIL"), error: "Missing agentId." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const loaded = await loadPromptMarkdown(agentId);
  if (!loaded.ok) {
    return NextResponse.json(
      { ok: false, mode: "real-run", stamp: stamp("AGENT_RUNNER_FAIL"), agentId, projectId, error: loaded.error, mdPath: loaded.mdPath },
      { status: loaded.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        mode: "real-run",
        stamp: stamp("AGENT_RUNNER_FAIL"),
        agentId,
        projectId,
        error: "OPENAI_API_KEY is not set on the server environment.",
        fix: "Set OPENAI_API_KEY in Vercel project env (Production), then redeploy.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-5";
  const reasoningEffort = (process.env.OPENAI_REASONING_EFFORT as any) || "low";
  const maxOutputTokensRaw = process.env.OPENAI_MAX_OUTPUT_TOKENS || "900";
  const maxOutputTokens = Math.max(64, Math.min(4000, parseInt(maxOutputTokensRaw, 10) || 900));

  const rid = runId();
  const startedAt = new Date().toISOString();

  // Input to model: we keep it simple and robust
  const modelInput = [
    {
      role: "user",
      content:
        `projectId: ${projectId || "unknown"}\n` +
        `agentId: ${agentId}\n` +
        `input:\n` +
        `${JSON.stringify(input, null, 2)}\n`,
    },
  ];

  const ai = await callOpenAIResponses({
    apiKey,
    model,
    reasoningEffort: (reasoningEffort === "high" || reasoningEffort === "medium") ? reasoningEffort : "low",
    maxOutputTokens,
    instructions: loaded.promptMarkdown,
    input: modelInput,
  });

  const finishedAt = new Date().toISOString();

  const responsePayload = {
    ok: ai.ok,
    mode: "real-run",
    stamp: stamp(ai.ok ? "AGENT_RUNNER_OK" : "AGENT_RUNNER_FAIL"),
    runId: rid,
    startedAt,
    finishedAt,
    agentId,
    projectId,
    mdPath: loaded.mdPath,
    model: { name: model, reasoningEffort, maxOutputTokens },
    input,
    outputText: ai.ok ? ai.outputText : null,
    openai: ai,
  };

  // Persist (best-effort)
  const kv = await getKV();
  let persisted: any = null;
  try {
    persisted = await persistRun(kv, projectId, rid, responsePayload);
  } catch (e: any) {
    persisted = { ok: false, reason: "kv_set_failed", error: String(e?.message || e) };
  }

  return NextResponse.json(
    { ...responsePayload, persistence: persisted },
    { status: ai.ok ? 200 : 502, headers: { "Cache-Control": "no-store" } }
  );
}
