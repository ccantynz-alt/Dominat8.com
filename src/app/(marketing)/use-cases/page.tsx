export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import MarketingCTA from "@/src/components/marketing/MarketingCTA";
import { USE_CASES } from "@/src/lib/marketing/catalog";

export const metadata: Metadata = {
  title: "Use cases — Dominat8",
  description: "See how Dominat8 helps different businesses ship fast and rank.",
};

export default function UseCasesIndexPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-semibold tracking-tight">Use cases</h1>
        <p className="mt-3 max-w-2xl text-sm opacity-80">
          Each use case includes a suggested page set + outcomes + SEO keyword angles.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="text-lg font-semibold">{u.title}</div>
              <div className="mt-2 text-sm opacity-80">{u.summary}</div>
              <div className="mt-4 text-xs opacity-70">
                Pages: {u.pagesYouGet.slice(0, 3).join(", ")}
                {u.pagesYouGet.length > 3 ? "…" : ""}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <MarketingCTA />
    </div>
  );
}

