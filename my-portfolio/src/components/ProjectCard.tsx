"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import clsx from "clsx";

export default function ProjectCard({ p, className="" }: { p: Project; className?: string }) {
  const badge =
    p.status === "Completed" ? "bg-green-400/15 text-green-300 border-green-500/30" :
    p.status === "In Progress" ? "bg-yellow-400/15 text-yellow-300 border-yellow-500/30" :
    "bg-blue-400/15 text-blue-300 border-blue-500/30";

  return (
    <motion.a
      href={`/projects/${p.slug}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={clsx(
        "group relative rounded-2xl border border-neutral-800 bg-neutral-900/70 overflow-hidden",
        "shadow-[0_2px_0_0_rgba(255,255,255,0.04)_inset] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full">
        <Image src={p.image} alt={p.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold">{p.title}</h3>
          <ArrowUpRight className="size-4 opacity-60 group-hover:opacity-100" />
        </div>
        <p className="mt-1 text-sm opacity-80">{p.summary}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {p.tags.slice(0, 3).map(t => (
              <span key={t} className="px-2 py-0.5 rounded-lg text-[11px] border border-neutral-700 bg-neutral-800">
                {t}
              </span>
            ))}
          </div>
          <span className={clsx("text-[11px] px-2 py-0.5 rounded-md border", badge)}>{p.status}</span>
        </div>
      </div>
    </motion.a>
  );
}
