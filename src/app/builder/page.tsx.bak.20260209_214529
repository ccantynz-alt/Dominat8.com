'use client';
import React from 'react';

type PlanItem = { id: string; title: string; details: string; risk: 'low'|'medium'|'high' };
type PlanResp = { ok: boolean; stamp: string; prompt?: string; plan?: PlanItem[]; ts?: string; message?: string };
type PromptResp = { ok: boolean; stamp: string; received?: string; message?: string; ts?: string };

type FeedItem = {
  id: string;
  ts: string;
  level: 'info'|'ok'|'warn'|'error';
  title: string;
  detail?: string;
};

const FEED_KEY = 'd8_builder_feed_v1';

function nowIso(){ return new Date().toISOString(); }
function uid(){ return Math.random().toString(16).slice(2) + '-' + Date.now().toString(16); }

function loadFeed(): FeedItem[] {
  try {
    const raw = localStorage.getItem(FEED_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 50);
  } catch { return []; }
}

function saveFeed(items: FeedItem[]) {
  try { localStorage.setItem(FEED_KEY, JSON.stringify(items.slice(0, 50))); } catch {}
}

function riskBadge(r: PlanItem['risk']) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.12)',
    fontSize: 12,
    fontWeight: 900
  };
  if (r === 'low') return <span style={{ ...base, background: 'rgba(0,0,0,0.04)' }}>LOW</span>;
  if (r === 'medium') return <span style={{ ...base, background: 'rgba(0,0,0,0.07)' }}>MED</span>;
  return <span style={{ ...base, background: 'rgba(0,0,0,0.10)' }}>HIGH</span>;
}

