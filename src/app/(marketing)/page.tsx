export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";

const BUILD_STAMP = "BUILD_20260124_211945";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs uppercase tracking-[0.28em] text-white/55">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function SoftCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-sm">
      {children}
    </div>
  );
}

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Prove route + deploy */}
      <div className="sr-only">HOME_OK</div>

      {/* ===== HERO (flagship / premium / calm) ===== */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-30" />
          <div className="absolute -bottom-52 left-1/2 h-[540px] w-[980px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-20" />
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:26px_26px] opacity-40" />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col justify-center px-6 py-20">
          {/* Stamp (visible) */}
          <div className="mb-6 text-center text-[11px] tracking-[0.22em] text-white/35">
            BUILD_STAMP: {BUILD_STAMP}
          </div>

          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Pill>Flagship calm</Pill>
                <Pill>Publishable drafts</Pill>
                <Pill>Built to convert</Pill>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Build a premium website
                <span className="block text-white/85">in minutes —</span>
                <span className="block">not months.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
                Dominat8 generates a calm, flagship-quality homepage that looks like a real business —
                then you iterate into pages, SEO, and launch-ready copy with confidence.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Start building now
                </Link>

                <Link
                  href="/preview/marketing"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                >
                  See a live preview
                </Link>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div>
                  <div className="text-lg font-semibold">Fast</div>
                  <div className="mt-1 text-xs text-white/60">Draft in minutes</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Premium</div>
                  <div className="mt-1 text-xs text-white/60">Calm & confident</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Scalable</div>
                  <div className="mt-1 text-xs text-white/60">Pages + SEO</div>
                </div>
              </div>

              <div className="mt-6 text-xs text-white/45">
                No gimmicks. Just premium pacing, strong copy, and a site you can actually ship.
              </div>
            </div>

            {/* Right side: "device" preview frame */}
            <div className="md:col-span-5">
              <div className="rounded-[32px] border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-4 shadow-sm">
                <div className="rounded-[26px] border border-white/10 bg-black/40 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/55">Preview</div>
                    <div className="text-xs text-white/45">Flagship layout</div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="h-2 w-16 rounded-full bg-white/20" />
                    <div className="mt-3 h-7 w-3/4 rounded-lg bg-white/15" />
                    <div className="mt-3 h-3 w-full rounded-lg bg-white/10" />
                    <div className="mt-2 h-3 w-11/12 rounded-lg bg-white/10" />
                    <div className="mt-2 h-3 w-10/12 rounded-lg bg-white/10" />
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="h-16 rounded-xl bg-white/10" />
                      <div className="h-16 rounded-xl bg-white/10" />
                    </div>
                    <div className="mt-4 h-10 rounded-xl bg-white/15" />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-white/55">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">Hero</div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">Proof</div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] py-2">CTA</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-white/45">
                This is the “calm premium” look — strong contrast, soft borders, disciplined rhythm.
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-white/70">
                Built for founders, local pros, and agencies who want a flagship site fast.
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill>Custom domains</Pill>
                <Pill>SEO-ready</Pill>
                <Pill>Multi-page</Pill>
                <Pill>Publish now</Pill>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILT FOR ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Solo founders", "Launch a real presence that looks funded — even if you’re not (yet)."],
            ["Local businesses", "Calm, trustworthy design that makes people feel safe buying."],
            ["Agencies", "Generate strong drafts and iterate quickly with clients."],
            ["Side projects", "Ship now. Upgrade into pages + SEO as you grow."],
          ].map(([t, d]) => (
            <SoftCard key={t}>
              <div className="text-lg font-semibold">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* ===== WOW OUTCOMES ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <SectionTitle
          eyebrow="The WOW"
          title="Outcomes that make people subscribe."
          subtitle="Not features. Results. You get a premium homepage people trust — and a workflow that keeps improving it."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "From blank → believable",
              desc: "Copy + structure that reads like a real business, not a template.",
              bullets: ["Flagship hero", "Trust cues", "Premium typography rhythm"],
            },
            {
              title: "Publishable by default",
              desc: "A draft you can ship today — then refine as you go.",
              bullets: ["Calm sections", "CTA placement", "Conversion-first layout"],
            },
            {
              title: "SEO foundation (real)",
              desc: "Clean metadata wiring so Google sees the right thing.",
              bullets: ["Canonical-ready", "Sitemap/robots-ready", "Future-proof pages"],
            },
            {
              title: "No more “did it deploy?”",
              desc: "Always-fresh mode with a visible build stamp.",
              bullets: ["Force-dynamic", "BUILD_STAMP proof", "Stop guessing"],
            },
          ].map((x) => (
            <SoftCard key={x.title}>
              <div className="text-xl font-semibold tracking-tight">{x.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{x.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS (calm) ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <SectionTitle
          eyebrow="How it works"
          title="Three steps. Calm execution."
          subtitle="You should feel confident shipping quickly — not overwhelmed."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Choose a direction", "Pick a vibe + goal. Dominat8 generates a premium homepage draft instantly."],
            ["02", "Agents refine", "Structure, copy, and SEO wiring improve in passes — without chaos."],
            ["03", "Publish and grow", "Ship today. Expand into pages + SEO + custom domains as you scale."],
          ].map(([n, t, d]) => (
            <SoftCard key={n}>
              <div className="text-xs tracking-[0.28em] text-white/55">STEP {n}</div>
              <div className="mt-3 text-lg font-semibold">{t}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* ===== PROOF ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <SectionTitle
          eyebrow="Proof"
          title="People buy when it feels premium."
          subtitle="A flagship look builds trust. Trust drives subscriptions."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["“This feels like a real agency build.”", "The calm layout and copy rhythm instantly made it feel expensive."],
            ["“We shipped a homepage in one night.”", "Not a rough draft — something we were proud to publish."],
            ["“Clients stopped asking ‘is this a template?’”", "That’s when we knew the design pacing was working."],
          ].map(([q, a]) => (
            <SoftCard key={q}>
              <div className="text-sm font-semibold leading-relaxed text-white">{q}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{a}</p>
              <div className="mt-5 text-xs text-white/45">— Dominat8 early user</div>
            </SoftCard>
          ))}
        </div>
      </section>

      {/* ===== PRICING TEASER ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-[0.28em] text-white/55">Subscription</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Convert visitors into customers with a flagship homepage.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
                Start building immediately. Upgrade when you want custom domains, more pages, and automated SEO passes.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Publish-ready drafts</Pill>
                <Pill>Premium sections</Pill>
                <Pill>SEO wiring</Pill>
                <Pill>Domains</Pill>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-7">
                <div className="text-sm font-semibold">Pro</div>
                <div className="mt-2 text-3xl font-semibold">
                  \$— <span className="text-sm font-medium text-white/60">/ month</span>
                </div>
                <div className="mt-2 text-xs text-white/45">
                  (We’ll wire exact pricing into Stripe + UI next.)
                </div>

                <ul className="mt-6 space-y-2 text-sm text-white/70">
                  {[
                    "Premium homepage + sections",
                    "Multi-page publishing",
                    "Custom domain connect",
                    "SEO/sitemap automation",
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/app"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Start building
                </Link>

                <div className="mt-3 text-center text-xs text-white/45">
                  Calm premium, built to convert.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-white/55">Ready</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Impress visitors on the first scroll.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
            Build a flagship homepage that looks expensive, feels calm, and converts —
            then expand into pages + SEO as you grow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Start building now
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
            >
              View pricing
            </Link>
          </div>
        </div>

        <div className="mt-10 pb-4 text-center text-xs text-white/35">
          Dominat8 — premium by default • BUILD_STAMP: {BUILD_STAMP}
        </div>
      </section>
    </main>
  );
}
