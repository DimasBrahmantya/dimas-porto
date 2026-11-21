import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "primary" | "pink" | "pinkSoft" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[#111216] text-white hover:bg-[#272B35] shadow-xs active:scale-[0.98]",
  primary:
    "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-xs active:scale-[0.98]",
  pink:
    "bg-[#DB2777] text-white hover:bg-[#BE185D] shadow-xs active:scale-[0.98]",
  pinkSoft:
    "bg-[#FDF2F8] text-[#9D174D] border border-[#F9A8D4] hover:bg-[#FCE7F3] active:scale-[0.98]",
  outline:
    "bg-white text-[#111216] border border-[#CBD2DF] hover:bg-[#F1F3F7] hover:border-[#94A3B8] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#475060] hover:bg-[#F1F3F7] hover:text-[#111216]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 py-2 text-sm",
  sm: "h-11 px-4 text-xs",
  lg: "h-12 px-6 text-sm",
  icon: "h-11 w-11 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F4] disabled:pointer-events-none disabled:opacity-50",
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
