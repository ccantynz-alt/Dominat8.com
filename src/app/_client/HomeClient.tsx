"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  title: string;
  desc: string;
  status?: "idle" | "active" | "done";
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function useIsMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

/** -----------------------------
 *  Scroll reveal (no libs)
 *  ----------------------------- */
function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    nodes.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.filter = "blur(2px)";
      el.style.transition = "opacity 700ms ease, transform 700ms ease, filter 700ms ease";
      const d = el.getAttribute("data-reveal-delay");
      if (d) el.style.transitionDelay = `${parseInt(d, 10)}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
            el.style.filter = "blur(0px)";
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.14 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/** -----------------------------
 *  Animated counters
 *  ----------------------------- */
function useCountUp(target: number, active: boolean, ms: number) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;

    function tick(t: number) {
      const p = clamp((t - start) / ms, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, ms]);

  return v;
}

/** -----------------------------
 *  Magnetic hover
 *  ----------------------------- */
function useMagnet(ref: React.RefObject<HTMLElement>, strength = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    function setTransform(x: number, y: number) {
      tx = x;
      ty = y;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    }

    function onMove(e: PointerEvent) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / Math.max(1, r.width);
      const py = (e.clientY - r.top) / Math.max(1, r.height);
      const dx = (px - 0.5) * 2;
      const dy = (py - 0.5) * 2;
      setTransform(dx * strength, dy * strength);
    }

    function onLeave() {
      el.style.transition = "transform 240ms ease";
      setTransform(0, 0);
      const t = setTimeout(() => {
        el.style.transition = "";
      }, 260);
      return () => clearTimeout(t);
    }

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave as any, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove as any);
      el.removeEventListener("pointerleave", onLeave as any);
    };
  }, [ref, strength]);
}

/** -----------------------------
 *  Sticky nav shrink on scroll
 *  ----------------------------- */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY || 0));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, []);
  return y;
}

function Hairline() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function SigBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-white/80 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
      <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
      {children}
    </span>
  );
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] shadow-[0_28px_110px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[16px]",
        className
      )}
    >
      {/* Specular highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-1/3 top-[-40%] h-[280px] w-[640px] rotate-[18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent blur-2xl" />
        <div className="absolute -right-1/3 bottom-[-45%] h-[240px] w-[520px] rotate-[10deg] bg-gradient-to-r from-transparent via-white/12 to-transparent blur-2xl" />
      </div>
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.02), 0 0 90px rgba(56,189,248,0.08)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function GradientButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-black shadow-[0_28px_90px_rgba(0,0,0,0.65)] transition hover:-translate-y-[1px] active:translate-y-0",
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1), rgba(34,197,94,1))",
      }}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <span className="absolute inset-[-40%] translate-x-[-60%] rotate-[12deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:opacity-60 group-hover:translate-x-[160%]" />
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />
    </a>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white/85 shadow-[0_18px_55px_rgba(0,0,0,0.45)] transition hover:border-white/18 hover:bg-white/[0.065]"
    >
      {children}
    </a>
  );
}

function SectionHeader({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs uppercase tracking-[0.32em] text-white/55">{kicker}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white/90 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">{desc}</p>
      ) : null}
    </div>
  );
}

function Icon({ kind }: { kind: "bolt" | "shield" | "spark" | "globe" | "wand" | "rocket" }) {
  // Tiny inline icons (no libs)
  const common = "h-5 w-5";
  if (kind === "bolt")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2L3 14h8l-1 8 11-14h-8l0-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "shield")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "spark")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 15l.7 3 3 .7-3 .7-.7 3-.7-3-3-.7 3-.7.7-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.9" />
      </svg>
    );
  if (kind === "globe")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 3c2.6 2.8 2.6 14.2 0 18" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 3c-2.6 2.8-2.6 14.2 0 18" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  if (kind === "wand")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20l10-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 3l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 6l1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 14c3-6 9-9 16-8-1 7-4 13-10 16-3 1-5 0-6-2-1-2-1-4 0-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FeatureTile({
  icon,
  title,
  desc,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.55)] transition hover:border-white/16 hover:bg-white/[0.065]">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(56,189,248,0.18), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168,85,247,0.14), transparent 45%), radial-gradient(circle at 50% 85%, rgba(34,197,94,0.08), transparent 45%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
            {icon}
          </div>
          {tag ? (
            <span className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
              {tag}
            </span>
          ) : null}
        </div>
        <div className="mt-4 text-sm font-semibold text-white/90">{title}</div>
        <div className="mt-2 text-sm leading-relaxed text-white/65">{desc}</div>
      </div>
    </div>
  );
}

function PriceCard({
  name,
  price,
  highlight,
  bullets,
  cta,
  href,
}: {
  name: string;
  price: string;
  highlight?: string;
  bullets: string[];
  cta: string;
  href: string;
}) {
  const featured = !!highlight;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border p-7 shadow-[0_34px_120px_rgba(0,0,0,0.65)]",
        featured
          ? "border-white/18 bg-white/[0.08]"
          : "border-white/10 bg-white/[0.05]"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0",
          featured && "opacity-100"
        )}
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(56,189,248,0.16), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168,85,247,0.12), transparent 45%), radial-gradient(circle at 50% 85%, rgba(34,197,94,0.08), transparent 45%)",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white/90">{name}</div>
            <div className="mt-2 text-3xl font-semibold text-white">{price}</div>
          </div>
          {highlight ? (
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
              {highlight}
            </span>
          ) : null}
        </div>

        <ul className="mt-5 space-y-2 text-sm text-white/65">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            href={href}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-[1px] active:translate-y-0",
              featured
                ? "text-black shadow-[0_28px_90px_rgba(0,0,0,0.65)]"
                : "border border-white/12 bg-black/25 text-white/85 hover:bg-black/30"
            )}
            style={
              featured
                ? {
                    background:
                      "linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1), rgba(34,197,94,1))",
                  }
                : undefined
            }
          >
            {cta}
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 transition hover:border-white/14">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div className="text-sm font-semibold text-white/90">{q}</div>
        <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-black/25 text-white/70">
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-3 text-sm leading-relaxed text-white/65">{a}</div>
        </div>
      </div>
    </div>
  );
}

function LogoPills() {
  const items = ["ACME", "NORTHSTAR", "CLOUDLY", "VECTOR", "ARCADIA"];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((x) => (
        <span
          key={x}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/55"
        >
          {x}
        </span>
      ))}
      <span className="text-xs text-white/45">+ your logo here</span>
    </div>
  );
}

function TechBackdropSvg() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="g1" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
          <stop offset="40%" stopColor="rgba(168,85,247,0.22)" />
          <stop offset="80%" stopColor="rgba(34,197,94,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="blur1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18" /></filter>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0" result="c" />
          <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="1200" height="800" fill="url(#g1)" />

      <g opacity="0.22">
        {Array.from({ length: 18 }).map((_, i) => {
          const x = (i / 18) * 1200;
          return <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={800} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const y = (i / 12) * 800;
          return <line key={`h-${i}`} x1={0} y1={y} x2={1200} y2={y} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />;
        })}
      </g>

      <g filter="url(#softGlow)" opacity="0.9">
        <circle cx="760" cy="260" r="165" fill="none" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
        <circle cx="760" cy="260" r="240" fill="none" stroke="rgba(168,85,247,0.30)" strokeWidth="2" />
        <circle cx="760" cy="260" r="320" fill="none" stroke="rgba(34,197,94,0.18)" strokeWidth="2" />
      </g>

      <g opacity="0.85" filter="url(#blur1)">
        <path d="M180 590 C 320 500, 420 520, 560 430" stroke="rgba(56,189,248,0.40)" strokeWidth="6" fill="none" />
        <path d="M220 630 C 360 540, 470 560, 650 470" stroke="rgba(168,85,247,0.30)" strokeWidth="5" fill="none" />
      </g>
    </svg>
  );
}

export default function HomeClient() {
  const isMounted = useIsMounted();
  useRevealOnScroll();

  // Sticky nav state
  const y = useScrollY();
  const navCompact = y > 18;

  // Session demo (keep)
  const demoKey = "d8_home_demo_ran_v1";
  const [demoRan, setDemoRan] = useState(false);

  // Depth/parallax
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  // Magnetic CTA
  const magnetRef = useRef<HTMLAnchorElement | null>(null);
  useMagnet(magnetRef as any, 10);

  // Live stamps
  const stamp = useMemo(() => new Date().toISOString(), []);
  const [probeOk, setProbeOk] = useState<null | boolean>(null);

  // Credibility section visible? (for counters)
  const proofRef = useRef<HTMLDivElement | null>(null);
  const [proofInView, setProofInView] = useState(false);

  // Counters
  const speed = useCountUp(2.7, proofInView, 900);
  const seo = useCountUp(98, proofInView, 1000);
  const publish = useCountUp(12, proofInView, 950);

  // FAQ
  const faqs = useMemo(
    () => [
      {
        q: "Is this just a template generator?",
        a: "No. Dominat8 builds a structured site plan (pages + sections), then generates copy, layout rhythm, and publish-ready SEO outputs so you can iterate without chaos.",
      },
      {
        q: "How do I know what I’m seeing is live (not cached)?",
        a: "You get proof markers (HOME_STAMP) and a no-store probe check. You can also always add ?ts=123 to force a fresh fetch.",
      },
      {
        q: "Can I use my own domain?",
        a: "Yes — the publish flow is designed to be domain-ready. (Your Domain Wizard / verification steps plug into this.)",
      },
      {
        q: "What’s the fastest way to look “enterprise”?",
        a: "Strong hero hierarchy, a credibility strip, feature tiles that explain value quickly, and clean spacing — that’s exactly what V12 delivers.",
      },
    ],
    []
  );
  const [faqOpen, setFaqOpen] = useState<number>(0);

  // Demo steps
  const steps: Step[] = useMemo(
    () => [
      { title: "Brand + Offer", desc: "Tone, positioning, hero promise, CTA hierarchy.", status: "done" },
      { title: "Pages + Layout", desc: "Homepage, pricing, FAQ, contact — rhythm that sells.", status: "done" },
      { title: "SEO + Sitemap", desc: "Metadata plan, sitemap, robots, publish sanity checks.", status: "active" },
      { title: "Publish", desc: "Deploy proof + domain readiness so you trust what’s live.", status: "idle" },
    ],
    []
  );

  // Auto-demo once per session
  useEffect(() => {
    if (!isMounted) return;
    try {
      const already = sessionStorage.getItem(demoKey) === "1";
      if (!already) {
        sessionStorage.setItem(demoKey, "1");
        setDemoRan(true);
      } else {
        setDemoRan(false);
      }
    } catch {
      setDemoRan(false);
    }
  }, [isMounted]);

  // Pointer parallax
  useEffect(() => {
    if (!isMounted) return;
    const el = heroRef.current;
    if (!el) return;

    let raf = 0;

    function onMove(e: PointerEvent) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / Math.max(1, r.width);
      const py = (e.clientY - r.top) / Math.max(1, r.height);
      const dx = clamp((px - 0.5) * 2, -1, 1);
      const dy = clamp((py - 0.5) * 2, -1, 1);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMx(dx);
        setMy(dy);
      });
    }

    function onLeave() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMx(0);
        setMy(0);
      });
    }

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove as any);
      el.removeEventListener("pointerleave", onLeave as any);
    };
  }, [isMounted]);

  // Probe no-store
  useEffect(() => {
    if (!isMounted) return;
    const url = `/api/__probe__?ts=${Date.now()}`;
    fetch(url, { cache: "no-store" })
      .then((r) => setProbeOk(r.ok))
      .catch(() => setProbeOk(false));
  }, [isMounted]);

  // Proof in view (for counters)
  useEffect(() => {
    if (!isMounted) return;
    const el = proofRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setProofInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [isMounted]);

  const depth = useMemo(() => {
    const tiltX = my * -2.2;
    const tiltY = mx * 2.4;
    const driftX = mx * 18;
    const driftY = my * 14;
    const glowX = mx * 24;
    const glowY = my * 18;
    return { tiltX, tiltY, driftX, driftY, glowX, glowY };
  }, [mx, my]);

  const trustMode = useMemo(() => {
    if (probeOk === null) return "Trust Mode: verifying…";
    if (probeOk === true) return "Trust Mode: LIVE_OK (probe no-store)";
    return "Trust Mode: WARN (probe failed)";
  }, [probeOk]);

  // Micro-kick
  const [kick, setKick] = useState(false);
  useEffect(() => {
    if (!isMounted) return;
    setKick(true);
    const t = setTimeout(() => setKick(false), 900);
    return () => clearTimeout(t);
  }, [isMounted]);

  return (
    <main className="min-h-screen bg-[#05060A] text-white/90">
      {/* Backdrop */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-[0.85]"
          style={{
            transform: `translate3d(${depth.driftX * 0.25}px, ${depth.driftY * 0.20}px, 0)`,
            transition: "transform 120ms ease-out",
          }}
        >
          <TechBackdropSvg />
        </div>

        <div
          className="absolute left-1/2 top-[-12%] h-[520px] w-[920px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 35% 40%, rgba(56,189,248,0.40), transparent 55%), radial-gradient(circle at 65% 45%, rgba(168,85,247,0.34), transparent 60%), radial-gradient(circle at 50% 75%, rgba(34,197,94,0.16), transparent 55%)",
            transform: `translate3d(${depth.glowX * 0.20}px, ${depth.glowY * 0.20}px, 0)`,
            transition: "transform 120ms ease-out",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_30%,rgba(0,0,0,0),rgba(0,0,0,0.50)_70%,rgba(0,0,0,0.82)_100%)]" />
      </div>

      {/* Sticky Nav (SiteGround-level feel) */}
      <div className="sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 pt-4">
          <div
            className={cn(
              "rounded-3xl border shadow-[0_22px_80px_rgba(0,0,0,0.55)] backdrop-blur-[18px] transition-all duration-300",
              navCompact
                ? "border-white/14 bg-black/40 py-3"
                : "border-white/10 bg-black/25 py-4"
            )}
            style={{
              boxShadow: navCompact
                ? "0 16px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
                : "0 22px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between px-5 md:px-6" data-reveal data-reveal-delay="0">
              <a href="/" className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
                  <div
                    className="h-3 w-3 rounded-full shadow-[0_0_24px_rgba(255,255,255,0.35)]"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1), rgba(34,197,94,1))",
                    }}
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-wide text-white/90">Dominat8</div>
                  <div className="text-xs text-white/55">Homepage V12 • SiteGround-level</div>
                </div>
              </a>

              <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
                <a className="transition hover:text-white/90" href="#features">Features</a>
                <a className="transition hover:text-white/90" href="#proof">Credibility</a>
                <a className="transition hover:text-white/90" href="#pricing">Pricing</a>
                <a className="transition hover:text-white/90" href="#faq">FAQ</a>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="/templates"
                  className="hidden rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/80 transition hover:border-white/15 hover:bg-white/[0.065] md:inline-flex"
                >
                  Templates
                </a>
                <GradientButton href="/app">Launch builder</GradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10">
        <div
          ref={heroRef}
          className="mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl grid-cols-1 gap-10 px-6 py-10 md:grid-cols-12 md:py-14"
        >
          <div className="md:col-span-7" data-reveal data-reveal-delay="80">
            <div className="flex flex-wrap items-center gap-3">
              <SigBadge>LIVE_OK • fullscreen hero • SiteGround-level polish</SigBadge>
              <span className="text-xs text-white/55">HOME_STAMP: {stamp}</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Build a{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1), rgba(34,197,94,1))",
                }}
              >
                premium
              </span>{" "}
              site that looks enterprise.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Hero that sells. Feature tiles that explain fast. Credibility that feels real. Pricing/FAQ that closes.
              Dominat8 gives you structured output — and proof you can trust.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GradientButton href="/app" className="will-change-transform">
                <span ref={magnetRef as any}>Generate my site</span>
              </GradientButton>
              <SecondaryButton href="/pricing">See pricing</SecondaryButton>
              <div className="text-xs text-white/55">No guessing • publish-ready • deploy proof</div>
            </div>

            {/* Trust strip */}
            <div className="mt-8" data-reveal data-reveal-delay="140">
              <GlassCard className="p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        probeOk === null ? "bg-white/50" : probeOk ? "bg-emerald-400" : "bg-amber-300"
                      )}
                    />
                    <div className="text-xs font-semibold text-white/85">{trustMode}</div>
                  </div>
                  <div className="text-xs text-white/55">
                    Probe fetched with <span className="text-white/70">cache: no-store</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Credibility strip */}
            <div id="proof" ref={proofRef} className="mt-8" data-reveal data-reveal-delay="160">
              <GlassCard className="p-6">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.32em] text-white/55">Enterprise credibility</div>
                    <div className="mt-2 text-sm font-semibold text-white/90">
                      Proof markers + animated metrics.
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-white/65">
                      This is the “serious SaaS” layer: metrics, logos, and route proof to end doubt.
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="text-xs text-white/55">Proof marker:</div>
                    <div className="mt-1 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-[11px] text-white/70">
                      ROUTE_PROOF • HOME_OK • {stamp}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-lg font-semibold text-white/90">{speed.toFixed(1)} min</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55">Speed to first build</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/60">Usable structure in minutes.</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-lg font-semibold text-white/90">{Math.round(seo)} / 100</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55">SEO baseline</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/60">Metadata + sitemap habits.</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-lg font-semibold text-white/90">{Math.round(publish)} checks</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55">Publish sanity checks</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/60">Stamps + probe + markers.</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/50">Trusted by teams (placeholders)</div>
                  <div className="mt-3"><LogoPills /></div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Right demo */}
          <div className="md:col-span-5" data-reveal data-reveal-delay="120">
            <div
              className="relative"
              style={{
                transform: `perspective(900px) rotateX(${depth.tiltX}deg) rotateY(${depth.tiltY}deg) translate3d(0,0,0)`,
                transformStyle: "preserve-3d",
                transition: "transform 120ms ease-out",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-80"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(56,189,248,0.55), rgba(168,85,247,0.42), rgba(34,197,94,0.22))",
                }}
              />
              <div className="relative rounded-3xl p-[1px]">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white/90">Auto Demo</div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60">
                      {demoRan ? "ran this session" : "ready"}
                    </span>
                  </div>

                  <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5">
                    <div
                      className={cn(
                        "absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0",
                        kick && "opacity-100"
                      )}
                      style={{
                        border: "1px solid rgba(255,255,255,0.20)",
                        boxShadow: "0 0 80px rgba(56,189,248,0.10)",
                        transform: `translate(-50%, -50%) scale(${kick ? 1.15 : 0.85})`,
                        transition: "transform 900ms ease-out, opacity 900ms ease-out",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 75% 35%, rgba(168,85,247,0.14), transparent 60%), radial-gradient(circle at 55% 80%, rgba(34,197,94,0.08), transparent 55%)",
                      }}
                    />
                    <div className="relative">
                      <div className="text-xs uppercase tracking-[0.28em] text-white/55">Pipeline Preview</div>
                      <div className="mt-2 text-sm font-semibold text-white/90">Structured steps that feel “finish-for-me”</div>

                      <div className="mt-4 space-y-3">
                        {steps.map((s) => (
                          <div
                            key={s.title}
                            className={cn(
                              "rounded-2xl border p-4 transition",
                              s.status === "done"
                                ? "border-white/12 bg-white/[0.05]"
                                : s.status === "active"
                                ? "border-white/18 bg-white/[0.07]"
                                : "border-white/10 bg-white/[0.04]"
                            )}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-xs font-semibold text-white/85">{s.title}</div>
                              <span
                                className={cn(
                                  "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.22em]",
                                  s.status === "done"
                                    ? "bg-emerald-500/15 text-emerald-200 border border-emerald-400/25"
                                    : s.status === "active"
                                    ? "bg-sky-500/15 text-sky-200 border border-sky-400/25"
                                    : "bg-white/5 text-white/55 border border-white/10"
                                )}
                              >
                                {s.status ?? "idle"}
                              </span>
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-white/60">{s.desc}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <a
                          href="/templates"
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs font-semibold text-white/85 transition hover:border-white/15 hover:bg-white/[0.065]"
                        >
                          Explore templates
                        </a>
                        <a
                          href="/use-cases"
                          className="rounded-2xl px-4 py-3 text-center text-xs font-semibold text-black transition hover:-translate-y-[1px]"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1), rgba(34,197,94,1))",
                          }}
                        >
                          See use-cases
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-xs text-white/70">
                    <div className="font-semibold text-white/85">ROUTE_PROOF</div>
                    <div className="mt-1">If you see this, you are on the deployed homepage route.</div>
                    <div className="mt-2 text-white/55">HOME_STAMP: {stamp}</div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tiles (SiteGround-style value explanation) */}
      <section id="features" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div data-reveal data-reveal-delay="0">
            <SectionHeader
              kicker="Features"
              title="Everything your homepage needs to feel premium."
              desc="This is the “SiteGround-level” middle: fast scanning tiles that explain value in 6 seconds."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div data-reveal data-reveal-delay="60">
              <FeatureTile
                icon={<Icon kind="wand" />}
                title="Finish-for-me structure"
                desc="Pages + sections + rhythm generated in a coherent plan — not random blocks."
                tag="core"
              />
            </div>
            <div data-reveal data-reveal-delay="90">
              <FeatureTile
                icon={<Icon kind="spark" />}
                title="Premium copy + hierarchy"
                desc="Headlines, subheads, CTAs, and proof sections that read like a product."
                tag="conversion"
              />
            </div>
            <div data-reveal data-reveal-delay="120">
              <FeatureTile
                icon={<Icon kind="bolt" />}
                title="Speed without mess"
                desc="Fast output that stays editable. No bloat, no confusing layout debt."
                tag="speed"
              />
            </div>
            <div data-reveal data-reveal-delay="150">
              <FeatureTile
                icon={<Icon kind="globe" />}
                title="SEO hygiene built-in"
                desc="Metadata plan, sitemap, robots — ready for Search Console workflows."
                tag="seo"
              />
            </div>
            <div data-reveal data-reveal-delay="180">
              <FeatureTile
                icon={<Icon kind="shield" />}
                title="Deploy confidence"
                desc="Proof markers + no-store probe checks so you always know what’s live."
                tag="trust"
              />
            </div>
            <div data-reveal data-reveal-delay="210">
              <FeatureTile
                icon={<Icon kind="rocket" />}
                title="Publish-ready pipeline"
                desc="Structured steps for generation → refinement → publish, designed to scale with you."
                tag="publish"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser (SiteGround-style) */}
      <section id="pricing" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div data-reveal data-reveal-delay="0">
            <SectionHeader
              kicker="Pricing"
              title="Start free. Go pro when it’s time to scale."
              desc="A clean pricing teaser closes the loop like top hosting/SaaS pages."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div data-reveal data-reveal-delay="60">
              <PriceCard
                name="Free"
                price="$0"
                bullets={[
                  "Generate structure + copy",
                  "Preview your site",
                  "Proof markers on deploy",
                ]}
                cta="Start free"
                href="/app"
              />
            </div>
            <div data-reveal data-reveal-delay="90">
              <PriceCard
                name="Pro"
                price="Power"
                highlight="Most popular"
                bullets={[
                  "Publishing controls",
                  "Domain-ready workflows",
                  "Stronger automation",
                ]}
                cta="Go Pro"
                href="/pricing"
              />
            </div>
            <div data-reveal data-reveal-delay="120">
              <PriceCard
                name="Team"
                price="Scale"
                bullets={[
                  "Collaboration workflows",
                  "Shared templates",
                  "Advanced governance",
                ]}
                cta="See Team"
                href="/pricing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div data-reveal data-reveal-delay="0">
            <SectionHeader
              kicker="FAQ"
              title="Answers that remove hesitation."
              desc="SiteGround-style pages close with clarity: what it is, how it works, and why you can trust it."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {faqs.map((x, i) => (
              <div key={x.q} data-reveal data-reveal-delay={60 + i * 40}>
                <FAQItem
                  q={x.q}
                  a={x.a}
                  open={faqOpen === i}
                  onToggle={() => setFaqOpen((cur) => (cur === i ? -1 : i))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA band + Premium Footer */}
      <section className="relative z-10" id="cta">
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div data-reveal data-reveal-delay="0">
            <GlassCard className="p-8 md:p-10">
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-2xl">
                  <div className="text-xs uppercase tracking-[0.32em] text-white/55">Ready</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white/90 md:text-3xl">
                    Generate your flagship site now.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">
                    This is the “finished” landing page shape: hero → features → credibility → pricing → FAQ → close.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <GradientButton href="/app">Start now</GradientButton>
                  <SecondaryButton href="/templates">Browse templates</SecondaryButton>
                </div>
              </div>

              <div className="mt-8">
                <Hairline />
              </div>

              <footer className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1), rgba(34,197,94,1))",
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/90">Dominat8</div>
                      <div className="text-xs text-white/55">AI Website Automation Builder</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    Built to output premium pages fast — with proof markers and structured pipelines that scale.
                  </p>
                  <div className="mt-4 text-xs text-white/50">HOME_OK • {stamp}</div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.28em] text-white/50">Product</div>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <a className="block hover:text-white/90" href="/templates">Templates</a>
                    <a className="block hover:text-white/90" href="/use-cases">Use-cases</a>
                    <a className="block hover:text-white/90" href="/pricing">Pricing</a>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="text-xs uppercase tracking-[0.28em] text-white/50">Build</div>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <a className="block hover:text-white/90" href="/app">Launch builder</a>
                    <a className="block hover:text-white/90" href="#features">Features</a>
                    <a className="block hover:text-white/90" href="#faq">FAQ</a>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="text-xs uppercase tracking-[0.28em] text-white/50">Trust</div>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-xs font-semibold text-white/85">Route proof</div>
                      <div className="mt-2 text-xs text-white/60">
                        ROUTE_PROOF markers + probe checks to reduce “is this live?” anxiety.
                      </div>
                    </div>
                  </div>
                </div>
              </footer>

              <div className="mt-10 text-xs text-white/45">
                © {new Date().getFullYear()} Dominat8 • Presentation-grade homepage V12
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <div className="relative z-10 h-10" />
    </main>
  );
}