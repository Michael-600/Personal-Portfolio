"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatBox() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about my projects, stack, or experience." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const pending = input;
    setMsgs((m) => [...m, { role: "user", content: pending }]);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: pending })
      });
      const j = await r.json();
      setMsgs((m) => [...m, { role: "assistant", content: j.answer }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Oops, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full rounded-2xl p-4 bg-neutral-900/70 border border-neutral-800 flex flex-col">
      <div className="text-lg font-semibold mb-2">Ask my Assistant</div>
      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                m.role === "user" ? "bg-blue-600/70" : "bg-neutral-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-left text-sm opacity-70">…thinking</div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          placeholder="Ask me anything about my work…"
          className="flex-1 bg-neutral-800 rounded-xl px-3 py-2 text-sm outline-none border border-neutral-700"
        />
        <button onClick={send} className="px-4 py-2 rounded-xl bg-yellow-500 text-black text-sm font-semibold">
          Send
        </button>
      </div>
    </div>
  );
}

