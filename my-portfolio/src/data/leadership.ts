export type Leadership = {
  name: string;
  role: string;
  period: string;
  tag: "Startup" | "Initiative" | "Competition" | "Community";
  description: string;
  highlights: string[];
  link?: string;
};

export const leadership: Leadership[] = [
  {
    name: "BeginnerCode",
    role: "Founder",
    period: "2025 – Present",
    tag: "Startup",
    description:
      "AI-powered coding education platform that spun out of a Duke independent study with a CS professor. Designed to help novices reason through code step-by-step rather than copy answers from an AI.",
    highlights: [
      "Founded and lead product + engineering",
      "AI-guided feedback and personalized learning workflows",
      "Evolved from research project into standalone startup",
    ],
  },
  {
    name: "JonasRX",
    role: "Senior Software Engineer",
    period: "2025 – Present",
    tag: "Startup",
    description:
      "Health-tech startup building personalized digital support for senior citizens across iOS and Android.",
    highlights: [
      "Built onboarding + profile flows with PostgreSQL backing",
      "Integrated Google Maps for location-aware features",
      "Laying foundations for ambient AI capabilities",
    ],
  },
  {
    name: "BlackRock Pitch Deck Competition (DFE)",
    role: "Team Member",
    period: "2024",
    tag: "Competition",
    description:
      "Co-built an optimized portfolio in BlackRock's Aladdin Factor Workbench and defended the allocation for target return at minimal volatility.",
    highlights: [
      "Quantitative portfolio construction in Aladdin",
      "Live defense to BlackRock judges",
    ],
  },
  {
    name: "Hackathon — AI Canvas App",
    role: "Solo Builder · Slack Day Winner",
    period: "2024",
    tag: "Competition",
    description:
      "Solo-built an AI Canvas prototype during a Salesforce hackathon. Recognized as the Slack Day winner for usefulness and execution speed.",
    highlights: [
      "Solo project, end-to-end in a day",
      "Won 'Slack Day' category",
    ],
  },
];
