import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { BUILDER_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Dominat8 team. For product support, start in the builder. For partnerships or press, use the links below.",
};

const LINKS = [
  {
    heading: "Product support",
    body: "Every question about campaigns, generations, or billing is fastest to answer from inside the builder.",
    cta: { href: BUILDER_URL, label: "Open the builder", external: true },
  },
  {
    heading: "Sales & partnerships",
    body: "Volume accounts, white-label, integrations, or enterprise needs — we'll come back within one business day.",
    cta: { href: "mailto:sales@dominat8.com", label: "sales@dominat8.com" },
  },
  {
    heading: "Press",
    body: "Coverage, interviews, or asset requests.",
    cta: { href: "mailto:press@dominat8.com", label: "press@dominat8.com" },
  },
  {
    heading: "Security",
    body: "Responsible disclosure or suspected vulnerabilities.",
    cta: { href: "mailto:security@dominat8.com", label: "security@dominat8.com" },
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-36 pb-16 md:pt-44">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Contact
            </div>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Let&rsquo;s talk.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-fg-2)]">
              Pick the right channel below and we&rsquo;ll come straight back to
              you.
            </p>
          </div>
        </section>

        <section className="py-10 pb-24">
          <div className="mx-auto grid max-w-4xl gap-5 px-6 md:grid-cols-2">
            {LINKS.map((l) => (
              <div
                key={l.heading}
                className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-2)] p-7"
              >
                <h2 className="text-lg font-semibold tracking-[-0.015em]">
                  {l.heading}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-2)]">
                  {l.body}
                </p>
                <div className="mt-5">
                  <CTA
                    href={l.cta.href}
                    variant="secondary"
                    size="md"
                    external={l.cta.external || l.cta.href.startsWith("mailto:")}
                  >
                    {l.cta.label}
                  </CTA>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
