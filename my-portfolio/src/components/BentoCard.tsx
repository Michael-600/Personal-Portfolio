"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function BentoCard({
  children,
  className = "",
  hover = true,
}: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={clsx(
        "rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
