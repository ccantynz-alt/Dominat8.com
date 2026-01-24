export const runtime = "nodejs";

import MarketingHeaderReveal from "@/src/components/marketing/MarketingHeaderReveal";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  // FULL-BLEED: no max-width container here. Header overlays and does not push hero.
  return (
    <>
      <MarketingHeaderReveal />
      {children}
    </>
  );
}
