"use client";

import { motion } from "framer-motion";

export default function GlitchLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-block ${className}`}
      whileHover="glitch"
      initial="rest"
      variants={{
        rest: {},
        glitch: {
          x: [0, -2, 2, -2, 0],
          y: [0, 2, -2, 2, 0],
          transition: { duration: 0.3 },
        },
      }}
    >
      {children}
    </motion.a>
  );
}
