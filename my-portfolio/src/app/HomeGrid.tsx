"use client";

import { Code, Mail, Calendar, MapPin, Globe, Briefcase, GraduationCap, ExternalLink, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import BentoCard from "@/components/BentoCard";
import ChatBox from "@/components/ChatBox";

const chip = "px-2 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs";
const sectionTitle = "text-sm opacity-70";
const h2 = "text-xl font-semibold mb-2";

export default function HomeGrid() {
  return (
    <div className="grid grid-cols-12 auto-rows-[170px] gap-4">
      {/* Tech Stack */}
      <BentoCard className="col-span-12 md:col-span-4 row-span-2">
        <div className={sectionTitle}>Featured</div>
        <div className={h2}>Tech Stack</div>
        <div className="flex flex-wrap gap-2">
          {["Python","TypeScript","React","PostgreSQL","Tailwind","Supabase","Elastic","BigQuery"].map(t => (
            <span key={t} className={chip}>{t}</span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Flask","Next.js","Jinja2","Docker","Hack/PHP"].map(t => (
            <span key={t} className={chip}>{t}</span>
          ))}
        </div>
      </BentoCard>

      {/* Stats */}
      <BentoCard className="col-span-12 sm:col-span-4 md:col-span-2">
        <div className="text-3xl font-bold">4+</div>
        <div className="opacity-70 text-sm">Projects shipped</div>
      </BentoCard>
      <BentoCard className="col-span-12 sm:col-span-4 md:col-span-2">
        <div className="text-3xl font-bold">15+</div>
        <div className="opacity-70 text-sm">Tech used</div>
      </BentoCard>
      <BentoCard className="col-span-12 sm:col-span-4 md:col-span-2">
        <div className="text-3xl font-bold">06+</div>
        <div className="opacity-70 text-sm">Yrs exp (mix)</div>
      </BentoCard>

      {/* Profile */}
      <BentoCard className="col-span-12 md:col-span-4">
        <div className="flex items-center gap-3">
          <div className="relative size-14 rounded-xl overflow-hidden ring-1 ring-neutral-700">
            <Image src="/me.jpg" alt="Profile" fill className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">Michael Quansah Hayford</div>
            <div className="text-sm opacity-80">Software Engineer</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className={chip}><MapPin className="inline size-3 mr-1" /> Durham, NC</span>
              <span className={chip}><Globe className="inline size-3 mr-1" /> English</span>
              <span className={chip}><Briefcase className="inline size-3 mr-1" /> Available</span>
            </div>
          </div>
          <a href="/resume.pdf" className="px-3 py-2 bg-yellow-500 text-black rounded-xl text-sm font-semibold">Resume</a>
        </div>
      </BentoCard>

      {/* Bio + Education */}
      <BentoCard className="col-span-12 md:col-span-4 row-span-2">
        <div className={h2}>About</div>
        <p className="opacity-85 text-sm leading-6">
          Duke CS student building pragmatic AI + backend systems. Interned at Goldman Sachs (Orion/Hubble)
          optimizing AOR pipeline & shipping an AI-powered support assistant; previously at Salesforce (Slack team).
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div><GraduationCap className="inline size-4 mr-2" /> Duke University — B.S. Computer Science</div>
          <div className="opacity-80 text-xs">Innovation & Entrepreneurship Certificate</div>
        </div>
      </BentoCard>

      {/* Works Gallery (link to /projects) */}
      <BentoCard className="col-span-12 md:col-span-4">
        <div className={sectionTitle}>Recent Work</div>
        <div className={h2}>Works Gallery</div>
        <div className="relative h-24 rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
          <Image src="/gallery-placeholder.png" alt="Gallery" fill className="object-cover opacity-80" />
        </div>
        <a className="inline-block mt-3 text-sm underline opacity-90" href="/projects">View Works</a>
      </BentoCard>

      {/* === Replacement for Peer Recommendations === */}
      <BentoCard className="col-span-12 md:col-span-4 row-span-2">
        <div className={sectionTitle}><Star className="inline size-4 mr-1" /> Impact & Wins</div>
        <ul className="mt-2 space-y-3 text-sm">
          <li className="leading-6">
            <strong>Goldman Sachs – AOR pipeline:</strong> improved SLA from ~2h → <span className="text-green-300 font-semibold">&lt; 1 min</span>, ~95% fewer escalations.
          </li>
          <li className="leading-6">
            <strong>Smart Support Assistant:</strong> standardized triage; cut investigation time by ~50% with Elastic + BigQuery + LLM reports.
          </li>
          <li className="leading-6">
            <strong>USA Prospects Agent:</strong> AI app for 1,000+ users (RAG + Supabase, streamed UX).
          </li>
          <li className="leading-6">
            <strong>DataZon:</strong> mini-Amazon with TF-IDF “Similar items” and normalized SQL schema.
          </li>
        </ul>
      </BentoCard>

      {/* Workflow Highlights */}
      <BentoCard className="col-span-12 md:col-span-4">
        <div className={sectionTitle}><Sparkles className="inline size-4 mr-1" /> My Process</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["Goals & Objectives","Research","Design","Prototyping"].map(x => (
            <div key={x} className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2">{x}</div>
          ))}
        </div>
      </BentoCard>

      {/* Tech Arsenal (expanded) */}
      <BentoCard className="col-span-12 md:col-span-4 row-span-2">
        <div className={sectionTitle}>Technologies</div>
        <div className={h2}>Tech Arsenal</div>
        <div className="flex flex-wrap gap-2">
          {["Elastic","BigQuery","Supabase","pgvector","RAG","Vercel AI SDK","Flask","Next.js","Docker","Redux"].map(t =>
            <span key={t} className={chip}>{t}</span>
          )}
        </div>
      </BentoCard>

      {/* Chatbox (taller, centered feel) */}
      <div className="col-span-12 md:col-span-4 row-span-3">
        <ChatBox />
      </div>

      {/* Online Presence */}
      <BentoCard className="col-span-12 md:col-span-4">
        <div className={sectionTitle}>Connect With Me</div>
        <div className={h2}>Online Presence</div>
        <div className="space-y-2 text-sm">
          <a className="block underline" href="https://www.linkedin.com/in/michael-hayford-099711205/" target="_blank">LinkedIn</a>
          <a className="block underline" href="https://github.com/" target="_blank">GitHub</a>
          <a className="block underline" href="https://x.com/" target="_blank">X / Twitter</a>
        </div>
      </BentoCard>

      {/* Work Together */}
      <BentoCard className="col-span-12 md:col-span-4 row-span-2">
        <div className="text-xl font-semibold">Let’s Work Together</div>
        <p className="opacity-80 text-sm mt-1">
          Building AI features, backend systems, or full-stack MVPs? I’d love to help.
        </p>
        <div className="mt-4 space-y-2">
          <a className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-sm" href="mailto:michael.hayford@duke.edu">
            <Mail className="size-4" /> Email Me
          </a>
          <a className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-sm" href="https://cal.com/" target="_blank">
            <Calendar className="size-4" /> Schedule a Call
          </a>
        </div>
      </BentoCard>

      {/* Bottom banner */}
      <motion.div
        className="col-span-12 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 flex items-center justify-between"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <div className="text-sm opacity-80">
          <Code className="inline size-4 mr-2" />
          Built with Next.js, Tailwind, Supabase, pgvector, Framer Motion.
        </div>
        <a className="text-sm underline flex items-center gap-1" href="/projects">
          Explore projects <ExternalLink className="size-4" />
        </a>
      </motion.div>
    </div>
  );
}
