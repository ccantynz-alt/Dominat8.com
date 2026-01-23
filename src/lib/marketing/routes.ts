export const marketingRoutes = {
  home: "/",
  pricing: "/pricing",
  templates: "/templates",
  useCases: "/use-cases",
  faq: "/faq",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type MarketingRouteKey = keyof typeof marketingRoutes;

export const marketingNav = [
  { label: "Templates", href: marketingRoutes.templates },
  { label: "Use cases", href: marketingRoutes.useCases },
  { label: "Pricing", href: marketingRoutes.pricing },
  { label: "FAQ", href: marketingRoutes.faq },
  { label: "About", href: marketingRoutes.about },
] as const;

export const marketingFooter = [
  { label: "Privacy", href: marketingRoutes.privacy },
  { label: "Terms", href: marketingRoutes.terms },
] as const;