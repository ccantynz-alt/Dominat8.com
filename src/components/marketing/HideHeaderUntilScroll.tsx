"use client";

import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  thresholdPx?: number; // scroll distance before header appears on home
};

export default function HideHeaderUntilScroll({ children, thresholdPx = 24 }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Visible immediately on non-home routes.
  const [visible, setVisible] = React.useState(!isHome);

  React.useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY || 0;
      setVisible(y > thresholdPx);
    };

    // Initialize once (handles refresh mid-scroll)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, thresholdPx]);

  // On home: hidden until scroll. When visible: fixed overlay (does not push layout).
  // On other pages: fixed overlay is still OK, but we keep it visible.
  return (
    <div
      className={[
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-6 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* overlay surface */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}
