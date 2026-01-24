export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const host = req.headers.get("host") || null;

  const gitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_REF || // fallback (branch/ref)
    null;

  const vercelEnv = process.env.VERCEL_ENV || null;
  const vercelUrl = process.env.VERCEL_URL || null;

  const body = {
    ok: true,
    nowIso: new Date().toISOString(),
    host,
    url: url.toString(),
    vercelEnv,
    vercelUrl,
    gitSha,
    gitShaShort: gitSha ? String(gitSha).slice(0, 8) : null,
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}