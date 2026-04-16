import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { BUILDER_URL, OVERAGE_COPY, PLANS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing. Start free, scale as you grow. $0 / $9 / $29 / $99 per month.",
};

const FAQ = [
  {
    q: "What counts as a generation?",
    a: "One generation = one full campaign run from a single brief. That typically produces dozens of channel-native variants (copy, imagery, video snippets, voice). Re-rolling individual variants doesn't count against your quota.",
  },
  {
    q: "What happens when I hit my monthly limit?",
    a: `You can keep generating at the overage rate — ${OVERAGE_COPY} No hard stop, no surprise upgrade.`,
  },
  {
    q: "Can I change plans?",
    a: "Yes, any time. Upgrades are prorated; downgrades take effect at the end of your current billing period.",
  },
  {
    q: "Do you have a money-back guarantee?",
    a: "All paid plans include a 14-day money-back guarantee, no questions asked.",
  },
  {
    q: "Is there a free trial of paid plans?",
    a: "The Free plan is permanent — 3 generations every month, no card required. The 14-day money-back guarantee on paid plans gives you a risk-free way to test them at full volume.",
  },
  {
    q: "Do I need to connect ad accounts?",
    a: "Only when you're ready to deploy. You can generate and download everything without connecting any accounts, and push to external channels when the output is approved.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-36 pb-10 md:pt-44">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Pricing
            </div>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Simple, honest
              <br />
              <span className="text-[var(--color-accent)]">pricing.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-fg-2)]">
              Start free. Scale as you grow. No surprises, no gotchas.
            </p>
            <p className="mt-3 text-sm text-[var(--color-fg-3)]">
              Overage: {OVERAGE_COPY}
            </p>
          </div>
        </section>

        <section className="py-10 pb-24">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border bg-[var(--color-bg-2)] p-7 ${
                  p.featured
                    ? "border-[var(--color-accent)]/40 shadow-[0_0_0_1px_rgba(0,255,136,0.18),0_20px_60px_-25px_var(--color-accent-glow)]"
                    : "border-[var(--color-line)]"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    Most popular
                  </div>
                )}
                <div className="text-sm font-semibold tracking-[-0.005em] text-[var(--color-fg)]">
                  {p.name}
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-[-0.02em]">
                    {p.price}
                  </span>
                  <span className="text-sm text-[var(--color-fg-3)]">
                    {p.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--color-fg-2)]">
                  {p.description}
                </p>

                <ul className="mt-7 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-fg)]"
                    >
                      <svg
                        aria-hidden
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                      >
                        <path
                          d="M3 8.5L6.5 12L13 5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[var(--color-fg-2)]">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <CTA
                    href={BUILDER_URL}
                    variant={p.featured ? "primary" : "secondary"}
                    size="md"
                    external
                    className="w-full"
                  >
                    {p.name === "Free" ? "Get started" : `Start ${p.name}`}
                  </CTA>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[var(--color-fg-3)]">
            All paid plans include a 14-day money-back guarantee.
          </p>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
              Pricing FAQ
            </h2>
            <div className="mt-12 space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-2)] open:bg-[var(--color-bg-3)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-medium [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className="text-[var(--color-fg-3)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[var(--color-fg-2)]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
