"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfileCard() {
  return (
    <motion.div
      className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 flex items-center gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative size-16 rounded-full overflow-hidden ring-2 ring-neutral-700">
        <Image src="/me.jpg" alt="Profile" fill className="object-cover" />
      </div>
      <div>
        <div className="text-lg font-semibold">Your Name</div>
        <div className="text-sm opacity-80">Duke University · CS & AI</div>
        <div className="mt-2 flex gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-green-500/15 border border-green-600/40 text-green-300">
            Available
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-600/30 text-yellow-300">
            4+ Projects
          </span>
        </div>
      </div>
    </motion.div>
  );
}
