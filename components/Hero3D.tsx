"use client";

import Spline from "@splinetool/react-spline";
import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress from the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to scale (starts at 1.5x zoomed in, zooms out to 1x gradually)
  // Using range [0, 0.4] means it completes the zoom in just 40% of scroll for responsive feel
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);

  // Also add subtle y-axis parallax movement
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 bg-slate-950">
      <motion.div
        style={{ scale, y }}
        className="w-full h-full origin-center"
      >
        <Suspense fallback={<div className="w-full h-full bg-slate-950" />}>
          <Spline
            scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </motion.div>

      {/* Overlay Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
