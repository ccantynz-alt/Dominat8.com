import React from 'react';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 10px',
      borderRadius: 999,
      border: '1px solid rgba(0,0,0,0.10)',
      background: 'rgba(255,255,255,0.75)',
      fontSize: 12,
      fontWeight: 700
    }}>{children}</span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 18,
      border: '1px solid rgba(0,0,0,0.10)',
      background: 'rgba(255,255,255,0.85)',
      padding: 16
    }}>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.00))' }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.75)',
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: 'black' }} />
            <div style={{ fontWeight: 900, letterSpacing: -0.2 }}>Dominat8</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>Launch Engine</div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="#pricing" style={{ fontSize: 13, opacity: 0.8, textDecoration: 'none', color: 'black' }}>Pricing</a>
            <a href="#how" style={{ fontSize: 13, opacity: 0.8, textDecoration: 'none', color: 'black' }}>How it works</a>
            <a href="/builder" style={{
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: 999,
              background: 'black',
              color: 'white',
              fontSize: 13,
              fontWeight: 800
            }}>Launch Builder</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 650 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <Pill>AI cockpit</Pill>
              <Pill>Patch-driven shipping</Pill>
              <Pill>No-cache live preview</Pill>
            </div>

            <h1 style={{
              fontSize: 54,
              lineHeight: 1.02,
              letterSpacing: -1.2,
              margin: 0,
              fontWeight: 950
            }}>
              Build, iterate, and ship sites at insane speed.
            </h1>

            <p style={{
              marginTop: 14,
              fontSize: 18,
              lineHeight: 1.55,
              opacity: 0.78
            }}>
              Dominat8 is an execution engine: prompts → patches → deploys. A full-screen builder experience,
              with a control plane that keeps you green.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <a href="/builder" style={{
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: 14,
                background: 'black',
                color: 'white',
                fontWeight: 900
              }}>Open the Builder</a>

              <a href="#how" style={{
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.8)',
                color: 'black',
                border: '1px solid rgba(0,0,0,0.10)',
                fontWeight: 900
              }}>See how it works</a>

              <div style={{ fontSize: 12, opacity: 0.65, alignSelf: 'center' }}>
                Live: <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>/builder</span>
              </div>
            </div>
          </div>

          {/* “Monitor” mock */}
          <div style={{
            flex: '1 1 320px',
            minWidth: 320,
            borderRadius: 22,
            border: '1px solid rgba(0,0,0,0.12)',
            background: 'radial-gradient(circle at 30% 20%, rgba(0,0,0,0.10), rgba(0,0,0,0.02) 45%, rgba(255,255,255,0.75) 85%)',
            padding: 14,
            boxShadow: '0 30px 90px rgba(0,0,0,0.10)'
          }}>
            <div style={{
              borderRadius: 18,
              border: '1px solid rgba(0,0,0,0.10)',
              overflow: 'hidden',
              background: 'white'
            }}>
              <div style={{ padding: 10, borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(0,0,0,0.25)', display: 'inline-block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(0,0,0,0.18)', display: 'inline-block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(0,0,0,0.12)', display: 'inline-block' }} />
                </div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>Builder Preview</div>
              </div>

              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 900, marginBottom: 8 }}>“Make it feel like an Apple launch.”</div>
                <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.5 }}>
                  Prompt → patches → preview. Control plane keeps the system healthy.
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                  <Card title="Fast iterations">Ship improvements in minutes, not weeks.</Card>
                  <Card title="Safe guardrails">Protected paths + PR gates stop foot-guns.</Card>
                  <Card title="Always fresh">No-cache middleware for live preview fidelity.</Card>
                  <Card title="Automation ready">Nine-agent cockpit wiring is the next layer.</Card>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              <Pill>Staging → Live</Pill>
              <Pill>Watchdog</Pill>
              <Pill>Self-healing</Pill>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how" style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 16px' }}>
        <h2 style={{ margin: 0, fontSize: 28, letterSpacing: -0.4 }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 12 }}>
          <Card title="1) Prompt">Describe what you want.</Card>
          <Card title="2) Patch">The system generates safe patch scripts.</Card>
          <Card title="3) Gate">Quality checks + protected paths enforce safety.</Card>
          <Card title="4) Ship">Deploy to staging, promote to live when green.</Card>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 16px 60px' }}>
        <h2 style={{ margin: 0, fontSize: 28, letterSpacing: -0.4 }}>Pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginTop: 12 }}>
          <Card title="Starter">Launch fast. Manual promotions. Basic cockpit.</Card>
          <Card title="Pro">Automation rails + guardrails + builder workflow.</Card>
          <Card title="Elite">Full agent loop + priority iteration speed.</Card>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, opacity: 0.65 }}>
          Note: Pricing copy is placeholder — we’ll finalize it after the next builder integration pass.
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '18px 16px', background: 'rgba(255,255,255,0.75)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 900 }}>Dominat8</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>© {new Date().getFullYear()} · Built with the cockpit.</div>
        </div>
      </div>
    </div>
  );
}