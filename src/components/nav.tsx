import { BrandWordmark } from "./brand";
import { CTA } from "./cta";
import { BUILDER_URL, NAV_LINKS } from "@/lib/site";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-[rgba(10,10,11,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        <BrandWordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-fg-2)] no-underline transition-colors hover:bg-white/[0.04] hover:text-[var(--color-fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CTA
            href={BUILDER_URL}
            variant="ghost"
            size="sm"
            external
            className="hidden sm:inline-flex"
          >
            Sign in
          </CTA>
          <CTA href={BUILDER_URL} variant="primary" size="sm" external>
            Get started
          </CTA>
        </div>
      </div>
    </header>
  );
}
