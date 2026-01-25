export type AcePath = "startup" | "agency" | "local" | "creator";
export type AceIntent = "seo" | "speed" | "automation";
export type AceSource = "twitter" | "search" | "direct" | "unknown";

export type AceState = {
  path: AcePath;
  intent?: AceIntent;
  source?: AceSource;
};

export type AceHero = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};