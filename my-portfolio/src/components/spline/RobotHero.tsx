"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";
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

// Floating pixel particles — subtle Minecraft-style ambient flecks.
const PARTICLES = [
  { left: "12%", delay: 0.0, color: "#22d3ee", duration: 7 },
  { left: "28%", delay: 1.8, color: "#f59e0b", duration: 8 },
  { left: "44%", delay: 3.2, color: "#22d3ee", duration: 6.5 },
  { left: "62%", delay: 2.1, color: "#3b82f6", duration: 7.5 },
  { left: "78%", delay: 0.9, color: "#22d3ee", duration: 7 },
  { left: "92%", delay: 4.0, color: "#f59e0b", duration: 8 },
];

/**
 * Interactive 3D robot card with a Minecraft / arcade-HUD overlay.
 *
 * Decorations layered on top of the Spline scene:
 *  - Pixel corner brackets framing the viewport (always visible)
 *  - Cycling speech bubble (top-left)
 *  - MICHAEL.BOT status tag (top-right)
 *  - Location / class HUD (bottom-left)
 *  - "[DRAG ME]" pixel pill (bottom-right)
 *  - Drifting pixel particles in the background
 *  - One-time "Achievement Get!" popup on first visit (per session)
 */
export default function RobotHero({ className }: { className?: string }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  // Cycle the speech bubble once the scene has loaded.
  useEffect(() => {
    if (!loaded) return;
    const id = window.setInterval(() => {
      setLineIdx((i) => (i + 1) % ROBOT_LINES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [loaded]);

  // One-time achievement popup per session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mh_achievement_shown")) return;
    const show = window.setTimeout(() => {
      setShowAchievement(true);
      sessionStorage.setItem("mh_achievement_shown", "1");
    }, 1600);
    const hide = window.setTimeout(() => setShowAchievement(false), 6200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden",
        "border border-white/[0.08] bg-black/40",
        "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#7dd3fc" />

      {/* Backdrop — one quiet glow behind the robot */}
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_60%_40%,rgba(6,182,212,0.10),transparent_60%)]" />

      {/* Floating pixel particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute block"
            style={{
              left: p.left,
              bottom: -8,
              width: 4,
              height: 4,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}, 1px 1px 0 rgba(0,0,0,0.4)`,
              imageRendering: "pixelated",
            }}
            animate={{
              y: ["0%", "-720%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2.4,
              ease: "linear",
              times: [0, 0.1, 0.85, 1],
            }}
          />
        ))}
      </div>

      {/* Spline scene */}
      <div className="absolute inset-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* HUD corner brackets */}
      <PixelCornerBrackets />

      {/* Top-left: cycling speech bubble */}
      <div className="pointer-events-none absolute top-5 left-5 right-5 md:right-auto md:max-w-xs z-10">
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

      {/* Top-right: MICHAEL.BOT tag */}
      <div className="pointer-events-none absolute top-5 right-5 z-10">
        <div
          className="font-pixel inline-flex items-center gap-1.5 px-2 py-1.5 rounded-sm bg-zinc-950/85 border border-cyan-400/30 backdrop-blur-sm"
          style={{ fontSize: "8px", letterSpacing: "0.08em" }}
        >
          <span className="inline-block size-1.5 rounded-full bg-green-400 pulse-dot" />
          <span className="text-cyan-300">MICHAEL.BOT</span>
          <span className="text-zinc-500">v1.0</span>
        </div>
      </div>

      {/* Bottom-left: HUD coordinates */}
      <div className="pointer-events-none absolute bottom-5 left-5 z-10">
        <div
          className="font-pixel leading-relaxed"
          style={{ fontSize: "8px", letterSpacing: "0.08em" }}
        >
          <div className="text-cyan-300/85">
            <span className="text-zinc-500">LOC:</span> DURHAM, NC
          </div>
          <div className="text-amber-300/85">
            <span className="text-zinc-500">CLASS:</span> DUKE • CS &apos;26
          </div>
          <div className="text-zinc-400/85">
            <span className="text-zinc-500">MODE:</span> INTERACTIVE
          </div>
        </div>
      </div>

      {/* Bottom-right: [DRAG ME] pill */}
      <div className="pointer-events-none absolute bottom-5 right-5 z-10">
        <div
          className="font-pixel inline-flex items-center gap-1 px-2 py-1.5 rounded-sm text-zinc-950 bg-amber-400 pixel-tag"
          style={{ fontSize: "8px", letterSpacing: "0.1em" }}
        >
          ▸ DRAG ME
        </div>
      </div>

      {/* Achievement popup (once per session) */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, x: 24, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="pointer-events-none absolute z-20"
            style={{ top: "44px", right: "16px" }}
          >
            <div
              className="flex items-center gap-2.5 px-3 py-2 rounded bg-zinc-900/95 border-2 border-amber-400/70 backdrop-blur"
              style={{
                boxShadow:
                  "4px 4px 0 0 rgba(0,0,0,0.5), 0 0 20px -4px rgba(245,158,11,0.5)",
              }}
            >
              <div
                className="grid place-items-center size-7 rounded-sm bg-amber-400"
                style={{ boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.4)" }}
              >
                <Trophy className="size-4 text-zinc-950" />
              </div>
              <div className="font-pixel leading-tight" style={{ letterSpacing: "0.06em" }}>
                <div
                  className="text-amber-300"
                  style={{ fontSize: "7px" }}
                >
                  ACHIEVEMENT GET!
                </div>
                <div
                  className="text-white mt-0.5"
                  style={{ fontSize: "9px" }}
                >
                  Met Michael
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PixelCornerBrackets() {
  const base = "absolute pointer-events-none";
  const arm = "absolute bg-cyan-400/55";
  // Each corner is two short bars (horizontal + vertical) — true pixel L-shapes.
  return (
    <>
      {/* Top-left */}
      <div className={cn(base, "top-3 left-3 w-4 h-4")}>
        <span className={cn(arm, "top-0 left-0 h-[2px] w-4")} />
        <span className={cn(arm, "top-0 left-0 w-[2px] h-4")} />
      </div>
      {/* Top-right */}
      <div className={cn(base, "top-3 right-3 w-4 h-4")}>
        <span className={cn(arm, "top-0 right-0 h-[2px] w-4")} />
        <span className={cn(arm, "top-0 right-0 w-[2px] h-4")} />
      </div>
      {/* Bottom-left */}
      <div className={cn(base, "bottom-3 left-3 w-4 h-4")}>
        <span className={cn(arm, "bottom-0 left-0 h-[2px] w-4")} />
        <span className={cn(arm, "bottom-0 left-0 w-[2px] h-4")} />
      </div>
      {/* Bottom-right */}
      <div className={cn(base, "bottom-3 right-3 w-4 h-4")}>
        <span className={cn(arm, "bottom-0 right-0 h-[2px] w-4")} />
        <span className={cn(arm, "bottom-0 right-0 w-[2px] h-4")} />
      </div>
    </>
  );
}
