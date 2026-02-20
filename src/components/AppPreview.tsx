"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import GlitchLink from "@/components/GlitchLink";

const codePhrases = [
  "create website",
  "modern landing page",
  "purple gradient",
  "AI-powered",
  "instant deploy",
];

export default function AppPreview() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = codePhrases[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < phrase.length) {
            setTypedText(phrase.slice(0, typedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(phrase.slice(0, typedText.length - 1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % codePhrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [typedText, phraseIndex, isDeleting]);

  return (
    <section className="relative py-24 px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <h2 className="mb-16 text-center text-2xl font-bold text-white sm:text-3xl">
          App Preview
        </h2>

        {/* Bento Grid - uneven layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Live AI Terminal - spans 2 cols */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm sm:col-span-2 glitch-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{
              borderColor: "rgba(139, 92, 246, 0.5)",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
            }}
          >
            <div className="mb-4 flex items-center gap-2 text-[#06B6D4]">
              <Terminal className="h-5 w-5" />
              <span className="text-sm font-medium">Live AI Terminal</span>
            </div>
            <div className="font-mono text-sm text-zinc-400">
              <span className="text-[#8B5CF6]">$</span> dominat8{" "}
              <span className="text-white">{typedText}</span>
              <span className="animate-pulse">|</span>
            </div>
            <div className="mt-4 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4 text-sm">
              <span className="text-zinc-500">→ Building UI...</span>
              <div className="mt-2 h-2 w-full rounded bg-purple-500/20">
                <motion.div
                  className="h-full rounded bg-[#8B5CF6]"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
              Go to App →
            </div>
          </motion.a>

          {/* Small card */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm glitch-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            whileHover={{
              borderColor: "rgba(139, 92, 246, 0.5)",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
            }}
          >
            <div className="text-3xl font-bold text-[#8B5CF6]">⚡</div>
            <h3 className="mt-2 font-semibold text-white">Instant Deploy</h3>
            <p className="mt-1 text-sm text-zinc-500">Ship in seconds</p>
          </motion.a>

          {/* Small card */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm glitch-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            whileHover={{
              borderColor: "rgba(139, 92, 246, 0.5)",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
            }}
          >
            <div className="text-3xl font-bold text-[#06B6D4]">🔍</div>
            <h3 className="mt-2 font-semibold text-white">SEO Predation</h3>
            <p className="mt-1 text-sm text-zinc-500">Hunt rankings</p>
          </motion.a>
        </div>

        {/* THE IO ENGINE section */}
        <motion.div
          className="relative mt-16 overflow-hidden rounded-2xl border-2 border-[#8B5CF6]/50 bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 py-16 px-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.h3
            className="text-2xl font-black tracking-tighter text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            THE IO ENGINE: POWERING THE NEXT GENERATION
          </motion.h3>
          <GlitchLink
            href="https://dominat8.io"
            className="mt-6 inline-block rounded-xl border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            Launch Engine
          </GlitchLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
