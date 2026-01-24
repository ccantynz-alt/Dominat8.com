/* src/app/page.tsx */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* PROBE OVERLAY (proves deploy + freshness) */}
      <div className="fixed left-4 top-4 z-[9999] rounded-2xl border border-white/20 bg-black/70 px-4 py-3 text-left shadow-sm">
        <div className="text-xs uppercase tracking-[0.28em] text-white/70">LIVE_OK</div>
        <div className="mt-1 text-sm font-semibold text-white">DEPLOY_ID: {""}b126a38b7f08{""}</div>
        <div className="text-sm font-semibold text-white">BUILD_STAMP: {""}BUILD_20260124_230948{""}</div>
        <div className="mt-1 text-xs text-white/50">
          If you don’t see this box, you’re not on the deployed route.
        </div>
      </div>

      {/* FULL SCREEN HERO */}
      <section className="relative flex min-h-[100svh] w-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:22px_22px] opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-3xl opacity-45" />
        </div>

        <div className="relative mx-auto w-full px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 text-xs uppercase tracking-[0.28em] text-white/60">
              Dominat8 — AI website automation
            </div>

            <h1 className="text-[clamp(3.2rem,7vw,6.2rem)] font-semibold leading-[1.02] tracking-tight text-white">
              Build high-converting websites
              <span className="block text-white/80">in minutes.</span>
              <span className="block">With AI agents.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              Generate a complete site, lock in SEO-ready fundamentals, then publish fast.
              No messy templates. No endless tweaks. Just a sharp launch.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/templates"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-white/90"
              >
                Start building
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white hover:bg-white/[0.12]"
              >
                View pricing
              </a>
            </div>

            <div className="mt-10 text-xs text-white/45">HOME_OK</div>
          </div>
        </div>
      </section>
    </main>
  );
}
