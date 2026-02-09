import React from 'react';

export default function BillingCancel() {
  return (
    <div style={{ minHeight: '100vh', padding: 18, background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.00))' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ fontWeight: 980, fontSize: 26 }}>Checkout canceled</div>
        <div style={{ marginTop: 10, opacity: 0.75 }}>No worries — you can try again anytime.</div>
        <div style={{ marginTop: 14 }}>
          <a href="/pricing" style={{ textDecoration: 'none', padding: '12px 14px', borderRadius: 12, background: 'black', color: 'white', fontWeight: 950 }}>Back to Pricing</a>
        </div>
      </div>
    </div>
  );
}