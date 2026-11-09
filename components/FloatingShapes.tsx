"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: "cyan" | "amber" | "white";
  duration: number;
  delay: number;
  driftX: number;
}

export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Generate subtle atmospheric depth specks
    const generated: Particle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.6 ? 2 : 1.5,
      color: i % 2 === 0 ? "cyan" : "white",
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 4,
      driftX: (Math.random() - 0.5) * 30,
    }));
    setParticles(generated);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette opacity-80" />

      {/* Atmospheric Star / Ember particles (disabled under prefers-reduced-motion) */}
      {!reducedMotion &&
        particles.map((p) => {
        const bgColor = p.color === "cyan" ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.35)";

        return (
          <motion.div
            key={p.id}
            initial={{
              x: `${p.x}vw`,
              y: `${p.y}vh`,
              opacity: 0.05,
              scale: 0.9,
            }}
            animate={{
              y: [`${p.y}vh`, `${(p.y - 12 + 100) % 100}vh`],
              x: [`${p.x}vw`, `${p.x + p.driftX / 15}vw`],
              opacity: [0.05, 0.3, 0.05],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: bgColor,
            }}
          />
        );
      })}
    </div>
  );
}
