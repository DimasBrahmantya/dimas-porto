import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "blue" | "pink";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "rounded-full bg-[#111216] text-white border-transparent font-semibold",
  secondary: "rounded-lg bg-[#F1F3F7] text-[#272B35] border-[#E2E5EC]",
  outline: "rounded-lg bg-white text-[#475060] border-[#CBD2DF]",
  blue: "rounded-full bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  pink: "rounded-full bg-[#FCE7F3] text-[#9D174D] border-[#F9A8D4]",
};

export function Badge({
  className,
  variant = "secondary",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wide transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
