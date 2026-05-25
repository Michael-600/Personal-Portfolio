"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  HeartHandshake,
  Lightbulb,
  Compass,
} from "lucide-react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { profile } from "@/data/profile";

const INTERESTS = [
  { icon: Briefcase, label: "Software Engineering", tone: "text-cyan-300" },
  { icon: Rocket, label: "Startups & Entrepreneurship", tone: "text-amber-300" },
  { icon: Lightbulb, label: "AI / LLM Products", tone: "text-blue-300" },
  { icon: Compass, label: "Consulting & Strategy", tone: "text-violet-300" },
  { icon: HeartHandshake, label: "Product Engineering", tone: "text-green-300" },
  { icon: GraduationCap, label: "Research & Learning", tone: "text-pink-300" },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineer first.{" "}
          <span className="text-zinc-400">Founder, learner, teammate.</span>
        </>
      }
      description="A quick look at who I am, what I'm studying, and the things I care about building."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: photo + identity */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden pixel-frame bg-zinc-900">
            <Image
              src={profile.avatar}
              alt={profile.fullName}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-cyan-400 text-zinc-950 text-[8px] font-pixel pixel-tag mb-2">
                ONLINE
              </div>
              <div className="text-lg font-semibold text-white">{profile.fullName}</div>
              <div className="text-xs text-zinc-300 mt-0.5">{profile.role} · Duke &apos;26</div>
            </div>
          </div>
          <Card padded className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 text-zinc-200">
              <GraduationCap className="size-4 text-cyan-300" />
              <span className="font-medium">{profile.education.school}</span>
            </div>
            <div className="text-xs text-zinc-400 pl-6">
              {profile.education.degree}
            </div>
            <div className="text-xs text-zinc-400 pl-6">
              {profile.education.certificate}
            </div>
            <div className="text-xs text-zinc-500 pl-6 pt-1">
              Graduating {profile.education.graduation}
            </div>
          </Card>
        </div>

        {/* Right: bio + interests */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="space-y-4 text-zinc-300 leading-relaxed text-[15px]">
              {profile.longBio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </Card>

          {/* Interests grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {INTERESTS.map((it, i) => (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 hover:border-white/15 transition"
              >
                <div className="grid place-items-center size-9 rounded-lg bg-white/[0.04] border border-white/10">
                  <it.icon className={`size-4 ${it.tone}`} />
                </div>
                <span className="text-sm text-zinc-200">{it.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Looking for */}
          <Card>
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 mb-3">
              What I&apos;m looking for
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-300">
              {profile.lookingFor.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-cyan-400" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
