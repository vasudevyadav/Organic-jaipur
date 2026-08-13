"use client";

import { motion } from "framer-motion";

const confetti = [
  { x: -68, y: -28, color: "#efb735", delay: 0.35 },
  { x: -50, y: -62, color: "#d46b4c", delay: 0.45 },
  { x: -20, y: -76, color: "#4d8b56", delay: 0.3 },
  { x: 28, y: -73, color: "#efb735", delay: 0.4 },
  { x: 58, y: -52, color: "#d46b4c", delay: 0.5 },
  { x: 72, y: -16, color: "#4d8b56", delay: 0.38 },
];

export default function OrderSuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 190, damping: 14 }}
      className="relative mx-auto flex h-24 w-24 items-center justify-center"
      aria-hidden
    >
      {confetti.map((piece, index) => (
        <motion.span
          key={index}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: piece.x, y: piece.y, opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.7], rotate: 180 }}
          transition={{ duration: 1.15, delay: piece.delay, ease: "easeOut" }}
          className="absolute h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: piece.color }}
        />
      ))}

      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.08, type: "spring", stiffness: 220, damping: 16 }}
        className="absolute inset-1 rounded-full bg-brand-100"
      />
      <motion.svg viewBox="0 0 52 52" className="relative h-20 w-20" fill="none">
        <motion.circle
          cx="26"
          cy="26"
          r="23"
          stroke="#2f6b3d"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
        <motion.path
          d="M15 27.5 22.5 35 38 18.5"
          stroke="#2f6b3d"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.45, ease: "easeOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}
