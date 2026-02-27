// src/lib/marketing/copy.ts
// Dominat8.com — the global marketing machine for dominat8.io

export const BRAND = {
  name: "Dominat8",
  domain: "dominat8.com",
  product: "dominat8.io",
  productUrl: "https://dominat8.io",
  url: "https://www.dominat8.com",
  tagline: "AI websites that dominate",
};

export const CTA = {
  primary: { label: "Start building free", href: "https://dominat8.io" },
  secondary: { label: "View templates", href: "/templates" },
  tertiary: { label: "See pricing", href: "/pricing" },
};

export const HERO = {
  kicker: "The #1 AI website builder for businesses that want to win",
  titleLine1: "Stop paying agencies.",
  titleLine2: "Start dominating.",
  subtitle:
    "Dominat8 generates premium, conversion-first websites from a single brief. " +
    "SEO structure, multi-page layout, and publish-ready output — in minutes, not months.",
};

export const STATS = [
  { value: "12x", label: "Faster than agencies" },
  { value: "94%", label: "Client satisfaction" },
  { value: "3min", label: "Brief to draft" },
  { value: "50+", label: "Page templates" },
] as const;

export const AUDIENCES = [
  "Local businesses",
  "Agencies",
  "Founders",
  "Trades & services",
  "E-commerce",
  "Creators",
] as const;

export const PROOF = [
  { k: "Trust", v: "Professional, grounded output" },
  { k: "Speed", v: "Minutes from brief to draft" },
  { k: "Pages", v: "Multi-page generation" },
  { k: "SEO", v: "Metadata + sitemap-ready" },
] as const;

export const TRUST = [
  { title: "Coverage", body: "Clear regions, service areas, and availability. No ambiguity." },
  { title: "Credibility", body: "Proof-first layout: experience, outcomes, and reassurance." },
  { title: "Responsiveness", body: "Calls-to-action where they matter. Easy contact." },
  { title: "Professional tone", body: "Calm typography and spacing. Premium brochure feel." },
] as const;

export const SERVICES = [
  {
    title: "Flagship homepage",
    body: "Full-screen hero, services grid, proof section, and conversion-optimized CTAs.",
  },
  {
    title: "Pricing page",
    body: "Clear tiers, comparison tables, and guidance. Built to reduce hesitation and close.",
  },
  {
    title: "FAQ page",
    body: "Objection handling that feels natural. Every question earns trust, not skepticism.",
  },
  {
    title: "Contact page",
    body: "Phone, email, form — clean and frictionless. Multiple paths to conversion.",
  },
  {
    title: "SEO structure",
    body: "Meta tags, Open Graph, canonical URLs, structured data, and sitemap — out of the box.",
  },
  {
    title: "Publish-ready output",
    body: "Clean routing, responsive layout, and consistent structure. Deploy same day.",
  },
] as const;

export const STEPS = [
  {
    title: "Describe",
    desc: "Tell us what you do, who you serve, and the vibe you want. We extract structure, tone, and layout rhythm.",
  },
  {
    title: "Generate",
    desc: "AI agents build pages, content, and components — polished, consistent, and brand-aligned. Review in real-time.",
  },
  {
    title: "Dominate",
    desc: "Publish to your domain with SEO, sitemap, and all artifacts baked in. Go live and start winning — in minutes.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "We replaced a $15k agency engagement with Dominat8. The output was better, and we launched in a weekend.",
    name: "Sarah Chen",
    detail: "Founder, GreenPath Services",
  },
  {
    quote:
      "It reads like a brochure we'd pay a studio for — calm, trustworthy, and easy to understand. Our leads doubled.",
    name: "Marcus Reid",
    detail: "Owner, Reid Electrical",
  },
  {
    quote:
      "Brief, draft, publish. No mystery, no mess. We've built 12 client sites on Dominat8.",
    name: "Jenna Okafor",
    detail: "Agency Director, BrightSide Digital",
  },
] as const;

export const FAQ = [
  {
    q: "Is this only for tech companies?",
    a: "No. Dominat8 is built for real-world businesses — trades, rural services, local operators, agencies, and premium providers. The output feels professional, not techy.",
  },
  {
    q: "Will the site look AI-generated?",
    a: "The output is professional first — calm layout, clear hierarchy, and a premium tone. AI is the engine, not the aesthetic. Most visitors can't tell the difference.",
  },
  {
    q: "What do I actually get?",
    a: "A multi-page site with homepage, pricing, FAQ, and contact — plus SEO metadata, Open Graph tags, sitemap, and publish-ready output. Everything you need to go live.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. Connect any custom domain and go live instantly. We handle DNS verification and SSL automatically.",
  },
  {
    q: "How is this different from Wix or Squarespace?",
    a: "Those are drag-and-drop builders where you do the work. Dominat8 generates the entire site from your brief — layout, copy, SEO, and structure. You describe, we build.",
  },
  {
    q: "What if I need changes after publishing?",
    a: "Regenerate any section, tweak the brief, or edit directly. The system is built for iteration, not one-shot output.",
  },
] as const;

export const COMPARISON = [
  { feature: "Time to launch", d8: "Minutes", traditional: "Weeks to months" },
  { feature: "Cost", d8: "From $0", traditional: "$5k-$50k+" },
  { feature: "SEO structure", d8: "Built-in", traditional: "Extra cost" },
  { feature: "Mobile responsive", d8: "Automatic", traditional: "Extra effort" },
  { feature: "Content writing", d8: "AI-generated", traditional: "You write it" },
  { feature: "Ongoing updates", d8: "Regenerate anytime", traditional: "Pay per change" },
] as const;
