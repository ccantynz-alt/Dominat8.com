import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function stamp() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `AGENT_RUNNER_OK_${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}_${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const agentId = url.searchParams.get("agentId") || undefined;

  const base = {
    ok: true,
    mode: "dry-run",
    stamp: stamp(),
    hint: "POST with {agentId, projectId, input} to load /agents/<agentId>.md (dry-run only).",
    now: new Date().toISOString(),
  };

  if (!agentId) {
    return NextResponse.json(base, { status: 200, headers: { "Cache-Control": "no-store" } });
  }

  const loaded = await loadPromptMarkdown(agentId);
  if (!loaded.ok) {
    return NextResponse.json(
      { ok: false, mode: "dry-run", stamp: stamp(), agentId, error: loaded.error, mdPath: loaded.mdPath },
      { status: loaded.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { ...base, agentId, mdPath: loaded.mdPath, promptMarkdown: loaded.promptMarkdown },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  let body: any = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, mode: "dry-run", stamp: stamp(), error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const agentId = String(body?.agentId || "");
  const projectId = String(body?.projectId || "");
  const input = body?.input ?? null;

  if (!agentId) {
    return NextResponse.json(
      { ok: false, mode: "dry-run", stamp: stamp(), error: "Missing agentId." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const loaded = await loadPromptMarkdown(agentId);
  if (!loaded.ok) {
    return NextResponse.json(
      { ok: false, mode: "dry-run", stamp: stamp(), agentId, projectId, error: loaded.error, mdPath: loaded.mdPath },
      { status: loaded.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      mode: "dry-run",
      stamp: stamp(),
      agentId,
      projectId,
      input,
      mdPath: loaded.mdPath,
      promptMarkdown: loaded.promptMarkdown,
      next: "Wire LLM execution + KV persistence in Install A+ (real run).",
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
