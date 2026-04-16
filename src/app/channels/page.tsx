import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { BUILDER_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Channels",
  description:
    "Launch across every surface your customers actually use. Paid social, search, email, SMS, podcasts, and influencer outreach — all from one brief.",
};

const GROUPS = [
  {
    title: "Paid social",
    note: "Channel-native aspect ratios and copy length. Generated per placement.",
    items: [
      "Meta Ads (Facebook + Instagram)",
      "TikTok Ads",
      "LinkedIn Ads",
      "X / Twitter Ads",
      "Snapchat Ads",
      "Reddit Ads",
      "Pinterest Ads",
    ],
  },
  {
    title: "Search & shopping",
    note: "Keyword research, ad groups, and shopping feeds — all generated and refreshed.",
    items: [
      "Google Ads (Search + Display + Performance Max)",
      "Bing Ads",
      "YouTube Ads",
      "Google Shopping",
      "Amazon Ads",
    ],
  },
  {
    title: "Owned & earned",
    note: "Your direct-to-customer surfaces, plus outreach at scale.",
    items: [
      "Email (Klaviyo, Mailchimp, Customer.io)",
      "SMS (Twilio, Postscript)",
      "Web push notifications",
      "Podcasts (host-read scripts + placements)",
      "Influencer outreach (briefs, deliverables, tracking)",
      "Organic social scheduling",
    ],
  },
  {
    title: "Broadcast & offline",
    note: "Long-form creative where it still moves the needle.",
    items: [
      "Connected TV (YouTube CTV, Roku, Samsung Ads)",
      "Streaming audio (Spotify, iHeart)",
      "Podcast sponsorships",
      "Out-of-home (digital billboards, transit)",
    ],
  },
];

export default function ChannelsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-36 pb-16 md:pt-44">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Channels
            </div>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              One brief.
              <br />
              <span className="text-[var(--color-accent)]">Every channel.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-fg-2)]">
              Dominat8 generates channel-native assets — every aspect ratio,
              copy length, and tone — from a single product upload.
            </p>
          </div>
        </section>

        <section className="py-10 pb-24">
          <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2">
            {GROUPS.map((g) => (
              <article
                key={g.title}
                className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-2)] p-8"
              >
                <h2 className="text-lg font-semibold tracking-[-0.015em]">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-fg-3)]">
                  {g.note}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {g.items.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-fg-2)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
              Don&rsquo;t see your channel?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-fg-2)]">
              We add channels continuously. Paid Pro and Agency customers can
              request new integrations — most ship within weeks.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTA href={BUILDER_URL} variant="primary" size="lg" external>
                Start free
              </CTA>
              <CTA href="/contact" variant="secondary" size="lg">
                Request a channel
              </CTA>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
