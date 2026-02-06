export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  return new Response(JSON.stringify({ ok: true, repaired: true, ts: Date.now() }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}