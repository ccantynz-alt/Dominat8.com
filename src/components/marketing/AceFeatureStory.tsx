"use client";

import React, { useMemo, useState } from "react";
import type { AcePath } from "@/lib/ace";

type StepKey = "generate" | "refine" | "seo" | "publish";

type Step = {
  k: StepKey;
  title: string;
  desc: string;
  bullets: string[];
  rightTitle: string;
  rightLines: string[];
};

export default function AceFeatureStory({ path }: { path: AcePath }) {
  const steps: Step[] = useMemo(() => ([
    {
      k: "generate",
      title: "Generate",
      desc: "Structured input creates a clean first draft you can build from.",
      bullets: ["Spec-driven", "Deterministic structure", "Fast baseline"],
      rightTitle: "Input → Draft",
      rightLines: ["project spec", "page map", "hero + sections", "initial copy"],
    },
    {
      k: "refine",
      title: "Refine",
      desc: "Iterate like a product team: tighten copy, swap blocks, approve changes.",
      bullets: ["Approval-first", "No mystery changes", "Repeatable workflow"],
      rightTitle: "Refinement Loop",
      rightLines: ["edit blocks", "approve content", "preview output", "commit"],
    },
    {
      k: "seo",
      title: "SEO",
      desc: "Index discipline that scales: metadata patterns and sitemap structure.",
      bullets: ["Metadata patterns", "Sitemap strategy", "No SEO chaos"],
      rightTitle: "Index Ready",
      rightLines: ["titles/meta", "canonical", "robots", "sitemap.xml"],
    },
    {
      k: "publish",
      title: "Publish",
      desc: "Ship with proof markers and guardrails that keep builds green.",
      bullets: ["Build-gated deploys", "Domain-safe workflows", "Proof markers"],
      rightTitle: "Deploy",
      rightLines: ["build passes", "deploy", "verify", "ship"],
    },
  ]), []);

  const [active, setActive] = useState<StepKey>("generate");
  const step = steps.find(s => s.k === active) || steps[0];

  const pathLabel =
    path === "startup" ? "Founders" :
    path === "agency" ? "Agencies" :
    path === "local" ? "Local Businesses" :
    "Creators";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-white/50">How it works</div>
        <div className="mt-2 text-lg font-semibold">Built for <span className="text-white/75">{pathLabel}</span></div>
        <div className="mt-1 text-sm text-white/60">Click steps to see the system behavior. (V1.5 = proof + structure.)</div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {steps.map((s) => {
            const on = s.k === active;
            return (
              <button
                key={s.k}
                type="button"
                onClick={() => setActive(s.k)}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition",
                  on ? "border-white/18 bg-white/10" : "border-white/10 bg-black/25 hover:bg-black/30",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className={["h-2.5 w-2.5 rounded-full", on ? "bg-white/70" : "bg-white/25"].join(" ")} />
                </div>
                <div className="mt-2 text-sm text-white/65">{s.desc}</div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/55">
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">System view</div>
          <div className="mt-2 text-sm font-semibold text-white/90">{step.rightTitle}</div>

          <div className="mt-4 space-y-2">
            {step.rightLines.map((x) => (
              <div key={x} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
                {x}
              </div>
            ))}
          </div>

          <div className="mt-4 text-[11px] text-white/45">
            This panel becomes real data once wired to project runs/specs.
          </div>
        </div>
      </div>
    </div>
  );
}