import React from "react";

const LOGOS = [
  "Startup Studio",
  "Indie Founder",
  "Agency",
  "Consulting",
  "E-commerce",
  "SaaS",
  "Local Business",
  "Creator",
  "Product Team",
  "Builder",
];

export default function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent" />

      <div className="d8-marquee flex gap-8 whitespace-nowrap px-6">
        {row.map((x, i) => (
          <div
            key={i}
            className="text-xs uppercase tracking-[0.28em] text-white/40"
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}