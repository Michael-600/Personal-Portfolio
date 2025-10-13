"use client";
import { motion } from "framer-motion";

export default function Marquee({ items }: { items: string[] }) {
  const text = items.join(" • ");
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/70">
      <motion.div
        className="whitespace-nowrap py-2 text-sm px-4"
        animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        style={{ display: "inline-block" }}
      >
        <span className="opacity-80">{text} • {text}</span>
      </motion.div>
    </div>
  );
}
