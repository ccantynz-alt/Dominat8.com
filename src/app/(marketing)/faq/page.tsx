import GlossyPageShell, { GlossyPageHeader } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export const metadata = {
  title: "FAQ — Dominat8",
  description:
    "Answers to common questions about Dominat8: AI website generation, SEO, publishing, and domains.",
};

const faqItems = [
  {
    icon: "cpu" as const,
    q: "What does Dominat8 actually do?",
    a: "It turns a brief into a full website spec, then runs AI agents to generate pages, apply SEO, produce sitemap/robots, and publish artifacts — all automatically.",
  },
  {
    icon: "palette" as const,
    q: "Do I need to be a designer?",
    a: "No. The system uses proven layout rhythm, spacing, and conversion patterns so your site looks premium by default. Just describe your business.",
  },
  {
    icon: "bolt" as const,
    q: "How fast can I get a site?",
    a: "Minutes, not weeks. Enter a brief, review the generated spec, refine if needed, and publish. The AI handles all the heavy lifting.",
  },
  {
    icon: "globe" as const,
    q: "Can I use my own domain?",
    a: "Yes. The platform is designed to publish and map to your custom domain. SSL is provisioned and DNS verification is built into the flow.",
  },
  {
    icon: "shield" as const,
    q: "How do I know my site deployed correctly?",
    a: "Build-gated deploys ensure nothing ships unless the build is green. Check the status page or build marker to verify production is current.",
  },
  {
    icon: "chart" as const,
    q: "Is SEO included?",
    a: "Every generated site includes titles, meta descriptions, schema markup, canonical URLs, sitemap, and robots.txt — all built into the generation flow.",
  },
  {
    icon: "layers" as const,
    q: "Can I customize the templates?",
    a: "Absolutely. Start with a proven template structure, then swap sections, edit copy, reorder blocks, and redeploy with confidence.",
  },
  {
    icon: "credit-card" as const,
    q: "Is there a free plan?",
    a: "Yes. Start free and generate your first site spec. Upgrade to Pro or Business when you want full automation, SEO plans, and priority pipeline access.",
  },
];

export default function FaqPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="question"
        eyebrow="FAQ"
        title="Clear answers, no guesswork"
        subtitle="Quick answers about how Dominat8 works — from generation to publishing."
        ctaHref="/templates"
        ctaLabel="Try it free"
        ctaIcon="rocket"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {faqItems.map((item) => (
          <div
            key={item.q}
            style={{
              borderRadius: 18,
              padding: 20,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlossyIcon name={item.icon} size={34} />
              <div style={{ fontSize: 14, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{item.q}</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: "rgba(237,234,247,0.68)" }}>{item.a}</div>
          </div>
        ))}
      </div>

      <section
        style={{
          marginTop: 32,
          borderRadius: 20,
          padding: 28,
          background: "linear-gradient(135deg, rgba(168,85,247,0.10), rgba(59,130,246,0.06))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <GlossyIcon name="mail" size={44} style={{ margin: "0 auto" }} />
        <div style={{ marginTop: 12, fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Still have questions?</div>
        <p style={{ marginTop: 8, fontSize: 14, color: "rgba(237,234,247,0.68)" }}>
          Reach out and we&apos;ll point you to the fastest path forward.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
            padding: "12px 20px",
            borderRadius: 14,
            textDecoration: "none",
            fontWeight: 800,
            fontSize: 14,
            color: "#07070B",
            background: "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))",
            boxShadow: "0 18px 55px rgba(168,85,247,0.26), 0 10px 24px rgba(59,130,246,0.16)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <GlossyIconInline name="mail" size={16} /> Contact Us
        </Link>
      </section>
    </GlossyPageShell>
  );
}
