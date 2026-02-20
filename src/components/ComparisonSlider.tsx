"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Before vs. Dominat8
        </motion.h2>

        <motion.div
          className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseMove={handleMove}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            setSliderPosition(Math.max(0, Math.min(100, x)));
          }}
        >
          <div className="aspect-video relative flex">
            {/* Old Way - Left */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-400 sm:text-sm">
{`// The old way - 200+ lines of config
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// ... 50 more imports

module.exports = {
  entry: './src/index.js',
  output: { /* 20 lines */ },
  module: { rules: [ /* 80 lines */ ] },
  plugins: [ /* 30 lines */ ],
  resolve: { /* 10 lines */ },
  devServer: { /* 15 lines */ }
};`}
              </pre>
            </div>

            {/* Slider divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white/80"
              style={{ left: `${sliderPosition}%` }}
            />
            <div
              className="absolute top-1/2 z-10 -translate-y-1/2 h-12 w-12 rounded-full border-2 border-white bg-purple-500/50 flex items-center justify-center cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, marginLeft: -24 }}
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Clip mask - reveal Dominat8 way from left as slider moves right */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`, pointerEvents: "auto" }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <div className="rounded-xl border border-purple-500/30 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-sm text-purple-300">AI Generated</div>
                  <div className="mt-2 text-2xl font-bold text-white">
                    Beautiful UI in seconds
                  </div>
                  <div className="mt-1 text-zinc-400">
                    One prompt. Infinite possibilities.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.a
          href="https://dominat8.io"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mx-auto mt-12 flex w-fit items-center gap-2 rounded-full border border-purple-500/50 bg-purple-500/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-purple-400 hover:bg-purple-500/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="absolute inset-0 animate-pulse rounded-full bg-purple-500/20 blur-xl" />
          <span className="relative z-10">Go to App →</span>
        </motion.a>
      </div>
    </section>
  );
}
