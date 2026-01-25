"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { AceHero } from "@/lib/ace";

type Props = {
  hero: AceHero;
};

type Stage = "hero" | "features" | "gallery" | "bottom";

function getStageFromScroll(): Stage {
  const y = typeof window !== "undefined" ? window.scrollY : 0;
  // Simple, deterministic buckets (no measuring DOM needed)
  if (y < 450) return "hero";
  if (y < 1250) return "features";
  if (y < 2100) return "gallery";
  return "bottom";
}

export default function AceStickyCTA({ hero }: Props) {
  const [stage, setStage] = useState<Stage>("hero");

  useEffect(() => {
    const onScroll = () => setStage(getStageFromScroll());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cta = useMemo(() => {
    if (stage === "hero") {
      return { label: hero.primaryCtaLabel, href: hero.primaryCtaHref, hint: "Start here" };
    }
    if (stage === "features") {
      return { label: "Show me what Dominat8 builds", href: hero.primaryCtaHref, hint: "See output paths" };
    }
    if (stage === "gallery") {
      return { label: "Preview my site output", href: hero.primaryCtaHref, hint: "Build belief" };
    }
    return { label: "Start with pricing", href: hero.secondaryCtaHref, hint: "Make it real" };
  }, [stage, hero]);

  return (
    <div className="d8-sticky-cta">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45">ACE</div>
            <div className="truncate text-sm text-white/70">{cta.hint}</div>
          </div>

          <div className="flex items-center gap-2">
            <a href={hero.secondaryCtaHref} className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-black/30">
              {hero.secondaryCtaLabel}
            </a>
            <a href={cta.href} className="d8-cta">
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}