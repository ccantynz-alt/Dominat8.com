import React from 'react';

export default function Billing() {
  return (
    <div style={{ minHeight: '100vh', padding: 18, background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.00))' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ fontWeight: 980, fontSize: 26 }}>Billing</div>
        <div style={{ marginTop: 8, opacity: 0.75 }}>
          Portal is wired (API). Next step is linking Stripe customerId to a logged-in user.
        </div>
        <div style={{ marginTop: 14 }}>
          <a href="/pricing" style={{ textDecoration: 'none', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.10)', background: 'white', fontWeight: 900, color: 'black' }}>Go to Pricing</a>
        </div>
      </div>
    </div>
  );
}