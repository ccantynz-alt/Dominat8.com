import GlossyPageShell, { GlossyPageHeader } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";

export const metadata = {
  title: "Privacy Policy — Dominat8",
  description: "How Dominat8 handles your data and privacy.",
};

const sections = [
  {
    icon: "eye" as const,
    title: "Information We Collect",
    body: "We collect information you provide directly: email, name, and project data when you create an account. We also collect usage data like page views and feature usage to improve the product.",
  },
  {
    icon: "shield" as const,
    title: "How We Use Your Data",
    body: "Your data is used to provide and improve Dominat8 services — generating sites, managing projects, processing payments, and sending relevant updates. We never sell your personal data.",
  },
  {
    icon: "lock" as const,
    title: "Data Security",
    body: "We use industry-standard encryption, secure hosting on Vercel, and follow best practices for data protection. Your project data is stored securely and only accessible to you.",
  },
  {
    icon: "globe" as const,
    title: "Third-Party Services",
    body: "We use Stripe for payments, Clerk for authentication, and Vercel for hosting. Each provider has their own privacy policy and handles data according to their terms.",
  },
  {
    icon: "users" as const,
    title: "Your Rights",
    body: "You can request access to, correction of, or deletion of your personal data at any time. Contact us at support@dominat8.com for any privacy-related requests.",
  },
  {
    icon: "document" as const,
    title: "Changes to This Policy",
    body: "We may update this policy periodically. Changes will be posted on this page with an updated date. Continued use of Dominat8 constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="shield"
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we handle your data. Clear, readable, and transparent."
      />

      <div style={{ display: "grid", gap: 14 }}>
        {sections.map((s) => (
          <div
            key={s.title}
            style={{
              borderRadius: 18,
              padding: 22,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlossyIcon name={s.icon} size={34} />
              <div style={{ fontSize: 15, fontWeight: 800, color: "rgba(237,234,247,0.95)" }}>{s.title}</div>
            </div>
            <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, color: "rgba(237,234,247,0.68)" }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          borderRadius: 16,
          padding: 18,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: 13,
          color: "rgba(237,234,247,0.55)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <GlossyIconInline name="clock" size={14} />
        Last updated: February 2026
      </div>
    </GlossyPageShell>
  );
}
