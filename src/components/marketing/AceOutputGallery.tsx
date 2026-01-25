"use client";

import React, { useMemo, useState } from "react";
import type { AcePath } from "@/lib/ace";

type Tab = "before" | "after" | "spec";

type DemoItem = {
  id: string;
  title: string;
  path: AcePath;
  before: { idea: string; audience: string; goal: string };
  after: { headline: string; sections: string[]; cta: string };
  spec: Record<string, any>;
};

function prettyJson(x: any) {
  try { return JSON.stringify(x, null, 2); } catch { return String(x); }
}

export default function AceOutputGallery({ path }: { path: AcePath }) {
  const [tab, setTab] = useState<Tab>("after");

  const items: DemoItem[] = useMemo(() => ([
    {
      id: "startup-01",
      title: "SaaS Launch (Founder)",
      path: "startup",
      before: {
        idea: "AI website automation builder that generates a premium marketing site in minutes.",
        audience: "Founders and indie builders",
        goal: "Launch fast with credibility",
      },
      after: {
        headline: "Launch a premium marketing site in minutes.",
        sections: ["Hero", "Features", "Pricing", "FAQ", "CTA"],
        cta: "Explore templates",
      },
      spec: {
        brand: "Dominat8",
        siteType: "SaaS marketing",
        pages: ["Home", "Pricing", "Templates", "Use-cases"],
        hero: { headline: "Launch a premium marketing site in minutes.", primaryCta: "/templates" },
        seo: { robots: "index,follow", sitemap: "enabled" },
      },
    },
    {
      id: "agency-01",
      title: "Agency Client Site",
      path: "agency",
      before: {
        idea: "An agency landing that sells outcomes and makes it easy to request a quote.",
        audience: "Small to mid agencies",
        goal: "Convert visitors into booked calls",
      },
      after: {
        headline: "Ship client sites without the grind.",
        sections: ["Hero", "Service blocks", "Proof (safe)", "Process", "CTA"],
        cta: "Show agency templates",
      },
      spec: {
        brand: "Dominat8",
        siteType: "Agency",
        pages: ["Home", "Services", "Case Studies (safe)", "Contact"],
        hero: { headline: "Ship client sites without the grind.", primaryCta: "/templates?path=agency" },
        governance: { approvalFirst: true, safeClaims: true },
      },
    },
    {
      id: "local-01",
      title: "Local Business Conversion",
      path: "local",
      before: {
        idea: "A local business site optimized for calls and bookings.",
        audience: "Local services",
        goal: "Get calls, bookings, trust",
      },
      after: {
        headline: "Turn visitors into calls and bookings.",
        sections: ["Hero", "Trust blocks", "Services", "Map/Areas", "CTA"],
        cta: "Explore local layouts",
      },
      spec: {
        brand: "Dominat8",
        siteType: "Local business",
        pages: ["Home", "Services", "Areas", "Contact"],
        hero: { headline: "Turn visitors into calls and bookings.", primaryCta: "/use-cases?path=local" },
        conversion: { phoneCta: true, bookingCta: true },
      },
    },
    {
      id: "creator-01",
      title: "Creator Funnel",
      path: "creator",
      before: {
        idea: "A creator funnel page with a lead magnet and clear CTA.",
        audience: "Creators and coaches",
        goal: "Capture leads and convert",
      },
      after: {
        headline: "Launch pages that convert — fast.",
        sections: ["Hero", "Lead magnet", "Benefits", "FAQ", "CTA"],
        cta: "Browse creator starts",
      },
      spec: {
        brand: "Dominat8",
        siteType: "Creator funnel",
        pages: ["Landing", "Thank you", "Pricing (optional)"],
        hero: { headline: "Launch pages that convert — fast.", primaryCta: "/use-cases?path=creator" },
        funnel: { leadMagnet: true, emailCapture: true },
      },
    },
  ]), []);

  const filtered = items.filter(i => i.path === path);
  const active = filtered[0] || items[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">Real Output Gallery</div>
          <div className="mt-2 text-lg font-semibold">{active.title}</div>
          <div className="mt-1 text-sm text-white/60">
            This is demo content now — wired later to real project specs. The format is the point.
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["before","after","spec"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                "rounded-xl border px-4 py-2 text-sm font-semibold transition",
                tab === t ? "border-white/18 bg-white/10 text-white" : "border-white/10 bg-black/25 text-white/75 hover:bg-black/30",
              ].join(" ")}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left: narrative */}
        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          {tab === "before" && (
            <div className="space-y-3">
              <div className="text-sm font-semibold">Before</div>
              <div className="text-sm text-white/70"><span className="text-white/50">Idea:</span> {active.before.idea}</div>
              <div className="text-sm text-white/70"><span className="text-white/50">Audience:</span> {active.before.audience}</div>
              <div className="text-sm text-white/70"><span className="text-white/50">Goal:</span> {active.before.goal}</div>
            </div>
          )}

          {tab === "after" && (
            <div className="space-y-3">
              <div className="text-sm font-semibold">After</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/50">Headline</div>
                <div className="mt-2 text-lg font-semibold text-white/90">{active.after.headline}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/50">Sections</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                  {active.after.sections.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/50">CTA</div>
                <div className="mt-2 text-sm font-semibold text-white/90">{active.after.cta}</div>
              </div>
            </div>
          )}

          {tab === "spec" && (
            <div className="space-y-3">
              <div className="text-sm font-semibold">Spec</div>
              <div className="text-sm text-white/60">
                This is what makes Dominat8 feel like a system: structured inputs → predictable output.
              </div>
              <pre className="max-h-[360px] overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
{prettyJson(active.spec)}
              </pre>
            </div>
          )}
        </div>

        {/* Right: visual mock blocks */}
        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">Preview</div>
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
            (Placeholder blocks) — V1.5 is about structure and proof, not images yet.
          </div>
        </div>
      </div>
    </div>
  );
}