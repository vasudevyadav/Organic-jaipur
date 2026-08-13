"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function JourneyScrollLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
      <div className="absolute inset-0 bg-forest-900/10" />
      <motion.div className="absolute inset-x-0 top-0 h-full origin-top bg-honey-400" style={{ scaleY }} />
    </div>
  );
}
