import { BrandMark } from "./brand";
import { FOOTER_LINKS, NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <BrandMark size={32} />
              <span className="text-base font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-3)]">
              {SITE.tagline} Upload a product, launch a campaign across every
              channel and market — in minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              heading="Product"
              links={NAV_LINKS.map((l) => ({ href: l.href, label: l.label }))}
            />
            <FooterCol
              heading="Company"
              links={[
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ]}
            />
            <FooterCol
              heading="Product app"
              links={[
                { href: "https://dominat8.io", label: "dominat8.io" },
                { href: "https://dominat8.io/builder", label: "Open builder" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-fg-3)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <ul className="flex gap-5">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[var(--color-fg-3)] no-underline transition-colors hover:text-[var(--color-fg)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-3)]">
        {heading}
      </div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <a
              href={l.href}
              className="text-sm text-[var(--color-fg-2)] no-underline transition-colors hover:text-[var(--color-fg)]"
              {...(l.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
