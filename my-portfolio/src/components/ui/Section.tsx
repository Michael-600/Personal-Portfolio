"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  align?: "left" | "center";
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  fullWidth = false,
  align = "left",
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 scroll-mt-24",
        className
      )}
    >
      <div
        className={cn(
          fullWidth ? "px-6 md:px-10" : "max-w-7xl mx-auto px-6 md:px-10",
          containerClassName
        )}
      >
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
              "mb-12 md:mb-16 max-w-3xl",
              align === "center" && "mx-auto text-center"
            )}
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/80 mb-4">
                <span className="h-px w-6 bg-cyan-400/60" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base md:text-lg text-zinc-400 leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
