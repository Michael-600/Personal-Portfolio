"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplineScene from "./SplineScene";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";

const ROBOT_LINES = [
  "Hi — I'm Michael's portfolio guide.",
  "Try scrolling for projects, or ask me anything.",
  "Goldman SWE intern → returning full-time in 2026.",
  "I founded BeginnerCode, an AI-powered coding tutor.",
  "Built an LLM ops assistant that cut triage time by ~50%.",
];

/**
 * Interactive 3D robot card used in the Hero section.
 * - Lazy-loads the Spline scene (won't block initial render).
 * - Floats a cycling speech bubble above the scene.
 * - Falls back to a tasteful placeholder if the scene URL fails to load.
 */
export default function RobotHero({ className }: { className?: string }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const id = window.setInterval(() => {
      setLineIdx((i) => (i + 1) % ROBOT_LINES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [loaded]);

  return (
    <div
      className={cn(
        "relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden",
        "border border-white/[0.08] bg-black/40",
        "shadow-[0_30px_60px_-30px_rgba(6,182,212,0.35)]",
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#7dd3fc" />

      {/* Subtle gradient backdrop behind the robot */}
      <div className="absolute inset-0 -z-0 aurora opacity-80" />
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_60%_40%,rgba(6,182,212,0.15),transparent_60%)]" />

      {/* Spline scene */}
      <div className="absolute inset-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Floating speech bubble */}
      <div className="pointer-events-none absolute top-5 left-5 right-5 md:right-auto md:max-w-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={lineIdx}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-start gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-md text-xs md:text-sm text-zinc-100 shadow-lg"
          >
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400 pulse-dot" />
            <span className="leading-snug">{ROBOT_LINES[lineIdx]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom-right label */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
        Interactive · drag to play
      </div>
    </div>
  );
}
