import Link from "next/link";
import {
  BRAND,
  CTA,
  HERO,
  STATS,
  AUDIENCES,
  STEPS,
  SERVICES,
  TESTIMONIALS,
  COMPARISON,
  FAQ,
} from "@/src/lib/marketing/copy";
import {
  ScrollReveal,
  HeroGlow,
  FAQItem,
  AnimatedNumber,
} from "./_client/MarketingClient";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ═══════════════════════════════════════
          GLOBAL BACKGROUND — aurora blobs
          ═══════════════════════════════════════ */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#07070B]" />
        <div className="absolute left-[-20%] top-[-15%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-20%] left-[30%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.10),transparent_60%)] blur-3xl" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      {/* ═══════════════════════════════════════
          STICKY NAV
          ═══════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07070B]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-white no-underline">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20" />
            <span className="text-sm font-bold tracking-[0.18em] uppercase">{BRAND.name}</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#how" className="transition hover:text-white no-underline">How it works</a>
            <a href="#features" className="transition hover:text-white no-underline">Features</a>
            <Link href="/pricing" className="transition hover:text-white no-underline">Pricing</Link>
            <Link href="/templates" className="transition hover:text-white no-underline">Templates</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={CTA.primary.href}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black no-underline transition hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
            >
              {CTA.primary.label}
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          HERO — full viewport, cursor-glow
          ═══════════════════════════════════════ */}
      <HeroGlow className="relative">
        {/* Cursor-follow glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(800px circle at var(--gx, 50%) var(--gy, 40%), rgba(168,85,247,0.12), transparent 50%)",
          }}
          aria-hidden="true"
        />

        <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          {/* Kicker */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            {HERO.kicker}
          </div>

          {/* Headline */}
          <h1 className="max-w-5xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {HERO.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {HERO.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg md:text-xl">
            {HERO.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={CTA.primary.href}
              className="group relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-base font-bold text-white no-underline shadow-2xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110"
            >
              {CTA.primary.label}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link
              href={CTA.secondary.href}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-8 py-4 text-base font-semibold text-white/80 no-underline backdrop-blur transition-all hover:border-white/[0.20] hover:bg-white/[0.07]"
            >
              {CTA.secondary.label}
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 backdrop-blur"
              >
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  <AnimatedNumber value={s.value} />
                </div>
                <div className="mt-1 text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/30">
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-white/30" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          </div>
        </section>
      </HeroGlow>

      {/* ═══════════════════════════════════════
          TRUST STRIP — audience pills
          ═══════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center">
          <ScrollReveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Built for businesses that want to win
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {AUDIENCES.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/[0.10] bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 backdrop-blur"
                >
                  {a}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS — 3-step process
          ═══════════════════════════════════════ */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollReveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400/80">
            How it works
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl">
            Three steps to a site that{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              dominates
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            No code. No designers. No waiting. Describe your business and watch it come to life.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <ScrollReveal key={step.title} delay={idx * 120}>
              <div className="group relative h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all hover:border-white/[0.14] hover:bg-white/[0.05]">
                {/* Step number */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.10] bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-lg font-bold text-white">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{step.desc}</p>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES — what you get
          ═══════════════════════════════════════ */}
      <section id="features" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <ScrollReveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400/80">
              What you get
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
              Everything you need.
              <span className="text-white/50"> Nothing you don&apos;t.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc, idx) => (
              <ScrollReveal key={svc.title} delay={idx * 80}>
                <div className="group relative h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all hover:border-white/[0.14] hover:bg-white/[0.04]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.10] bg-gradient-to-br from-purple-500/15 to-blue-500/15 text-white/70">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{svc.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIVE PREVIEW — mock browser window
          ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400/80">
              See it in action
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
              From brief to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                beautiful
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
              Write a few sentences about your business. Dominat8 generates a premium multi-page
              site with hero, services, pricing, FAQ, and contact — all structured for conversion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={CTA.primary.href}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black no-underline transition hover:bg-white/90"
              >
                Try it now
              </Link>
              <Link
                href="/templates"
                className="rounded-2xl border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 no-underline transition hover:bg-white/[0.07]"
              >
                Browse examples
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative rounded-3xl border border-white/[0.10] bg-white/[0.03] p-3 shadow-2xl shadow-purple-500/10 backdrop-blur">
              {/* Browser chrome */}
              <div className="flex items-center justify-between rounded-t-xl border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-black/30 px-4 py-1 text-xs text-white/50">
                  yoursite.com
                </div>
                <div className="w-[52px]" />
              </div>
              {/* Mock site content */}
              <div className="space-y-3 rounded-b-xl bg-black/30 p-5">
                <div className="h-3 w-2/5 rounded bg-white/[0.12]" />
                <div className="h-8 w-4/5 rounded bg-white/[0.08]" />
                <div className="h-3 w-3/5 rounded bg-white/[0.06]" />
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-purple-500/40 to-blue-500/40" />
                  <div className="h-8 w-20 rounded-lg border border-white/[0.10] bg-white/[0.04]" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-20 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                  <div className="h-20 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                  <div className="h-20 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                  <div className="h-16 rounded-xl border border-white/[0.08] bg-white/[0.03]" />
                </div>
              </div>
              {/* Shimmer overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMPARISON TABLE — us vs. traditional
          ═══════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <ScrollReveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400/80">
              Why Dominat8
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
              The old way is{" "}
              <span className="text-white/40 line-through decoration-white/20">expensive</span>.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-14 overflow-hidden rounded-3xl border border-white/[0.08]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-400">
                      Dominat8
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/30">
                      Traditional
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={idx < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white/70">{row.feature}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{row.d8}</td>
                      <td className="px-6 py-4 text-sm text-white/35">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollReveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400/80">
            Proof
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Builders love Dominat8
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={t.name} delay={idx * 120}>
              <div className="relative h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7">
                {/* Stars */}
                <div className="mb-4 flex gap-1 text-yellow-400/80">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/70">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <div className="text-sm font-semibold text-white/90">{t.name}</div>
                  <div className="text-xs text-white/45">{t.detail}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <ScrollReveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-purple-400/80">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Questions? Answered.
            </h2>
          </ScrollReveal>

          <div className="mt-14 space-y-3">
            {FAQ.map((item, idx) => (
              <ScrollReveal key={item.q} delay={idx * 60}>
                <FAQItem q={item.q} a={item.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA — the close
          ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-gradient-to-br from-purple-500/10 via-black/40 to-blue-500/10 p-10 text-center md:p-16">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_50%,rgba(168,85,247,0.15),transparent_60%)]" aria-hidden="true" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
                Ready to dominate?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/55">
                Join thousands of businesses building premium websites with AI.
                Start free — no credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={CTA.primary.href}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-black no-underline shadow-2xl shadow-white/10 transition-all hover:shadow-white/20 hover:brightness-110"
                >
                  {CTA.primary.label}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href={CTA.tertiary.href}
                  className="text-sm font-medium text-white/60 no-underline transition hover:text-white"
                >
                  {CTA.tertiary.label} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500" />
                <span className="text-sm font-bold tracking-[0.18em] uppercase text-white">{BRAND.name}</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-white/40">{BRAND.tagline}</p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm sm:grid-cols-3">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">Product</div>
                <div className="space-y-2.5">
                  <Link href="/templates" className="block text-white/55 no-underline transition hover:text-white">Templates</Link>
                  <Link href="/pricing" className="block text-white/55 no-underline transition hover:text-white">Pricing</Link>
                  <Link href="/use-cases" className="block text-white/55 no-underline transition hover:text-white">Use cases</Link>
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">Company</div>
                <div className="space-y-2.5">
                  <Link href="/about" className="block text-white/55 no-underline transition hover:text-white">About</Link>
                  <Link href="/faq" className="block text-white/55 no-underline transition hover:text-white">FAQ</Link>
                  <Link href="/contact" className="block text-white/55 no-underline transition hover:text-white">Contact</Link>
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">Legal</div>
                <div className="space-y-2.5">
                  <Link href="/privacy" className="block text-white/55 no-underline transition hover:text-white">Privacy</Link>
                  <Link href="/terms" className="block text-white/55 no-underline transition hover:text-white">Terms</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 md:flex-row">
            <div className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
            <div className="text-xs text-white/30">
              Powered by{" "}
              <a href={BRAND.productUrl} className="text-white/50 no-underline transition hover:text-white">
                {BRAND.product}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
