import React from "react";

type Quote = {
  name: string;
  role: string;
  quote: string;
};

const QUOTES: Quote[] = [
  {
    name: "Rural contractor",
    role: "Services & earthworks",
    quote: "It finally looks like a real business online. Calm, premium, and clear — customers get it instantly.",
  },
  {
    name: "Local professional",
    role: "Small firm owner",
    quote: "The structure is what’s different. It’s not just pretty — it actually guides people to contact us.",
  },
];

export default function ProofAndCTA() {
  return (
    <section className="w-full bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="text-xs tracking-widest text-white/50">PROOF</div>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Premium feel. Clear outcomes.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              This is the “flagship baseline” — designed to earn trust fast, then sharpen conversions as you iterate.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/70">
                Want it live tonight?
              </div>
              <div className="mt-2 text-xl font-semibold text-white">
                Generate a premium homepage in minutes.
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/app"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Open the Builder
                </a>
                <a
                  href="/(marketing)/pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white/80 hover:text-white"
                >
                  View Pricing
                </a>
              </div>

              <div className="mt-4 text-xs text-white/50">
                Tip: While iterating, your homepage shows a BUILD_STAMP so deployments are never in doubt.
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {QUOTES.map((q) => (
              <div
                key={q.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm leading-relaxed text-white/80">
                  “{q.quote}”
                </p>
                <div className="mt-4 text-xs text-white/60">
                  <span className="text-white/75">{q.name}</span> · {q.role}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs tracking-widest text-white/50">CTA REINFORCEMENT</div>
              <div className="mt-3 text-lg font-semibold text-white">
                Calm design, confident copy, and a structure that converts.
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Next we can wire real proof (logos, screenshots, case studies) and replace the placeholder quotes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
