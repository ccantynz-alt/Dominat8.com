"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─────────────────────────────────────────────
   ScrollReveal — fade-up on viewport entry
   ───────────────────────────────────────────── */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HeroGlow — cursor-follow radial glow
   ───────────────────────────────────────────── */
export function HeroGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "40%");

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--gx", x.toFixed(1) + "%");
      el.style.setProperty("--gy", y.toFixed(1) + "%");
    };

    const onLeave = () => {
      el.style.setProperty("--gx", "50%");
      el.style.setProperty("--gy", "40%");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQItem — smooth expand/collapse
   ───────────────────────────────────────────── */
export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [a]);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] backdrop-blur-xl transition-all hover:border-white/[0.20] hover:bg-white/[0.06]"
    >
      {/* Glass top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-white/90">{q}</span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-sm text-white/60 shadow-inner shadow-white/5 transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? height : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
        }}
      >
        <div ref={bodyRef} className="px-6 pb-5 text-sm leading-relaxed text-white/55">
          {a}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AnimatedNumber — count-up on viewport entry
   ───────────────────────────────────────────── */
export function AnimatedNumber({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          // Extract the numeric part
          const numMatch = value.match(/(\d+)/);
          if (!numMatch) {
            setDisplay(value);
            return;
          }

          const target = parseInt(numMatch[1], 10);
          const prefix = value.slice(0, numMatch.index);
          const suffix = value.slice((numMatch.index ?? 0) + numMatch[1].length);
          const duration = 1200;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(prefix + current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
