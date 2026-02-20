"use client";

import { useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const cursorX = useMotionValue(960);
  const cursorY = useMotionValue(540);
  const springX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
  }, [cursorX, cursorY]);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      cursorX.set(clientX);
      cursorY.set(clientY);
    },
    [cursorX, cursorY]
  );

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020202] px-6"
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) handleMove(t.clientX, t.clientY);
      }}
    >
      {/* Floating Aura - blurred gradient follows cursor with slight delay */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.4) 40%, transparent 70%)",
          opacity: 0.4,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="relative text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #FFFFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          DESIGN AT THE SPEED OF THOUGHT.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg text-zinc-400 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          The AI Website Builder for the 1%.
        </motion.p>
      </div>
    </section>
  );
}
