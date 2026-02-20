import Hero from "@/components/Hero";
import MonsterBento from "@/components/MonsterBento";
import CTAButton from "@/components/CTAButton";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#020202] text-white font-sans">
        <div className="grain-overlay" aria-hidden />
        <Hero />
        <MonsterBento />
        <CTAButton />
      </main>
    </SmoothScroll>
  );
}
