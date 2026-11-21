"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";
import { EditorialCursor } from "@/components/portfolio/EditorialCursor";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <EditorialCursor />
      {children}
    </MotionConfig>
  );
}
