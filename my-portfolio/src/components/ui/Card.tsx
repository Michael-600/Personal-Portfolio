"use client";

import { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  interactive?: boolean;
  glow?: boolean;
  padded?: boolean;
};

export default function Card({
  children,
  className,
  interactive = false,
  glow = false,
  padded = true,
  ...rest
}: Props) {
  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className={cn(
        "relative rounded-2xl border border-white/[0.07] bg-white/[0.02]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        "backdrop-blur-sm pixel-corners",
        interactive && "hover:border-white/15 transition-colors",
        glow && "card-glow",
        padded && "p-6",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
