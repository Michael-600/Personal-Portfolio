"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const STATUS_TONE = {
  Completed: "green",
  "In Progress": "amber",
  Prototype: "blue",
} as const;

function ProjectCard({ p, featured = false }: { p: Project; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-2xl border border-white/[0.07] bg-white/[0.02]",
        "hover:border-white/15 transition-all overflow-hidden pixel-corners",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      )}
    >
      <Link href={`/projects/${p.slug}`} className="block">
        {/* Flat monogram header — quiet panel with a single accent hairline */}
        <div className="relative h-40 md:h-44 overflow-hidden bg-[#0a0d12] border-b border-white/[0.06]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-7xl md:text-8xl font-bold text-white/[0.05] tracking-tighter group-hover:text-white/[0.08] transition-colors">
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
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-white/40">
            {p.year}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-base md:text-lg font-semibold text-white leading-tight">
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
            {p.tags.slice(0, featured ? 5 : 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
              >
                {t}
              </span>
            ))}
            {p.tags.length > (featured ? 5 : 3) && (
              <span className="px-2 py-0.5 rounded-md text-[11px] text-zinc-500">
                +{p.tags.length - (featured ? 5 : 3)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={
        <>
          Projects with <span className="text-zinc-400">real impact.</span>
        </>
      }
      description="A handful of things I've built — from optimizing a Goldman Sachs pipeline to founding an AI coding tutor. Click any card to dig into the architecture and before/after diagrams."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} featured={p.featured} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-200 hover:bg-white/[0.08] hover:border-white/20 transition text-sm"
        >
          Explore all projects <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
