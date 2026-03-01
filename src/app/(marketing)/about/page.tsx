import GlossyPageShell, { GlossyPageHeader, GlossyCard } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export const metadata = {
  title: "About — Dominat8",
  description:
    "Dominat8 is an AI website automation builder for generating, optimizing, and publishing high-converting websites.",
};

export default function AboutPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="star"
        eyebrow="About Us"
        title="About Dominat8"
        subtitle="We build the tools that let you ship premium, conversion-first websites faster than ever — powered by AI agents that handle the hard parts."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        <GlossyCard icon="bolt" title="Speed">
          Get from idea to published site fast. Our AI generates complete site specs, pages, and copy from a simple brief.
        </GlossyCard>
        <GlossyCard icon="chart" title="Growth">
          SEO structure, metadata, and conversion-first pages built into every site by default.
        </GlossyCard>
        <GlossyCard icon="cpu" title="Automation">
          Repeatable agent-driven workflows handle generation, optimization, and publishing without manual effort.
        </GlossyCard>
        <GlossyCard icon="star" title="Quality">
          Clean output with premium framing. Every site looks expensive and ships with confidence.
        </GlossyCard>
      </div>

      <section
        style={{
          marginTop: 32,
          borderRadius: 20,
          padding: 28,
          background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GlossyIcon name="rocket" size={38} />
          <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Our Mission</div>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "rgba(237,234,247,0.72)" }}>
          Dominat8 exists to eliminate the gap between &ldquo;I need a website&rdquo; and &ldquo;I have a premium, conversion-optimized
          site live on my domain.&rdquo; We combine AI generation with battle-tested design patterns so every site ships
          polished, fast, and ready to convert.
        </p>
      </section>

      <section
        style={{
          marginTop: 24,
          borderRadius: 20,
          padding: 28,
          background: "linear-gradient(135deg, rgba(168,85,247,0.10), rgba(59,130,246,0.06))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <GlossyIcon name="sparkle" size={44} style={{ margin: "0 auto" }} />
        <div style={{ marginTop: 12, fontSize: 16, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>Ready to get started?</div>
        <p style={{ marginTop: 8, fontSize: 14, color: "rgba(237,234,247,0.68)" }}>
          Start free and generate your first website.
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
          <GlossyIconInline name="rocket" size={16} /> Start Building
        </Link>
      </section>
    </GlossyPageShell>
  );
}
