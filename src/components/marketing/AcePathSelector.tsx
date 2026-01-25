"use client";

import React from "react";
import type { AcePath } from "@/lib/ace";
import { writeAcePath } from "@/lib/ace";

type Props = {
  value: AcePath;
  onChange: (p: AcePath) => void;
};

const OPTIONS: Array<{ k: AcePath; label: string; desc: string }> = [
  { k: "startup", label: "Startup", desc: "Launch a premium SaaS-style site" },
  { k: "agency", label: "Agency", desc: "Ship client sites faster" },
  { k: "local", label: "Local Business", desc: "Calls, bookings, trust" },
  { k: "creator", label: "Creator", desc: "Funnels, lead magnets, pages" },
];

export default function AcePathSelector({ value, onChange }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
      <div className="text-xs uppercase tracking-[0.22em] text-white/55">Choose your path</div>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
        {OPTIONS.map((o) => {
          const active = value === o.k;
          return (
            <button
              key={o.k}
              type="button"
              onClick={() => {
                writeAcePath(o.k);
                onChange(o.k);
              }}
              className={[
                "text-left rounded-2xl border p-4 transition",
                active ? "border-white/18 bg-white/7" : "border-white/10 bg-black/25 hover:bg-black/30",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">{o.label}</div>
                <div className={["h-2.5 w-2.5 rounded-full", active ? "bg-white/70" : "bg-white/25"].join(" ")} />
              </div>
              <div className="mt-2 text-xs text-white/60">{o.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}