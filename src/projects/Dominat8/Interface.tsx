"use client";

import React, { useEffect, useState } from "react";
import { Shield, Globe, Activity } from "lucide-react";

const StatBox = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div
    style={{
      padding: "15px",
      border: "1px solid #333",
      borderRadius: "10px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8A2BE2",
      }}
    >
      {icon}{" "}
      <span style={{ marginLeft: "10px", fontSize: "0.7rem", color: "#666" }}>
        {label}
      </span>
    </div>
    <div style={{ fontSize: "1.2rem", marginTop: "5px" }}>{value}</div>
  </div>
);

const Dominat8Interface = () => {
  const [systemStatus, setSystemStatus] = useState("Aura Engine Standby...");

  useEffect(() => {
    const worker = new Worker(
      new URL("../../autopilot.worker.js", import.meta.url)
    );
    worker.onmessage = () => {
      const time = new Date().toLocaleTimeString();
      setSystemStatus(`[${time}] Showroom: Syncing Global SEO Trends...`);
      // Trigger background SEO scripts here
    };
    return () => worker.terminate();
  }, []);

  return (
    <div className="dominat8-wrapper">
      <div className="nexus-glow" aria-hidden />

      <div
        className="glass-panel"
        style={{ textAlign: "center", zIndex: 1 }}
      >
        <h1
          style={{
            letterSpacing: "8px",
            fontSize: "3rem",
            fontWeight: "900",
          }}
        >
          DOMINAT8
        </h1>
        <p style={{ color: "#888", marginBottom: "30px" }}>
          BUILD THE FUTURE. NO CODE. NO LIMITS.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <StatBox icon={<Globe size={20} />} label="SEO SCORE" value="98.2" />
          <StatBox
            icon={<Shield size={20} />}
            label="ENGINE HEALTH"
            value="OPTIMAL"
          />
        </div>

        <div
          className="status-monitor"
          style={{
            marginTop: "40px",
            fontSize: "0.8rem",
            color: "#00ff41",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Activity size={14} style={{ marginRight: "8px" }} />
          {systemStatus}
        </div>

        <a
          href="https://dominat8.io"
          target="_blank"
          rel="noopener noreferrer"
          className="launch-btn"
        >
          LAUNCH LAB
        </a>
      </div>
    </div>
  );
};

export default Dominat8Interface;
