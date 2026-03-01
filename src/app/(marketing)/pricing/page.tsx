import GlossyPageShell, { GlossyPageHeader, GlossyCard } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export const metadata = {
  title: "Pricing — Dominat8",
  description: "Simple pricing, premium output. Start free, upgrade when you want full automation.",
};

function PriceCard({
  name,
  price,
  note,
  bullets,
  primary,
  badge,
  ctaText,
  ctaHref,
  icon,
}: {
  name: string;
  price: string;
  note: string;
  bullets: string[];
  primary?: boolean;
  badge?: string;
  ctaText: string;
  ctaHref: string;
  icon: "star" | "zap" | "rocket";
}) {
  return (
    <div
      style={{
        borderRadius: 20,
        padding: 24,
        background: primary
          ? "linear-gradient(180deg, rgba(168,85,247,0.15), rgba(59,130,246,0.08))"
          : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: primary
          ? "1px solid rgba(168,85,247,0.30)"
          : "1px solid rgba(255,255,255,0.10)",
        boxShadow: primary
          ? "0 30px 90px rgba(168,85,247,0.15), 0 20px 55px rgba(0,0,0,0.35)"
          : "0 18px 55px rgba(0,0,0,0.35)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(168,85,247,0.25), rgba(59,130,246,0.15))",
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(237,234,247,0.90)",
            marginBottom: 10,
            alignSelf: "flex-start",
          }}
        >
          <GlossyIconInline name="sparkle" size={12} />
          {badge}
        </div>
      )}

      <GlossyIcon name={icon} size={40} />
      <div style={{ marginTop: 12, fontSize: 12, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(237,234,247,0.60)" }}>{name}</div>
      <div style={{ marginTop: 6, fontSize: 36, fontWeight: 900, color: "#F6F2FF" }}>{price}</div>
      <div style={{ marginTop: 6, fontSize: 13, color: "rgba(237,234,247,0.65)" }}>{note}</div>

      <ul style={{ marginTop: 16, listStyle: "none", padding: 0, flex: 1 }}>
        {bullets.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 13, color: "rgba(237,234,247,0.78)" }}>
            <GlossyIconInline name="check" size={14} />
            {b}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
          padding: "12px 16px",
          borderRadius: 14,
          textDecoration: "none",
          fontWeight: 800,
          fontSize: 14,
          color: primary ? "#07070B" : "rgba(237,234,247,0.90)",
          background: primary
            ? "linear-gradient(90deg, rgba(168,85,247,1), rgba(59,130,246,1))"
            : "rgba(255,255,255,0.06)",
          boxShadow: primary
            ? "0 18px 55px rgba(168,85,247,0.20), 0 10px 24px rgba(59,130,246,0.12)"
            : "0 10px 30px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <GlossyIconInline name="arrow-right" size={14} />
        {ctaText}
      </Link>
    </div>
  );
}

const faq = [
  { q: "Do I need to be a designer?", a: "No. The system uses proven layout rhythm and spacing so your site looks premium by default." },
  { q: "Can I map my domain?", a: "Yes — the platform is designed to publish and map to your custom domain when ready." },
  { q: "What if I need changes?", a: "Iterate freely. Swap sections, edit copy, reorder — then redeploy with confidence." },
  { q: "Is there a free trial?", a: "Start free. Generate your first site spec and preview it before committing to a paid plan." },
];

export default function PricingPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="credit-card"
        eyebrow="Pricing"
        title="Simple pricing, premium output"
        subtitle="Start free. Upgrade when you want full automation and faster publishing. Clear tiers, no confusion."
        ctaHref="/templates"
        ctaLabel="Start free"
        ctaIcon="rocket"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        <PriceCard
          icon="star"
          name="Free"
          price="$0"
          note="Perfect to test the pipeline."
          bullets={["Generate a site spec", "Preview marketing pages", "Basic publish flow"]}
          ctaText="Start free"
          ctaHref="/templates"
        />
        <PriceCard
          icon="zap"
          name="Pro"
          price="$29"
          note="Ship faster with full automation."
          bullets={["Auto-run pipeline", "SEO plan + sitemap", "Publish artifacts", "Priority generation"]}
          primary
          badge="Most popular"
          ctaText="Go Pro"
          ctaHref="/templates"
        />
        <PriceCard
          icon="rocket"
          name="Business"
          price="$99"
          note="For teams & higher volume."
          bullets={["Multiple sites", "Priority pipeline", "Advanced controls", "Dedicated support"]}
          ctaText="Talk to us"
          ctaHref="/contact"
        />
      </div>

      <section style={{ marginTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <GlossyIcon name="shield" size={34} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(237,234,247,0.60)" }}>Included</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#F6F2FF" }}>What you get with every plan</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <GlossyCard icon="layers" title="Premium structure">
            Hero rhythm, trust strip, features, proof, CTA ladder — built in by default.
          </GlossyCard>
          <GlossyCard icon="chart" title="SEO included">
            Titles, metas, schema, sitemap/robots — built into the generation flow.
          </GlossyCard>
          <GlossyCard icon="lock" title="Build-gated shipping">
            Nothing deploys unless the build is green. No silent failures.
          </GlossyCard>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <GlossyIcon name="question" size={34} />
          <div style={{ fontSize: 20, fontWeight: 900, color: "#F6F2FF" }}>FAQ</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {faq.map((item) => (
            <div
              key={item.q}
              style={{
                borderRadius: 16,
                padding: 18,
                background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: "rgba(237,234,247,0.92)" }}>{item.q}</div>
              <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.65)" }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </GlossyPageShell>
  );
}
