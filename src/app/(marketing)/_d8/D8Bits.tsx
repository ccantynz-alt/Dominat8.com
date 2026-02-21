import React from "react";

export function D8Card(props: {
  title?: string;
  body?: string;
  kicker?: string;
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
      {props.title ? (
        <div style={{ marginTop: props.kicker ? 8 : 0, fontSize: 15, fontWeight: 900, color: "rgba(246,242,255,0.95)" }}>
          {props.title}
        </div>
      ) : null}
      {props.body ? (
        <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, color: "rgba(237,234,247,0.72)" }}>
          {props.body}
        </div>
      ) : null}
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