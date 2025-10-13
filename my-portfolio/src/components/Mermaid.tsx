"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

type Props = {
  code: string;
  className?: string;
  theme?: "dark" | "default";
};

export default function Mermaid({ code, className = "", theme = "dark" }: Props) {
  const [svg, setSvg] = useState<string>("");
  const id = useId();

  useEffect(() => {
    // init once per mount; safe to call repeatedly
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      themeVariables: {
        darkMode: true,
        primaryColor: "#111827",
        primaryBorderColor: "#374151",
        primaryTextColor: "#e5e7eb",
      },
    });

    let cancelled = false;
    (async () => {
      try {
        const { svg } = await mermaid.render(`m-${id}`, code);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        setSvg(`<pre style="white-space:pre-wrap;color:#f87171">Mermaid error:\n${String(e)}</pre>`);
      }
    })();

    return () => { cancelled = true; };
  }, [code, id, theme]);

  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-900/70 p-3 overflow-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg || "<div class='text-sm opacity-70'>Rendering…</div>" }}
    />
  );
}
