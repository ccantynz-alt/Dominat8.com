"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarketingHeaderReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after a small scroll so hero feels owner on load.
      const y = window.scrollY || 0;
      setShow(y > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 top-0 z-[9999] w-full",
        "transition-all duration-300 ease-out",
        show ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
              D8
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Dominat8</div>
              <div className="text-[11px] text-white/55">AI Website Builder</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/templates" className="hover:text-white">Templates</Link>
            <Link href="/use-cases" className="hover:text-white">Use cases</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
          </nav>

          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
