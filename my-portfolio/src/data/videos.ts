export type VideoItem = {
  id: string;
  title: string;
  description: string;
  category: "Demo" | "Walkthrough" | "Talk" | "Experiment";
  date: string;
  // Optional thumbnail; falls back to a generated gradient if absent.
  thumbnail?: string;
  // Optional URL — if absent, the button is disabled / "Coming soon".
  url?: string;
  // Optional embed (YouTube/Loom/etc.) — Video card prefers this over `url` for inline playback.
  embedUrl?: string;
  tags?: string[];
  accent?: "cyan" | "blue" | "amber" | "violet";
};

/**
 * Replace these placeholder items with real videos.
 * - Drop a thumbnail into /public/videos/ and set `thumbnail: "/videos/your-thumb.jpg"`.
 * - For an embedded player, set `embedUrl` to a YouTube or Loom embed URL.
 */
export const videos: VideoItem[] = [
  {
    id: "beginnercode-demo",
    title: "BeginnerCode — AI Coding Tutor Walkthrough",
    description:
      "A tour of BeginnerCode: how the AI guides learners through reasoning instead of giving answers.",
    category: "Demo",
    date: "Coming 2026",
    tags: ["Startup", "AI", "EdTech"],
    accent: "cyan",
  },
  {
    id: "jonasrx-app",
    title: "JonasRX — Senior Support Mobile App",
    description:
      "A live walkthrough of the JonasRX onboarding flow and location-aware features on iOS and Android.",
    category: "Walkthrough",
    date: "Coming 2026",
    tags: ["React Native", "Health Tech"],
    accent: "blue",
  },
  {
    id: "smart-support-assistant",
    title: "Smart Support Assistant — LLM Triage at Goldman",
    description:
      "How a Python CLI + LLM pipeline standardized investigation reports across ops teams.",
    category: "Talk",
    date: "Coming 2026",
    tags: ["AI", "Backend", "Internship"],
    accent: "amber",
  },
  {
    id: "prospects-agent",
    title: "USA Prospects Agent — RAG Essay Coach",
    description:
      "Behind the scenes of a streamed RAG product that's served essay feedback to 1,000+ users.",
    category: "Demo",
    date: "Coming 2026",
    tags: ["RAG", "Next.js", "Supabase"],
    accent: "violet",
  },
];
