import Link from "next/link";
import { buildMarker } from "@/src/lib/buildMarker";

export default function HomePage() {
  return (
    <main className="d8-page">
      {/* Deploy-proof marker (view-source / curl grep friendly) */}
      <span className="d8-marker" aria-hidden="true">
        {buildMarker()}
      </span>

      {/* FULL-SCREEN HERO TAKEOVER */}
      <section className="d8-hero-full">
        {/* WOW background layers (CSS-only) */}
        <div className="d8-wow-bg" aria-hidden="true">
          <div className="d8-orb d8-orb-a" />
          <div className="d8-orb d8-orb-b" />
          <div className="d8-orb d8-orb-c" />
          <div className="d8-grid" />
          <div className="d8-noise" />
          <div className="d8-vignette" />
        </div>

        {/* V7: premium glow aura wrapper (CSS-only hover/focus/always-on-touch) */}
        <div className="d8-glow-wrap">
          <div className="d8-hero-inner">
            <header className="d8-hero-copy">
              <div className="d8-pill">
                <span className="d8-dot" />
                <span>Dominat8 — AI Website Automation Builder</span>
              </div>

              <h1 className="d8-h1">
                Build a <span className="d8-grad">premium website</span> in minutes.
              </h1>

              <p className="d8-sub">
                Describe your business. Dominat8 generates the homepage, pages, layout, and structure —
                ready to publish.
              </p>

              <div className="d8-cta-row">
                <Link className="d8-btn d8-btn-primary" href="/sign-in">
                  Start building
                </Link>
                <Link className="d8-btn d8-btn-ghost" href="/templates">
                  Explore templates
                </Link>
              </div>

              <div className="d8-trust">
                <div className="d8-trust-item">⚡ Fast publish</div>
                <div className="d8-trust-item">🔎 SEO-ready</div>
                <div className="d8-trust-item">🌐 Custom domains</div>
              </div>
            </header>

            <aside className="d8-hero-card" aria-label="Preview card">
              <div className="d8-card-top">
                <div className="d8-card-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="d8-card-title">Preview</div>
              </div>

              <div className="d8-card-body">
                <div className="d8-card-kicker">AI-generated site spec</div>
                <div className="d8-card-line" />
                <div className="d8-card-line d8-card-line2" />
                <div className="d8-card-line d8-card-line3" />

                <div className="d8-mini-grid">
                  <div className="d8-mini-tile">
                    <div className="d8-mini-head">Hero</div>
                    <div className="d8-mini-sub">Full-screen takeover</div>
                  </div>
                  <div className="d8-mini-tile">
                    <div className="d8-mini-head">Pages</div>
                    <div className="d8-mini-sub">Pricing • FAQ • Contact</div>
                  </div>
                  <div className="d8-mini-tile">
                    <div className="d8-mini-head">SEO</div>
                    <div className="d8-mini-sub">Meta • Sitemap • Robots</div>
                  </div>
                  <div className="d8-mini-tile">
                    <div className="d8-mini-head">Publish</div>
                    <div className="d8-mini-sub">Vercel-ready output</div>
                  </div>
                </div>

                <div className="d8-card-foot">
                  <span className="d8-tag">CSS-only WOW</span>
                  <span className="d8-tag">Build-gated</span>
                  <span className="d8-tag">V7 Glow</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Scroll hint */}
          <div className="d8-scroll-hint" aria-hidden="true">
            <span className="d8-scroll-dot" />
            <span className="d8-scroll-text">Scroll</span>
          </div>
        </div>
      </section>

      {/* Below the fold (safe placeholder) */}
      <section className="d8-below">
        <div className="d8-below-inner">
          <h2 className="d8-h2">What happens after the hero?</h2>
          <p className="d8-below-sub">
            Next we add the conversion sections: logo strip, how-it-works, proof blocks, and a KV-backed gallery.
          </p>

          <div className="d8-below-grid">
            <div className="d8-below-card">
              <div className="d8-below-head">Option B</div>
              <div className="d8-below-body">3 real examples (KV-backed gallery)</div>
            </div>
            <div className="d8-below-card">
              <div className="d8-below-head">Option C</div>
              <div className="d8-below-body">SiteGround-style structure</div>
            </div>
            <div className="d8-below-card">
              <div className="d8-below-head">V7b</div>
              <div className="d8-below-body">True cursor-follow glow (tiny JS)</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
