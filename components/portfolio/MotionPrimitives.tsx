"use client";

import * as React from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "curtain-up"
  | "circle-iris"
  | "diagonal-wipe"
  | "pill-expand"
  | "fade-up";

interface ShapeRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const hiddenStates: Record<RevealVariant, Record<string, string | number>> = {
  "curtain-up": {
    clipPath: "inset(14% 0% 0% 0% round 24px)",
    opacity: 0,
    y: 28,
  },
  "circle-iris": {
    clipPath: "circle(12% at 50% 50%)",
    opacity: 0,
    scale: 0.94,
  },
  "diagonal-wipe": {
    clipPath: "inset(0% 16% 0% 0% round 24px)",
    opacity: 0,
    x: 24,
  },
  "pill-expand": {
    clipPath: "inset(0% 10% 0% 10% round 999px)",
    opacity: 0,
    scale: 0.96,
  },
  "fade-up": {
    opacity: 0,
    y: 22,
  },
};

const visibleStates: Record<RevealVariant, Record<string, string | number>> = {
  "curtain-up": {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    y: 0,
  },
  "circle-iris": {
    clipPath: "circle(140% at 50% 50%)",
    opacity: 1,
    scale: 1,
  },
  "diagonal-wipe": {
    clipPath: "inset(0% 0% 0% 0% round 24px)",
    opacity: 1,
    x: 0,
  },
  "pill-expand": {
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    opacity: 1,
    scale: 1,
  },
  "fade-up": {
    opacity: 1,
    y: 0,
  },
};

export function ShapeReveal({
  children,
  variant = "curtain-up",
  delay = 0,
  duration = 0.65,
  className,
  once = false,
}: ShapeRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={hiddenStates[variant]}
      whileInView={visibleStates[variant]}
      viewport={{ once, amount: "some" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MagneticWrapProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticWrap({
  children,
  className,
  strength = 0.22,
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-8, Math.min(8, relX * strength)));
    y.set(Math.max(-8, Math.min(8, relY * strength)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

interface TiltSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: "blue" | "pink";
  cursorLabel?: string;
}

export function TiltSpotlightCard({
  children,
  className,
  accent = "blue",
  cursorLabel = "View",
}: TiltSpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowOpacity = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3.5, -3.5]), {
    stiffness: 260,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3.5, 3.5]), {
    stiffness: 260,
    damping: 26,
  });

  const spotX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, px)));
    mouseY.set(Math.max(0, Math.min(1, py)));
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    glowOpacity.set(0);
  };

  const glowColor =
    accent === "pink"
      ? "rgba(219, 39, 119, 0.14)"
      : "rgba(37, 99, 235, 0.12)";

  return (
    <motion.div
      ref={ref}
      data-cursor={cursorLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
      className={cn("relative h-full will-change-transform", className)}
    >
      {children}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${glowColor}, transparent 72%)`,
            // @ts-expect-error CSS custom properties driven by framer-motion MotionValue
            "--spot-x": spotX,
            "--spot-y": spotY,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
        />
      )}
    </motion.div>
  );
}
