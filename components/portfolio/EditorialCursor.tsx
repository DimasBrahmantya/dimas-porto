"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function EditorialCursor() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: smoothProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left pointer-events-none bg-gradient-to-r from-[#2563EB] to-[#DB2777]"
    />
  );
}
