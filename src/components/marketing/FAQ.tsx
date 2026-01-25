import React from "react";

type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "Is anything auto-posted to social in V1?",
    a: "No. Marketing Machine is safe by default: approval-first, dry-run publishing, and logs recorded. Real publishing comes later when you connect APIs.",
  },
  {
    q: "Will this break production routes?",
    a: "No. The homepage is isolated and build-gated. Your existing backend and routes stay intact.",
  },
  {
    q: "Can I customize the generated website output?",
    a: "Yes. The platform is designed to iterate: regenerate, refine, and publish when you approve.",
  },
  {
    q: "Is this SEO-friendly?",
    a: "Yes. The architecture supports structured pages, metadata, and sitemap generation patterns.",
  },
];

export default function FAQ() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {ITEMS.map((x) => (
        <div key={x.q} className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur">
          <div className="text-sm font-semibold">{x.q}</div>
          <div className="mt-2 text-sm text-white/65">{x.a}</div>
        </div>
      ))}
    </div>
  );
}