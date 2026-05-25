"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  ArrowUpRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import Section from "@/components/ui/Section";
import MinecraftButton from "@/components/ui/MinecraftButton";
import { profile } from "@/data/profile";

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    tone: "from-cyan-500/20 to-blue-500/20 text-cyan-300",
    primary: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Michael Hayford",
    href: profile.social.linkedin,
    tone: "from-blue-500/20 to-indigo-500/20 text-blue-300",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@Michael-600",
    href: profile.social.github,
    tone: "from-zinc-500/20 to-zinc-700/20 text-zinc-200",
  },
  {
    icon: FileText,
    label: "Resume",
    value: "Download PDF",
    href: profile.resumeUrl,
    tone: "from-amber-500/20 to-orange-500/20 text-amber-300",
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={
        <>
          Let&apos;s build something{" "}
          <span className="text-zinc-400">useful.</span>
        </>
      }
      description="I'm always open to talking about software roles, startup collaborations, consulting projects, and AI experiments. The fastest channel is email — I usually reply within a day."
      containerClassName="max-w-5xl"
    >
      <div className="grid md:grid-cols-2 gap-5">
        {CHANNELS.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.2) }}
            whileHover={{ y: -3 }}
            className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-white/15 transition overflow-hidden pixel-corners"
          >
            <div
              className={`absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${c.tone.split(" text-")[0]} blur-2xl opacity-50 pointer-events-none`}
            />
            <div className="relative flex items-center gap-4">
              <div
                className={`grid place-items-center size-12 rounded-xl bg-gradient-to-br ${c.tone} border border-white/10`}
              >
                <c.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {c.label}
                </div>
                <div className="text-sm font-medium text-white truncate">
                  {c.value}
                </div>
              </div>
              <ArrowUpRight className="size-5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-cyan-500/[0.04] to-blue-500/[0.04] p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="grid place-items-center size-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-zinc-950 shrink-0">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="text-base md:text-lg font-semibold text-white">
                Currently open to opportunities
              </div>
              <div className="text-sm text-zinc-400 mt-1">
                Software engineering · Startup / consulting work · Product engineering
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3" /> {profile.location}
                </span>
                <span>·</span>
                <span>Open to relocation / remote</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <MinecraftButton href={`mailto:${profile.email}`} color="amber" size="medium">
              Email Me
            </MinecraftButton>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white/[0.06] border border-white/10 text-white font-medium text-sm hover:bg-white/[0.10] hover:border-white/20 transition"
            >
              <FileText className="size-4" /> Download Resume
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
