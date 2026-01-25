export const dynamic = "force-dynamic";

import { BUILD_MARKER, MONSTER_MARKER } from "../lib/buildMarker";
import { TopBar, HeaderNav, Footer } from "../components/marketing/MarketingShell";

function Pill({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs text-slate-700 ring-1 ring-slate-200 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {children}
    </div>
  );
}

function ProofItem({ title, desc }) {
  return (
    <div className="rounded-2xl bg-white/85 p-5 ring-1 ring-slate-200 shadow-sm d8-fade-up d8-delay-3">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-emerald-50 ring-1 ring-emerald-200 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-950">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-slate-600">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Bright premium background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_10%,rgba(59,130,246,0.16),transparent_55%),radial-gradient(900px_circle_at_80%_15%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(700px_circle_at_50%_90%,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.74),rgba(255,255,255,1))]" />
      </div>

      <TopBar />
      <HeaderNav />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-6 pb-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="d8-fade-up d8-delay-0">
              <Pill>
                Premium, clean, fast — SiteGround-style build
                <span className="ml-2 font-mono text-slate-500">({BUILD_MARKER})</span>
              </Pill>
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl d8-fade-up d8-delay-1">
              Build a website <br />
              that looks expensive. <br />
              Automatically.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg d8-fade-up d8-delay-2">
              Dominat8 generates a <span className="font-semibold text-slate-900">complete, production-ready website</span> from a brief —
              then runs pages, SEO, sitemap, and publish automatically (with controls you can trust).
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row d8-fade-up d8-delay-3">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm d8-btn-lift"
                href="/p/new"
              >
                Generate my site
              </a>

              <a
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 shadow-sm d8-btn-lift"
                href="/templates"
              >
                See example output
              </a>
            </div>

            {/* Proof strip */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 d8-fade-up d8-delay-4">
              <div className="rounded-2xl bg-white/85 p-4 ring-1 ring-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-700">✔ Publish-ready HTML</div>
                <div className="mt-1 text-xs text-slate-600">Clean output, structured sections, consistent rhythm.</div>
              </div>
              <div className="rounded-2xl bg-white/85 p-4 ring-1 ring-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-700">✔ SEO included</div>
                <div className="mt-1 text-xs text-slate-600">Titles, metas, schema, sitemap + robots.</div>
              </div>
              <div className="rounded-2xl bg-white/85 p-4 ring-1 ring-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-700">✔ Custom domain ready</div>
                <div className="mt-1 text-xs text-slate-600">Publish + map when you’re ready.</div>
              </div>
              <div className="rounded-2xl bg-white/85 p-4 ring-1 ring-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-700">✔ No templates to fight</div>
                <div className="mt-1 text-xs text-slate-600">Premium layout defaults that stay consistent.</div>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-slate-500 d8-fade-up d8-delay-4">
              Pro tip: if prod ever looks “stuck”, open <span className="font-mono text-slate-700">/__status</span> and compare the marker:
              <span className="font-mono text-slate-700"> {MONSTER_MARKER}</span>
            </div>
          </div>

          {/* Right Trust Card */}
          <div className="w-full max-w-md d8-fade-up d8-delay-2">
            <div className="rounded-3xl bg-white/85 p-6 ring-1 ring-slate-200 shadow-sm d8-card-float">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500">Trusted quality</div>
                  <div className="mt-2 text-lg font-semibold text-slate-950">
                    Premium output, every time
                  </div>
                </div>
                <div className="text-amber-500 text-sm" aria-label="5 stars">
                  ★★★★★
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-600">What you get</div>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Homepage + marketing pages
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> SEO plan + sitemap
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> Publish-ready HTML
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm d8-btn-lift"
                  href="/pricing"
                >
                  View pricing
                </a>
                <a
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 shadow-sm d8-btn-lift"
                  href="/__status"
                >
                  Check status
                </a>
              </div>

              <div className="mt-4 text-[11px] text-slate-500">
                Marker: <span className="font-mono text-slate-700">{MONSTER_MARKER}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VALUE GRID (lightweight) */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <ProofItem title="Fast pipeline" desc="From brief → pages → SEO → publish in minutes." />
          <ProofItem title="Consistent design" desc="Premium hierarchy, spacing rhythm, and trust signals by default." />
          <ProofItem title="Operationally calm" desc="Build gating + status markers so shipping is never guesswork." />
        </div>
      </section>

      <Footer />
    </main>
  );
}
