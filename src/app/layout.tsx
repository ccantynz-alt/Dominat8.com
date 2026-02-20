import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dominat8.com"),
  title: {
    default: "Dominat8 - The AI Website Builder for the 1%",
    template: "%s | Dominat8",
  },
  description:
    "The AI Website Builder for the 1%. Dominat8 the web with instant deployment, SEO predation, and infinite scaling.",
  keywords: ["AI website builder", "Dominat8", "web development", "SEO", "Matrix API"],
  authors: [{ name: "Dominat8" }],
  creator: "Dominat8",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dominat8.com",
    siteName: "Dominat8",
    title: "Dominat8 - The AI Website Builder for the 1%",
    description: "The AI Website Builder for the 1%. Dominat8 the web with instant deployment, SEO predation, and infinite scaling.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dominat8" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominat8 - The AI Website Builder for the 1%",
    description: "The AI Website Builder for the 1%. Dominat8 the web.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dominat8.com",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020202",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{ backgroundColor: "#020202" }}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
