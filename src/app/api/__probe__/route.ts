import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "dominat8.com",
      probe: "__probe__",
      ts: Date.now(),
    },
    { status: 200 }
  );
}