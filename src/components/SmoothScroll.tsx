"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();
  }, []);

  return <>{children}</>;
}
