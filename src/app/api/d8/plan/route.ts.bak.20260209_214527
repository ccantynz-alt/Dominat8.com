export const runtime = 'nodejs';

function buildPlan(prompt: string) {
  const p = (prompt || '').trim();
  const lower = p.toLowerCase();

  const plan: Array<{ id: string; title: string; details: string; risk: 'low'|'medium'|'high' }> = [];

  plan.push({
    id: 'scan',
    title: 'Scan current repo state',
    details: 'Identify affected routes/components and confirm build health before changes.',
    risk: 'low'
  });

  // Heuristic steps
  if (lower.includes('homepage') || lower.includes('landing') || lower.includes('hero')) {
    plan.push({
      id: 'home',
      title: 'Update homepage sections',
      details: 'Adjust hero, CTAs, social proof, and structure while keeping styling consistent.',
      risk: 'medium'
    });
  }

  if (lower.includes('builder') || lower.includes('cockpit') || lower.includes('dashboard')) {
    plan.push({
      id: 'builder',
      title: 'Upgrade builder cockpit surface',
      details: 'Improve panels, state, and controls; ensure API wiring is stable.',
      risk: 'medium'
    });
  }

  if (lower.includes('api') || lower.includes('endpoint') || lower.includes('route')) {
    plan.push({
      id: 'api',
      title: 'Add/adjust API endpoints',
      details: 'Implement/modify Next.js route handlers with no-store headers and safe parsing.',
      risk: 'medium'
    });
  }

  if (lower.includes('auth') || lower.includes('login') || lower.includes('admin')) {
    plan.push({
      id: 'auth',
      title: 'Add auth/roles',
      details: 'Introduce a minimal, safe auth layer (admin/operator) with guardrails.',
      risk: 'high'
    });
  }

  plan.push({
    id: 'proof',
    title: 'Add proof tokens + smoke tests',
    details: 'Confirm stamp/health and add verification steps for repeatable deploy confidence.',
    risk: 'low'
  });

  plan.push({
    id: 'gate',
    title: 'Run gates and ship to staging',
    details: 'Run quality gates, commit changes, push branch, and verify staging URLs.',
    risk: 'low'
  });

  return plan;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const prompt = String((body as any)?.prompt || '');

  const plan = buildPlan(prompt);

  return new Response(JSON.stringify({
    ok: true,
    stamp: "MEGA_BUILD_PATCH_002_20260209",
    prompt: prompt.slice(0, 4000),
    plan,
    ts: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
}