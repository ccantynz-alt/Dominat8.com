"use client";
import * as React from "react";


export const dynamic = "force-dynamic";

export default function HomePage() {
  const BUILD_STAMP = "V6_HERO_SYSTEM_VISIBLE_20260125_145409";
  const DEPLOY_ID = BUILD_STAMP;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* PROOF MARKERS */}
      <div className="hidden">
        LIVE_OK HOME_OK Hero System v6 V6_HERO_SYSTEM_ V6_1_VISIBLE BUILD_STAMP:{BUILD_STAMP} DEPLOY_ID:{DEPLOY_ID}
      </div>

      {/* HERO (VISIBLE BY DEFAULT) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.24),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(16,185,129,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>

        <div
          className="
            relative z-10 w-full max-w-6xl px-6 py-20
            opacity-100
            motion-safe:animate-[fadeUp_0.6s_ease-out_both]
          "
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
            Dominat8 • AI Website Automation
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Build a high-converting website
            <span className="block text-white/75">
              in minutes — with <span className="text-white">AI agents</span>.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/70">
            From idea → pages → copy → SEO → publish.
            <span className="block mt-2 text-white/60">
              Then your agents keep improving it.
            </span>
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <a href="/templates" className="rounded-xl bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">
              Start from a template
            </a>
            <a href="/use-cases" className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium hover:bg-white/10 transition">
              See use-cases
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      }</style>
          {/* PHASE 6 — INTERACTIVE AGENT DEMO (CLIENT-ONLY, SAFE) */}
      <section className="relative py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Watch agents build a site in real time</h2>
              <p className="mt-3 text-white/70 max-w-2xl">
                This is a safe demo (no backend calls). It shows the exact flow Dominat8 automates: pages → copy → SEO → publish.
              </p>
            </div>
            <div className="text-sm text-white/50">
              Tip: try “AI website builder for plumbers in Auckland”
            </div>
          </div>

          <AgentDemo />

          <div className="hidden">PHASE6_DEMO_20260125_151355</div>
        </div>
      </section>
</main>
  );
}


function AgentDemo() {
  const [prompt, setPrompt] = React.useState("AI website builder for plumbers in Auckland");
  const [running, setRunning] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const steps = [
    { title: "Plan pages", detail: "Home, Pricing, FAQ, Contact, Use-cases" },
    { title: "Write conversion copy", detail: "Headline, benefits, CTAs, social proof" },
    { title: "Generate SEO", detail: "Metadata, keywords, sitemap, internal links" },
    { title: "Prepare publish", detail: "Build stamp, deploy plan, preview URL" },
  ];

  const outputs = [
    { label: "Pages", body: "Home · Pricing · Templates · Use-cases · FAQ · Contact" },
    { label: "Hero draft", body: "Build a high-converting website in minutes — with AI agents." },
    { label: "SEO highlights", body: "Title tags, H1/H2 structure, sitemap.xml, canonical URLs, meta descriptions" },
    { label: "Publish", body: "Preview ready · Deploy queued · Domain: dominat8.com" },
  ];

  React.useEffect(() => {
    if (!running) return;
    if (step >= steps.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 750);
    return () => clearTimeout(t);
  }, [running, step]);

  React.useEffect(() => {
    if (running && step >= steps.length) {
      const t2 = setTimeout(() => setRunning(false), 400);
      return () => clearTimeout(t2);
    }
  }, [running, step]);

  function start() {
    setStep(0);
    setRunning(true);
  }

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
        <div className="text-sm text-white/60">Agent prompt</div>
        <div className="mt-3 flex gap-3 flex-col sm:flex-row">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/30"
            placeholder="Describe your business..."
          />
          <button
            onClick={start}
            disabled={running}
            className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-white/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {running ? "Running..." : "Run agents"}
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
          <div className="text-xs text-white/50">Simulation</div>
          <div className="mt-3 space-y-3">
            {steps.map((s, i) => {
              const done = step > i;
              const active = running && step === i;
              return (
                <div key={s.title} className="flex items-start gap-3">
                  <div
                    className={
                      "mt-1 h-3 w-3 rounded-full " +
                      (done
                        ? "bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.85)]"
                        : active
                        ? "bg-indigo-400 shadow-[0_0_14px_rgba(99,102,241,0.75)] animate-pulse"
                        : "bg-white/15")
                    }
                  />
                  <div>
                    <div className={"text-sm " + (done ? "text-white" : active ? "text-white/90" : "text-white/60")}>
                      {s.title}
                    </div>
                    <div className="text-xs text-white/45">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-xs text-white/45">
            Prompt: <span className="text-white/70">{prompt || "—"}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
        <div className="text-sm text-white/60">Outputs</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {outputs.map((o, idx) => {
            const visible = step >= Math.min(idx + 1, steps.length);
            return (
              <div
                key={o.label}
                className={
                  "rounded-xl border border-white/10 bg-black/40 p-4 transition " +
                  (visible ? "opacity-100 translate-y-0" : "opacity-30 translate-y-1")
                }
              >
                <div className="text-xs text-white/50">{o.label}</div>
                <div className="mt-2 text-sm text-white/75 leading-relaxed">{o.body}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/pricing" className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-white/90 transition">
            Upgrade to Pro
          </a>
          <a href="/templates" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium hover:bg-white/10 transition">
            Start from a template
          </a>
        </div>

        <div className="mt-4 text-xs text-white/45">
          Stable demo: no external calls, no account required.
        </div>
      </div>
    </div>
  );
}



