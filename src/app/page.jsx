import { BUILD_MARKER } from "../lib/buildMarker";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.8 14.6 3.7 10.5l1.4-1.4 2.7 2.7 7.2-7.2 1.4 1.4-8.6 8.6z"
      />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-hidden="true">
      <svg viewBox="0 0 20 20" className="h-4 w-4"><path fill="currentColor" d="M10 14.9 4.1 18l1.1-6.4L.6 7.2l6.4-.9L10 0.5l3 5.8 6.4.9-4.6 4.4 1.1 6.4z"/></svg>
      <svg viewBox="0 0 20 20" className="h-4 w-4"><path fill="currentColor" d="M10 14.9 4.1 18l1.1-6.4L.6 7.2l6.4-.9L10 0.5l3 5.8 6.4.9-4.6 4.4 1.1 6.4z"/></svg>
      <svg viewBox="0 0 20 20" className="h-4 w-4"><path fill="currentColor" d="M10 14.9 4.1 18l1.1-6.4L.6 7.2l6.4-.9L10 0.5l3 5.8 6.4.9-4.6 4.4 1.1 6.4z"/></svg>
      <svg viewBox="0 0 20 20" className="h-4 w-4"><path fill="currentColor" d="M10 14.9 4.1 18l1.1-6.4L.6 7.2l6.4-.9L10 0.5l3 5.8 6.4.9-4.6 4.4 1.1 6.4z"/></svg>
      <svg viewBox="0 0 20 20" className="h-4 w-4"><path fill="currentColor" d="M10 14.9 4.1 18l1.1-6.4L.6 7.2l6.4-.9L10 0.5l3 5.8 6.4.9-4.6 4.4 1.1 6.4z"/></svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Premium background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_10%,rgba(59,130,246,0.16),transparent_55%),radial-gradient(900px_circle_at_80%_15%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(700px_circle_at_50%_90%,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.70),rgba(255,255,255,1))]" />
      </div>

      {/* Top bar */}
      <div className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Green deployments enabled
            </span>
            <span className="hidden sm:inline text-slate-500">
              Build marker: <span className="font-mono text-slate-700">{BUILD_MARKER}</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a className="hover:text-slate-900" href="/__status">Status</a>
            <a className="hover:text-slate-900" href="/faq">FAQ</a>
            <a className="hover:text-slate-900" href="/contact">Contact</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <span className="text-sm font-semibold">D8</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Dominat8</div>
              <div className="text-xs text-slate-600">AI website automation builder</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-slate-700 md:flex">
            <a className="hover:text-slate-950" href="/templates">Templates</a>
            <a className="hover:text-slate-950" href="/use-cases">Use cases</a>
            <a className="hover:text-slate-950" href="/pricing">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <a className="rounded-xl px-4 py-2 text-sm text-slate-700 hover:text-slate-950" href="/sign-in">
              Sign in
            </a>
            <a
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm"
              href="/p/new"
            >
              Generate my site
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-6 pb-14">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs text-slate-700 ring-1 ring-slate-200 shadow-sm">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-semibold">
                D8
              </span>
              Premium, clean, fast — SiteGround-style build
              <span className="ml-1 font-mono text-slate-500">({BUILD_MARKER})</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Build a website that looks expensive — automatically.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-700 md:text-lg">
              Dominat8 generates a full website from a brief, then runs the pipeline:
              pages, SEO, sitemap, and publish — with controls you can trust.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/p/new"
                className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm"
              >
                Generate my site now
              </a>
              <a
                href="/preview/marketing"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 shadow-sm"
              >
                See a live preview
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200 shadow-sm">
                <div className="mt-0.5 text-emerald-600"><CheckIcon /></div>
                <div>
                  <div className="text-sm font-semibold text-slate-950">Fast pipeline</div>
                  <div className="mt-1 text-xs text-slate-600">From brief → pages → publish in minutes.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200 shadow-sm">
                <div className="mt-0.5 text-emerald-600"><CheckIcon /></div>
                <div>
                  <div className="text-sm font-semibold text-slate-950">SEO built-in</div>
                  <div className="mt-1 text-xs text-slate-600">Titles, metas, schema, sitemap, robots.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right card */}
          <div className="md:col-span-5">
            <div className="rounded-3xl bg-white/80 p-6 ring-1 ring-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-600">Trusted quality</div>
                  <div className="mt-1 text-lg font-semibold text-slate-950">Premium output, every time</div>
                </div>
                <StarRow />
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="text-xs font-semibold text-slate-700">What you get</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-emerald-600"><CheckIcon /></span> Homepage + marketing pages</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-600"><CheckIcon /></span> SEO plan + sitemap</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-600"><CheckIcon /></span> Publish-ready HTML</li>
                </ul>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href="/pricing"
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 shadow-sm"
                >
                  View pricing
                </a>
                <a
                  href="/__status"
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 shadow-sm"
                >
                  Check status
                </a>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Pro tip: If prod ever looks “stuck”, open <span className="font-mono text-slate-700">/__status</span> and compare the marker.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* “How it works” */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-3xl bg-white/80 p-8 ring-1 ring-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-600">How it works</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            A simple flow that ships real results
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <div className="text-xs font-semibold text-slate-600">Step 1</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">Brief</div>
              <p className="mt-2 text-sm text-slate-700">
                Tell us what you do. We extract structure, tone, and layout rhythm.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <div className="text-xs font-semibold text-slate-600">Step 2</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">Generate</div>
              <p className="mt-2 text-sm text-slate-700">
                Pages + content + components — polished, consistent, and brand-aligned.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <div className="text-xs font-semibold text-slate-600">Step 3</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">Publish</div>
              <p className="mt-2 text-sm text-slate-700">
                SEO, sitemap, and publish artifacts — ready to ship on your domain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
          <div className="text-xs text-white/70">Ready to ship?</div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Generate your next website in minutes — not weeks.
          </h3>
          <p className="mt-3 text-sm text-white/75">
            You’re green. You’re in control. Now we ship the “real” version.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/p/new"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90"
            >
              Generate my site
            </a>
            <a
              href="/pricing"
              className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
            >
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-950">Dominat8</div>
              <div className="mt-1 text-xs text-slate-600">
                Build marker: <span className="font-mono text-slate-700">{BUILD_MARKER}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
              <a className="hover:text-slate-950" href="/templates">Templates</a>
              <a className="hover:text-slate-950" href="/use-cases">Use cases</a>
              <a className="hover:text-slate-950" href="/pricing">Pricing</a>
              <a className="hover:text-slate-950" href="/faq">FAQ</a>
              <a className="hover:text-slate-950" href="/contact">Contact</a>
              <a className="hover:text-slate-950" href="/terms">Terms</a>
              <a className="hover:text-slate-950" href="/__status">Status</a>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} Dominat8. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
