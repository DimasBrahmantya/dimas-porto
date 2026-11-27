"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function EditorialCursor() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 460, damping: 34, mass: 0.45 });
  const springY = useSpring(mouseY, { stiffness: 460, damping: 34, mass: 0.45 });

  useEffect(() => {
    if (prefersReduced || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let lastTarget: EventTarget | null = null;
    let isVisible = false;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) {
        isVisible = true;
        setVisible(true);
      }

      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const target = e.target as HTMLElement | null;
        const cursorEl = target?.closest<HTMLElement>("[data-cursor]");
        setLabel(cursorEl?.dataset.cursor || null);
      }
    };

    const handleLeave = () => {
      lastTarget = null;
      isVisible = false;
      setVisible(false);
      setLabel(null);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[70] -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      <AnimatePresence>
        {visible && label && (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="px-3.5 py-1.5 rounded-full bg-[#111216]/88 text-white backdrop-blur-md border border-white/20 shadow-[0_10px_28px_rgba(17,18,22,0.22)] font-mono text-[11px] font-bold tracking-wider uppercase whitespace-nowrap"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
