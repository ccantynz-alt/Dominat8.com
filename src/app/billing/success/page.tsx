'use client';
import React from 'react';

export default function BillingSuccess() {
  const [sessionId, setSessionId] = React.useState<string>('');

  React.useEffect(() => {
    const u = new URL(window.location.href);
    setSessionId(u.searchParams.get('session_id') || '');
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: 18, background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.00))' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ fontWeight: 980, fontSize: 26 }}>Payment successful</div>
        <div style={{ marginTop: 10, opacity: 0.75 }}>
          You’re subscribed. Next: we connect this subscription to a user account and unlock the builder automatically.
        </div>

        <div style={{ marginTop: 14, padding: 14, borderRadius: 14, border: '1px solid rgba(0,0,0,0.10)', background: 'white' }}>
          <div style={{ fontWeight: 950 }}>Checkout Session</div>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, opacity: 0.8, marginTop: 6 }}>
            {sessionId || '(missing)'}
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="/builder" style={{ textDecoration: 'none', padding: '12px 14px', borderRadius: 12, background: 'black', color: 'white', fontWeight: 950 }}>Open Builder</a>
          <a href="/" style={{ textDecoration: 'none', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', color: 'black', fontWeight: 950 }}>Home</a>
        </div>
      </div>
    </div>
  );
}