"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
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
  once = true,
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
  cursorLabel = "View ↗",
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

/* -------------------------------------------------------------------------- */
/*  SplitTextReveal: Editorial Masked Word-by-Word Reveal (React Bits style)  */
/* -------------------------------------------------------------------------- */

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

export function SplitTextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitTextRevealProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.26em]", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            {...(immediate
              ? { animate: { y: "0%", opacity: 1 } }
              : {
                  whileInView: { y: "0%", opacity: 1 },
                  viewport: { once: true, amount: "some" },
                })}
            transition={{
              duration: 0.58,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {/* Keeps words separated in the HTML text crawlers read; flex gap handles visual spacing. */}
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  TextScramble: Monospace Decrypted Text (React Bits / Motion Primitives)   */
/* -------------------------------------------------------------------------- */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/|-";

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  durationMs?: number;
}

export function TextScramble({
  text,
  className,
  triggerOnHover = true,
  durationMs = 520,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: "some" });
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  const runScramble = React.useCallback(() => {
    if (prefersReduced) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const start = performance.now();
    const len = text.length;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const revealedCount = Math.floor(progress * len);

      let output = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        if (ch === " " || ch === "/" || ch === "|") {
          output += ch;
        } else if (i < revealedCount) {
          output += ch;
        } else {
          output +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      setDisplay(output);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [durationMs, prefersReduced, text]);

  useEffect(() => {
    if (isInView) {
      runScramble();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, runScramble]);

  return (
    <span
      ref={ref}
      onMouseEnter={triggerOnHover ? runScramble : undefined}
      className={className}
    >
      {prefersReduced ? text : display}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  RollingNumber: Smooth Counting Numeric Primitive                          */
/* -------------------------------------------------------------------------- */

interface RollingNumberProps {
  value: number;
  decimals?: number;
  className?: string;
}

export function RollingNumber({
  value,
  decimals = 0,
  className,
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: "some" });
  const [formatted, setFormatted] = useState(() => value.toFixed(decimals));

  useEffect(() => {
    if (prefersReduced || !isInView) return;

    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setFormatted(latest.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [decimals, isInView, prefersReduced, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefersReduced ? value.toFixed(decimals) : formatted}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  LiveMalangClock: Hydration-Safe Local WIB Time Badge                      */
/* -------------------------------------------------------------------------- */

interface LiveMalangClockProps {
  className?: string;
  compact?: boolean;
}

export function LiveMalangClock({
  className,
  compact = false,
}: LiveMalangClockProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const formatWib = () => {
      try {
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
      } catch {
        return "";
      }
    };

    const initialId = setTimeout(() => setTime(formatWib()), 0);
    const id = setInterval(() => setTime(formatWib()), 15000);
    return () => {
      clearTimeout(initialId);
      clearInterval(id);
    };
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider uppercase",
        className
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>
        {compact ? "Jakarta Selatan" : "Jakarta Selatan, ID"}
        {time ? ` · ${time} WIB` : " · WIB"}
      </span>
    </span>
  );
}
