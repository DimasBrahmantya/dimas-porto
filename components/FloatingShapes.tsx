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

  useEffect(() => {
    setMounted(true);
    // Generate atmospheric embers & star dust particles
    const generated: Particle[] = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1.5,
      color: i % 3 === 0 ? "amber" : i % 3 === 1 ? "cyan" : "white",
      duration: 5 + Math.random() * 7,
      delay: Math.random() * 4,
      driftX: (Math.random() - 0.5) * 40,
    }));
    setParticles(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette opacity-80" />

      {/* Atmospheric Star / Ember particles */}
      {particles.map((p) => {
        const glowColor =
          p.color === "amber"
            ? "rgba(249, 115, 22, 0.7)"
            : p.color === "cyan"
            ? "rgba(6, 182, 212, 0.7)"
            : "rgba(255, 255, 255, 0.6)";
        const bgColor =
          p.color === "amber"
            ? "#fb923c"
            : p.color === "cyan"
            ? "#38bdf8"
            : "#ffffff";

        return (
          <motion.div
            key={p.id}
            initial={{
              x: `${p.x}vw`,
              y: `${p.y}vh`,
              opacity: 0.1,
              scale: 0.8,
            }}
            animate={{
              y: [`${p.y}vh`, `${(p.y - 15 + 100) % 100}vh`],
              x: [`${p.x}vw`, `${p.x + p.driftX / 10}vw`],
              opacity: [0.1, 0.7, 0.1],
              scale: [0.8, 1.3, 0.8],
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
              boxShadow: `0 0 ${p.size * 3}px ${glowColor}, 0 0 ${p.size * 6}px ${glowColor}`,
            }}
          />
        );
      })}
    </div>
  );
}
