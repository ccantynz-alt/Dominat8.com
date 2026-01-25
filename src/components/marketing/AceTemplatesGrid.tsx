"use client";

import React, { useMemo, useState } from "react";
import type { AcePath } from "@/lib/ace";

type Item = {
  title: string;
  desc: string;
  tags: AcePath[];
  kind: "template" | "use-case";
};

const ALL: Item[] = [
  { title: "SaaS Marketing", desc: "Hero → features → pricing → FAQ.", tags: ["startup"], kind: "template" },
  { title: "Startup Launch", desc: "Premium launch page with clear CTA.", tags: ["startup"], kind: "template" },
  { title: "Agency Services", desc: "Services, process, safe proof blocks.", tags: ["agency"], kind: "template" },
  { title: "Client Proposal Site", desc: "Outcome framing + request quote CTA.", tags: ["agency"], kind: "use-case" },
  { title: "Local Services", desc: "Calls, areas served, trust + booking CTA.", tags: ["local"], kind: "template" },
  { title: "Booking Funnel", desc: "Short path to contact or booking.", tags: ["local"], kind: "use-case" },
  { title: "Lead Magnet Landing", desc: "Capture emails with a clear offer.", tags: ["creator"], kind: "template" },
  { title: "Creator Funnel", desc: "Benefits → FAQ → CTA, fast.", tags: ["creator"], kind: "use-case" },
];

export default function AceTemplatesGrid({ path }: { path: AcePath }) {
  const [mode, setMode] = useState<"all" | "template" | "use-case">("all");

  const items = useMemo(() => {
    const filtered = ALL.filter(x => x.tags.includes(path));
    if (mode === "all") return filtered;
    return filtered.filter(x => x.kind === mode);
  }, [path, mode]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">Path-aware library</div>
          <div className="mt-2 text-lg font-semibold">Templates & use-cases for: <span className="text-white/75">{path}</span></div>
          <div className="mt-1 text-sm text-white/60">These tiles automatically change when the visitor picks a path.</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all","template","use-case"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={[
                "rounded-xl border px-4 py-2 text-sm font-semibold transition",
                mode === m ? "border-white/18 bg-white/10 text-white" : "border-white/10 bg-black/25 text-white/75 hover:bg-black/30",
              ].join(" ")}
            >
              {m === "all" ? "All" : (m === "template" ? "Templates" : "Use-cases")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        {items.map((x) => (
          <div key={x.title} className="rounded-2xl border border-white/10 bg-black/25 p-4 hover:bg-black/30 transition">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45">{x.kind}</div>
            <div className="mt-2 text-sm font-semibold">{x.title}</div>
            <div className="mt-2 text-sm text-white/65">{x.desc}</div>
            <div className="mt-4 h-16 rounded-xl border border-white/10 bg-white/5" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/templates" className="d8-cta">Browse templates</a>
        <a href="/use-cases" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
          Explore use-cases
        </a>
      </div>
    </div>
  );
}