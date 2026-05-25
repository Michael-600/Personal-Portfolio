"use client";

import { motion } from "framer-motion";
import { Play, Film, Calendar } from "lucide-react";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { videos, type VideoItem } from "@/data/videos";
import { cn } from "@/lib/utils";

const ACCENT: Record<NonNullable<VideoItem["accent"]>, string> = {
  cyan: "from-cyan-500/30 via-cyan-500/5 to-transparent",
  blue: "from-blue-500/30 via-blue-500/5 to-transparent",
  amber: "from-amber-500/30 via-amber-500/5 to-transparent",
  violet: "from-violet-500/30 via-violet-500/5 to-transparent",
};

function VideoCard({ v, i }: { v: VideoItem; i: number }) {
  const hasVideo = !!(v.url || v.embedUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25) }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/15 transition pixel-corners"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {v.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={v.thumbnail}
            alt={v.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              ACCENT[v.accent ?? "cyan"]
            )}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

        {/* Decorative bars to simulate video bezels */}
        <div className="absolute inset-x-6 top-6 h-1 rounded-full bg-white/[0.06]" />
        <div className="absolute inset-x-12 top-9 h-1 rounded-full bg-white/[0.04]" />

        {/* Play button */}
        <div className="absolute inset-0 grid place-items-center">
          <button
            disabled={!hasVideo}
            className={cn(
              "grid place-items-center size-16 rounded-full backdrop-blur-md",
              "border transition-all",
              hasVideo
                ? "bg-white/10 border-white/20 hover:scale-110 hover:bg-cyan-400/20 hover:border-cyan-300/60"
                : "bg-white/[0.04] border-white/10 cursor-not-allowed"
            )}
            aria-label={hasVideo ? "Play demo" : "Coming soon"}
          >
            <Play className="size-6 text-white translate-x-0.5" />
          </button>
        </div>

        {/* Category + date chips */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge tone={v.accent ?? "cyan"}>
            <Film className="size-3" /> {v.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-950/60 border border-white/10 text-[10px] text-zinc-300 backdrop-blur">
            <Calendar className="size-3" /> {v.date}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-white leading-snug">
          {v.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {v.description}
        </p>

        {v.tags && v.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {v.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          {hasVideo ? (
            <a
              href={v.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              <Play className="size-3.5" /> Watch Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <Play className="size-3.5" /> Coming soon
            </span>
          )}
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            #{(i + 1).toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideoShowcase() {
  return (
    <Section
      id="latest"
      eyebrow={
        <span className="inline-flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold">
            Latest Work
          </span>
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm text-[8px] font-pixel text-zinc-950 bg-amber-400 pixel-tag">
            NEW
          </span>
        </span>
      }
      title={
        <>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-400">
            Demos
          </span>{" "}
          &amp; <span className="text-zinc-400">walkthroughs.</span>
        </>
      }
      description="A growing reel of project demos, app walkthroughs, and technical experiments. Real videos drop here as I ship — these placeholders are wired to swap in seconds."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {videos.map((v, i) => (
          <VideoCard key={v.id} v={v} i={i} />
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-zinc-500">
        New videos drop monthly. Want an early preview?{" "}
        <a href="#contact" className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline">
          Get in touch.
        </a>
      </div>
    </Section>
  );
}
