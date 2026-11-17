import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-cyan-300 active:scale-[0.98]",
  secondary:
    "bg-slate-800/90 text-slate-100 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 active:scale-[0.98]",
  outline:
    "bg-transparent text-slate-200 border border-slate-700/80 hover:bg-slate-800/60 hover:text-white hover:border-cyan-400/50 active:scale-[0.98]",
  ghost:
    "bg-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white",
  link: "bg-transparent text-cyan-400 underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-5 py-2 text-xs",
  sm: "h-8 px-3.5 text-xs",
  lg: "h-11 px-6 text-sm",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
