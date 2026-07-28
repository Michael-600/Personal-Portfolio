"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Trophy, Building2 } from "lucide-react";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { leadership, type Leadership } from "@/data/leadership";

const TAG_ICON = {
  Startup: Rocket,
  Initiative: Building2,
  Competition: Trophy,
  Community: Users,
} as const;

// Two-accent system: amber marks founder/startup work, everything else stays neutral.
const TAG_TONE: Record<Leadership["tag"], "amber" | "default"> = {
  Startup: "amber",
  Initiative: "default",
  Competition: "default",
  Community: "default",
};

export default function LeadershipSection() {
  return (
    <Section
      id="leadership"
      eyebrow="Leadership & Startups"
      title={
        <>
          Building beyond the <span className="text-zinc-400">classroom.</span>
        </>
      }
      description="Startups I founded or helped build, plus competitions and initiatives that taught me how to ship under pressure."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {leadership.map((l, i) => {
          const Icon = TAG_ICON[l.tag];
          return (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.25) }}
              whileHover={{ y: -3 }}
              className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 overflow-hidden hover:border-white/15 transition pixel-corners"
            >
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid place-items-center size-11 rounded-xl bg-cyan-400/10 border border-white/10 text-cyan-300">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {l.name}
                      </h3>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {l.role} · {l.period}
                      </div>
                    </div>
                  </div>
                  <Badge tone={TAG_TONE[l.tag]}>{l.tag}</Badge>
                </div>

                <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  {l.description}
                </p>

                <ul className="mt-4 space-y-1.5 text-sm text-zinc-400">
                  {l.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
