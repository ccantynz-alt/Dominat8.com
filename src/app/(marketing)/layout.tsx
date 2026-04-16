import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dominat8.com"),
  title: {
    default: "Dominat8 — AI Marketing, Fully Automated",
    template: "%s — Dominat8",
  },
  description:
    "Upload your product. Dominat8's AI generates a full launch — copy, video, imagery, voice — across every channel and market. Live in minutes.",
  applicationName: "Dominat8",
  openGraph: {
    type: "website",
    url: "https://www.dominat8.com",
    siteName: "Dominat8",
    title: "Dominat8 — AI Marketing, Fully Automated",
    description:
      "Upload a product. Launch a campaign across every channel and market — in minutes.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dominat8" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominat8 — AI Marketing, Fully Automated",
    description:
      "Upload a product. Launch a campaign across every channel and market — in minutes.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
