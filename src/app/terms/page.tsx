import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Dominat8 terms of service.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-24 md:pt-44">
        <article className="mx-auto max-w-3xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Legal
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-[var(--color-fg-3)]">
            Last updated: {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="prose-content mt-10 space-y-8 text-[var(--color-fg-2)]">
            <Section title="Acceptance">
              <p>
                By accessing dominat8.com or dominat8.io you agree to these
                Terms. If you disagree with any part, don&rsquo;t use the
                service.
              </p>
            </Section>
            <Section title="Account & billing">
              <p>
                Paid plans are billed in advance on a monthly basis. Overage is
                charged per generation on paid plans. All paid plans include a
                14-day money-back guarantee.
              </p>
            </Section>
            <Section title="Acceptable use">
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Don&rsquo;t generate content that infringes third-party
                  rights, targets protected classes, or violates platform
                  policies.
                </li>
                <li>
                  Don&rsquo;t attempt to reverse-engineer or disrupt the
                  service.
                </li>
                <li>
                  You&rsquo;re responsible for the legality of any content you
                  publish.
                </li>
              </ul>
            </Section>
            <Section title="Intellectual property">
              <p>
                You own your inputs and the generated outputs derived from
                them. We retain rights to the underlying models, tooling, and
                platform.
              </p>
            </Section>
            <Section title="Liability">
              <p>
                The service is provided as-is. Our total liability is capped at
                the amount you paid in the preceding 12 months.
              </p>
            </Section>
            <Section title="Contact">
              <p>
                Questions:{" "}
                <a
                  className="text-[var(--color-accent)] hover:underline"
                  href="mailto:legal@dominat8.com"
                >
                  legal@dominat8.com
                </a>
                .
              </p>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-[-0.015em] text-[var(--color-fg)]">
        {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed">{children}</div>
    </section>
  );
}
