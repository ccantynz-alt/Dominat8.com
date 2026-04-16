/**
 * Centralised site constants. Single source of truth for copy, routes, and
 * pricing displayed on dominat8.com.
 *
 * Pricing MUST match CLAUDE.md (source of truth, wired to Stripe on
 * dominat8.io). If pricing changes on .io, update this file AND CLAUDE.md.
 */

export const BUILDER_URL = "https://dominat8.io/builder";
export const PRODUCT_URL = "https://dominat8.io";

export const SITE = {
  name: "Dominat8",
  domain: "dominat8.com",
  url: "https://www.dominat8.com",
  tagline: "AI marketing, fully automated.",
  description:
    "Upload your product. Dominat8's AI generates a full launch — copy, video, imagery, voice — across every channel and market. Live in minutes.",
  ogImage: "/og.png",
} as const;

export const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/channels", label: "Channels" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Pricing — source of truth per CLAUDE.md.
 * Overage: $0.49 / generation on all paid plans.
 */
export type Plan = {
  name: string;
  price: string;
  period: string;
  generations: string;
  description: string;
  features: readonly string[];
  featured?: boolean;
};

export const PLANS: readonly Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    generations: "3 / month",
    description: "Try it out — no credit card required.",
    features: [
      "3 AI generations / month",
      "Core channel presets",
      "Share link (7-day)",
      "Mobile-ready output",
    ],
  },
  {
    name: "Starter",
    price: "$9",
    period: "/ month",
    generations: "20 / month",
    description: "For individuals & side projects.",
    features: [
      "20 AI generations / month",
      "Refine & iterate (unlimited)",
      "Multi-channel export",
      "Share links (90-day)",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    generations: "100 / month",
    description: "For freelancers & growing brands.",
    features: [
      "100 AI generations / month",
      "Everything in Starter",
      "A/B & seasonal variants",
      "Priority queue + email support",
    ],
    featured: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "/ month",
    generations: "500 / month",
    description: "For teams & high-volume launches.",
    features: [
      "500 AI generations / month",
      "Everything in Pro",
      "White-label output",
      "API + bulk generation",
      "5 team seats",
    ],
  },
] as const;

export const OVERAGE_COPY = "$0.49 / generation on all paid plans.";
