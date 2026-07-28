"use client";

import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  Sparkles,
  MapPin,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { profile } from "@/data/profile";
import { marqueeSkills } from "@/data/skills";
import MinecraftButton from "@/components/ui/MinecraftButton";
import RobotHero from "@/components/spline/RobotHero";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 md:pt-32 pb-16 overflow-hidden"
    >
      {/* Single, quiet glow anchored to the top — no aurora wash */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(6,182,212,0.07),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-white"
            >
              Hi, I&apos;m <span className="text-cyan-300">Michael</span>.
              <br />I build pragmatic,
              <br />
              <span className="text-zinc-400">AI-powered software.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-base md:text-lg text-zinc-400 leading-relaxed"
            >
              Duke CS &apos;26 · Senior engineer at JonasRX · Founder of{" "}
              <span className="text-zinc-200 font-medium">BeginnerCode</span>.
              I ship backend systems, AI products, and full-stack MVPs with real
              users.
            </motion.p>

            {/* Meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 flex flex-wrap gap-2 text-xs"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-zinc-300">
                <MapPin className="size-3" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-zinc-300">
                <GraduationCap className="size-3" /> {profile.education.schoolShort} · CS &apos;26
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                <Sparkles className="size-3" /> Open to opportunities
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MinecraftButton href="#projects" color="cyan" size="medium">
                View Projects
              </MinecraftButton>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white/[0.06] border border-white/10 text-white font-medium text-sm hover:bg-white/[0.10] hover:border-white/20 transition"
              >
                <FileText className="size-4" /> View Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-zinc-300 hover:text-white font-medium text-sm transition"
              >
                <Mail className="size-4" /> Contact Me
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
            >
              {profile.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-sm"
                >
                  <div className="text-lg md:text-xl font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-tight mt-1">
                    {s.label}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1 leading-tight">
                    {s.caption}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <RobotHero />
            <div className="mt-5 flex items-center gap-4">
              <div className="relative size-12 overflow-hidden pixel-frame shrink-0">
                <Image
                  src={profile.avatar}
                  alt="Michael Hayford"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="text-xs text-zinc-400 leading-tight">
                <div className="text-zinc-200 font-medium">That&apos;s me — say hi!</div>
                <Link href="#contact" className="text-cyan-300 hover:text-cyan-200">
                  michael.hayford@duke.edu →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 md:mt-20 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] py-4"
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="flex w-max animate-marquee gap-6 text-sm text-zinc-400 pr-6">
            {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
              <span key={`${s}-${i}`} className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-cyan-400/60" />
                <span className="font-mono">{s}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
