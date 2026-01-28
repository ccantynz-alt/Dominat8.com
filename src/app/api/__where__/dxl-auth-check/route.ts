import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure we can read process.env and headers consistently

export async function GET(request: Request) {
  const url = new URL(request.url);

  const headers = request.headers;

  const pick = (name: string) => headers.get(name) ?? null;

  const data = {
    ok: true,
    stamp: "DXL_WHERE_LOCATOR_AUTHCHECK_20260129",
    at: new Date().toISOString(),
    method: "GET",
    url: url.toString(),
    pathname: url.pathname,
    host: pick("host"),
    vercel: {
      region: process.env.VERCEL_REGION ?? null,
      deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
      env: process.env.VERCEL_ENV ?? null,
      url: process.env.VERCEL_URL ?? null
    },
    headers: {
      "x-vercel-id": pick("x-vercel-id"),
      "x-vercel-ip-country": pick("x-vercel-ip-country"),
      "x-vercel-ip-city": pick("x-vercel-ip-city"),
      "x-forwarded-for": pick("x-forwarded-for"),
      "x-forwarded-proto": pick("x-forwarded-proto"),
      "user-agent": pick("user-agent"),
      "accept": pick("accept"),
      "cache-control": pick("cache-control"),
      "pragma": pick("pragma")
    }
  };

  const res = NextResponse.json(data, { status: 200 });

  // Make absolutely sure this never caches (prevents sticky cached 404/HTML)
  res.headers.set("cache-control", "no-store, max-age=0");
  res.headers.set("pragma", "no-cache");
  res.headers.set("x-dxl-where", "DXL_WHERE_LOCATOR_AUTHCHECK_20260129");

  return res;
}