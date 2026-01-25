import React from "react";

type Props = {
  mode: "overview" | "pipeline" | "seo" | "publish";
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
      {children}
    </span>
  );
}

export default function ProductMock({ mode }: Props) {
  const title =
    mode === "overview" ? "Command Center" :
    mode === "pipeline" ? "Automation Pipeline" :
    mode === "seo" ? "SEO + Sitemap" :
    "Publish + Domain";

  const subtitle =
    mode === "overview" ? "One place to generate, refine, and ship." :
    mode === "pipeline" ? "Orchestrate steps with guardrails." :
    mode === "seo" ? "Index-ready metadata and structure." :
    "Deploy fast, verify domains, go live.";

  const left = (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <div className="text-xs text-white/55">{subtitle}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge>{mode === "publish" ? "domain wizard" : "build gated"}</Badge>
        <Badge>{mode === "seo" ? "sitemap.xml" : "KV-backed"}</Badge>
        <Badge>{mode === "pipeline" ? "runs + logs" : "templates"}</Badge>
      </div>
    </div>
  );

  // Very lightweight “UI” mock: no images, just polished blocks.
  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
      <div className="absolute -top-3 left-5 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {left}

        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45">Live Preview</div>
            <div className="text-xs text-white/45">{mode.toUpperCase()}</div>
          </div>

          <div className="mt-3 space-y-3">
            <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded-xl border border-white/10 bg-white/5" />
              <div className="h-16 rounded-xl border border-white/10 bg-white/5" />
              <div className="h-16 rounded-xl border border-white/10 bg-white/5" />
            </div>

            <div className="h-24 rounded-xl border border-white/10 bg-white/5" />

            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
              <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
            </div>
          </div>

          <div className="mt-4 text-[11px] text-white/45">
            Preview is illustrative — real output is generated per project.
          </div>
        </div>
      </div>
    </div>
  );
}