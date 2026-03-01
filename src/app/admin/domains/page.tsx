import GlossyIcon from "@/components/ui/GlossyIcon";
import type { IconName } from "@/components/ui/GlossyIcon";

const steps: { icon: IconName; label: string }[] = [
  { icon: "globe", label: "Enter domain" },
  { icon: "code", label: "Show required DNS records" },
  { icon: "eye", label: "Poll verification" },
  { icon: "lock", label: "Provision SSL" },
  { icon: "check", label: "Mark ready — Open site" },
];

export default function AdminDomains() {
  return (
    <div className="space-y-6">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <GlossyIcon name="globe" size={36} />
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/60">DOMAINS</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Domains</h1>
        </div>
      </div>
      <p className="text-sm text-white/60">
        Step-by-step domain verification, SSL provisioning, and publish readiness.
      </p>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <GlossyIcon name="layers" size={30} />
          <div className="text-sm font-semibold">Domain Checklist</div>
        </div>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex items-center gap-4">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(59,130,246,0.12))",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 900,
                  color: "rgba(237,234,247,0.75)",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <GlossyIcon name={s.icon} size={28} />
              <span className="text-sm text-white/70">{s.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
