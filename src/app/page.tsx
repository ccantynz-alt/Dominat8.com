"use client";

import React, { useEffect, useMemo, useState } from "react";
import AuroraBackground from "@/components/marketing/AuroraBackground";
import AcePathSelector from "@/components/marketing/AcePathSelector";
import AceStickyCTA from "@/components/marketing/AceStickyCTA";
import AceOutputGallery from "@/components/marketing/AceOutputGallery";
import AceTemplatesGrid from "@/components/marketing/AceTemplatesGrid";
import AceFeatureStory from "@/components/marketing/AceFeatureStory";
import { DEFAULT_STATE, heroFor, inferSourceFromReferrer, normalizePath, readAcePath } from "@/lib/ace";
import type { AcePath, AceState } from "@/lib/ace";

export const dynamic = "force-dynamic";

const BUILD_MARKER = "D8_ACE_V1_5_2026-01-25";

function ProofMarker() {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
      <div className="font-mono">{BUILD_MARKER}</div>
      <div className="mt-1">If you see this, ACE V1.5 (Proof + Belief) is live on the deployed homepage route.</div>
    </div>
  );
}

function useAceState(): [AceState, (p: AcePath) => void] {
  const [state, setState] = useState<AceState>(DEFAULT_STATE);

  useEffect(() => {
    const url = new URL(window.location.href);
    const qPath = normalizePath(url.searchParams.get("path") || url.searchParams.get("intent") || url.searchParams.get("industry"));
    const stored = readAcePath();
    const chosen = qPath || stored || DEFAULT_STATE.path;

    const src = inferSourceFromReferrer(document.referrer);
    setState({ path: chosen, source: src });
  }, []);

  const setPath = (p: AcePath) => setState((s) => ({ ...s, path: p }));
  return [state, setPath];
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs uppercase tracking-[0.28em] text-white/55">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-white/65 md:text-lg">{desc}</p>
    </div>
  );
}

export default function HomeAceV15() {
  const [ace, setPath] = useAceState();
  const hero = useMemo(() => heroFor(ace), [ace]);

  return (
    <AuroraBackground>
      {/* Sticky CTA engine */}
      <AceStickyCTA hero={hero} />

      <main className="mx-auto max-w-6xl px-6 py-14 pb-28">
        {/* HERO */}
        <header className="pt-4">
          <div className="d8-glass d8-float p-7 md:p-10">
            <div className="flex flex-col gap-7">
              <div className="max-w-3xl">
                <div className="text-xs uppercase tracking-[0.28em] text-white/60">{hero.eyebrow}</div>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                  {hero.headline}
                </h1>

                <p className="mt-5 text-lg text-white/70">
                  {hero.subhead}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={hero.primaryCtaHref} className="d8-cta">{hero.primaryCtaLabel}</a>
                  <a
                    href={hero.secondaryCtaHref}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {hero.secondaryCtaLabel}
                  </a>
                </div>

                <ProofMarker />
              </div>

              {/* CHOOSE YOUR PATH */}
              <AcePathSelector value={ace.path} onChange={setPath} />
            </div>
          </div>
        </header>

        <div className="my-10 d8-divider" />

        {/* FEATURE STORY */}
        <section>
          <SectionTitle
            eyebrow="How it works"
            title="A system you can understand and repeat"
            desc="ACE V1.5 adds proof: structured steps and an output model that feels like software — not marketing fluff."
          />
          <div className="mt-8">
            <AceFeatureStory path={ace.path} />
          </div>
        </section>

        <div className="my-12 d8-divider" />

        {/* REAL OUTPUT GALLERY */}
        <section>
          <SectionTitle
            eyebrow="Proof + belief"
            title="Real output format: Before → After → Spec"
            desc="This is the credibility move. Even with demo data, you’re showing the system: structured inputs creating predictable output."
          />
          <div className="mt-8">
            <AceOutputGallery path={ace.path} />
          </div>
        </section>

        <div className="my-12 d8-divider" />

        {/* PATH-AWARE LIBRARY */}
        <section>
          <SectionTitle
            eyebrow="Library"
            title="Path-aware templates and use-cases"
            desc="The homepage adapts as a visitor commits. Same page, different narrative — now backed by matching library tiles."
          />
          <div className="mt-8">
            <AceTemplatesGrid path={ace.path} />
          </div>
        </section>

        <div className="my-12 d8-divider" />

        {/* NEXT */}
        <section className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">Next</div>
          <div className="mt-2 text-lg font-semibold">ACE V2: Telemetry + Real Wiring</div>
          <div className="mt-2 text-sm text-white/65">
            Add internal-only signals (path chosen, scroll depth, CTA clicks) and wire the Gallery to real project runs/specs.
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={hero.primaryCtaHref} className="d8-cta">Continue with {ace.path}</a>
            <a href="/pricing" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Pricing
            </a>
          </div>
        </section>

        <footer className="mt-14 pb-8 text-sm text-white/45">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-white/55">© {new Date().getFullYear()} Dominat8</div>
            <div className="flex flex-wrap gap-4">
              <a className="hover:text-white/70" href="/pricing">Pricing</a>
              <a className="hover:text-white/70" href="/templates">Templates</a>
              <a className="hover:text-white/70" href="/use-cases">Use-cases</a>
            </div>
          </div>
        </footer>
      </main>
    </AuroraBackground>
  );
}