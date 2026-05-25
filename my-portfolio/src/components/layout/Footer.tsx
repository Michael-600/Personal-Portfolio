import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span
            className="font-pixel text-cyan-300 leading-none"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textShadow: "2px 2px 0 rgba(0,0,0,0.55)",
            }}
          >
            MICHAEL HAYFORD
          </span>
          <div className="text-xs text-zinc-500 leading-tight mt-2">
            © {new Date().getFullYear()} · Designed &amp; built with care in Durham, NC.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
          >
            <Github className="size-4" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid place-items-center size-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
