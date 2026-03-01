import GlossyPageShell, { GlossyPageHeader } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export const metadata = {
  title: "Templates — Dominat8",
  description: "Premium templates, ready to ship. Pick a direction and generate a complete site from your brief.",
};

const templates = [
  {
    icon: "cpu" as const,
    tag: "DEFAULT",
    title: "AI SaaS Website",
    desc: "Clean SaaS layout: hero, proof, features, pricing, FAQ, CTA. Built for conversion from day one.",
  },
  {
    icon: "shield" as const,
    tag: "HIGH TRUST",
    title: "Local Service",
    desc: "Trust-first layout: outcomes, testimonials, areas served, contact. Perfect for service businesses.",
  },
  {
    icon: "palette" as const,
    tag: "SHOWCASE",
    title: "Creator / Portfolio",
    desc: "Highlights, case studies, gallery, and social proof. Show your best work front and center.",
  },
  {
    icon: "target" as const,
    tag: "COMMERCE",
    title: "Product Landing",
    desc: "Feature-led layout: benefits, comparison, proof, FAQ, CTA. Drive purchases and sign-ups.",
  },
  {
    icon: "briefcase" as const,
    tag: "B2B",
    title: "Agency",
    desc: "Services, proof, process, packages, and contact. Professional layout for client-facing businesses.",
  },
  {
    icon: "rocket" as const,
    tag: "LAUNCH",
    title: "Coming Soon",
    desc: "Waitlist-first: clarity, benefits, trust, and CTA. Build anticipation before you launch.",
  },
];

export default function TemplatesPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="layers"
        eyebrow="Templates"
        title="Premium templates, ready to ship"
        subtitle="Pick a direction. The system generates a complete site from your brief — then polishes it into something that looks expensive."
        ctaHref="/templates"
        ctaLabel="Start generating"
        ctaIcon="sparkle"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {templates.map((t) => (
          <div
            key={t.title}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
            }}
          >
            {/* Gradient preview area */}
            <div
              style={{
                height: 120,
                background:
                  "radial-gradient(600px circle at 30% 20%, rgba(168,85,247,0.20), transparent 55%), radial-gradient(500px circle at 80% 60%, rgba(59,130,246,0.15), transparent 55%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <GlossyIcon name={t.icon} size={52} />
            </div>

            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 8px",
                  borderRadius: 999,
                  background: "rgba(168,85,247,0.12)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(237,234,247,0.75)",
                }}
              >
                <GlossyIconInline name={t.icon} size={10} />
                {t.tag}
              </div>
              <div style={{ marginTop: 10, fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{t.title}</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.65)" }}>{t.desc}</div>
              <Link
                href="/templates"
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
                <GlossyIconInline name="arrow-right" size={14} /> Preview
              </Link>
            </div>
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
        <GlossyIcon name="sparkle" size={48} style={{ margin: "0 auto" }} />
        <div style={{ marginTop: 12, fontSize: 18, fontWeight: 900, color: "#F6F2FF" }}>
          Don&apos;t see what you need?
        </div>
        <p style={{ marginTop: 8, fontSize: 14, color: "rgba(237,234,247,0.68)" }}>
          Describe your business and the AI will generate a custom structure tailored to your needs.
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
          <GlossyIconInline name="mail" size={16} /> Talk to us
        </Link>
      </section>
    </GlossyPageShell>
  );
}
