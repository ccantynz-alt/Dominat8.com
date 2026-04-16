import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { BUILDER_URL, OVERAGE_COPY, PLANS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Channels />
        <UseCases />
        <Stats />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--color-fg-2)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          AI marketing engine — live
        </div>

        <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--color-fg)]">
          AI marketing,
          <br />
          <span className="text-[var(--color-accent)]">fully automated.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-2)] md:text-xl">
          Upload your product. Dominat8 generates a full launch — copy, video,
          imagery, and voice — across every channel and market. Live in minutes.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTA href={BUILDER_URL} variant="primary" size="lg" external>
            Start free
          </CTA>
          <CTA href="/how-it-works" variant="secondary" size="lg">
            See how it works
          </CTA>
        </div>

        <p className="mt-6 text-xs text-[var(--color-fg-3)]">
          No credit card required · 3 free generations every month
        </p>
      </div>

      {/* Soft accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(0,255,136,0.12), transparent 70%)",
        }}
      />
    </section>
  );
}

/* ---------- LOGO / TRUST MARQUEE (placeholder, tasteful) ---------- */
function Marquee() {
  const items = [
    "Meta Ads",
    "Google Ads",
    "TikTok",
    "YouTube",
    "LinkedIn",
    "X / Twitter",
    "Podcasts",
    "Influencers",
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-2)]/40 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-fg-3)]">
          One brief. Every channel.
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((i) => (
            <li
              key={i}
              className="text-sm font-medium text-[var(--color-fg-2)]"
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Upload your product",
      desc: "Drop in photos, a description, or a URL. Dominat8 maps your offering, audience, and positioning in seconds.",
    },
    {
      n: "02",
      title: "AI builds the campaign",
      desc: "Thousands of variants — copy, video, imagery, and voice — generated for every channel, language, and market you target.",
    },
    {
      n: "03",
      title: "Launch everywhere",
      desc: "Push to Meta, Google, TikTok, podcasts and more in one move. Performance is measured and optimised in real time.",
    },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title="Three steps from product to global reach."
          kicker="No agency brief. No channel specialists. No weeks of iteration."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n}>
              <div className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)]">
                STEP {s.n}
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-2)]">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CHANNELS ---------- */
function Channels() {
  const groups = [
    {
      title: "Paid social",
      items: ["Meta Ads", "TikTok Ads", "LinkedIn", "X / Twitter", "Snapchat", "Reddit"],
    },
    {
      title: "Search & shopping",
      items: ["Google Ads", "Bing Ads", "YouTube Ads", "Google Shopping", "Amazon Ads"],
    },
    {
      title: "Owned & earned",
      items: ["Email", "SMS", "Push", "Podcasts", "Influencer outreach", "Organic social"],
    },
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-2)]/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Channels"
          title="Every surface your customers actually use."
          kicker="Channel-native variants, sized and toned for each platform — generated in the same pass."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {groups.map((g) => (
            <Card key={g.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                {g.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-[var(--color-fg)]"
                  >
                    <Dot />
                    {i}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- USE CASES ---------- */
function UseCases() {
  const cases = [
    {
      tag: "DTC brands",
      headline: "Launch a new product SKU in an afternoon.",
      body: "Upload the product, pick your markets, and push channel-ready creative to paid, email, and organic — all in one run.",
    },
    {
      tag: "Agencies",
      headline: "Ten client launches in the time one used to take.",
      body: "Brief once, let the AI produce every variant. White-label the output on the Agency plan.",
    },
    {
      tag: "Founders",
      headline: "Ship your first campaign before your first hire.",
      body: "No marketing team required. Start free, and grow into paid plans only when you need the volume.",
    },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Who it's for"
          title="Built for teams that ship."
          kicker="Whether you're a founder, an agency, or running a brand — the workflow stays the same."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cases.map((c) => (
            <Card key={c.tag}>
              <span className="inline-block rounded-full border border-[var(--color-line)] bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-accent)]">
                {c.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.015em]">
                {c.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-2)]">
                {c.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { n: "200+", label: "Countries reached" },
    { n: "50+", label: "Marketing channels" },
    { n: "10,000+", label: "Variants per product" },
    { n: "24/7", label: "Optimisation" },
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-bg-2)]/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center bg-[var(--color-bg-2)] px-6 py-10 text-center"
            >
              <div className="text-4xl font-semibold tracking-[-0.02em] text-[var(--color-fg)] md:text-5xl">
                {s.n}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  return (
    <section id="pricing" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, honest pricing."
          kicker="Start free. Scale as you grow. No surprises."
        />
        <p className="mt-4 text-center text-sm text-[var(--color-fg-3)]">
          Overage: {OVERAGE_COPY}
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    <Check />
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

        <p className="mt-8 text-center text-xs text-[var(--color-fg-3)]">
          All paid plans include a 14-day money-back guarantee.
        </p>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
          Ready to ship your
          <br />
          <span className="text-[var(--color-accent)]">next launch?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-fg-2)]">
          Start free. Upload a product. Watch a full campaign come together in
          minutes.
        </p>
        <div className="mt-9 flex justify-center">
          <CTA href={BUILDER_URL} variant="primary" size="lg" external>
            Open the builder
          </CTA>
        </div>
      </div>
    </section>
  );
}

/* ---------- SHARED ---------- */
function SectionHeader({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
        {title}
      </h2>
      {kicker && (
        <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-fg-2)]">
          {kicker}
        </p>
      )}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7 transition-colors hover:border-[var(--color-line-strong)]">
      {children}
    </div>
  );
}

function Check() {
  return (
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
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
    />
  );
}
