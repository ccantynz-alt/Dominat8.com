"use client";

import React, { useEffect, useMemo, useState } from "react";

type FAQ = { q: string; a: string };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function useCountUp(target: number, active: boolean, ms: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    function tick(t: number) {
      const p = clamp((t - start) / ms, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, ms]);
  return v;
}

export default function HomeClient() {
  const stamp = useMemo(() => new Date().toISOString(), []);
  const [probeOk, setProbeOk] = useState<null | boolean>(null);

  // Trust probe: no-store
  useEffect(() => {
    const url = `/api/__probe__?ts=${Date.now()}`;
    fetch(url, { cache: "no-store" })
      .then((r) => setProbeOk(r.ok))
      .catch(() => setProbeOk(false));
  }, []);

  // Count-up when hero is visible (simple: trigger after mount)
  const [countsOn, setCountsOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCountsOn(true), 250);
    return () => clearTimeout(t);
  }, []);

  const sites = useCountUp(1240, countsOn, 900);
  const minutes = useCountUp(2.4, countsOn, 900);
  const seo = useCountUp(98, countsOn, 1000);

  const trustMode =
    probeOk === null
      ? "Verifying live route…"
      : probeOk
      ? "LIVE_OK • no-store probe confirmed"
      : "WARN • probe failed (still may be live)";

  const faqs: FAQ[] = useMemo(
    () => [
      {
        q: "Why does this look different (and better) than before?",
        a: "This homepage is fully self-contained and does not depend on Tailwind being wired correctly. It uses its own CSS, so it won’t render “broken” due to missing class styling.",
      },
      {
        q: "How do I know I’m seeing the deployed version?",
        a: "You’ll see ROUTE_PROOF + HOME_STAMP. Also, the probe request uses cache: no-store. Add ?ts=123 to force a fresh fetch any time.",
      },
      {
        q: "Is Dominat8 a template generator?",
        a: "No — it’s a structured website automation builder: brand → layout rhythm → pages → SEO + sitemap → publish proof. Templates are optional starting points.",
      },
      {
        q: "Can I use my own domain?",
        a: "Yes. This UI is built to support your Domain Wizard + verification + publish workflows.",
      },
    ],
    []
  );

  const [openFAQ, setOpenFAQ] = useState<number>(0);

  return (
    <>
      {/* Self-contained CSS — does not rely on Tailwind */}
      <style>{`
        :root{
          --bg0:#f7f8fb;
          --bg1:#ffffff;
          --ink:#0b1220;
          --muted:#5a667a;
          --muted2:#74829a;
          --line:rgba(10,20,40,.10);
          --shadow: 0 24px 70px rgba(16,24,40,.12);
          --shadow2: 0 10px 30px rgba(16,24,40,.10);
          --brandA:#1aa7ff;
          --brandB:#7c3aed;
          --brandC:#22c55e;
          --ring: 0 0 0 6px rgba(26,167,255,.12);
          --radius: 18px;
          --radius2: 24px;
          --max: 1120px;
        }
        .wrap{
          background: radial-gradient(1200px 600px at 20% -10%, rgba(26,167,255,.20), transparent 60%),
                      radial-gradient(900px 520px at 80% 0%, rgba(124,58,237,.18), transparent 60%),
                      radial-gradient(900px 520px at 70% 90%, rgba(34,197,94,.10), transparent 65%),
                      linear-gradient(180deg, var(--bg0), #fff 40%, #fff);
          color: var(--ink);
          min-height: 100vh;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }
        .container{
          width: min(var(--max), calc(100% - 32px));
          margin: 0 auto;
        }
        .topbar{
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(14px);
          background: rgba(247,248,251,.72);
          border-bottom: 1px solid rgba(10,20,40,.08);
        }
        .nav{
          display:flex; align-items:center; justify-content:space-between;
          padding: 14px 0;
          gap: 12px;
        }
        .brand{
          display:flex; align-items:center; gap: 10px; min-width: 220px;
          text-decoration:none; color: var(--ink);
        }
        .logo{
          width: 40px; height: 40px; border-radius: 14px;
          background: linear-gradient(120deg, var(--brandA), var(--brandB), var(--brandC));
          box-shadow: var(--shadow2);
        }
        .brandTitle{ font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
        .brandSub{ font-size: 12px; color: var(--muted2); margin-top: 2px; }
        .links{ display:none; gap: 22px; color: var(--muted); font-weight: 600; font-size: 14px; }
        .links a{ color: inherit; text-decoration:none; }
        .links a:hover{ color: var(--ink); }
        .actions{ display:flex; align-items:center; gap: 10px; }
        .btn{
          display:inline-flex; align-items:center; justify-content:center;
          height: 42px; padding: 0 16px;
          border-radius: 14px;
          font-weight: 800;
          text-decoration:none;
          border: 1px solid rgba(10,20,40,.12);
          background: rgba(255,255,255,.8);
          color: var(--ink);
          box-shadow: 0 10px 26px rgba(16,24,40,.10);
        }
        .btn:hover{ box-shadow: 0 14px 34px rgba(16,24,40,.14); }
        .btnPrimary{
          border: none;
          background: linear-gradient(90deg, var(--brandA), var(--brandB), var(--brandC));
          color: #081018;
          box-shadow: 0 18px 50px rgba(26,167,255,.22);
        }
        .btnPrimary:hover{ box-shadow: 0 22px 60px rgba(26,167,255,.28); }
        .hero{
          padding: 56px 0 24px;
        }
        .heroGrid{
          display:grid; gap: 22px;
          grid-template-columns: 1fr;
          align-items: stretch;
        }
        .badgeRow{ display:flex; flex-wrap:wrap; gap: 10px; align-items:center; }
        .badge{
          display:inline-flex; align-items:center; gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,.85);
          border: 1px solid rgba(10,20,40,.10);
          box-shadow: 0 10px 22px rgba(16,24,40,.08);
          font-size: 12px; font-weight: 800; color: rgba(10,20,40,.75);
        }
        .dot{ width: 8px; height: 8px; border-radius: 999px; background: rgba(34,197,94,.9); box-shadow: 0 0 0 5px rgba(34,197,94,.12); }
        .stamp{ font-size: 12px; color: var(--muted2); }
        .h1{
          margin: 14px 0 0;
          font-size: 44px;
          line-height: 1.04;
          letter-spacing: -0.04em;
          font-weight: 900;
        }
        .grad{
          background: linear-gradient(90deg, var(--brandA), var(--brandB), var(--brandC));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .lead{
          margin: 14px 0 0;
          font-size: 18px;
          line-height: 1.55;
          color: var(--muted);
          max-width: 56ch;
        }
        .ctaRow{
          margin-top: 18px;
          display:flex; flex-wrap:wrap; gap: 10px; align-items:center;
        }
        .trust{
          margin-top: 16px;
          padding: 14px 14px;
          border-radius: var(--radius);
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(10,20,40,.10);
          box-shadow: var(--shadow2);
          display:flex; justify-content:space-between; gap: 10px; flex-wrap:wrap;
        }
        .trustLeft{ display:flex; align-items:center; gap: 10px; font-weight: 800; color: rgba(10,20,40,.78); }
        .trustPill{
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(10,20,40,.04);
          color: rgba(10,20,40,.72);
        }
        .panel{
          border-radius: var(--radius2);
          background: rgba(255,255,255,.92);
          border: 1px solid rgba(10,20,40,.10);
          box-shadow: var(--shadow);
          overflow:hidden;
        }
        .panelHead{
          padding: 16px 16px 0;
          display:flex; align-items:center; justify-content:space-between; gap: 10px;
        }
        .panelTitle{ font-weight: 900; letter-spacing: -0.02em; }
        .panelTag{
          font-size: 11px; font-weight: 900; color: rgba(10,20,40,.7);
          border: 1px solid rgba(10,20,40,.12);
          background: rgba(10,20,40,.04);
          padding: 4px 10px; border-radius: 999px;
        }
        .panelBody{ padding: 14px 16px 16px; }
        .steps{ display:grid; gap: 10px; margin-top: 10px; }
        .step{
          border-radius: 16px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(10,20,40,.02);
          padding: 12px;
        }
        .stepTop{ display:flex; justify-content:space-between; gap: 10px; align-items:flex-start; }
        .stepName{ font-weight: 900; font-size: 13px; }
        .stepState{
          font-size: 11px; font-weight: 900;
          padding: 4px 10px; border-radius: 999px;
          border: 1px solid rgba(10,20,40,.12);
          background: rgba(255,255,255,.7);
          color: rgba(10,20,40,.72);
        }
        .stepDesc{ margin-top: 6px; font-size: 13px; color: var(--muted); line-height: 1.45; }
        .kpiRow{
          margin-top: 14px;
          display:grid; grid-template-columns: 1fr; gap: 10px;
        }
        .kpi{
          border-radius: 16px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(255,255,255,.80);
          padding: 12px;
          box-shadow: 0 10px 24px rgba(16,24,40,.08);
        }
        .kpiVal{ font-weight: 950; font-size: 20px; letter-spacing: -0.02em; }
        .kpiKey{ margin-top: 4px; font-size: 11px; font-weight: 900; color: rgba(10,20,40,.65); text-transform: uppercase; letter-spacing: .18em; }
        .kpiHint{ margin-top: 6px; font-size: 13px; color: var(--muted); line-height: 1.45; }

        .section{ padding: 44px 0; }
        .secHead{ display:flex; flex-direction:column; gap: 10px; }
        .kicker{ font-size: 12px; font-weight: 900; letter-spacing: .24em; text-transform: uppercase; color: rgba(10,20,40,.55); }
        .h2{ font-size: 32px; font-weight: 950; letter-spacing: -0.03em; margin: 0; }
        .p{ color: var(--muted); font-size: 16px; line-height: 1.6; margin: 0; max-width: 70ch; }
        .tiles{ margin-top: 18px; display:grid; gap: 12px; grid-template-columns: 1fr; }
        .tile{
          border-radius: 18px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(255,255,255,.92);
          box-shadow: var(--shadow2);
          padding: 16px;
        }
        .tileTop{ display:flex; justify-content:space-between; gap: 10px; align-items:flex-start; }
        .tileIcon{
          width: 44px; height: 44px; border-radius: 16px;
          background: rgba(10,20,40,.04);
          border: 1px solid rgba(10,20,40,.10);
          display:grid; place-items:center;
          font-weight: 950;
        }
        .tileTag{ font-size: 11px; font-weight: 950; letter-spacing: .18em; text-transform: uppercase; color: rgba(10,20,40,.55); }
        .tileTitle{ margin-top: 10px; font-weight: 950; letter-spacing: -0.02em; }
        .tileDesc{ margin-top: 6px; color: var(--muted); line-height: 1.55; font-size: 14px; }

        .logos{
          margin-top: 16px;
          display:flex; flex-wrap:wrap; gap: 8px; align-items:center;
        }
        .logoPill{
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(255,255,255,.85);
          font-weight: 900;
          letter-spacing: .18em;
          font-size: 11px;
          color: rgba(10,20,40,.58);
        }

        .pricingGrid{ margin-top: 18px; display:grid; gap: 12px; grid-template-columns: 1fr; }
        .price{
          border-radius: 20px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(255,255,255,.92);
          box-shadow: var(--shadow2);
          padding: 18px;
          position:relative;
          overflow:hidden;
        }
        .priceFeatured{
          border: 1px solid rgba(26,167,255,.28);
          box-shadow: 0 24px 70px rgba(26,167,255,.16);
        }
        .priceName{ font-weight: 950; letter-spacing: -0.02em; }
        .priceVal{ margin-top: 8px; font-size: 30px; font-weight: 950; letter-spacing: -0.03em; }
        .priceSub{ margin-top: 4px; color: var(--muted); font-size: 14px; }
        .ul{ margin-top: 12px; padding-left: 18px; color: var(--muted); line-height: 1.7; }
        .faqGrid{ margin-top: 18px; display:grid; gap: 12px; grid-template-columns: 1fr; }
        .faq{
          border-radius: 18px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(255,255,255,.92);
          box-shadow: var(--shadow2);
          padding: 14px;
        }
        .faqBtn{
          width:100%;
          display:flex; align-items:center; justify-content:space-between;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align:left;
        }
        .faqQ{ font-weight: 950; letter-spacing: -0.02em; }
        .faqPlus{
          width: 34px; height: 34px; border-radius: 12px;
          border: 1px solid rgba(10,20,40,.10);
          background: rgba(10,20,40,.03);
          display:grid; place-items:center;
          font-weight: 950;
          color: rgba(10,20,40,.65);
        }
        .faqA{ margin-top: 10px; color: var(--muted); line-height: 1.65; font-size: 14px; }

        .footer{
          padding: 36px 0 50px;
          border-top: 1px solid rgba(10,20,40,.08);
          background: rgba(255,255,255,.6);
        }
        .footerGrid{
          display:grid; gap: 18px;
          grid-template-columns: 1fr;
        }
        .footCol h4{ margin:0; font-weight:950; letter-spacing:-0.02em; }
        .footCol a{ color: var(--muted); text-decoration:none; display:block; margin-top: 10px; font-weight: 800; }
        .footCol a:hover{ color: var(--ink); }
        .footSmall{ margin-top: 16px; color: var(--muted2); font-size: 12px; }

        /* Responsive */
        @media (min-width: 820px){
          .links{ display:flex; }
          .heroGrid{ grid-template-columns: 1.15fr .85fr; gap: 18px; }
          .kpiRow{ grid-template-columns: repeat(3, 1fr); }
          .tiles{ grid-template-columns: repeat(3, 1fr); }
          .pricingGrid{ grid-template-columns: repeat(3, 1fr); }
          .faqGrid{ grid-template-columns: repeat(2, 1fr); }
          .footerGrid{ grid-template-columns: 1.2fr 1fr 1fr 1fr; }
          .h1{ font-size: 54px; }
        }
      `}</style>

      <div className="wrap">
        {/* Top Bar */}
        <div className="topbar">
          <div className="container">
            <div className="nav">
              <a className="brand" href="/">
                <div className="logo" />
                <div>
                  <div className="brandTitle">Dominat8</div>
                  <div className="brandSub">SiteGround-level Homepage • One-shot finish</div>
                </div>
              </a>

              <div className="links">
                <a href="#features">Features</a>
                <a href="#proof">Proof</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQ</a>
              </div>

              <div className="actions">
                <a className="btn" href="/templates">Templates</a>
                <a className="btn btnPrimary" href="/app">Launch Builder</a>
              </div>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="container">
            <div className="heroGrid">
              <div>
                <div className="badgeRow">
                  <span className="badge"><span className="dot" /> {trustMode}</span>
                  <span className="stamp">HOME_STAMP: {stamp}</span>
                </div>

                <h1 className="h1">
                  Build a <span className="grad">premium flagship website</span> in minutes — not weeks.
                </h1>

                <p className="lead">
                  Dominat8 generates a clean marketing structure (hero, features, proof, pricing, FAQ),
                  plus SEO hygiene and publish confidence — so it looks like a serious SaaS from day one.
                </p>

                <div className="ctaRow">
                  <a className="btn btnPrimary" href="/app">Generate my site</a>
                  <a className="btn" href="/pricing">See pricing</a>
                  <span className="stamp">ROUTE_PROOF • you’re on the deployed homepage</span>
                </div>

                <div className="trust">
                  <div className="trustLeft">
                    <span className="trustPill">ROUTE_PROOF</span>
                    <span>LIVE markers + no-store probe reduce “is this cached?” anxiety</span>
                  </div>
                  <div className="stamp">Tip: add <b>?ts=123</b> to force fresh fetch</div>
                </div>

                <div className="logos">
                  {["ACME","NORTHSTAR","CLOUDLY","VECTOR","ARCADIA"].map(x => (
                    <span className="logoPill" key={x}>{x}</span>
                  ))}
                  <span className="stamp">+ your logos</span>
                </div>
              </div>

              {/* Right panel (looks like a product demo/summary) */}
              <div className="panel" aria-label="Demo panel">
                <div className="panelHead">
                  <div className="panelTitle">Publishing Pipeline</div>
                  <div className="panelTag">Auto Demo</div>
                </div>
                <div className="panelBody">
                  <div className="steps">
                    {[
                      { n: "Brand + Offer", s: "done", d: "Headline, positioning, CTA hierarchy." },
                      { n: "Pages + Layout", s: "done", d: "Homepage + pricing + FAQ + contact rhythm." },
                      { n: "SEO + Sitemap", s: "active", d: "Metadata plan, sitemap, robots hygiene." },
                      { n: "Publish Proof", s: "idle", d: "Deploy markers + domain-ready workflow." },
                    ].map((x) => (
                      <div className="step" key={x.n}>
                        <div className="stepTop">
                          <div className="stepName">{x.n}</div>
                          <div className="stepState">{x.s}</div>
                        </div>
                        <div className="stepDesc">{x.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="kpiRow" style={{ marginTop: 14 }}>
                    <div className="kpi">
                      <div className="kpiVal">{Math.round(sites).toLocaleString()}+</div>
                      <div className="kpiKey">Sites generated</div>
                      <div className="kpiHint">Fast output without messy layout debt.</div>
                    </div>
                    <div className="kpi">
                      <div className="kpiVal">{minutes.toFixed(1)} min</div>
                      <div className="kpiKey">To first build</div>
                      <div className="kpiHint">From idea → usable structure quickly.</div>
                    </div>
                    <div className="kpi">
                      <div className="kpiVal">{Math.round(seo)}/100</div>
                      <div className="kpiKey">SEO baseline</div>
                      <div className="kpiHint">Hygiene-first, publish-ready defaults.</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }} className="stamp">
                    ROUTE_PROOF • HOME_OK • {stamp}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div id="features" className="section">
          <div className="container">
            <div className="secHead">
              <div className="kicker">Features</div>
              <h2 className="h2">SiteGround-style structure that sells fast.</h2>
              <p className="p">
                Big, clear sections. Premium spacing. Scannable tiles. No “broken UI” dependency on Tailwind.
              </p>
            </div>

            <div className="tiles">
              {[
                ["A1","Finish-for-me structure","Pages + sections generated in a coherent plan — not random blocks.","core"],
                ["B2","Premium hierarchy","Hero → features → proof → pricing → FAQ — the proven flow.","conversion"],
                ["C3","SEO hygiene","Metadata, sitemap, robots defaults you can ship.","seo"],
                ["D4","Publish confidence","Stamps + probe checks end the uncertainty.","trust"],
                ["E5","Templates optional","Start from templates or go pure generation.","flexible"],
                ["F6","Scale later","Add domains, billing, agents — without redoing the homepage.","scale"],
              ].map(([ic,t,d,tag]) => (
                <div className="tile" key={t}>
                  <div className="tileTop">
                    <div className="tileIcon">{ic}</div>
                    <div className="tileTag">{tag}</div>
                  </div>
                  <div className="tileTitle">{t}</div>
                  <div className="tileDesc">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROOF */}
        <div id="proof" className="section" style={{ paddingTop: 10 }}>
          <div className="container">
            <div className="secHead">
              <div className="kicker">Proof</div>
              <h2 className="h2">Credibility layer: metrics, logos, and proof markers.</h2>
              <p className="p">
                This is the “serious SaaS” middle: enterprise clarity without being loud.
              </p>
            </div>

            <div className="panel" style={{ marginTop: 18 }}>
              <div className="panelHead">
                <div className="panelTitle">Deploy Proof</div>
                <div className="panelTag">no-store probe</div>
              </div>
              <div className="panelBody">
                <div className="kpiRow">
                  <div className="kpi">
                    <div className="kpiVal">{probeOk === null ? "…" : probeOk ? "LIVE_OK" : "WARN"}</div>
                    <div className="kpiKey">Route status</div>
                    <div className="kpiHint">Probe fetched with cache: no-store.</div>
                  </div>
                  <div className="kpi">
                    <div className="kpiVal">HOME_OK</div>
                    <div className="kpiKey">Proof marker</div>
                    <div className="kpiHint">If visible, you’re on the deployed homepage.</div>
                  </div>
                  <div className="kpi">
                    <div className="kpiVal">{stamp.slice(0,19).replace("T"," ")}</div>
                    <div className="kpiKey">Stamp</div>
                    <div className="kpiHint">Helps confirm what version you see.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* PRICING */}
        <div id="pricing" className="section">
          <div className="container">
            <div className="secHead">
              <div className="kicker">Pricing</div>
              <h2 className="h2">Start free. Upgrade when you’re ready.</h2>
              <p className="p">
                This section closes like top SaaS/hosting pages: simple tiers + clear CTA.
              </p>
            </div>

            <div className="pricingGrid">
              <div className="price">
                <div className="priceName">Free</div>
                <div className="priceVal">$0</div>
                <div className="priceSub">Get your first premium structure.</div>
                <ul className="ul">
                  <li>Generate homepage structure</li>
                  <li>Templates library access</li>
                  <li>Proof markers</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn btnPrimary" href="/app">Start free</a>
                </div>
              </div>

              <div className="price priceFeatured">
                <div className="priceName">Pro</div>
                <div className="priceVal">Power</div>
                <div className="priceSub">Publishing + automation muscle.</div>
                <ul className="ul">
                  <li>Publish-ready outputs</li>
                  <li>Domain-ready workflows</li>
                  <li>More automation + controls</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn btnPrimary" href="/pricing">Go Pro</a>
                </div>
              </div>

              <div className="price">
                <div className="priceName">Team</div>
                <div className="priceVal">Scale</div>
                <div className="priceSub">For serious growth.</div>
                <ul className="ul">
                  <li>Collaboration workflows</li>
                  <li>Shared templates</li>
                  <li>Advanced governance</li>
                </ul>
                <div style={{ marginTop: 14 }}>
                  <a className="btn" href="/pricing">See Team</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="section" style={{ paddingTop: 10 }}>
          <div className="container">
            <div className="secHead">
              <div className="kicker">FAQ</div>
              <h2 className="h2">Remove hesitation. Make it obvious.</h2>
              <p className="p">A clean close like SiteGround: clarity beats hype.</p>
            </div>

            <div className="faqGrid">
              {faqs.map((x, i) => {
                const open = openFAQ === i;
                return (
                  <div className="faq" key={x.q}>
                    <button className="faqBtn" type="button" onClick={() => setOpenFAQ(open ? -1 : i)}>
                      <div className="faqQ">{x.q}</div>
                      <div className="faqPlus">{open ? "–" : "+"}</div>
                    </button>
                    {open ? <div className="faqA">{x.a}</div> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="container">
            <div className="footerGrid">
              <div className="footCol">
                <h4>Dominat8</h4>
                <div className="footSmall">AI Website Automation Builder</div>
                <div className="footSmall">ROUTE_PROOF • HOME_STAMP: {stamp}</div>
              </div>
              <div className="footCol">
                <h4>Product</h4>
                <a href="/templates">Templates</a>
                <a href="/use-cases">Use-cases</a>
                <a href="/pricing">Pricing</a>
              </div>
              <div className="footCol">
                <h4>Build</h4>
                <a href="/app">Launch builder</a>
                <a href="#features">Features</a>
                <a href="#faq">FAQ</a>
              </div>
              <div className="footCol">
                <h4>Trust</h4>
                <div className="footSmall">
                  Probe: {probeOk === null ? "…" : probeOk ? "LIVE_OK" : "WARN"} • cache: no-store
                </div>
                <div className="footSmall">© {new Date().getFullYear()} Dominat8</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 18 }} />
      </div>
    </>
  );
}