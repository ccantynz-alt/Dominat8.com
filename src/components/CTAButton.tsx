"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CTAButton() {
  const [isPortal, setIsPortal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPortal(true);
    setTimeout(() => {
      window.open("https://dominat8.io", "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <section className="relative py-24 px-6">
      <div className="flex justify-center">
        <motion.a
          href="https://dominat8.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="relative overflow-hidden rounded-2xl border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 px-12 py-5 text-xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(139,92,246,0.3)",
              "0 0 40px rgba(139,92,246,0.6)",
              "0 0 20px rgba(139,92,246,0.3)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Build Your Empire</span>

          <AnimatePresence>
            {isPortal && (
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.span
                  className="text-2xl font-black text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  →
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </section>
  );
}
