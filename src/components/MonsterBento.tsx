"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Globe, Zap, Award } from "lucide-react";

const thinkingPhrases = [
  "Analyzing design patterns...",
  "Generating components...",
  "Optimizing layout...",
  "Applying AI polish...",
];

export default function MonsterBento() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const phrase = thinkingPhrases[phraseIndex];
    if (typed.length < phrase.length) {
      const t = setTimeout(() => setTyped(phrase.slice(0, typed.length + 1)), 80);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped("");
      setPhraseIndex((i) => (i + 1) % thinkingPhrases.length);
    }, 1500);
    return () => clearTimeout(t);
  }, [typed, phraseIndex]);

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-16 text-center text-2xl font-bold text-white sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Marketing Monster
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* AI Brain - Terminal thinking in real-time */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="glass group col-span-1 overflow-hidden rounded-2xl bg-white/5 p-6 sm:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="mb-4 flex items-center gap-2 text-[#8B5CF6]">
              <Brain className="h-5 w-5" />
              <span className="font-semibold">AI Brain</span>
            </div>
            <div className="font-mono text-sm text-zinc-400">
              <span className="text-[#06B6D4]">$</span> dominat8 build{" "}
              <span className="text-white">{typed}</span>
              <span className="animate-pulse">|</span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="h-2 w-2 rounded-full bg-[#06B6D4] opacity-60" />
              <span className="h-2 w-2 rounded-full bg-white/40 opacity-40" />
            </div>
          </motion.a>

          {/* Global Speed - 3D-style map of Vercel edge locations */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="glass group overflow-hidden rounded-2xl bg-white/5 p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="mb-4 flex items-center gap-2 text-[#06B6D4]">
              <Globe className="h-5 w-5" />
              <span className="font-semibold">Global Speed</span>
            </div>
            <div className="relative h-32 overflow-hidden rounded-xl bg-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/20 to-[#8B5CF6]/20" />
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#06B6D4]/50 bg-[#06B6D4]/10" />
              <div className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-[#06B6D4] animate-pulse" />
              <div className="absolute right-1/4 top-2/3 h-3 w-3 rounded-full bg-[#8B5CF6] animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-1/4 left-1/3 h-3 w-3 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute right-1/3 top-1/4 h-3 w-3 rounded-full bg-[#8B5CF6] animate-pulse" style={{ animationDelay: "1.5s" }} />
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-4 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="rounded bg-white/20" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-500">Vercel Edge · &lt;50ms</p>
          </motion.a>

          {/* Matrix Integration - Communication API */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="glass group overflow-hidden rounded-2xl bg-white/5 p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="mb-4 flex items-center gap-2 text-[#8B5CF6]">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">Matrix Integration</span>
            </div>
            <div className="space-y-2 font-mono text-xs text-zinc-500">
              <div><span className="text-[#06B6D4]">POST</span> /api/build</div>
              <div><span className="text-[#8B5CF6]">GET</span> /api/deploy</div>
              <div><span className="text-[#06B6D4]">WS</span> /api/stream</div>
            </div>
            <p className="mt-2 text-sm text-zinc-500">REST + WebSocket API</p>
          </motion.a>

          {/* The Prize - Gold-tinted Global Award */}
          <motion.a
            href="https://dominat8.io"
            target="_blank"
            rel="noopener noreferrer"
            className="glass group col-span-1 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-600/10 p-6 sm:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="mb-4 flex items-center gap-2 text-amber-400">
              <Award className="h-5 w-5" />
              <span className="font-semibold">The Prize</span>
            </div>
            <p className="text-lg font-bold text-amber-200/90">
              Global Award Standards
            </p>
            <p className="mt-1 text-sm text-amber-200/60">
              Built for 100/100 Lighthouse. Designed to win.
            </p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
