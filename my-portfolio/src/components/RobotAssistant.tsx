"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Tell me about Michael's Goldman internship",
  "What is BeginnerCode?",
  "Best project for backend / AI roles?",
  "What's Michael studying at Duke?",
];

const INITIAL: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Michael's portfolio assistant. Ask me about his projects, internships, startup work, or stack.",
};

/**
 * Floating assistant pill in the bottom-right corner.
 * - Collapsed: a pill button with the robot icon.
 * - Expanded: a chat panel that posts to /api/chat (existing endpoint).
 */
export default function RobotAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [msgs, loading, open]);

  async function send(message?: string) {
    const text = (message ?? input).trim();
    if (!text || loading) return;
    setInput("");
    const history = msgs.slice(1); // drop the canned intro from history
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const j = await r.json();
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: j.answer ?? "Hmm, no answer yet." },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Something went wrong reaching the assistant. Try again in a bit.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "w-[min(92vw,380px)] h-[520px] flex flex-col",
              "rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl",
              "shadow-[0_30px_60px_-20px_rgba(6,182,212,0.4)]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative grid place-items-center size-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                  <Bot className="size-4 text-zinc-950" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 ring-2 ring-zinc-950 pulse-dot" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Ask the Robot</div>
                  <div className="text-[11px] text-zinc-400">Trained on Michael&apos;s resume</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-white/5"
                aria-label="Close assistant"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollerRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-gradient-to-br from-cyan-500/90 to-blue-600/90 text-white"
                        : "bg-white/[0.05] text-zinc-200 border border-white/[0.06]"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <div className="flex gap-1">
                    <span className="size-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="size-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:120ms]" />
                    <span className="size-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:240ms]" />
                  </div>
                  thinking
                </div>
              )}

              {msgs.length <= 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    Try asking
                  </div>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 text-zinc-300 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="border-t border-white/10 p-3 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my work…"
                className="flex-1 bg-white/[0.04] border border-white/10 focus:border-cyan-400/40 focus:outline-none rounded-xl px-3 py-2 text-sm placeholder:text-zinc-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid place-items-center size-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-zinc-950 disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            onClick={() => setOpen(true)}
            className={cn(
              "group flex items-center gap-2 pl-2 pr-4 py-2 rounded-full",
              "bg-zinc-950/80 border border-white/10 backdrop-blur-xl",
              "shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)]",
              "hover:border-cyan-400/40 transition"
            )}
            aria-label="Open robot assistant"
          >
            <span className="relative grid place-items-center size-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
              <Bot className="size-4 text-zinc-950" />
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 ring-2 ring-zinc-950 pulse-dot" />
            </span>
            <span className="text-sm font-medium text-white">Ask the Robot</span>
            <Sparkles className="size-3.5 text-cyan-300 group-hover:rotate-12 transition" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
