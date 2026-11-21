"use client";

import * as React from "react";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { EditorialCursor } from "@/components/portfolio/EditorialCursor";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      autoResize: true,
      prevent: (node) =>
        Boolean(node.closest('[role="dialog"], [data-lenis-prevent]')),
    });

    const handleStop = () => lenis.stop();
    const handleStart = () => {
      lenis.start();
      lenis.resize();
    };

    window.addEventListener("lenis:stop", handleStop);
    window.addEventListener("lenis:start", handleStart);

    // Keep Lenis scroll limit synced when dynamic sections (filters, images) change height
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("lenis:stop", handleStop);
      window.removeEventListener("lenis:start", handleStart);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Subtle Editorial Paper Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] editorial-grain opacity-[0.032] mix-blend-multiply"
      />
      <EditorialCursor />
      {children}
    </MotionConfig>
  );
}
