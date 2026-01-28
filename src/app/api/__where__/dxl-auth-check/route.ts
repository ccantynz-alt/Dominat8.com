import { NextResponse } from "next/server";

export const runtime = "nodejs"; // allow access to process.env on Vercel

function pickHeader(h: Headers, name: string): string | null {
  // Headers are case-insensitive; .get handles that
  const v = h.get(name);
  return v === null ? null : v;
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const headers = new Headers(req.headers);

  // Vercel / Next / proxy headers (best-effort; not all will always exist)
  const hdr = {
    "x-vercel-id": pickHeader(headers, "x-vercel-id"),
    "x-vercel-proxy-signature": pickHeader(headers, "x-vercel-proxy-signature"),
    "x-forwarded-for": pickHeader(headers, "x-forwarded-for"),
    "x-forwarded-proto": pickHeader(headers, "x-forwarded-proto"),
    "x-forwarded-host": pickHeader(headers, "x-forwarded-host"),
    "host": pickHeader(headers, "host"),
    "user-agent": pickHeader(headers, "user-agent"),
    "accept": pickHeader(headers, "accept"),
    "accept-encoding": pickHeader(headers, "accept-encoding"),
    "cache-control": pickHeader(headers, "cache-control"),
    "pragma": pickHeader(headers, "pragma"),
  };

  // Vercel build/runtime env vars (best-effort)
  const env = {
    VERCEL: process.env.VERCEL ?? null,
    VERCEL_ENV: process.env.VERCEL_ENV ?? null,
    VERCEL_REGION: process.env.VERCEL_REGION ?? null,
    VERCEL_URL: process.env.VERCEL_URL ?? null,

    // Git metadata (names differ depending on Vercel settings/framework)
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    VERCEL_GIT_PROVIDER: process.env.VERCEL_GIT_PROVIDER ?? null,
    VERCEL_GIT_REPO_SLUG: process.env.VERCEL_GIT_REPO_SLUG ?? null,
    VERCEL_GIT_REPO_OWNER: process.env.VERCEL_GIT_REPO_OWNER ?? null,
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    VERCEL_GIT_COMMIT_MESSAGE: process.env.VERCEL_GIT_COMMIT_MESSAGE ?? null,
  };

  // If you want to prove middleware is running, you already have X-Dominat8-Mw on HTML.
  // For API routes, middleware headers may or may not pass through depending on your setup.

  const out = {
    ok: true,
    stamp: "DXL_WHERE_RICH_LOCATOR_20260129",
    at: new Date().toISOString(),
    path: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
    env,
    headers: hdr,
    note: "Rich locator. Use this to compare LIVE deploy/git/region against local HEAD.",
  };

  return NextResponse.json(out, {
    headers: {
      "cache-control": "no-store, max-age=0",
      "x-dxl-stamp": "DXL_WHERE_RICH_LOCATOR_20260129",
    },
  });
}