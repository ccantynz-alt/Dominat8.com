import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limitParam = url.searchParams.get("limit") || "10";
  const limit = Math.max(1, Math.min(50, parseInt(limitParam, 10) || 10));

  const repoRoot = process.cwd();
  const logDir = path.join(repoRoot, ".d8", "logs");

  if (!fs.existsSync(logDir)) {
    return NextResponse.json({ ok: true, logs: [], message: "Log directory not found (.d8/logs)" });
  }

  const files = fs
    .readdirSync(logDir)
    .filter((f) => f.toLowerCase().endsWith(".log"))
    .map((f) => {
      const full = path.join(logDir, f);
      const st = fs.statSync(full);
      return { name: f, full, mtimeMs: st.mtimeMs, size: st.size };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, limit);

  const logs = files.map((f) => ({
    name: f.name,
    mtimeUtc: new Date(f.mtimeMs).toISOString(),
    size: f.size,
  }));

  return NextResponse.json({ ok: true, logs });
}