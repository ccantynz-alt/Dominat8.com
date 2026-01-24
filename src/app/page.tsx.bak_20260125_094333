export const dynamic = "force-dynamic";

/**
 * Calm premium build stamps:
 * - On Vercel: prefers VERCEL_GIT_COMMIT_SHA, falls back to VERCEL_DEPLOYMENT_ID
 * - Locally: falls back to timestamp
 */
function getBuild() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA ?? "";
  const dep = process.env.VERCEL_DEPLOYMENT_ID ?? "";

  const stamp =
    (commit ? "GIT_" + commit.slice(0, 8) : "") ||
    (dep ? "DEPLOY_" + dep.slice(0, 8) : "") ||
    "LOCAL_" + new Date().toISOString().replace(/[:.TZ-]/g, "").slice(0, 14);

  const deployId =
    (dep ? dep.slice(0, 12) : "") ||
    (commit ? commit.slice(0, 12) : "") ||
    "local";

  return { stamp, deployId };
}

const logos = ["Vercel-ready", "SEO-first", "Fast builds", "Clean output", "Templates", "Automation"];

export default function Home() {
  const build = getBuild();

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ALWAYS-VISIBLE PROOF BOX */}
      <div className="fixed left-4 top-4 z-[9999] rounded-2xl border border-white/15 bg-black/70 px-4 py-3 text-left shadow-sm backdrop-blur">
        <div className="text-xs uppercase tracking-[0.28em] text-white/70">LIVE_OK</div>
        <div className="mt-1 text-sm font-semibold text-white">DEPLOY_ID: {build.deployId}</div>
        <div className="text-sm font-semibold text-white">BUILD_STAMP: {build.stamp}</div>
        <div className="mt-1 text-[11px] text-white/50">
          If you don&apos;t see this box, you&apos;re not on the deployed route.
        </div>
        <div className="mt-1 text-[11px] text-white/45">HOME_OK</div>
      </div>

      {/* TOP NAV (calm, minimal) */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="group flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-black text-sm font-semibold shadow-sm">
              D8
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Dominat8</div>
              <div className="text-[11px] text-white/60">AI Website Builder</div>
            </div>
          </a>

          <nav className="hidden items-center gap-2 text-sm text-white/75 sm:flex">
            <a className="rounded-lg px-3 py-2 hover:bg-white/5 transition" href="/templates">Templates</a>
            <a className="rounded-lg px-3 py-2 hover:bg-white/5 transition" href="/use-cases">Use cases</a>
            <a className="rounded-lg px-3 py-2 hover:bg-white/5 transition" href="/pricing">Pricing</a>
            <a
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
              href="/templates"
            >
              Get started
            </a>
          </nav>

          <a
            className="sm:hidden inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
            href="/templates"
          >
            Start
          </a>
        </div>
      </header>

      {/* HERO (premium calm) */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_15%,rgba(255,255,255,0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_40%,rgba(255,255,255,0.09),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_55%,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.10] d8-grid" />
          <div className="absolute inset-0 d8-vignette" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-20 pb-14 sm:pb-16">
          <div className="mx-auto max-w-4xl text-center d8-fade-in">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["AI agents", "SEO-ready", "Publish-fast", "Premium output"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 text-xs uppercase tracking-[0.32em] text-white/55">
              Build. Optimize. Publish.
            </div>

            <h1 className="mt-5 text-[clamp(2.9rem,6.6vw,6.1rem)] font-semibold leading-[1.02] tracking-tight text-white">
              Websites that feel
              <span className="block text-white/80">premium </span>
              <span className="block">built by automation.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Dominat8 generates a complete site, locks in SEO-first fundamentals, and gets you live fast.
              Stop tweaking. Start shipping.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/templates"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-white/90 transition shadow-sm"
              >
                Start building
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white hover:bg-white/[0.12] transition"
              >
                View pricing
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-xs text-white/50">
              <span className="inline-block h-6 w-[1px] bg-white/20" />
              <span>No fluff  No busywork  Just output</span>
              <span className="inline-block h-6 w-[1px] bg-white/20" />
            </div>
          </div>

          {/* Logo strip / social proof (clean placeholder) */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:px-8 sm:py-7">
              <div className="text-center text-[11px] uppercase tracking-[0.32em] text-white/45">
                Built for founders, agencies, operators
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {logos.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/65"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs uppercase tracking-[0.32em] text-white/55">How it works</div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-white leading-[1.05]">
              A clean pipeline from idea to publish.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Keep the process simple. Keep the result sharp.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">Step 01</div>
              <div className="mt-3 text-lg font-semibold">Choose a template</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Start from a proven layout. No blank-page anxiety.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">Step 02</div>
              <div className="mt-3 text-lg font-semibold">Let agents build</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Pages, copy, structure, and SEO fundamentals  handled.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">Step 03</div>
              <div className="mt-3 text-lg font-semibold">Publish clean</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Push live with confidence. Iterate without chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (premium cards) */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-8 sm:p-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-[0.32em] text-white/60">Designed to convert</div>
                <h3 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">
                  The page feels expensive.
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                  Strong hierarchy, calm contrast, and spacing that reads like a premium SaaS.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="/templates"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-white/90 transition"
                >
                  Start building
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white hover:bg-white/[0.12] transition"
                >
                  See pricing
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <div className="text-sm font-semibold">SEO fundamentals</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Structure that reads clearly to humans and search engines.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <div className="text-sm font-semibold">Consistent multi-page output</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Pricing, FAQs, contact  cohesive by design.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
                <div className="text-sm font-semibold">Fast publish loop</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Iterate quickly without breaking the whole site.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center text-[11px] text-white/35">
              Flagship v3 (Polished A)  BUILD_STAMP: {build.stamp}  DEPLOY_ID: {build.deployId}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium">Dominat8</div>
            <div className="text-xs text-white/45"> {new Date().getFullYear()} Dominat8.com  Built on Vercel</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/55">
            <a className="underline-offset-4 hover:underline" href="/pricing">Pricing</a>
            <a className="underline-offset-4 hover:underline" href="/templates">Templates</a>
            <a className="underline-offset-4 hover:underline" href="/use-cases">Use cases</a>
          </div>
        </div>
      </footer>

      {/* Minimal global helpers (kept inside page.tsx so we don't touch globals.css) */}
      <style>{`
        .d8-grid {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 70%);
        }
        .d8-vignette {
          background: radial-gradient(1200px 700px at 50% 20%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.85) 100%);
        }
        .d8-fade-in {
          animation: d8FadeIn 700ms ease-out both;
        }
        @keyframes d8FadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.995); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .d8-fade-in { animation: none; }
        }
      `}</style>
    </main>
  );
}
