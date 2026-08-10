"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ParticleConfig {
  id: number;
  type: "snowflake1" | "snowflake2" | "snowflake3" | "sparkle" | "snowdot" | "neoSquare" | "neoCross" | "codeSnow";
  left: string;
  top: string;
  size: string;
  duration: number;
  delay: number;
  sway: number;
  fallDistance: number;
  rotateDir: 1 | -1;
  opacity: number;
}

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  icon: string;
}

// 36 Curated Snowy Neo-Brutalist particles evenly distributed across page sections
const PARTICLES_DATA: ParticleConfig[] = [
  // Top / Hero Section
  { id: 1, type: "snowflake1", left: "3%", top: "5%", size: "text-3xl sm:text-5xl", duration: 11, delay: 0, sway: 16, fallDistance: 35, rotateDir: 1, opacity: 0.5 },
  { id: 2, type: "neoCross", left: "12%", top: "14%", size: "text-2xl sm:text-4xl", duration: 9, delay: 0.8, sway: -18, fallDistance: 40, rotateDir: -1, opacity: 0.4 },
  { id: 3, type: "snowflake2", left: "22%", top: "8%", size: "text-2xl sm:text-4xl", duration: 13, delay: 0.4, sway: 20, fallDistance: 35, rotateDir: 1, opacity: 0.45 },
  { id: 4, type: "sparkle", left: "34%", top: "4%", size: "text-xl sm:text-3xl", duration: 10, delay: 1.5, sway: -12, fallDistance: 30, rotateDir: -1, opacity: 0.5 },
  { id: 5, type: "snowflake3", left: "48%", top: "6%", size: "text-2xl sm:text-4xl", duration: 14, delay: 0.2, sway: 18, fallDistance: 35, rotateDir: 1, opacity: 0.45 },
  { id: 6, type: "codeSnow", left: "64%", top: "10%", size: "text-lg sm:text-2xl", duration: 15, delay: 1.1, sway: -14, fallDistance: 30, rotateDir: -1, opacity: 0.4 },
  { id: 7, type: "snowflake1", left: "78%", top: "5%", size: "text-3xl sm:text-5xl", duration: 12, delay: 2.1, sway: 22, fallDistance: 45, rotateDir: 1, opacity: 0.5 },
  { id: 8, type: "snowflake2", left: "88%", top: "12%", size: "text-2xl sm:text-4xl", duration: 10, delay: 0.6, sway: -20, fallDistance: 38, rotateDir: -1, opacity: 0.45 },
  { id: 9, type: "sparkle", left: "95%", top: "6%", size: "text-xl sm:text-3xl", duration: 11, delay: 1.8, sway: 12, fallDistance: 28, rotateDir: 1, opacity: 0.5 },

  // Middle Top Section
  { id: 10, type: "snowdot", left: "7%", top: "25%", size: "text-xl sm:text-3xl", duration: 8, delay: 1.2, sway: -10, fallDistance: 25, rotateDir: 1, opacity: 0.55 },
  { id: 11, type: "neoSquare", left: "18%", top: "30%", size: "w-5 h-5 sm:w-7 sm:h-7", duration: 12, delay: 0.3, sway: 16, fallDistance: 35, rotateDir: -1, opacity: 0.35 },
  { id: 12, type: "snowflake3", left: "28%", top: "22%", size: "text-2xl sm:text-4xl", duration: 13, delay: 1.9, sway: -18, fallDistance: 40, rotateDir: 1, opacity: 0.45 },
  { id: 13, type: "sparkle", left: "72%", top: "24%", size: "text-2xl sm:text-4xl", duration: 11, delay: 0.7, sway: 15, fallDistance: 32, rotateDir: -1, opacity: 0.4 },
  { id: 14, type: "neoCross", left: "84%", top: "28%", size: "text-2xl sm:text-4xl", duration: 9, delay: 2.3, sway: -16, fallDistance: 36, rotateDir: 1, opacity: 0.4 },
  { id: 15, type: "snowflake1", left: "92%", top: "32%", size: "text-3xl sm:text-5xl", duration: 14, delay: 0.1, sway: 20, fallDistance: 42, rotateDir: -1, opacity: 0.5 },

  // Middle Section
  { id: 16, type: "snowflake2", left: "5%", top: "42%", size: "text-3xl sm:text-5xl", duration: 12, delay: 1.4, sway: 22, fallDistance: 40, rotateDir: 1, opacity: 0.5 },
  { id: 17, type: "sparkle", left: "15%", top: "48%", size: "text-xl sm:text-3xl", duration: 10, delay: 0.5, sway: -14, fallDistance: 30, rotateDir: -1, opacity: 0.45 },
  { id: 18, type: "snowflake3", left: "26%", top: "54%", size: "text-2xl sm:text-4xl", duration: 14, delay: 2.0, sway: 18, fallDistance: 35, rotateDir: 1, opacity: 0.4 },
  { id: 19, type: "codeSnow", left: "76%", top: "44%", size: "text-lg sm:text-2xl", duration: 15, delay: 0.9, sway: -16, fallDistance: 32, rotateDir: -1, opacity: 0.4 },
  { id: 20, type: "snowflake1", left: "86%", top: "50%", size: "text-3xl sm:text-5xl", duration: 11, delay: 1.7, sway: 20, fallDistance: 45, rotateDir: 1, opacity: 0.5 },
  { id: 21, type: "snowdot", left: "94%", top: "56%", size: "text-xl sm:text-3xl", duration: 8, delay: 0.2, sway: -10, fallDistance: 25, rotateDir: -1, opacity: 0.55 },

  // Lower Middle Section
  { id: 22, type: "neoSquare", left: "8%", top: "66%", size: "w-5 h-5 sm:w-7 sm:h-7", duration: 13, delay: 1.0, sway: -16, fallDistance: 38, rotateDir: 1, opacity: 0.35 },
  { id: 23, type: "snowflake3", left: "19%", top: "72%", size: "text-2xl sm:text-4xl", duration: 12, delay: 2.4, sway: 20, fallDistance: 35, rotateDir: -1, opacity: 0.45 },
  { id: 24, type: "snowflake2", left: "30%", top: "68%", size: "text-2xl sm:text-4xl", duration: 14, delay: 0.3, sway: -14, fallDistance: 30, rotateDir: 1, opacity: 0.4 },
  { id: 25, type: "sparkle", left: "70%", top: "70%", size: "text-2xl sm:text-4xl", duration: 10, delay: 1.6, sway: 16, fallDistance: 32, rotateDir: -1, opacity: 0.45 },
  { id: 26, type: "neoCross", left: "82%", top: "65%", size: "text-2xl sm:text-4xl", duration: 11, delay: 0.8, sway: -18, fallDistance: 40, rotateDir: 1, opacity: 0.4 },
  { id: 27, type: "snowflake1", left: "91%", top: "74%", size: "text-3xl sm:text-5xl", duration: 13, delay: 2.2, sway: 22, fallDistance: 45, rotateDir: -1, opacity: 0.5 },

  // Bottom Section
  { id: 28, type: "snowflake1", left: "4%", top: "85%", size: "text-3xl sm:text-5xl", duration: 12, delay: 0.6, sway: 18, fallDistance: 35, rotateDir: 1, opacity: 0.5 },
  { id: 29, type: "sparkle", left: "14%", top: "92%", size: "text-xl sm:text-3xl", duration: 9, delay: 1.9, sway: -12, fallDistance: 28, rotateDir: -1, opacity: 0.5 },
  { id: 30, type: "snowflake2", left: "25%", top: "88%", size: "text-2xl sm:text-4xl", duration: 15, delay: 0.4, sway: 20, fallDistance: 36, rotateDir: 1, opacity: 0.45 },
  { id: 31, type: "codeSnow", left: "38%", top: "94%", size: "text-lg sm:text-2xl", duration: 14, delay: 2.1, sway: -14, fallDistance: 30, rotateDir: -1, opacity: 0.4 },
  { id: 32, type: "snowflake3", left: "62%", top: "90%", size: "text-2xl sm:text-4xl", duration: 13, delay: 1.2, sway: 16, fallDistance: 34, rotateDir: 1, opacity: 0.45 },
  { id: 33, type: "snowflake1", left: "75%", top: "86%", size: "text-3xl sm:text-5xl", duration: 11, delay: 0.7, sway: -20, fallDistance: 40, rotateDir: -1, opacity: 0.5 },
  { id: 34, type: "neoSquare", left: "86%", top: "93%", size: "w-5 h-5 sm:w-7 sm:h-7", duration: 12, delay: 2.5, sway: 15, fallDistance: 35, rotateDir: 1, opacity: 0.35 },
  { id: 35, type: "sparkle", left: "95%", top: "89%", size: "text-xl sm:text-3xl", duration: 10, delay: 1.3, sway: -12, fallDistance: 30, rotateDir: -1, opacity: 0.5 },
];

