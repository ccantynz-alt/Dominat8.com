// src/lib/agents/registry.ts
// Dominat8 agent fleet registry — all agents cataloged and wired

export type AgentStatus = "online" | "idle" | "running" | "error" | "offline";

export type AgentSpec = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: "creative" | "engineering" | "growth" | "ops";
  capabilities: string[];
  defaultTargetPath?: string;
  color: string;
};

/**
 * The Dominat8 agent fleet — 8 specialized agents that power the platform.
 * Each agent has a defined role, capabilities, and output contract.
 */
export const AGENT_FLEET: AgentSpec[] = [
  {
    id: "02_creative_director",
    name: "Creative Director",
    shortName: "Creative",
    description:
      "Luxury spacing, typography, and rhythm. Outputs section blueprints, design tokens, and component rules.",
    category: "creative",
    capabilities: ["section-blueprint", "design-tokens", "component-rules", "typography-system"],
    defaultTargetPath: "src/components/marketing",
    color: "purple",
  },
  {
    id: "03_motion",
    name: "Motion & Interaction",
    shortName: "Motion",
    description:
      "Animation systems, scroll-driven effects, micro-interactions, and transition choreography.",
    category: "creative",
    capabilities: ["scroll-animations", "micro-interactions", "transition-choreography", "parallax"],
    defaultTargetPath: "src/components/marketing",
    color: "violet",
  },
  {
    id: "04_conversion",
    name: "Conversion Architect",
    shortName: "Conversion",
    description:
      "Funnel architecture, CTA placement, objection handling. Outputs page flow and A/B test ideas.",
    category: "growth",
    capabilities: ["funnel-design", "cta-placement", "objection-handling", "ab-testing"],
    defaultTargetPath: "src/app",
    color: "blue",
  },
  {
    id: "05_copy",
    name: "Copy Chief",
    shortName: "Copy",
    description:
      "Headlines, body copy, microcopy, and tone calibration. Outputs publish-ready text per section.",
    category: "creative",
    capabilities: ["headlines", "body-copy", "microcopy", "tone-calibration"],
    defaultTargetPath: "src/lib/marketing",
    color: "cyan",
  },
  {
    id: "06_proof",
    name: "Proof Engine",
    shortName: "Proof",
    description:
      "Testimonials, social proof, trust signals, and credibility architecture.",
    category: "growth",
    capabilities: ["testimonials", "trust-signals", "social-proof", "credibility"],
    defaultTargetPath: "src/components/marketing",
    color: "emerald",
  },
  {
    id: "07_seo",
    name: "SEO & Search Console",
    shortName: "SEO",
    description:
      "Meta tags, structured data, sitemap generation, Open Graph, and search performance.",
    category: "growth",
    capabilities: ["meta-tags", "structured-data", "sitemap", "open-graph", "search-console"],
    defaultTargetPath: "src/app",
    color: "amber",
  },
  {
    id: "08_domain_ssl",
    name: "Domain & SSL Onboarding",
    shortName: "Domains",
    description:
      "Custom domain setup, DNS verification, SSL provisioning, and deployment routing.",
    category: "ops",
    capabilities: ["dns-verification", "ssl-provisioning", "domain-routing", "deployment"],
    defaultTargetPath: "src/app/domains",
    color: "orange",
  },
  {
    id: "09_monetization",
    name: "Monetization Engine",
    shortName: "Monetize",
    description:
      "Pricing models, gating rules, Stripe integration, upgrade loops, and revenue optimization.",
    category: "ops",
    capabilities: ["pricing-models", "stripe-integration", "gating-rules", "upgrade-loops"],
    defaultTargetPath: "src/app/admin/billing",
    color: "rose",
  },
];

/** Lookup agent by ID */
export function getAgent(id: string): AgentSpec | undefined {
  return AGENT_FLEET.find((a) => a.id === id);
}

/** Get agents by category */
export function getAgentsByCategory(category: AgentSpec["category"]): AgentSpec[] {
  return AGENT_FLEET.filter((a) => a.category === category);
}

/** Category labels for display */
export const CATEGORY_LABELS: Record<AgentSpec["category"], string> = {
  creative: "Creative & Design",
  engineering: "Engineering",
  growth: "Growth & Conversion",
  ops: "Operations & Infrastructure",
};

/** Color map for Tailwind classes */
export const AGENT_COLORS: Record<string, { dot: string; bg: string; border: string; text: string }> = {
  purple:  { dot: "bg-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20",  text: "text-purple-400" },
  violet:  { dot: "bg-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20",  text: "text-violet-400" },
  blue:    { dot: "bg-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-400" },
  cyan:    { dot: "bg-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    text: "text-cyan-400" },
  emerald: { dot: "bg-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  amber:   { dot: "bg-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400" },
  orange:  { dot: "bg-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/20",  text: "text-orange-400" },
  rose:    { dot: "bg-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20",    text: "text-rose-400" },
};
