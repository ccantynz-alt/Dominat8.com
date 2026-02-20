"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative flex min-h-[50vh] items-end justify-center overflow-hidden py-24 px-6">
      <motion.div
        className="font-black text-[#8B5CF6]"
        style={{
          fontSize: "clamp(8rem, 40vw, 20rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={{
          textShadow: [
            "0 0 40px rgba(139, 92, 246, 0.4)",
            "0 0 80px rgba(139, 92, 246, 0.8)",
            "0 0 40px rgba(139, 92, 246, 0.4)",
          ],
        }}
        transition={{
          textShadow: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        8
      </motion.div>
    </footer>
  );
}
