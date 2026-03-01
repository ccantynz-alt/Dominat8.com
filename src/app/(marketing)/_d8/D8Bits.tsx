import React from "react";

export function D8Card(props: {
  title: string;
  body: string;
  kicker?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        padding: 14,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
      }}
    >
      {props.kicker ? (
        <div
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(237,234,247,0.75)",
          }}
        >
          {props.kicker}
        </div>
      ) : null}
      <div
        style={{
          marginTop: props.kicker ? 8 : 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 900, color: "rgba(246,242,255,0.95)" }}>
            {props.title}
          </div>
          <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.72)" }}>
            {props.body}
          </div>
        </div>
        {props.right ? <div style={{ flex: "0 0 auto" }}>{props.right}</div> : null}
      </div>
      {props.children}
    </div>
  );
}

export function D8P(props: { children?: React.ReactNode }) {
  return (
    <p style={{ margin: "10px 0", lineHeight: 1.6, color: "rgba(237,234,247,0.76)", fontSize: 14 }}>
      {props.children}
    </p>
  );
}