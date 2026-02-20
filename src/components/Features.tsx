"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Instant Deployment",
    description: "Launch at the speed of thought. Dominat8 deploys in seconds, not hours.",
  },
  {
    title: "SEO Predation",
    description: "We hunt for rankings. Our AI optimizes every pixel for search domination.",
  },
  {
    title: "Infinite Scaling",
    description: "Powered by the Matrix API. Scale to millions without breaking a sweat.",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built for Domination
        </motion.h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-white/5 p-8 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent)",
                  backgroundSize: "200% 100%",
                }}
              >
                <div className="absolute inset-0 animate-border-beam bg-[length:200%_100%]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-zinc-400">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
