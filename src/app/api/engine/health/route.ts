//
// ENGINE0083F_SELF_CONTAINED_OK_20260129_060333
//
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ENGINE_INSTALL = "008";
const ENGINE_STAMP = "ENGINE_INSTALL_008_STAMP_2026-01-28_NZ";

function withEngineHeaders(res: NextResponse) {
  res.headers.set("x-dominat8-engine-install", ENGINE_INSTALL);
  res.headers.set("x-dominat8-engine-stamp", ENGINE_STAMP);
  res.headers.set("x-dominat8-engine-proof", "ENGINE0083F_SELF_CONTAINED_OK_20260129_060333");
  return res;
}

function pickEnv() {
  const keys = [
    "VERCEL",
    "VERCEL_ENV",
    "VERCEL_REGION",
    "VERCEL_URL",
    "VERCEL_DEPLOYMENT_ID",
    "VERCEL_GIT_PROVIDER",
    "VERCEL_GIT_REPO_SLUG",
    "VERCEL_GIT_COMMIT_SHA",
    "VERCEL_GIT_COMMIT_REF",
  ] as const;

  const out: Record<string, string | null> = {};
  for (const k of keys) out[k] = process.env[k] ?? null;
  return out;
}

export async function GET() {
  const body = {
    ok: true,
    engine: {
      install: ENGINE_INSTALL,
      stamp: ENGINE_STAMP,
      proof: "ENGINE0083F_SELF_CONTAINED_OK_20260129_060333",
      nowIso: new Date().toISOString(),
      node: process.version,
    },
    env: pickEnv(),
  };

  return withEngineHeaders(NextResponse.json(body, { status: 200 }));
}