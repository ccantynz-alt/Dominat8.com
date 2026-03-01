import GlossyIcon, { GlossyIconInline } from "@/components/ui/GlossyIcon";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <GlossyIcon name="settings" size={36} />
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/60">SETTINGS</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Settings</h1>
        </div>
      </div>
      <p className="text-sm text-white/60">
        Keep this simple. Only the controls you actually use.
      </p>

      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GlossyIcon name="briefcase" size={30} />
          <div className="text-sm font-semibold">Workspace</div>
        </div>
        <div className="mt-3 text-sm text-white/60">
          Configure your workspace settings.
        </div>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-3 text-sm text-white/60">
            <GlossyIconInline name="layers" size={16} /> Default projectId
          </li>
          <li className="flex items-center gap-3 text-sm text-white/60">
            <GlossyIconInline name="bolt" size={16} /> Feature toggles
          </li>
          <li className="flex items-center gap-3 text-sm text-white/60">
            <GlossyIconInline name="code" size={16} /> Debug mode
          </li>
          <li className="flex items-center gap-3 text-sm text-white/60">
            <GlossyIconInline name="shield" size={16} /> Safe admin tools
          </li>
        </ul>
      </div>
    </div>
  );
}
