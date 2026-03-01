import Link from "next/link";
import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import type { IconName } from "@/components/ui/GlossyIcon";

const cards: { icon: IconName; title: string; desc: string; href: string; cta: string }[] = [
  { icon: "layers", title: "Projects", desc: "Manage generated sites, publish, and view status.", href: "/admin/projects", cta: "Open Projects" },
  { icon: "cpu", title: "Agents", desc: "Run strict bundles and apply safe patches.", href: "/admin/agents", cta: "Open Agents" },
  { icon: "globe", title: "Domains", desc: "Custom domain status + verification checklist.", href: "/admin/domains", cta: "Open Domains" },
  { icon: "credit-card", title: "Billing", desc: "Plans and Stripe integration surface.", href: "/admin/billing", cta: "Open Billing" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-black/30 p-8">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GlossyIcon name="zap" size={44} />
          <div>
            <div className="text-xs font-semibold tracking-wide text-white/60">ADMIN DASHBOARD</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Your website factory
            </h1>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-white/60">
          This console is your command center. Manage projects, run agents, configure domains, and control billing.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GlossyIcon name="check" size={24} />
              <div className="text-[11px] text-white/50">Status</div>
            </div>
            <div className="mt-2 text-sm font-semibold">System Active</div>
            <div className="mt-2 text-[11px] text-emerald-300/80" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <GlossyIconInline name="shield" size={12} /> GREEN
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GlossyIcon name="target" size={24} />
              <div className="text-[11px] text-white/50">Next move</div>
            </div>
            <div className="mt-2 text-sm font-semibold">Wire real data</div>
            <div className="mt-2 text-[11px] text-white/60">Projects / Runs / Domains</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GlossyIcon name="bolt" size={24} />
              <div className="text-[11px] text-white/50">Rule</div>
            </div>
            <div className="mt-2 text-sm font-semibold">Ship fast</div>
            <div className="mt-2 text-[11px] text-white/60">Small polish, quick deploys</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/5 transition"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GlossyIcon name={c.icon} size={36} />
              <div className="text-lg font-semibold tracking-tight">{c.title}</div>
            </div>
            <div className="mt-3 text-sm text-white/60">{c.desc}</div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">
              <GlossyIconInline name="arrow-right" size={12} />
              {c.cta}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
