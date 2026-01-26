import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RunReq = {
  agentId: string;              // e.g. "02_creative_director" or "02_creative_director.md"
  projectId?: string;
  input?: unknown;
};

function normalizeAgentId(agentId: string): string {
  const a = (agentId || "").trim();
  if (!a) return "";
  // strip any directory traversal + normalize extension
  const base = path.basename(a);
  return base.toLowerCase().endsWith(".md") ? base : `${base}.md`;
}

async function readAgentMarkdown(agentFile: string): Promise<{ ok: boolean; file?: string; markdown?: string; error?: string }> {
  try {
    const agentsDir = path.join(process.cwd(), "agents");
    const full = path.join(agentsDir, agentFile);
    const md = await fs.readFile(full, "utf8");
    return { ok: true, file: agentFile, markdown: md };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Failed to read agent file" };
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "agents-runner",
    mode: "dry-run",
    routes: {
      run: { method: "POST", path: "/api/agents/run" }
    },
    hint: "POST JSON: { agentId, projectId?, input? }",
    stamp: `AGENT_RUNNER_OK_${new Date().toISOString()}`
  });
}

export async function POST(req: Request) {
  let body: RunReq | null = null;

  try {
    body = (await req.json()) as RunReq;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const agentFile = normalizeAgentId(body?.agentId || "");
  if (!agentFile) {
    return NextResponse.json({ ok: false, error: "Missing agentId" }, { status: 400 });
  }

  const agent = await readAgentMarkdown(agentFile);
  if (!agent.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Agent file not found/readable",
        details: agent.error,
        expectedPath: `agents/${agentFile}`
      },
      { status: 404 }
    );
  }

  // DRY-RUN: we are not calling an LLM yet.
  // This endpoint proves wiring: load agent prompt + return a structured “would-run” payload.
  const runId = `run_${Date.now()}`;

  const response = {
    ok: true,
    mode: "dry-run",
    runId,
    projectId: body?.projectId || null,
    agentId: body?.agentId || null,
    agentFile: agent.file,
    promptMarkdown: agent.markdown,
    input: body?.input ?? null,
    result: {
      summary: "DRY_RUN_ONLY — LLM execution not enabled yet. Next step: add provider key + call model.",
      next: [
        "Add OPENAI_API_KEY (or your LLM provider key) to Vercel env + local env",
        "Implement model call in /api/agents/run",
        "Persist outputs to KV (agent:<projectId>:<agentId>:latest)"
      ]
    },
    stamp: `AGENT_RUNNER_DRY_${new Date().toISOString()}`
  };

  return NextResponse.json(response, { status: 200 });
}