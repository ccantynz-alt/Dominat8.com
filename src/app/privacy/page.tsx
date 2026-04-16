import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Dominat8 collects, uses, and protects your data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 pb-24 md:pt-44">
        <article className="mx-auto max-w-3xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Legal
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[var(--color-fg-3)]">
            Last updated: {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="prose-content mt-10 space-y-8 text-[var(--color-fg-2)]">
            <Section title="Overview">
              <p>
                This policy describes how Dominat8 (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;) handles personal data collected through
                dominat8.com and the Dominat8 product at dominat8.io. We aim
                for plain-English, minimal-collection defaults.
              </p>
            </Section>
            <Section title="What we collect">
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Account details you provide (name, email, billing info) when
                  you sign up on dominat8.io.
                </li>
                <li>
                  Product inputs you upload (images, descriptions, URLs) for
                  the purpose of generating campaigns.
                </li>
                <li>
                  Usage telemetry (page views, feature usage, error reports)
                  collected to improve the service.
                </li>
              </ul>
            </Section>
            <Section title="How we use it">
              <p>
                We use your data to operate the product, process billing,
                respond to support, and improve the service. We do not sell
                personal data.
              </p>
            </Section>
            <Section title="Third parties">
              <p>
                We use trusted processors for payments (Stripe), email, and
                infrastructure. Each processor is bound by a data-processing
                agreement.
              </p>
            </Section>
            <Section title="Your rights">
              <p>
                You can request access, correction, or deletion of your data at
                any time by emailing{" "}
                <a
                  className="text-[var(--color-accent)] hover:underline"
                  href="mailto:privacy@dominat8.com"
                >
                  privacy@dominat8.com
                </a>
                .
              </p>
            </Section>
            <Section title="Contact">
              <p>
                Questions about this policy:{" "}
                <a
                  className="text-[var(--color-accent)] hover:underline"
                  href="mailto:privacy@dominat8.com"
                >
                  privacy@dominat8.com
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