function InteractiveParticle({
  particle,
  mousePos,
}: {
  particle: ParticleConfig;
  mousePos: { x: number; y: number };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotateAdd: 0,
    isNearby: false,
  });

  useEffect(() => {
    if (!containerRef.current || mousePos.x === -1000) return;

    const rect = containerRef.current.getBoundingClientRect();
    const pX = rect.left + rect.width / 2;
    const pY = rect.top + rect.height / 2;

    const dx = pX - mousePos.x;
    const dy = pY - mousePos.y;
    const distance = Math.hypot(dx, dy);
    const radius = 160; // Interaction radius (px)

    if (distance < radius && distance > 0) {
      const force = (radius - distance) / radius; // 0 to 1
      // Magnetic pull & pulse effect instead of plain push
      const magnetAmount = force * 35;
      const pullX = (-dx / distance) * magnetAmount;
      const pullY = (-dy / distance) * magnetAmount;

      setInteractive({
        x: pullX,
        y: pullY,
        scale: 1.45 + force * 0.35, // Grows nicely when approached
        rotateAdd: force * 180, // Spins smoothly when mouse approaches
        isNearby: true,
      });
    } else {
      setInteractive({ x: 0, y: 0, scale: 1, rotateAdd: 0, isNearby: false });
    }
  }, [mousePos]);

  const renderContent = (type: ParticleConfig["type"]) => {
    switch (type) {
      case "snowflake1":
        return <span className="font-mono select-none text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">❄</span>;
      case "snowflake2":
        return <span className="font-mono select-none text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">❅</span>;
      case "snowflake3":
        return <span className="font-mono select-none text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">❆</span>;
      case "sparkle":
        return <span className="font-mono font-bold select-none text-black">✦</span>;
      case "snowdot":
        return <span className="font-mono font-black select-none text-black">•</span>;
      case "neoCross":
        return <span className="font-mono font-extrabold select-none text-black">+</span>;
      case "codeSnow":
        return <span className="font-mono font-extrabold tracking-tighter select-none text-black">{"</>"}</span>;
      case "neoSquare":
        return (
          <div className="w-full h-full border-2 border-black bg-white neo-shadow-sm rotate-45" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ top: particle.top, left: particle.left }}
      className="absolute pointer-events-none"
    >
      {/* Outer Motion Div for Interactive Magnetic Pull & Spin */}
      <motion.div
        animate={{
          x: interactive.x,
          y: interactive.y,
          scale: interactive.scale,
          rotate: interactive.rotateAdd,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 16,
          mass: 0.5,
        }}
        className={`flex items-center justify-center pointer-events-none transition-all duration-200 ${
          particle.size
        } ${interactive.isNearby ? "drop-shadow-lg text-black font-black" : ""}`}
      >
        {/* Inner Motion Div for Continuous Natural Swaying & Falling */}
        <motion.div
          animate={{
            y: [0, particle.fallDistance, 0],
            x: [0, particle.sway, 0],
            rotate: [0, particle.rotateDir * 360],
            opacity: [particle.opacity * 0.8, particle.opacity, particle.opacity * 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className="flex items-center justify-center"
        >
          {renderContent(particle.type)}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [trails, setTrails] = useState<TrailParticle[]>([]);
  const lastTrailTime = useRef<number>(0);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn interactive mini snow sparkle trail under cursor
      const now = Date.now();
      if (now - lastTrailTime.current > 70) {
        lastTrailTime.current = now;
        const icons = ["✦", "❄", "•", "❅", "❆"];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const newTrail: TrailParticle = {
          id: Math.random(),
          x: e.clientX + (Math.random() * 24 - 12),
          y: e.clientY + (Math.random() * 24 - 12),
          size: Math.floor(Math.random() * 10) + 12,
          icon: randomIcon,
        };
        setTrails((prev) => [...prev.slice(-10), newTrail]);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Interactive Cursor Snow Spotlight Aura */}
      <motion.div
        animate={{
          x: mousePos.x - 85,
          y: mousePos.y - 85,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        className="fixed w-44 h-44 rounded-full bg-black/5 blur-xl pointer-events-none z-0"
      />

      {/* Interactive Mouse Sparkle Snow Trail */}
      <AnimatePresence>
        {trails.map((t) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 0.85, scale: 1, y: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: 0.3, y: 28, rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ left: t.x, top: t.y, fontSize: `${t.size}px` }}
            className="fixed pointer-events-none z-0 text-black font-mono select-none drop-shadow-sm"
          >
            {t.icon}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Main 35+ Snowy Particles */}
      {PARTICLES_DATA.map((particle) => (
        <InteractiveParticle key={particle.id} particle={particle} mousePos={mousePos} />
      ))}
    </div>
  );
}
