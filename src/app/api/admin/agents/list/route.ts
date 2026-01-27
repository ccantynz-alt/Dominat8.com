import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function safeReadAgentsDir(): { ok: boolean; agents: any[]; error?: string } {
  try {
    const cwd = process.cwd();
    const agentsDir = path.join(cwd, "agents");
    if (!fs.existsSync(agentsDir)) {
      return { ok: true, agents: [] };
    }
    const files = fs
      .readdirSync(agentsDir)
      .filter((f) => f.toLowerCase().endsWith(".md"))
      .sort();

    const agents = files.map((f) => {
      const full = path.join(agentsDir, f);
      const id = f.replace(/\.md$/i, "");
      let title = id;
      try {
        const head = fs.readFileSync(full, "utf8").slice(0, 400);
        const m = head.match(/^\s*#\s+(.+)\s*$/m);
        if (m && m[1]) title = m[1].trim();
      } catch {}
      return { id, title, file: `agents/${f}` };
    });

    return { ok: true, agents };
  } catch (e: any) {
    return { ok: false, agents: [], error: String(e?.message || e) };
  }
}

export async function GET() {
  const res = safeReadAgentsDir();
  return NextResponse.json(res, { status: res.ok ? 200 : 500 });
}
