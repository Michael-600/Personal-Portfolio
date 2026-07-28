"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { projects } from "@/data/projects";
import Badge from "@/components/ui/Badge";

const STATUS_TONE = {
  Completed: "green",
  "In Progress": "amber",
  Prototype: "blue",
} as const;

export default function ProjectsGrid() {
  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
    >
      {projects.map((p) => (
        <motion.div
          key={p.slug}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <Link
            href={`/projects/${p.slug}`}
            className="group block rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/15 transition pixel-corners"
          >
            <div className="relative h-40 overflow-hidden bg-[#0a0d12] border-b border-white/[0.06]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-7xl font-bold text-white/[0.05] tracking-tighter group-hover:text-white/[0.08] transition-colors">
                  {p.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-14 bg-cyan-400/70 group-hover:w-24 transition-all duration-300" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <Badge>{p.category}</Badge>
                <Badge tone={STATUS_TONE[p.status] as "green" | "amber" | "blue"}>
                  {p.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <div className="grid place-items-center size-8 rounded-lg bg-zinc-950/50 backdrop-blur border border-white/10 text-zinc-300 group-hover:text-white transition">
                  <ArrowUpRight className="size-4 group-hover:rotate-12 transition" />
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-base font-semibold text-white leading-tight">
                {p.title}
              </h3>
              {p.subtitle && (
                <div className="text-[12px] text-zinc-400 mt-0.5">{p.subtitle}</div>
              )}
              <p className="mt-3 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                {p.summary}
              </p>

              {p.impact && (
                <div className="mt-3 flex items-start gap-2 text-xs text-cyan-200/90 bg-cyan-400/[0.06] border border-cyan-400/15 rounded-lg px-2.5 py-1.5">
                  <TrendingUp className="size-3.5 shrink-0 mt-0.5" />
                  <span>{p.impact}</span>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
