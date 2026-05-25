export type SkillCategory = {
  name: string;
  icon: string; // emoji or lucide name
  description: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    description: "Production experience across compiled and scripting languages.",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "Hack/PHP", "OCaml", "HTML / CSS"],
  },
  {
    name: "Frameworks",
    icon: "LayoutTemplate",
    description: "Frontend, backend, and mobile frameworks I ship with.",
    items: ["React", "React Native", "Next.js", "Node.js", "Flask", "Jinja2", "Redux"],
  },
  {
    name: "Data & Infra",
    icon: "Database",
    description: "Storage, search, and the glue that keeps systems online.",
    items: [
      "PostgreSQL",
      "Supabase",
      "Firestore",
      "Elastic (ELK)",
      "BigQuery",
      "REST APIs",
      "Google Maps API",
      "Docker",
      "Git",
    ],
  },
  {
    name: "AI / ML",
    icon: "Sparkles",
    description: "LLMs in real products — not demos.",
    items: ["RAG pipelines", "Vercel AI SDK", "pgvector", "Embeddings", "Prompt engineering", "Applied ML"],
  },
  {
    name: "Product & Business",
    icon: "Compass",
    description: "Skills outside the IDE I bring to startup & consulting work.",
    items: [
      "Product strategy",
      "User research",
      "Founder-led sales",
      "BlackRock / Aladdin (Factor Workbench)",
      "AWS Certified",
    ],
  },
  {
    name: "Ops & Process",
    icon: "Workflow",
    description: "How I keep teams unblocked and shipping.",
    items: [
      "Incident triage",
      "Daily job automation",
      "Release verification",
      "Vendor / user feedback loops",
      "Documentation",
    ],
  },
];

// Flat marquee list for hero
export const marqueeSkills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "BigQuery",
  "Elastic",
  "RAG",
  "LLMs",
  "React Native",
  "Java",
  "Docker",
  "AWS",
  "Vercel AI SDK",
];
