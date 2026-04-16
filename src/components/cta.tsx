import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight no-underline transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[color-mix(in_oklab,var(--color-accent)_90%,white_10%)] shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_40px_-10px_var(--color-accent-glow)]",
  secondary:
    "bg-white/[0.04] text-[var(--color-fg)] border border-[var(--color-line)] hover:bg-white/[0.07] hover:border-[var(--color-line-strong)]",
  ghost:
    "text-[var(--color-fg-2)] hover:text-[var(--color-fg)] hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
};

export function CTA({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className = "",
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href as Parameters<typeof Link>[0]["href"]} className={cls}>
      {children}
    </Link>
  );
}
