import { NextResponse } from "next/server";

function nowIso() {
  try { return new Date().toISOString(); } catch { return ""; }
}

type ActivityResponse = {
  ok: boolean;
  active: boolean;
  stamp: string;
  at: string;
};

async function readKvActive(): Promise<{ active: boolean; stamp: string }> {
  // This is intentionally defensive.
  // If Upstash/Vercel KV isn't available in this project, we just return inactive.
  // Keys:
  //   dxl:activity:active -> "1" or "0"
  //   dxl:activity:stamp  -> string
  try {
    // If you already have a KV helper in your codebase, you can swap this later.
    // We try a dynamic import to avoid hard dependency / build break.
    const mod: any = await import("@/lib/kv");
    const kvGet = mod?.kvGet || mod?.get || mod?.default?.get;
    if (!kvGet) return { active: false, stamp: "" };

    const activeRaw = await kvGet("dxl:activity:active");
    const stampRaw = await kvGet("dxl:activity:stamp");

    const active = String(activeRaw || "") === "1";
    const stamp = String(stampRaw || "");
    return { active, stamp };
  } catch {
    return { active: false, stamp: "" };
  }
}

export async function GET() {
  const { active, stamp } = await readKvActive();

  const payload: ActivityResponse = {
    ok: true,
    active: !!active,
    stamp: stamp || "",
    at: nowIso(),
  };

  return NextResponse.json(payload, {
    headers: {
      "cache-control": "no-store, max-age=0",
      "x-dxl": "DXL05_20260128",
    },
  });
}