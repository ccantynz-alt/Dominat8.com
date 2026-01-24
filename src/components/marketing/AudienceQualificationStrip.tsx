import React from "react";

export default function AudienceQualificationStrip() {
  return (
    <section className="w-full border-y border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs tracking-widest text-white/50">BUILT FOR</div>
            <h2 className="mt-2 text-lg font-semibold text-white">
              Rural &amp; professional businesses that need a premium web presence — fast.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
              Trades &amp; Services
            </span>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
              Rural Contractors
            </span>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
              Local Professional Firms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
