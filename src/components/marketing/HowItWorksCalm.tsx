import React from "react";

type Step = {
  n: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Pick your vibe",
    body: "Start from a premium baseline. Your homepage already feels calm and flagship-grade.",
  },
  {
    n: "02",
    title: "Let the agents build",
    body: "Sections, pages, and structure are generated to match what customers expect — with clean pacing.",
  },
  {
    n: "03",
    title: "Publish and refine",
    body: "Get live fast. Then iterate with certainty — every patch shows a build stamp so you always know what shipped.",
  },
];

export default function HowItWorksCalm() {
  return (
    <section className="w-full bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs tracking-widest text-white/50">HOW IT WORKS</div>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
            Calm steps. No chaos. No guessing.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            The point is momentum: ship a premium baseline, then improve it with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-xs font-semibold tracking-widest text-white/50">
                STEP {s.n}
              </div>
              <div className="mt-3 text-lg font-semibold text-white">{s.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
