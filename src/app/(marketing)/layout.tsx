import Link from "next/link";
import { marketingFooter, marketingNav, marketingRoutes } from "@/src/lib/marketing/routes";

export const metadata = {
  title: "Dominat8",
  description: "AI website automation builder — generate, optimize, and publish with agents.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href={marketingRoutes.home} className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-black/[0.03] text-sm font-semibold">
              D8
            </div>
            <div className="text-sm font-semibold tracking-tight">Dominat8</div>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {marketingNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm opacity-70 hover:opacity-100"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="hidden rounded-md border border-black/15 px-4 py-2 text-sm hover:bg-black/[0.03] md:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-90"
            >
              Start free
            </Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-4 md:hidden">
          <div className="flex flex-wrap gap-3">
            {marketingNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-full border border-black/10 px-3 py-1 text-xs opacity-80 hover:bg-black/[0.03]"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-black/10">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold">Dominat8</div>
              <div className="mt-2 text-sm opacity-70">
                AI website automation builder — generate, optimize, publish.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {marketingFooter.map((f) => (
                <Link key={f.href} href={f.href} className="text-sm opacity-70 hover:opacity-100">
                  {f.label}
                </Link>
              ))}
              <div className="text-sm opacity-50">© {new Date().getFullYear()} Dominat8</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}