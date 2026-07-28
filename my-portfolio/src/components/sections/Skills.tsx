"use client";

import { motion } from "framer-motion";
import {
  Code2,
  LayoutTemplate,
  Database,
  Sparkles,
  Compass,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import { skillCategories } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Database,
  Sparkles,
  Compass,
  Workflow,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          Tools I <span className="text-zinc-400">reach for daily.</span>
        </>
      }
      description="Organized by what I actually use in production — not a name-drop list. The deeper sets (RAG, ops automation, mobile) are reflected in my project work."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((cat, i) => {
          const Icon = ICONS[cat.icon] ?? Code2;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25) }}
              whileHover={{ y: -3 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 hover:border-white/15 transition pixel-corners"
            >
              <div className="flex items-center gap-3">
                <div className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-white/10 text-cyan-300">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{cat.name}</h3>
              </div>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cat.items.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-[12px] text-zinc-200 bg-white/[0.04] border border-white/10 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
