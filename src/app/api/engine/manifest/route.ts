import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ENGINE_INSTALL = "008";
const ENGINE_STAMP = "ENGINE_INSTALL_008_STAMP_2026-01-28_NZ";

function withEngineHeaders(res: NextResponse) {
  res.headers.set("x-dominat8-engine-install", ENGINE_INSTALL);
  res.headers.set("x-dominat8-engine-stamp", ENGINE_STAMP);
  return res;
}

const ENGINE_MANIFEST = {
  engine: { install: ENGINE_INSTALL, stamp: ENGINE_STAMP },
  api: {
    canonical: ["/api/probe", "/api/ping"],
    legacyBridged: ["/api/__probe__", "/api/__ping__"],
    health: ["/api/engine/health", "/api/engine/manifest"],
  },
  patching: {
    mode: "local-powershell",
    allowlist: [
      "src/app/**",
      "src/lib/**",
      "src/middleware.ts",
      "public/**",
      "package.json",
      "next.config.js",
      "vercel.json",
    ],
    denylist: [
      ".env",
      ".env.*",
      "**/*.pem",
      "**/*secret*",
      "**/*token*",
    ],
  },
} as const;

export async function GET() {
  return withEngineHeaders(NextResponse.json({ ok: true, manifest: ENGINE_MANIFEST }, { status: 200 }));
}