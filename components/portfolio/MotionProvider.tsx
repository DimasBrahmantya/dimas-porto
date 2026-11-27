"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";
import { EditorialCursor } from "@/components/portfolio/EditorialCursor";

export function MotionProvider({ children }: { children: React.ReactNode }) {
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
