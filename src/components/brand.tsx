import Link from "next/link";
import { SITE } from "@/lib/site";

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] font-semibold text-[var(--color-bg)]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        letterSpacing: "-0.02em",
      }}
    >
      D8
    </span>
  );
}

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 no-underline"
      aria-label={`${SITE.name} home`}
    >
      <BrandMark />
      <span className="text-base font-semibold tracking-[-0.01em] text-[var(--color-fg)]">
        {SITE.name}
      </span>
    </Link>
  );
}
