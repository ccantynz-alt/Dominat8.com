"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleButtonHover = () => setIsHovering(true);
    const handleButtonLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const buttons = document.querySelectorAll("a, button");
    buttons.forEach((el) => {
      el.addEventListener("mouseenter", handleButtonHover);
      el.addEventListener("mouseleave", handleButtonLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      buttons.forEach((el) => {
        el.removeEventListener("mouseenter", handleButtonHover);
        el.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      initial={{ opacity: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 400,
      }}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="rounded-full border-2 border-white"
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </motion.div>
  );
}
