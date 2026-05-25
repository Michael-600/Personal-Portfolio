"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve <span className="text-zinc-400">shipped.</span>
        </>
      }
      description="Internships, startup work, and the projects I'm currently building. The short version is below — the full story is in my resume."
    >
      <div className="relative">
        {/* Vertical timeline line — hidden on mobile */}
        <div className="hidden md:block absolute left-[7.25rem] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent" />

        <ol className="space-y-8 md:space-y-10">
          {experiences.map((exp, i) => (
            <motion.li
              key={`${exp.company}-${exp.start}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.2) }}
              className="relative grid md:grid-cols-[7.25rem_1fr] gap-4 md:gap-8"
            >
              {/* Date column */}
              <div className="md:text-right">
                <div className="text-xs font-mono text-zinc-400">
                  {exp.start} — {exp.end}
                </div>
                <div className="md:mt-2 flex md:justify-end gap-1.5 flex-wrap mt-1">
                  {exp.upcoming && <Badge tone="cyan">Upcoming</Badge>}
                  {exp.current && <Badge tone="green">Current</Badge>}
                </div>
              </div>

              {/* Card */}
              <div className="relative">
                {/* Timeline node */}
                <div className="hidden md:block absolute -left-[2.05rem] top-3">
                  <div
                    className={cn(
                      "size-3 rounded-full ring-4 ring-zinc-950",
                      exp.upcoming
                        ? "bg-cyan-400"
                        : exp.current
                        ? "bg-green-400 pulse-dot"
                        : "bg-white/40"
                    )}
                  />
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6 hover:border-white/15 transition pixel-corners">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {exp.role}{" "}
                        <span className="text-zinc-400 font-normal">@ </span>
                        <span className="text-cyan-300">{exp.company}</span>
                      </h3>
                      {exp.team && (
                        <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2 flex-wrap">
                          <span>{exp.team}</span>
                          {exp.location && (
                            <>
                              <span className="text-zinc-600">·</span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3" />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-zinc-400 hover:text-white p-1.5 rounded-md hover:bg-white/5"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Sparkles className="mt-1 size-3 text-cyan-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
