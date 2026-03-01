import GlossyPageShell, { GlossyPageHeader, GlossyCard } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export const metadata = {
  title: "Use Cases — Dominat8",
  description: "Built for people who need premium fast. From SaaS launches to local service pages.",
};

const cases = [
  {
    icon: "rocket" as const,
    title: "Founders launching fast",
    desc: "Generate a real marketing site in minutes, not weeks. Iterate without breaking your build. Go from idea to live in a single session.",
    tag: "STARTUP",
  },
  {
    icon: "briefcase" as const,
    title: "Agencies & freelancers",
    desc: "Deliver faster with a pipeline you can control. Keep every client site consistent with proven templates and repeatable workflows.",
    tag: "PRODUCTION",
  },
  {
    icon: "shield" as const,
    title: "Local businesses",
    desc: "High trust pages, clean design, and clear CTAs — ready to publish on your domain. Service areas, testimonials, and contact built in.",
    tag: "TRUST",
  },
  {
    icon: "cpu" as const,
    title: "SaaS landing pages",
    desc: "Ship a polished homepage + pricing + FAQs that converts, then iterate with proof checks and A/B-ready section swapping.",
    tag: "SAAS",
  },
  {
    icon: "target" as const,
    title: "Product validation",
    desc: "Test positioning quickly: swap copy, reorder sections, and redeploy with confidence. Get market feedback before you build.",
    tag: "VALIDATE",
  },
  {
    icon: "chart" as const,
    title: "SEO foundation",
    desc: "Start with safe canonical/metadata baselines, then wire in sitemap/robots/SEO plans. Everything is built for search from day one.",
    tag: "SEO",
  },
];

export default function UseCasesPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="briefcase"
        eyebrow="Use Cases"
        title="Built for people who need premium fast"
        subtitle="If you need a website that looks expensive, ships fast, and stays consistent — this is for you."
        ctaHref="/templates"
        ctaLabel="Explore templates"
        ctaIcon="layers"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {cases.map((c) => (
          <div
            key={c.title}
            style={{
              borderRadius: 18,
              padding: 22,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlossyIcon name={c.icon} size={40} />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(168,85,247,0.70)",
                }}
              >
                {c.tag}
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{c.title}</div>
            <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "rgba(237,234,247,0.68)" }}>{c.desc}</div>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 14,
                fontSize: 13,
                fontWeight: 800,
                color: "rgba(200,170,255,0.90)",
                textDecoration: "none",
              }}
            >
              <GlossyIconInline name="arrow-right" size={14} /> Learn more
            </Link>
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
        <GlossyIcon name="rocket" size={48} style={{ margin: "0 auto" }} />
        <div style={{ marginTop: 12, fontSize: 18, fontWeight: 900, color: "#F6F2FF" }}>
          Ready to ship?
        </div>
        <p style={{ marginTop: 8, fontSize: 14, color: "rgba(237,234,247,0.68)" }}>
          Start free. Generate your first site in minutes.
        </p>
        <Link
          href="/templates"
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
          <GlossyIconInline name="bolt" size={16} /> Get started
        </Link>
      </section>
    </GlossyPageShell>
  );
}
