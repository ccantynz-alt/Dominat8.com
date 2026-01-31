export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const now = new Date();
  const body = {
    ok: true,
    project: "dominat8.io",
    stamp: "D8_PROBE_" + now.toISOString(),
    path: url.pathname,
    ts: url.searchParams.get("ts") || "",
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-d8-probe": "D8_PROBE_OK"
    }
  });
}