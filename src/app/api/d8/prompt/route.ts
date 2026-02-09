export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const prompt = String((body as any)?.prompt || '');
  return new Response(JSON.stringify({
    ok: true,
    stamp: 'MEGA_BUILD_PATCH_001_20260209',
    received: prompt.slice(0, 4000),
    message: 'Prompt received. Next patch will generate patch plans + queue.',
    ts: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
}