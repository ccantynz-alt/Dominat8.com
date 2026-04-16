import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { BUILDER_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Three steps from product to global launch. See how Dominat8's AI turns a single brief into channel-native campaigns across every market.",
};

const STEPS = [
  {
    n: "01",
    title: "Upload your product",
    sub: "Photos, description, or a URL.",
    detail:
      "Dominat8 ingests everything it can find about your offering, extracts positioning, identifies the audience, and maps your category's best-performing creative patterns. You give it raw inputs — it returns a brief sharper than most agencies produce in a week.",
    bullets: [
      "Vision models read product photos for style, form, and context",
      "Language models map positioning, audience, and value props",
      "Competitor-aware category mapping built in",
    ],
  },
  {
    n: "02",
    title: "AI builds the campaign",
    sub: "Copy, video, imagery, voice — all at once.",
    detail:
      "One generation pass produces every asset, sized natively for each channel, localised for each market, and styled to match your brand. Refine or re-roll any variant independently — the rest of the campaign stays in sync.",
    bullets: [
      "Channel-native output (aspect ratios, copy length, tone)",
      "Multi-language localisation in the same pass",
      "A/B and seasonal variants generated out of the box",
    ],
  },
  {
    n: "03",
    title: "Launch everywhere",
    sub: "Push to every channel in one move.",
    detail:
      "Connect your ad accounts, inboxes, and social handles once. Dominat8 deploys the right variant to the right channel, then monitors performance. Budget shifts automatically toward what's working.",
    bullets: [
      "One-click deploy across Meta, Google, TikTok, YouTube, LinkedIn, X",
      "Email, SMS, and push sync with your provider of choice",
      "Real-time performance dashboard with automatic optimisation",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-36 pb-16 md:pt-44">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              How it works
            </div>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Three steps from product to
              <br />
              <span className="text-[var(--color-accent)]">global launch.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-fg-2)]">
              One brief. Every channel. Continuously optimised. Here&rsquo;s
              exactly what happens under the hood.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl space-y-20 px-6">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-14"
              >
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] font-mono text-lg font-semibold text-[var(--color-accent)]">
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-[calc(100%+16px)] hidden h-[calc(100%+48px)] w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-line-strong)] to-transparent md:block"
                    />
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                    {s.sub}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-fg-2)]">
                    {s.detail}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-[var(--color-fg-2)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
              Try it with your product.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-fg-2)]">
              Free to start. Three generations every month, no card required.
            </p>
            <div className="mt-8 flex justify-center">
              <CTA href={BUILDER_URL} variant="primary" size="lg" external>
                Open the builder
              </CTA>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
