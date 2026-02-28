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

/* ─────────────────────────────────────────────────
   Unique futuristic icons for each service card
   Thin-line, gradient-ready, 24x24 viewBox
   ───────────────────────────────────────────────── */
const SERVICE_ICONS = [
  // 0 — Flagship homepage (layout grid)
  <svg key="i0" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
    <rect x="3" y="3" width="7" height="9" rx="2" />
    <rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="12" width="7" height="9" rx="2" />
    <rect x="3" y="16" width="7" height="5" rx="2" />
  </svg>,
  // 1 — Pricing page (tag / diamond)
  <svg key="i1" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad2)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="iconGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
  // 2 — FAQ page (chat bubble)
  <svg key="i2" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="iconGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>,
  // 3 — Contact page (signal / broadcast)
  <svg key="i3" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad4)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="iconGrad4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
    <path d="M5.636 18.364a9 9 0 010-12.728" />
    <path d="M18.364 5.636a9 9 0 010 12.728" />
    <path d="M8.464 15.536a5 5 0 010-7.072" />
    <path d="M15.536 8.464a5 5 0 010 7.072" />
    <circle cx="12" cy="12" r="1.5" fill="url(#iconGrad4)" stroke="none" />
  </svg>,
  // 4 — SEO structure (search globe)
  <svg key="i4" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad5)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="iconGrad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 3a15.3 15.3 0 014 8 15.3 15.3 0 01-4 8" />
    <path d="M11 3a15.3 15.3 0 00-4 8 15.3 15.3 0 004 8" />
    <path d="M3.5 11h15" />
  </svg>,
  // 5 — Publish-ready (rocket)
  <svg key="i5" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="iconGrad6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#60a5fa" /></linearGradient></defs>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
] as const;

/* ─────────────────────────────────────────────────
   Step icons for the "How it works" section
   ───────────────────────────────────────────────── */
