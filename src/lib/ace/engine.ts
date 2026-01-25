import type { AceHero, AcePath, AceSource, AceState } from "./types";

export const DEFAULT_STATE: AceState = {
  path: "startup",
  intent: undefined,
  source: "unknown",
};

export function normalizePath(v: string | null | undefined): AcePath | null {
  const x = (v || "").toLowerCase().trim();
  if (x === "startup") return "startup";
  if (x === "agency") return "agency";
  if (x === "local" || x === "localbusiness" || x === "local-business") return "local";
  if (x === "creator") return "creator";
  return null;
}

export function inferSourceFromReferrer(referrer: string | null | undefined): AceSource {
  const r = (referrer || "").toLowerCase();
  if (!r) return "direct";
  if (r.includes("twitter.com") || r.includes("t.co") || r.includes("x.com")) return "twitter";
  if (r.includes("google.") || r.includes("bing.") || r.includes("duckduckgo.")) return "search";
  return "unknown";
}

export function heroFor(state: AceState): AceHero {
  const path = state.path;

  if (path === "agency") {
    return {
      eyebrow: "For agencies",
      headline: "Ship client sites without the grind.",
      subhead: "Generate premium marketing sites, iterate fast, publish with proof — and keep your process build-gated.",
      primaryCtaLabel: "Show agency templates",
      primaryCtaHref: "/templates?path=agency",
      secondaryCtaLabel: "See pricing",
      secondaryCtaHref: "/pricing",
    };
  }

  if (path === "local") {
    return {
      eyebrow: "For local business",
      headline: "Turn visitors into calls and bookings.",
      subhead: "Conversion-first layouts with clean structure — built fast, refined safely, published confidently.",
      primaryCtaLabel: "Explore local layouts",
      primaryCtaHref: "/use-cases?path=local",
      secondaryCtaLabel: "See pricing",
      secondaryCtaHref: "/pricing",
    };
  }

  if (path === "creator") {
    return {
      eyebrow: "For creators",
      headline: "Launch pages that convert — fast.",
      subhead: "Make premium landing pages, lead magnets, and funnels with a workflow you can control and repeat.",
      primaryCtaLabel: "Browse creator starts",
      primaryCtaHref: "/use-cases?path=creator",
      secondaryCtaLabel: "Explore templates",
      secondaryCtaHref: "/templates",
    };
  }

  // startup default
  return {
    eyebrow: "For founders",
    headline: "Build a premium site in minutes.",
    subhead: "Generate a marketing site, refine it fast, publish with proof — while your engine stays safe and scalable.",
    primaryCtaLabel: "Explore templates",
    primaryCtaHref: "/templates",
    secondaryCtaLabel: "See pricing",
    secondaryCtaHref: "/pricing",
  };
}