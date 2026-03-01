import React from "react";

type IconName =
  | "rocket"
  | "bolt"
  | "shield"
  | "chart"
  | "globe"
  | "code"
  | "star"
  | "users"
  | "mail"
  | "credit-card"
  | "settings"
  | "layers"
  | "question"
  | "document"
  | "eye"
  | "play"
  | "check"
  | "arrow-right"
  | "sparkle"
  | "cpu"
  | "target"
  | "zap"
  | "palette"
  | "lock"
  | "clock"
  | "briefcase";

type GlossyIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

const iconPaths: Record<IconName, string> = {
  rocket:
    "M12 2C10.08 4.08 8.5 7.5 8.5 10.5c0 1.5.5 2.88 1.35 4L7 17.5l2.5.5L10 21l2-3 2 3 .5-3 2.5-.5-2.85-3c.85-1.12 1.35-2.5 1.35-4 0-3-1.58-6.42-3.5-8.5zM12 12a2 2 0 110-4 2 2 0 010 4z",
  bolt:
    "M13 2L4.09 12.63a1 1 0 00.78 1.62H11v5.75a.5.5 0 00.9.3L20.91 9.37a1 1 0 00-.78-1.62H13V2.25a.5.5 0 00-.9-.3L13 2z",
  shield:
    "M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5l-3.5-3.5 1.41-1.41L11 13.67l5.09-5.09L17.5 10 11 16.5z",
  chart:
    "M3 3v18h18M9 17V9m4 8V5m4 12v-4",
  globe:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.5 0 3.5 3.5 3.5 8s-2 8-3.5 8-3.5-3.5-3.5-8 2-8 3.5-8zM2 12h20M4.93 7h14.14M4.93 17h14.14",
  code:
    "M16 18l6-6-6-6M8 6l-6 6 6 6",
  star:
    "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z",
  users:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  mail:
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5",
  "credit-card":
    "M1 10h22M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6zm8.7-2.7l-1.2-.7c.1-.5.1-1.1 0-1.6l1.2-.7a.5.5 0 00.2-.6l-1.5-2.6a.5.5 0 00-.6-.2l-1.2.7a6 6 0 00-1.4-.8l-.2-1.4A.5.5 0 0015.5 4h-3a.5.5 0 00-.5.4l-.2 1.4c-.5.2-1 .5-1.4.8l-1.2-.7a.5.5 0 00-.6.2L7.1 8.7a.5.5 0 00.2.6l1.2.7c-.1.5-.1 1.1 0 1.6l-1.2.7a.5.5 0 00-.2.6l1.5 2.6a.5.5 0 00.6.2l1.2-.7c.4.3.9.6 1.4.8l.2 1.4a.5.5 0 00.5.4h3a.5.5 0 00.5-.4l.2-1.4c.5-.2 1-.5 1.4-.8l1.2.7a.5.5 0 00.6-.2l1.5-2.6a.5.5 0 00-.3-.6z",
  layers:
    "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  question:
    "M12 22a10 10 0 100-20 10 10 0 000 20zm0-6v-1a3 3 0 10-3-3h2a1 1 0 112 0c0 .6-.4 1.1-1 1.4A2 2 0 0011 15v1h2zm-1 3h2v-2h-2v2z",
  document:
    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-2 0v6h6M16 13H8m8 4H8m2-8H8",
  eye:
    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11 3a3 3 0 100-6 3 3 0 000 6z",
  play:
    "M5 3l14 9-14 9V3z",
  check:
    "M20 6L9 17l-5-5",
  "arrow-right":
    "M5 12h14m-7-7l7 7-7 7",
  sparkle:
    "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z",
  cpu:
    "M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm3 0V2m6 2V2m3 6h2m-2 6h2M4 8H2m2 6H2m7 4v2m6-2v2M9 9h6v6H9V9z",
  target:
    "M12 22a10 10 0 100-20 10 10 0 000 20zm0-6a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z",
  zap:
    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  palette:
    "M12 2a10 10 0 00-1 19.95A2 2 0 0013 20v-.74A2 2 0 0114.94 17h1.31A3.75 3.75 0 0020 13.25 10 10 0 0012 2zM8.5 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z",
  lock:
    "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zm-2 0V7a5 5 0 00-10 0v4m5 4v3",
  clock:
    "M12 22a10 10 0 100-20 10 10 0 000 20zm0-14v6l4 2",
  briefcase:
    "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
};

export default function GlossyIcon({ name, size = 40, className, style }: GlossyIconProps) {
  const id = `glossy-${name}-${Math.random().toString(36).slice(2, 8)}`;
  const path = iconPaths[name] || iconPaths.star;
  const isStrokeIcon = ["chart", "globe", "code", "mail", "credit-card", "layers", "eye", "check", "arrow-right", "clock", "briefcase", "users", "cpu"].includes(name);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.18))",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow:
          `0 0 ${size * 0.5}px rgba(168,85,247,0.15), 0 0 ${size * 0.25}px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.12)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Glass highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "45%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0))",
          borderRadius: `0 0 ${size * 0.5}px ${size * 0.5}px`,
          pointerEvents: "none",
        }}
      />
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 1 }}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(200,170,255,1)" />
            <stop offset="100%" stopColor="rgba(120,180,255,1)" />
          </linearGradient>
        </defs>
        <path
          d={path}
          {...(isStrokeIcon
            ? { stroke: `url(#${id})`, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
            : { fill: `url(#${id})` })}
        />
      </svg>
    </div>
  );
}

export function GlossyIconInline({ name, size = 20 }: { name: IconName; size?: number }) {
  const id = `gi-${name}-${Math.random().toString(36).slice(2, 8)}`;
  const path = iconPaths[name] || iconPaths.star;
  const isStrokeIcon = ["chart", "globe", "code", "mail", "credit-card", "layers", "eye", "check", "arrow-right", "clock", "briefcase", "users", "cpu"].includes(name);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(200,170,255,1)" />
          <stop offset="100%" stopColor="rgba(120,180,255,1)" />
        </linearGradient>
      </defs>
      <path
        d={path}
        {...(isStrokeIcon
          ? { stroke: `url(#${id})`, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
          : { fill: `url(#${id})` })}
      />
    </svg>
  );
}

export type { IconName };
