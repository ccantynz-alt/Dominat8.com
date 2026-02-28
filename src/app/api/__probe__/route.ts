import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeEnv(name: string): string | null {
  try {
    // @ts-ignore
    const v = process?.env?.[name];
    return typeof v === "string" && v.length ? v : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const now = new Date().toISOString();
  const stamp =
    safeEnv("BUILD_STAMP") ||
    safeEnv("VERCEL_GIT_COMMIT_SHA") ||
    safeEnv("VERCEL_GIT_COMMIT_REF") ||
    "PROBE_NO_STAMP";

  const sha =
    safeEnv("VERCEL_GIT_COMMIT_SHA") ||
    safeEnv("GITHUB_SHA") ||
    "PROBE_NO_SHA";

  const body = {
    ok: true,
    stamp,
    sha,
    time: now,
    tag: "UPGRADE_20260201_WALKAWAY_UNBLOCK_20260201_132227"
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      pragma: "no-cache"
    }
  });
}
