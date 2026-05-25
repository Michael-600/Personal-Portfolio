"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Github, Linkedin, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

type NavLink = { label: string; href: string; highlight?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Latest", href: "#latest", highlight: true },
  { label: "Skills", href: "#skills" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-zinc-950/70 border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo — pixel-style wordmark */}
        <Link
          href="/"
          aria-label="Michael Hayford — home"
          className="group inline-flex items-center select-none"
        >
          <span
            className="font-pixel text-cyan-300 group-hover:text-cyan-200 transition-colors leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(10px, 1.6vw, 14px)",
              letterSpacing: "0.08em",
              textShadow:
                "2px 2px 0 rgba(0,0,0,0.55), 0 0 18px rgba(6,182,212,0.35)",
            }}
          >
            MICHAEL HAYFORD
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) =>
            l.highlight ? (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3 py-1.5 rounded-md text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 hover:from-cyan-200 hover:to-blue-300 transition"
              >
                {l.label}
                <span className="absolute -top-1.5 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm text-[8px] font-pixel text-zinc-950 bg-amber-400 pixel-tag">
                  NEW
                </span>
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-md text-sm text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="hidden md:grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
          >
            <Github className="size-4" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="hidden md:grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 font-medium text-sm hover:brightness-110 transition"
          >
            <FileText className="size-4" /> Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="lg:hidden grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05]"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl"
          >
            <nav className="px-6 py-4 space-y-1 max-w-7xl mx-auto">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-white/[0.05]",
                    l.highlight
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold"
                      : "text-zinc-200 hover:text-white"
                  )}
                >
                  <span>{l.label}</span>
                  {l.highlight && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm text-[8px] font-pixel text-zinc-950 bg-amber-400 pixel-tag">
                      NEW
                    </span>
                  )}
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-zinc-950 font-medium text-sm"
              >
                <FileText className="size-4" /> Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
