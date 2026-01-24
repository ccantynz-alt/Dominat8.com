/* src/app/(marketing)/layout.tsx */
import Link from "next/link";

export default function MarketingLayout(props: { children: any }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link className="flex items-center gap-2" href="/">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-black text-sm font-semibold text-white">
              D8
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Dominat8</div>
              <div className="text-[11px] opacity-70">AI Website Builder</div>
            </div>
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="/templates">
              Templates
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="/use-cases">
              Use cases
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="/pricing">
              Pricing
            </Link>
            <Link
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
              href="/templates"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">{props.children}</main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium">Dominat8</div>
            <div className="text-xs opacity-70">© 2026 Dominat8.com — Built on Vercel</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-xs opacity-80">
            <Link className="underline-offset-4 hover:underline" href="/pricing">Pricing</Link>
            <Link className="underline-offset-4 hover:underline" href="/templates">Templates</Link>
            <Link className="underline-offset-4 hover:underline" href="/use-cases">Use cases</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