export default function Builder() {
  const [prompt, setPrompt] = React.useState('');
  const [busyPlan, setBusyPlan] = React.useState(false);
  const [busySend, setBusySend] = React.useState(false);
  const [plan, setPlan] = React.useState<PlanResp | null>(null);
  const [sendResp, setSendResp] = React.useState<PromptResp | null>(null);

  const [tab, setTab] = React.useState<'preview'|'plan'|'feed'>('preview');
  const [previewUrl, setPreviewUrl] = React.useState<string>('/');
  const [feed, setFeed] = React.useState<FeedItem[]>([]);

  // init feed from localStorage
  React.useEffect(() => {
    const f = loadFeed();
    setFeed(f);
  }, []);

  function pushFeed(item: Omit<FeedItem, 'id'|'ts'> & { ts?: string }) {
    const it: FeedItem = { id: uid(), ts: item.ts || nowIso(), level: item.level, title: item.title, detail: item.detail };
    setFeed(prev => {
      const next = [it, ...prev].slice(0, 50);
      saveFeed(next);
      return next;
    });
  }

  async function getPlan() {
    setBusyPlan(true);
    setPlan(null);
    try {
      pushFeed({ level: 'info', title: 'Planning', detail: 'Requesting patch plan…' });
      const r = await fetch('/api/d8/plan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const j = await r.json();
      setPlan(j);
      pushFeed({ level: 'ok', title: 'Plan ready', detail: 'Patch plan received.' });
      setTab('plan');
    } catch (e: any) {
      const msg = String(e?.message || e);
      setPlan({ ok: false, stamp: 'MEGA_BUILD_PATCH_002_20260209', message: msg });
      pushFeed({ level: 'error', title: 'Plan failed', detail: msg });
    } finally {
      setBusyPlan(false);
    }
  }

  async function sendPrompt() {
    setBusySend(true);
    setSendResp(null);
    try {
      pushFeed({ level: 'info', title: 'Sending', detail: 'Sending prompt to API…' });
      const r = await fetch('/api/d8/prompt', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const j = await r.json();
      setSendResp(j);
      pushFeed({ level: 'ok', title: 'Prompt accepted', detail: 'API acknowledged prompt.' });
    } catch (e: any) {
      const msg = String(e?.message || e);
      setSendResp({ ok: false, stamp: 'MEGA_BUILD_PATCH_002_20260209', message: msg });
      pushFeed({ level: 'error', title: 'Send failed', detail: msg });
    } finally {
      setBusySend(false);
    }
  }

  function clearFeed() {
    saveFeed([]);
    setFeed([]);
    pushFeed({ level: 'info', title: 'Feed cleared' });
  }

  const shell: React.CSSProperties = {
    minHeight: '100vh',
    padding: 18,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.00))'
  };

  const bar: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap'
  };

  const card: React.CSSProperties = {
    borderRadius: 18,
    border: '1px solid rgba(0,0,0,0.10)',
    background: 'white',
    padding: 16
  };

  const soft: React.CSSProperties = {
    borderRadius: 18,
    border: '1px solid rgba(0,0,0,0.10)',
    background: 'rgba(255,255,255,0.85)',
    padding: 16
  };

  const btnBase: React.CSSProperties = {
    border: 0,
    cursor: 'pointer',
    padding: '12px 14px',
    borderRadius: 12,
    fontWeight: 950
  };

  const btnBlack: React.CSSProperties = { ...btnBase, background: 'black', color: 'white' };
  const btnWhite: React.CSSProperties = { ...btnBase, background: 'white', color: 'black', border: '1px solid rgba(0,0,0,0.10)' };

  return (
    <div style={shell}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div style={bar}>
          <div>
            <div style={{ fontWeight: 980, fontSize: 22 }}>Builder</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>
              Preview + Activity + Patch Plan · <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>MEGA_BUILD_PATCH_002_20260209</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="/" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>Home</a>
            <a href="/api/d8/health" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>Health</a>
            <a href="/api/d8/stamp" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>Stamp</a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 12, marginTop: 14 }}>
          {/* Left: prompt + actions */}
          <div style={card}>
            <div style={{ fontWeight: 950, marginBottom: 8 }}>Prompt</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build next…"
              style={{ width: '100%', minHeight: 190, borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)', padding: 12, fontSize: 14 }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={getPlan}
                disabled={busyPlan || !prompt.trim()}
                style={{ ...btnBlack, opacity: (busyPlan || !prompt.trim()) ? 0.6 : 1 }}
              >
                {busyPlan ? 'Planning…' : 'Generate Patch Plan'}
              </button>

              <button
                onClick={sendPrompt}
                disabled={busySend || !prompt.trim()}
                style={{ ...btnWhite, opacity: (busySend || !prompt.trim()) ? 0.6 : 1 }}
              >
                {busySend ? 'Sending…' : 'Send Prompt'}
              </button>

              <button onClick={() => setTab('preview')} style={btnWhite}>Preview</button>
              <button onClick={() => setTab('feed')} style={btnWhite}>Activity</button>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.65 }}>
              Next Mega: patch execution queue + apply patch packs + live evidence panel.
            </div>

            {/* quick response snippets */}
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={soft}>
                <div style={{ fontWeight: 950, marginBottom: 6 }}>Last Plan</div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 11, opacity: 0.85 }}>
{plan ? JSON.stringify({ ok: plan.ok, ts: plan.ts, stamp: plan.stamp }, null, 2) : 'None yet.'}
                </pre>
              </div>

              <div style={soft}>
                <div style={{ fontWeight: 950, marginBottom: 6 }}>Last Send</div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 11, opacity: 0.85 }}>
{sendResp ? JSON.stringify({ ok: sendResp.ok, ts: sendResp.ts, stamp: sendResp.stamp }, null, 2) : 'None yet.'}
                </pre>
              </div>
            </div>
          </div>

          {/* Right: tabs */}
          <div style={card}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
              <button onClick={() => setTab('preview')} style={tab === 'preview' ? btnBlack : btnWhite}>Preview</button>
              <button onClick={() => setTab('plan')} style={tab === 'plan' ? btnBlack : btnWhite}>Patch Plan</button>
              <button onClick={() => setTab('feed')} style={tab === 'feed' ? btnBlack : btnWhite}>Activity</button>
            </div>

            {tab === 'preview' && (
              <div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
                  <input
                    value={previewUrl}
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    placeholder="/"
                    style={{ flex: '1 1 220px', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)', fontSize: 13 }}
                  />
                  <button onClick={() => setPreviewUrl('/')} style={btnWhite}>Home</button>
                  <button onClick={() => setPreviewUrl('/builder')} style={btnWhite}>Builder</button>
                  <button onClick={() => setPreviewUrl('/api/d8/stamp')} style={btnWhite}>Stamp</button>
                </div>

                <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.10)', height: 520, background: 'rgba(255,255,255,0.6)' }}>
                  <iframe
                    title="preview"
                    src={previewUrl || '/'}
                    style={{ width: '100%', height: '100%', border: 0 }}
                  />
                </div>

                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
                  Tip: use preview URL for Vercel staging domain to see changes instantly.
                </div>
              </div>
            )}

            {tab === 'plan' && (
              <div>
                {!plan && <div style={{ fontSize: 13, opacity: 0.7 }}>No plan yet. Generate one from your prompt.</div>}
                {plan && !plan.ok && (
                  <div style={{ fontSize: 13 }}>
                    <div style={{ fontWeight: 950, marginBottom: 6 }}>Plan failed</div>
                    <div style={{ opacity: 0.75 }}>{plan.message || 'Unknown error'}</div>
                  </div>
                )}
                {plan && plan.ok && (
                  <div>
                    <div style={{ fontWeight: 950, marginBottom: 8 }}>Patch Plan</div>
                    <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 10 }}>
                      {plan.ts} · {plan.stamp}
                    </div>

                    <div style={{ display: 'grid', gap: 10 }}>
                      {(plan.plan || []).map((it) => (
                        <div key={it.id} style={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.10)', padding: 12, background: 'rgba(255,255,255,0.85)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                            <div style={{ fontWeight: 950 }}>{it.title}</div>
                            {riskBadge(it.risk)}
                          </div>
                          <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5, marginTop: 6 }}>
                            {it.details}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
                      Next step: Mega #3 will turn this plan into queued patch packs + apply flow.
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'feed' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontWeight: 950 }}>Activity Feed</div>
                  <button onClick={clearFeed} style={btnWhite}>Clear</button>
                </div>

                {feed.length === 0 && <div style={{ fontSize: 13, opacity: 0.7 }}>No activity yet.</div>}

                <div style={{ display: 'grid', gap: 10 }}>
                  {feed.map((f) => (
                    <div key={f.id} style={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.10)', padding: 12, background: 'rgba(255,255,255,0.85)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ fontWeight: 950 }}>
                          {f.level.toUpperCase()} · {f.title}
                        </div>
                        <div style={{ fontSize: 12, opacity: 0.65 }}>{f.ts}</div>
                      </div>
                      {f.detail && <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6, lineHeight: 1.5 }}>{f.detail}</div>}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
                  Stored locally in your browser. This becomes the cockpit timeline.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}