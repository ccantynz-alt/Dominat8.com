import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ts = url.searchParams.get("ts") || "";
  return NextResponse.json(
    {
      ok: true,
      stamp: "DXL_WHERE_LOCATOR_ALLROOTS_20260129",
      at: new Date().toISOString(),
      ts,
      path: "/api/__where__/dxl-auth-check",
      note: "Locator endpoint. If you see this JSON, the API route exists on this deploy."
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store, max-age=0",
        "x-dxl-where": "DXL_WHERE_LOCATOR_ALLROOTS_20260129",
        "x-dxl-route": "app-router"
      }
    }
  );
}