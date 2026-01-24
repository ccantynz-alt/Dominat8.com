export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import MarketingCTA from "@/src/components/marketing/MarketingCTA";
import { TEMPLATES } from "@/src/lib/marketing/catalog";

export const metadata: Metadata = {
  title: "Templates — Dominat8",
  description: "Pick a template direction and generate a full site with AI.",
};

export default function TemplatesPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-semibold tracking-tight">Templates</h1>
        <p className="mt-3 max-w-2xl text-sm opacity-80">
          Choose a starting point. Dominat8 generates the site structure, copy blocks, and SEO plan.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <div key={t.slug} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">{t.name}</div>
              <div className="mt-2 text-sm opacity-80">{t.description}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-black/30 px-2 py-1 text-xs opacity-80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/sign-up"
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
                >
                  Use this template
                </Link>
                <Link
                  href="/use-cases"
                  className="rounded-2xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  Browse use cases
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MarketingCTA
        title="Want a custom layout?"
        subtitle="Start with a template, then let the agents refine copy, structure, and SEO."
      />
    </div>
  );
}

