export const runtime = 'nodejs';

export async function GET() {
  return new Response(JSON.stringify({ ok: true, stamp: 'MEGA_BUILD_PATCH_001_20260209', ts: new Date().toISOString() }), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
}