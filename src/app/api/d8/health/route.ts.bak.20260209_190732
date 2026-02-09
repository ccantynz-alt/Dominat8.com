export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(JSON.stringify({
    ok: true,
    service: "dominat8.com",
    route: "/api/d8/health",
    ts: Date.now()
  }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}