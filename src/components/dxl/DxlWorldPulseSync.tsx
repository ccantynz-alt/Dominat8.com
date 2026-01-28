"use client";

import React from "react";

type ActivityOk = {
  ok?: boolean;
  active?: boolean;
  stamp?: string;
  at?: string;
};

export default function DxlWorldPulseSync() {
  React.useEffect(() => {
    let alive = true;

    function setActive(flag: boolean) {
      try {
        const el = document.documentElement;
        if (flag) el.setAttribute("data-dxl-active", "1");
        else el.removeAttribute("data-dxl-active");
      } catch {}
    }

    async function tick() {
      try {
        const ts = Date.now();
        const res = await fetch(`/api/dxl/activity?ts=${ts}`, { method: "GET", cache: "no-store" });
        if (!alive) return;

        if (!res.ok) {
          setActive(false);
          return;
        }

        const j = (await res.json()) as ActivityOk;
        setActive(!!j?.active);
      } catch {
        if (!alive) return;
        setActive(false);
      }
    }

    tick();
    const id = window.setInterval(tick, 15_000);
    return () => {
      alive = false;
      window.clearInterval(id);
      setActive(false);
    };
  }, []);

  return null;
}