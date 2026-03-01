import GlossyPageShell, { GlossyPageHeader } from "@/components/ui/GlossyPageShell";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";

export const metadata = {
  title: "Terms of Service — Dominat8",
  description: "Terms and conditions for using Dominat8.",
};

const sections = [
  {
    icon: "document" as const,
    title: "Acceptance of Terms",
    body: "By accessing or using Dominat8, you agree to be bound by these terms. If you don't agree, please don't use the service. We may update these terms from time to time.",
  },
  {
    icon: "cpu" as const,
    title: "Service Description",
    body: "Dominat8 is an AI-powered website generation and publishing platform. We provide tools to generate, customize, and deploy websites. The AI generates content based on your inputs.",
  },
  {
    icon: "users" as const,
    title: "Your Account",
    body: "You're responsible for maintaining the security of your account and all activities under it. Keep your credentials safe. Notify us immediately if you suspect unauthorized access.",
  },
  {
    icon: "layers" as const,
    title: "Content & Ownership",
    body: "You retain ownership of the content you create. By using our service, you grant us a limited license to host and display your content as needed to provide the service.",
  },
  {
    icon: "credit-card" as const,
    title: "Billing & Payments",
    body: "Paid plans are billed as described at purchase. You can cancel anytime. Refunds are handled on a case-by-case basis. Stripe handles all payment processing securely.",
  },
  {
    icon: "shield" as const,
    title: "Acceptable Use",
    body: "Don't use Dominat8 for illegal activities, spam, or content that violates others' rights. We reserve the right to suspend accounts that violate these terms.",
  },
  {
    icon: "lock" as const,
    title: "Limitation of Liability",
    body: "Dominat8 is provided 'as is.' We do our best to keep it running and secure, but we can't guarantee uninterrupted service or be liable for indirect damages.",
  },
  {
    icon: "mail" as const,
    title: "Contact",
    body: "For questions about these terms, contact us at support@dominat8.com. We're here to help clarify anything.",
  },
];

export default function TermsPage() {
  return (
    <GlossyPageShell>
      <GlossyPageHeader
        icon="document"
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Clear, readable terms with consistent hierarchy. No lawyer-speak."
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
