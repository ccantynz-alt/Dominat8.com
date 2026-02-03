import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

type Body = { title?: string; command?: string; notes?: string; noAutoPr?: boolean };

function safeString(x: any): string {
  if (typeof x !== "string") return "";
  return x.trim();
}

export async function POST(req: Request) {
  const repoRoot = process.cwd();
  const queuePath = path.join(repoRoot, ".d8", "agent-queue.json");

  if (!fs.existsSync(queuePath)) {
    return NextResponse.json(
      { ok: false, message: "Queue file not found (.d8/agent-queue.json). Run agent baseline scripts first." },
      { status: 500 }
    );
  }

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const title = safeString(body.title);
  const command = safeString(body.command);
  const notes = safeString(body.notes);

  if (!title || !command) {
    return NextResponse.json({ ok: false, message: "title and command are required" }, { status: 400 });
  }

  // NOTE: This is local filesystem queue mode. For production, move to KV/DB.
  const id = crypto.randomBytes(16).toString("hex");
  const task = {
    id,
    title,
    command,
    notes,
    createdUtc: new Date().toISOString(),
    status: "queued",
    attempts: 0,
    noAutoPr: !!body.noAutoPr,
  };

  try {
    const raw = fs.readFileSync(queuePath, "utf8");
    const j = JSON.parse(raw);
    if (!Array.isArray(j.queue)) j.queue = [];
    j.queue.push(task);
    fs.writeFileSync(queuePath, JSON.stringify(j, null, 2), "utf8");
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message || String(e) }, { status: 500 });
  }

  return NextResponse.json({ ok: true, task });
}