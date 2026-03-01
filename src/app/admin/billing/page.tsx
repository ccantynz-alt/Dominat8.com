import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";
import Link from "next/link";

export default function AdminBilling() {
  return (
    <div className="space-y-6">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <GlossyIcon name="credit-card" size={36} />
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/60">BILLING</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Billing</h1>
        </div>
      </div>
      <p className="text-sm text-white/60">
        Manage your plan, view invoices, and configure Stripe integration.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GlossyIcon name="star" size={30} />
            <div className="text-sm font-semibold">Current Plan</div>
          </div>
          <div className="mt-3 text-sm text-white/60">Connect to your existing Stripe/Pro gating keys.</div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[11px] text-white/50" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <GlossyIconInline name="check" size={12} /> Current
            </div>
            <div className="mt-2 text-sm font-semibold">Free (placeholder)</div>
          </div>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
          >
            <GlossyIconInline name="arrow-right" size={12} /> View pricing plans
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GlossyIcon name="settings" size={30} />
            <div className="text-sm font-semibold">Actions</div>
          </div>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3 text-sm text-white/60">
              <GlossyIconInline name="zap" size={16} /> Upgrade to Pro
            </li>
            <li className="flex items-center gap-3 text-sm text-white/60">
              <GlossyIconInline name="settings" size={16} /> Manage subscription
            </li>
            <li className="flex items-center gap-3 text-sm text-white/60">
              <GlossyIconInline name="document" size={16} /> View invoices
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
