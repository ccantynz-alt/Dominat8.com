import React from "react";

type Card = {
  title: string;
  body: string;
};

const CARDS: Card[] = [
  {
    title: "From idea → polished site in minutes",
    body: "Answer a few prompts. Dominat8 generates a calm, premium homepage and the core pages your customers expect.",
  },
  {
    title: "Looks expensive without being loud",
    body: "Cyclone-style pacing: big hero, clear qualification, outcome-driven value, calm steps, proof, and a strong CTA.",
  },
  {
    title: "Built to ship, not just design",
    body: "Publish flows, SEO foundations, and a structure that makes it obvious what to improve next — no guesswork.",
  },
];

export default function ValuePropCyclone() {
  return (
    <section className="w-full bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs tracking-widest text-white/50">WHY IT WINS</div>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
            A premium website that feels like a flagship — without the agency timeline.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            This isn’t a template dump. It’s a narrative flow that qualifies, convinces, and converts — calmly.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm"
            >
              <div className="text-lg font-semibold text-white">{c.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/75">
            Outcome focus: <span className="text-white/90">bookings</span>,{" "}
            <span className="text-white/90">trust</span>, and{" "}
            <span className="text-white/90">clarity</span> — not feature lists.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/75">
            Built for “I need this live tonight.”
          </div>
        </div>
      </div>
    </section>
  );
}
