"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 hover:brightness-110 shadow-[0_0_24px_-6px_rgba(6,182,212,0.6)]",
  secondary:
    "bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.10] hover:border-white/20",
  ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-white/[0.05]",
  outline:
    "bg-transparent text-white border border-white/15 hover:bg-white/[0.06] hover:border-white/30",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className, children, leftIcon, rightIcon, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-all duration-200 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});

export default Button;
