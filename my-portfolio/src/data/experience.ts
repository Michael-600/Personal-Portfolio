export type Experience = {
  company: string;
  role: string;
  team?: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  upcoming?: boolean;
  logo?: string;
  summary: string;
  bullets: string[];
  stack: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    company: "Goldman Sachs",
    role: "Incoming Software Engineer",
    team: "Engineering Division",
    location: "New York, NY",
    start: "Jul 2026",
    end: "Present",
    upcoming: true,
    summary:
      "Joining the Engineering Division full-time after returning from a summer internship on Orion / Hubble.",
    bullets: [
      "Returning full-time to Goldman's Engineering Division after a successful Summer 2025 internship.",
      "Focus areas: backend systems, internal platform tooling, and AI-assisted developer workflows.",
    ],
    stack: ["Python", "Java", "Hubble", "Orion", "BigQuery", "Elastic"],
  },
  {
    company: "JonasRX",
    role: "Senior Software Engineer",
    team: "Health-Tech Startup",
    location: "Remote",
    start: "2025",
    end: "Present",
    current: true,
    summary:
      "Building and scaling a mobile app focused on personalized digital support for senior citizens across iOS and Android.",
    bullets: [
      "Designed and shipped user onboarding and database-backed profile flows used at launch.",
      "Integrated Google Maps for location-aware features and laid groundwork for ambient AI capabilities.",
      "Contribute across product architecture, frontend, backend integration, and launch readiness on both platforms.",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Google Maps API"],
  },
  {
    company: "BeginnerCode",
    role: "Founder & Engineer",
    team: "AI-Powered Coding Education",
    location: "Durham, NC",
    start: "2025",
    end: "Present",
    current: true,
    summary:
      "Founded an AI-powered coding education platform that spun out of a Duke independent study with a Computer Science professor.",
    bullets: [
      "Built a beginner-focused coding environment with AI-guided feedback and step-by-step problem-solving support.",
      "Designed the product so novices learn reasoning skills rather than relying on AI for direct answers.",
      "Owning the full stack: product direction, engineering, and learner experience.",
    ],
    stack: ["Next.js", "TypeScript", "LLMs", "Supabase", "Vercel"],
  },
  {
    company: "Goldman Sachs",
    role: "Software Engineering Intern",
    team: "Orion · Hubble",
    location: "New York, NY",
    start: "Jun 2025",
    end: "Aug 2025",
    summary:
      "Optimized the AOR pipeline and shipped an LLM-powered support assistant adopted across ops teams.",
    bullets: [
      "AOR Pipeline: added a REST endpoint and ViewObject enrichment to expose live AOR status (e.g., EXCEPTION OCCURRED) in Hubble.",
      "Automated data pulls so completed AORs surfaced in Hubble in under a minute — SLA improved from ~2 hours to <1 minute and reduced ops escalations by ~95%.",
      "Smart Support Assistant: Built a Python CLI that ingests a trade or Keystone ticket ID, queries Elastic for traces, runs BigQuery for centralized logs, and aggregates on-prem audit files.",
      "Chained context into a Jinja2-templated LLM prompt for causal-flow analysis; emitted Markdown 'Investigation' and 'Compare' reports — cut average investigation time by ~50%.",
    ],
    stack: ["Python", "Java", "Jinja2", "Elastic", "BigQuery", "REST APIs"],
  },
  {
    company: "Salesforce (Slack)",
    role: "Software Engineering Intern",
    team: "Backend Platform",
    location: "Remote",
    start: "May 2024",
    end: "Aug 2024",
    summary:
      "Worked on internal platform functions and delegated-app integrations on Slack's backend.",
    bullets: [
      "Triaged and resolved backend issues across Hack/PHP services, improving error categorization by ~30%.",
      "Contributed to delegated-app integrations using TypeScript and remote function APIs.",
      "Collaborated with product and QA to validate user feedback fixes prior to release.",
    ],
    stack: ["Hack/PHP", "HHVM", "TypeScript", "Node.js"],
  },
];
