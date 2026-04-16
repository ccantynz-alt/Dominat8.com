import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { BUILDER_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "Built for DTC brands, agencies, and founders. Whatever you ship, Dominat8 turns it into a full cross-channel launch — in minutes.",
};

const CASES = [
  {
    tag: "DTC brands",
    headline: "New SKU to live campaign in an afternoon.",
    body:
      "Upload the product, select markets, approve the output. Channel-native creative hits paid, email, and organic — in sync, across every region you sell to.",
    bullets: [
      "Launch 50+ variants per SKU in a single pass",
      "Localise for every market you ship to",
      "Built-in seasonal and promotional variants",
    ],
  },
  {
    tag: "Agencies",
    headline: "Ten client launches in the time one used to take.",
    body:
      "Brief once, let the AI produce every variant. Agency plan includes full white-label output — present to clients as your own work.",
    bullets: [
      "White-label every deliverable (Agency plan)",
      "500 generations/month with dedicated queue",
      "API + bulk generation for volume accounts",
    ],
  },
  {
    tag: "Founders",
    headline: "Ship your first campaign before your first hire.",
    body:
      "You shouldn't need a marketing team to test a product. Start on Free, upgrade when growth demands it, never get stuck waiting on creative.",
    bullets: [
      "Free tier covers full testing cycles",
      "Starter plan ($9) for consistent weekly pushes",
      "Pay per overage, not per seat",
    ],
  },
  {
    tag: "E-commerce operators",
    headline: "Every product page, every channel, always fresh.",
    body:
      "Stop refreshing creative by hand. Dominat8 generates new variants on a schedule, feeds them into your ad accounts, and retires underperformers automatically.",
    bullets: [
      "Scheduled creative refreshes",
      "Automatic fatigue detection across ad accounts",
      "Direct integrations with Shopify, WooCommerce, BigCommerce",
    ],
  },
  {
    tag: "SaaS & B2B",
    headline: "Complex product, clear message, at scale.",
    body:
      "B2B buyers read long-form. Dominat8 produces the short-form hooks and the long-form nurture content — all rooted in the same positioning.",
    bullets: [
      "LinkedIn + X native formats",
      "Long-form email sequences out of the box",
      "ABM-ready personalisation at the account level",
    ],
  },
  {
    tag: "Local & services",
    headline: "Local-market creative that still feels real.",
    body:
      "Location-aware copy and imagery, generated per city, with the trust signals local customers actually look for.",
    bullets: [
      "Geo-localised creative per market",
      "Review + trust-signal integration",
      "Google Local + Meta Local Awareness support",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-36 pb-16 md:pt-44">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Use cases
            </div>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Built for teams
              <br />
              <span className="text-[var(--color-accent)]">that ship.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-fg-2)]">
              Same workflow, whatever you&rsquo;re launching — from a single
              DTC product to a portfolio of agency clients.
            </p>
          </div>
        </section>

        <section className="py-10 pb-24">
          <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c) => (
              <article
                key={c.tag}
                className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7"
              >
                <span className="inline-block self-start rounded-full border border-[var(--color-line)] bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-accent)]">
                  {c.tag}
                </span>
                <h2 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.015em]">
                  {c.headline}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-2)]">
                  {c.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-[var(--color-fg-2)]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
              Start with your product.
            </h2>
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
