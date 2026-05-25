import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "cyan" | "blue" | "amber" | "green" | "violet";

const tones: Record<Tone, string> = {
  default: "bg-white/[0.04] text-zinc-300 border-white/10",
  cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  blue: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  amber: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  green: "bg-green-400/10 text-green-300 border-green-400/20",
  violet: "bg-violet-400/10 text-violet-300 border-violet-400/20",
};

export default function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border",
        "text-xs font-medium tracking-tight",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
