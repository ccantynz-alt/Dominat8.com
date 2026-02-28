import React from "react";

export function D8Card(props: { title?: string; body?: string; kicker?: string; children?: React.ReactNode }) {
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
      {props.kicker && (
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(168,85,247,0.70)", marginBottom: 6 }}>
          {props.kicker}
        </div>
      )}
      {props.title && (
        <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(237,234,247,0.95)", marginBottom: 4 }}>
          {props.title}
        </div>
      )}
      {props.body && (
        <div style={{ fontSize: 13, color: "rgba(237,234,247,0.68)", lineHeight: 1.5 }}>
          {props.body}
        </div>
      )}
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