import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AuroraBackground({ children, className }: Props) {
  return (
    <div className={["relative min-h-screen overflow-hidden bg-[#05060a] text-white", className || ""].join(" ")}>
      {/* Base depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_20%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-50 aurora-blob aurora-1" />
      <div className="pointer-events-none absolute top-24 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 aurora-blob aurora-2" />
      <div className="pointer-events-none absolute top-32 -right-32 h-[560px] w-[560px] rounded-full blur-3xl opacity-40 aurora-blob aurora-3" />
      <div className="pointer-events-none absolute bottom-[-220px] left-1/3 h-[640px] w-[640px] -translate-x-1/2 rounded-full blur-3xl opacity-35 aurora-blob aurora-4" />

      {/* Spotlight behind hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_32%,rgba(120,119,198,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_50%_28%,rgba(56,189,248,0.14),transparent_60%)]" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_800px_at_50%_30%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Noise overlay (CSS only) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay aurora-noise" />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}