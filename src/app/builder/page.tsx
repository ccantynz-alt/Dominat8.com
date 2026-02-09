import React from 'react';

type PromptResp = {
  ok: boolean;
  stamp: string;
  received?: string;
  message?: string;
  ts?: string;
};

export default function Builder() {
  const [prompt, setPrompt] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [resp, setResp] = React.useState<PromptResp | null>(null);

  async function send() {
    setBusy(true);
    setResp(null);
    try {
      const r = await fetch('/api/d8/prompt', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const j = await r.json();
      setResp(j);
    } catch (e: any) {
      setResp({ ok: false, stamp: 'MEGA_BUILD_PATCH_001_20260209', message: String(e?.message || e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: 18, background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.00))' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 980, fontSize: 22 }}>Builder</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Wired to <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>/api/d8/prompt</span></div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="/" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>
              Home
            </a>
            <a href="/api/d8/health" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>
              Health
            </a>
            <a href="/api/d8/stamp" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>
              Stamp
            </a>
          </div>
        </div>

        <div style={{ marginTop: 14, borderRadius: 18, border: '1px solid rgba(0,0,0,0.10)', background: 'white', padding: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Prompt</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to build next..."
            style={{ width: '100%', minHeight: 170, borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)', padding: 12, fontSize: 14 }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={send}
              disabled={busy || !prompt.trim()}
              style={{
                border: 0,
                cursor: busy ? 'not-allowed' : 'pointer',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'black',
                color: 'white',
                fontWeight: 950
              }}
            >
              {busy ? 'Sending…' : 'Send'}
            </button>
            <div style={{ fontSize: 12, opacity: 0.65 }}>
              Proof token: <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>MEGA_BUILD_PATCH_001_20260209</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, borderRadius: 18, border: '1px solid rgba(0,0,0,0.10)', background: 'rgba(255,255,255,0.85)', padding: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Response</div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 12, opacity: 0.85 }}>
{resp ? JSON.stringify(resp, null, 2) : 'No response yet.'}
          </pre>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.65 }}>
          Next Mega Patch: preview panel + patch execution queue + activity feed.
        </div>
      </div>
    </div>
  );
}