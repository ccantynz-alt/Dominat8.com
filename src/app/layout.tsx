import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dominat8 — AI Marketing, Fully Automated",
    template: "%s — Dominat8",
  },
  description:
    "Upload your product. Dominat8's AI generates a full launch — copy, video, imagery, voice — across every channel and market. Live in minutes.",
  metadataBase: new URL("https://www.dominat8.com"),
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-d8-black text-d8-text antialiased font-body">
        {children}
      </body>
    </html>
  );
}
