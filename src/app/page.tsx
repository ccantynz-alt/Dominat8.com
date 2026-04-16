import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dominat8 — AI Marketing, Fully Automated",
  description:
    "Upload your product. Dominat8's AI generates a full launch — copy, video, imagery, voice — across every channel and market. Live in minutes.",
};

/* ============================================================
   DOMINAT8.COM — AI MARKETING PLATFORM (.com marketing site)
   Sections: Nav · Hero · How It Works · Preview · Stats · Pricing · Footer
   ============================================================ */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-d8-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3 no-underline">
          <div
            className="flex h-9 w-9 items-center justify-center bg-d8-green font-display text-lg font-black text-d8-black"
            style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
          >
            D8
          </div>
          <span className="font-display text-lg font-black uppercase tracking-[0.15em] text-d8-text">
            Dominat8
          </span>
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="#how"
            className="hidden text-sm font-semibold text-d8-muted no-underline transition-colors hover:text-d8-green sm:inline"
          >
            How it works
          </a>
          <a
            href="#preview"
            className="hidden text-sm font-semibold text-d8-muted no-underline transition-colors hover:text-d8-green sm:inline"
          >
            Preview
          </a>
          <a
            href="#pricing"
            className="hidden text-sm font-semibold text-d8-muted no-underline transition-colors hover:text-d8-green sm:inline"
          >
            Pricing
          </a>
          <a
            href="/contact"
            className="hidden text-sm font-semibold text-d8-muted no-underline transition-colors hover:text-d8-green sm:inline"
          >
            Contact
          </a>
          <a
            href="https://dominat8.io/builder"
            className="neon-cta px-5 py-2.5 text-sm font-black tracking-wide no-underline"
            style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
          >
            Get started
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---- SECTION 1: HERO ---- */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="grid-bg" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32 text-center">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-d8-green/20 bg-d8-green/[0.05] px-4 py-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-d8-green" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-d8-green">
            AI marketing engine — live
          </span>
        </div>

        <h1 className="font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.95] tracking-tight text-d8-text">
          DOMINAT8
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-d8-muted md:text-xl">
          The most advanced AI marketing platform on the planet. Upload a product, and
          launch a full campaign across every channel and market — in minutes.
        </p>

        <p className="mt-10 font-display text-2xl font-black uppercase tracking-[0.05em] text-d8-green md:text-4xl">
          From product to global launch in three clicks.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://dominat8.io/builder"
            className="neon-cta rounded-lg px-10 py-4 text-base font-black tracking-widest no-underline"
            style={{ clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)" }}
          >
            Start free
          </a>
          <a
            href="#how"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold uppercase tracking-widest text-d8-muted no-underline transition-all hover:border-d8-green/30 hover:text-d8-green"
          >
            See how it works &darr;
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 2: HOW IT WORKS (3-step) ---- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Upload your product",
      desc: "Drop in photos, a description, or a URL. The AI maps your product, audience, and positioning in seconds.",
    },
    {
      n: "02",
      title: "AI builds the campaign",
      desc: "Thousands of variants — copy, video, imagery, and voice — generated for every channel, language, and market you target.",
    },
    {
      n: "03",
      title: "Launch everywhere",
      desc: "Push to Meta, Google, TikTok, podcasts, influencers and more in one move. Performance is optimised in real time.",
    },
  ];

  return (
    <section
      id="how"
      className="relative border-t border-white/[0.04] bg-d8-darker py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            How it works
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Three steps from product
            <span className="text-d8-green"> to global reach.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="neon-border rounded-xl bg-d8-surface p-8"
            >
              <div className="font-display text-5xl font-black text-d8-green">
                {s.n}
              </div>
              <h3 className="mt-4 font-display text-xl font-black uppercase tracking-wide text-d8-text">
                {s.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-d8-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 3: PREVIEW (replaces 'Demo upload' placeholder) ---- */
function Preview() {
  return (
    <section
      id="preview"
      className="relative border-t border-white/[0.04] py-28"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
          Try it
        </div>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
          See your first campaign
          <span className="text-d8-green"> in minutes.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-d8-muted">
          Open the Dominat8 builder, drop in your product, and watch the AI assemble a
          full launch-ready campaign. No credit card required.
        </p>

        <a
          href="https://dominat8.io/builder"
          className="mt-10 inline-block w-full max-w-xl rounded-2xl border border-d8-green/30 bg-d8-surface p-10 no-underline transition-all hover:bg-d8-surface-hover hover:shadow-[0_0_40px_rgba(0,255,65,0.12)]"
        >
          <div className="font-mono text-3xl text-d8-green">{"//"}</div>
          <div className="mt-4 font-display text-xl font-black text-d8-text">
            Open the builder
          </div>
          <div className="mt-2 text-sm text-d8-muted">
            Upload images, a description, or a URL — we&rsquo;ll handle the rest.
          </div>
        </a>
      </div>
    </section>
  );
}

/* ---- SECTION 4: STATS ---- */
function Stats() {
  const stats = [
    { n: "200+", label: "Countries reached" },
    { n: "50+", label: "Marketing channels" },
    { n: "10,000+", label: "Variants per product" },
    { n: "24/7", label: "AI optimisation" },
  ];

  return (
    <section className="relative border-t border-white/[0.04] bg-d8-darker py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="neon-border rounded-xl bg-d8-surface p-8 text-center"
            >
              <div className="stat-glow font-display text-4xl font-black md:text-5xl">
                {s.n}
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-d8-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- SECTION 5: PRICING (source of truth: CLAUDE.md) ---- */
function Pricing() {
  const plans = [
    {
      name: "FREE",
      price: "$0",
      period: "forever",
      desc: "Try it out — no credit card required.",
      features: [
        "3 AI generations / month",
        "Core channel presets",
        "Share link (7-day)",
        "Mobile-ready output",
      ],
    },
    {
      name: "STARTER",
      price: "$9",
      period: "/mo",
      desc: "For individuals & side projects.",
      features: [
        "20 AI generations / month",
        "Refine & iterate (unlimited)",
        "Multi-channel export",
        "Share links (90-day)",
      ],
    },
    {
      name: "PRO",
      price: "$29",
      period: "/mo",
      desc: "For freelancers & growing brands.",
      features: [
        "100 AI generations / month",
        "Everything in Starter",
        "A/B & seasonal variants",
        "Priority queue + email support",
      ],
      featured: true,
    },
    {
      name: "AGENCY",
      price: "$99",
      period: "/mo",
      desc: "For teams & high-volume launches.",
      features: [
        "500 AI generations / month",
        "Everything in Pro",
        "White-label output",
        "API + bulk generation",
        "5 team seats",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative border-t border-white/[0.04] py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-d8-green">
            Pricing
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight text-d8-text">
            Simple, honest pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-d8-muted">
            Start free. Scale as you grow. No surprises, no gotchas.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-d8-muted/60">
            Need more? $0.49 / generation overage on all paid plans.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`neon-border relative flex flex-col bg-d8-surface p-8 ${
                p.featured
                  ? "border-d8-green/30 shadow-[0_0_40px_rgba(0,255,65,0.08)]"
                  : ""
              }`}
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
              }}
            >
              {p.featured && (
                <>
                  <div className="absolute inset-x-0 -top-px h-[2px] bg-d8-green" />
                  <div className="absolute right-3 top-3 border border-d8-green/40 bg-d8-green/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-d8-green">
                    Most popular
                  </div>
                </>
              )}
              <div className="mt-3 font-display text-sm font-black tracking-[0.2em] text-d8-text">
                {p.name}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black text-d8-text">
                  {p.price}
                </span>
                <span className="text-sm text-d8-muted">{p.period}</span>
              </div>
              <p className="mt-3 text-sm text-d8-muted">{p.desc}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-d8-text/80"
                  >
                    <span className="mt-0.5 font-mono text-xs text-d8-green">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://dominat8.io/builder"
                className={`mt-8 block py-3.5 text-center text-sm font-black uppercase tracking-widest no-underline transition-all ${
                  p.featured
                    ? "neon-cta"
                    : "border border-white/10 bg-white/[0.03] text-d8-text hover:border-d8-green/30 hover:text-d8-green"
                }`}
                style={
                  p.featured
                    ? {
                        clipPath:
                          "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                      }
                    : undefined
                }
              >
                {p.featured
                  ? "Start Pro — $29/mo"
                  : p.name === "FREE"
                  ? "Get started free"
                  : `Start ${p.name.toLowerCase()}`}
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center text-sm text-d8-muted/50">
          All paid plans include a 14-day money-back guarantee.
        </div>
      </div>
    </section>
  );
}

/* ---- FOOTER ---- */
function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-d8-black py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div
            className="flex h-7 w-7 items-center justify-center bg-d8-green font-display text-xs font-black text-d8-black"
            style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
          >
            D8
          </div>
          <span className="font-display text-sm font-bold uppercase tracking-[0.1em] text-d8-muted">
            Dominat8
          </span>
        </div>
        <div className="flex gap-8">
          {[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-d8-muted no-underline transition-colors hover:text-d8-green"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="font-mono text-xs text-d8-muted">
          &copy; {new Date().getFullYear()} Dominat8. AI marketing for modern teams.
        </div>
      </div>
    </footer>
  );
}

/* ---- PAGE ---- */
export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Preview />
      <Stats />
      <Pricing />
      <Footer />
    </>
  );
}