const STEP_ICONS = [
  // Describe — pen/edit
  <svg key="s0" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="url(#stepGrad1)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="stepGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e879f9" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
  // Generate — sparkles/AI
  <svg key="s1" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="url(#stepGrad2)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="stepGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e879f9" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
  </svg>,
  // Dominate — zap/lightning
  <svg key="s2" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="url(#stepGrad3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="stepGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e879f9" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="url(#stepGrad3)" fillOpacity="0.1" />
  </svg>,
] as const;

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ═══════════════════════════════════════
          GLOBAL BACKGROUND — enhanced aurora
          ═══════════════════════════════════════ */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[#05050A]" />
        {/* Primary purple blob — larger, more vibrant */}
        <div className="absolute left-[-20%] top-[-15%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.24),transparent_55%)] blur-3xl" />
        {/* Blue blob */}
        <div className="absolute right-[-10%] top-[10%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_55%)] blur-3xl" />
        {/* Cyan accent — futuristic pop */}
        <div className="absolute left-[40%] top-[30%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_55%)] blur-3xl" />
        {/* Bottom purple */}
        <div className="absolute bottom-[-20%] left-[20%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),transparent_55%)] blur-3xl" />
        {/* Bottom blue accent */}
        <div className="absolute bottom-[-10%] right-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.10),transparent_55%)] blur-3xl" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] [background-size:32px_32px]" />
        {/* Scan line — subtle horizontal */}
        <div className="absolute inset-0 opacity-[0.015] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)]" />
      </div>

      {/* ═══════════════════════════════════════
          STICKY NAV — glass
          ═══════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-white no-underline">
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25">
              <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <span className="text-sm font-bold tracking-[0.18em] uppercase">{BRAND.name}</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-white/50 md:flex">
            <a href="#how" className="transition-colors hover:text-white no-underline">How it works</a>
            <a href="#features" className="transition-colors hover:text-white no-underline">Features</a>
            <Link href="/pricing" className="transition-colors hover:text-white no-underline">Pricing</Link>
            <Link href="/templates" className="transition-colors hover:text-white no-underline">Templates</Link>
            <Link href="/admin/cockpit" className="transition-colors hover:text-white no-underline">Developers</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={CTA.primary.href}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:brightness-110"
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
              "radial-gradient(800px circle at var(--gx, 50%) var(--gy, 40%), rgba(168,85,247,0.14), transparent 50%)",
          }}
          aria-hidden="true"
        />

        <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          {/* Kicker — glassmorphism pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-5 py-2.5 text-xs font-medium text-white/80 shadow-lg shadow-purple-500/5 backdrop-blur-xl">
            <span className="relative h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400/60" />
              <span className="absolute inset-0 rounded-full bg-green-400" />
            </span>
            {HERO.kicker}
          </div>

          {/* Headline */}
          <h1 className="max-w-5xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {HERO.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              {HERO.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg md:text-xl">
            {HERO.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href={CTA.primary.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-base font-bold text-white no-underline shadow-2xl shadow-purple-500/30 transition-all hover:shadow-purple-500/50 hover:brightness-110"
            >
              {/* Inner glass sheen */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">{CTA.primary.label}</span>
              <span className="relative transition-transform group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link
              href={CTA.secondary.href}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.14] bg-white/[0.06] px-8 py-4 text-base font-semibold text-white/80 no-underline backdrop-blur-xl transition-all hover:border-white/[0.24] hover:bg-white/[0.10] hover:shadow-lg hover:shadow-white/5"
            >
              {CTA.secondary.label}
            </Link>
          </div>

          {/* Stats row — glass cards */}
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="group rounded-2xl border border-white/[0.10] bg-white/[0.05] px-4 py-5 backdrop-blur-xl transition-all hover:border-white/[0.18] hover:bg-white/[0.08] hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  <AnimatedNumber value={s.value} />
                </div>
                <div className="mt-1 text-xs text-white/45">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/25">
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-purple-400/40 to-white/30" />
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          </div>
        </section>
      </HeroGlow>

      {/* ═══════════════════════════════════════
          TRUST STRIP — glass pills
          ═══════════════════════════════════════ */}
      <section className="border-y border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center">
          <ScrollReveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/35">
              Built for businesses that want to win
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {AUDIENCES.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/[0.12] bg-white/[0.06] px-5 py-2.5 text-sm text-white/70 backdrop-blur-xl transition-all hover:border-purple-400/30 hover:bg-white/[0.08] hover:text-white/90 hover:shadow-lg hover:shadow-purple-500/5"
                >
                  {a}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS — 3-step process, glass cards
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
          <p className="mx-auto mt-4 max-w-xl text-base text-white/45">
            No code. No designers. No waiting. Describe your business and watch it come to life.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <ScrollReveal key={step.title} delay={idx * 120}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.04] p-8 backdrop-blur-xl transition-all hover:border-white/[0.18] hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Glass inner highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Step icon */}
                <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.12] bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-inner shadow-white/5 backdrop-blur">
                  {STEP_ICONS[idx]}
                </div>
                <h3 className="relative text-xl font-bold text-white">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/50">{step.desc}</p>

                {/* Hover glow — corner accent */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES — unique icons, glass cards
          ═══════════════════════════════════════ */}
      <section id="features" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <ScrollReveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400/80">
              What you get
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
              Everything you need.
              <span className="text-white/40"> Nothing you don&apos;t.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc, idx) => (
              <ScrollReveal key={svc.title} delay={idx * 80}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.04] p-7 backdrop-blur-xl transition-all hover:border-white/[0.20] hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-purple-500/10">
                  {/* Glass top sheen */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

                  {/* Icon container — glass circle */}
                  <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.14] bg-gradient-to-br from-purple-500/15 to-blue-500/15 shadow-lg shadow-purple-500/5 backdrop-blur-xl">
                    {SERVICE_ICONS[idx]}
                  </div>
                  <h3 className="relative text-lg font-semibold text-white">{svc.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/50">{svc.body}</p>

                  {/* Hover corner glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-500/15 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIVE PREVIEW — glass browser window
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
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/45">
              Write a few sentences about your business. Dominat8 generates a premium multi-page
              site with hero, services, pricing, FAQ, and contact — all structured for conversion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={CTA.primary.href}
                className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/30 hover:brightness-110"
              >
                Try it now
              </Link>
              <Link
                href="/templates"
                className="rounded-2xl border border-white/[0.14] bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white/80 no-underline backdrop-blur-xl transition-all hover:border-white/[0.22] hover:bg-white/[0.10]"
              >
                Browse examples
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.05] p-3 shadow-2xl shadow-purple-500/10 backdrop-blur-2xl">
              {/* Glass top edge highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Browser chrome */}
              <div className="flex items-center justify-between rounded-t-xl border-b border-white/[0.10] bg-white/[0.04] px-4 py-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80 shadow-sm shadow-red-400/30" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80 shadow-sm shadow-yellow-400/30" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80 shadow-sm shadow-green-400/30" />
                </div>
                <div className="rounded-lg border border-white/[0.10] bg-black/40 px-4 py-1.5 text-xs text-white/40 backdrop-blur">
                  yoursite.com
                </div>
                <div className="w-[52px]" />
              </div>
              {/* Mock site content */}
              <div className="space-y-3 rounded-b-xl bg-black/30 p-5">
                <div className="h-3 w-2/5 rounded bg-white/[0.12]" />
                <div className="h-8 w-4/5 rounded bg-gradient-to-r from-white/[0.10] to-white/[0.06]" />
                <div className="h-3 w-3/5 rounded bg-white/[0.06]" />
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-purple-500/50 to-blue-500/50 shadow-md shadow-purple-500/10" />
                  <div className="h-8 w-20 rounded-lg border border-white/[0.12] bg-white/[0.06]" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-20 rounded-xl border border-white/[0.10] bg-white/[0.04] backdrop-blur" />
                  <div className="h-20 rounded-xl border border-white/[0.10] bg-white/[0.04] backdrop-blur" />
                  <div className="h-20 rounded-xl border border-white/[0.10] bg-white/[0.04] backdrop-blur" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-xl border border-white/[0.10] bg-white/[0.04] backdrop-blur" />
                  <div className="h-16 rounded-xl border border-white/[0.10] bg-white/[0.04] backdrop-blur" />
                </div>
              </div>
              {/* Shimmer overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMPARISON TABLE — glass table
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
            <div className="mt-14 overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.03] backdrop-blur-xl">
              {/* Glass top edge */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.10] bg-white/[0.04]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/35">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-400">
                      Dominat8
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/25">
                      Traditional
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={`transition-colors hover:bg-white/[0.03] ${idx < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white/60">{row.feature}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{row.d8}</td>
                      <td className="px-6 py-4 text-sm text-white/30">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS — glass cards
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
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.04] p-7 backdrop-blur-xl transition-all hover:border-white/[0.18] hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-purple-500/5">
                {/* Glass top sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

                {/* Stars — gradient colored */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="url(#starGrad)" viewBox="0 0 20 20">
                      <defs>
                        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/65">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <div className="text-sm font-semibold text-white/90">{t.name}</div>
                  <div className="text-xs text-white/40">{t.detail}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ — glass accordion
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
          FINAL CTA — dramatic glass
          ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-gradient-to-br from-purple-500/10 via-black/40 to-blue-500/10 p-10 text-center backdrop-blur-2xl md:p-16">
            {/* Glass inner edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

            {/* Background glow — intensified */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_50%,rgba(168,85,247,0.20),transparent_60%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_60%_40%,rgba(59,130,246,0.12),transparent_60%)]" aria-hidden="true" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
                Ready to dominate?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
                Join thousands of businesses building premium websites with AI.
                Start free — no credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={CTA.primary.href}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-base font-bold text-white no-underline shadow-2xl shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">{CTA.primary.label}</span>
                  <span className="relative transition-transform group-hover:translate-x-1" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href={CTA.tertiary.href}
                  className="text-sm font-medium text-white/55 no-underline transition-colors hover:text-white"
                >
                  {CTA.tertiary.label} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER — clean glass
          ═══════════════════════════════════════ */}
      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20">
                  <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
                </div>
                <span className="text-sm font-bold tracking-[0.18em] uppercase text-white">{BRAND.name}</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-white/35">{BRAND.tagline}</p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-sm sm:grid-cols-4">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/25">Product</div>
                <div className="space-y-2.5">
                  <Link href="/templates" className="block text-white/50 no-underline transition-colors hover:text-white">Templates</Link>
                  <Link href="/pricing" className="block text-white/50 no-underline transition-colors hover:text-white">Pricing</Link>
                  <Link href="/use-cases" className="block text-white/50 no-underline transition-colors hover:text-white">Use cases</Link>
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/25">Developers</div>
                <div className="space-y-2.5">
                  <Link href="/admin/cockpit" className="block text-white/50 no-underline transition-colors hover:text-white">Cockpit</Link>
                  <Link href="/admin/agents" className="block text-white/50 no-underline transition-colors hover:text-white">Agents</Link>
                  <Link href="/admin" className="block text-white/50 no-underline transition-colors hover:text-white">Admin</Link>
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/25">Company</div>
                <div className="space-y-2.5">
                  <Link href="/about" className="block text-white/50 no-underline transition-colors hover:text-white">About</Link>
                  <Link href="/faq" className="block text-white/50 no-underline transition-colors hover:text-white">FAQ</Link>
                  <Link href="/contact" className="block text-white/50 no-underline transition-colors hover:text-white">Contact</Link>
                </div>
              </div>
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/25">Legal</div>
                <div className="space-y-2.5">
                  <Link href="/privacy" className="block text-white/50 no-underline transition-colors hover:text-white">Privacy</Link>
                  <Link href="/terms" className="block text-white/50 no-underline transition-colors hover:text-white">Terms</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 md:flex-row">
            <div className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
            <div className="text-xs text-white/25">
              Powered by{" "}
              <a href={BRAND.productUrl} className="text-white/45 no-underline transition-colors hover:text-white">
                {BRAND.product}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
