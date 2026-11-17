import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default:
    "bg-primary text-primary-foreground border-transparent font-bold",
  secondary:
    "bg-slate-900/90 text-slate-300 border-slate-800",
  outline:
    "bg-transparent text-slate-300 border-slate-700/80",
  accent:
    "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
};

export function Badge({
  className,
  variant = "secondary",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
